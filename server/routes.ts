import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateInterestQuiz, recommendClubs, chatWithAssistant, type ChatMessage } from "./gemini";
import { insertRegistrationSchema, quizRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/clubs - List all clubs
  app.get("/api/clubs", async (req, res) => {
    try {
      const clubs = await storage.getAllClubs();
      res.json(clubs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/clubs/:id - Get club details
  app.get("/api/clubs/:id", async (req, res) => {
    try {
      const club = await storage.getClubById(req.params.id);
      if (!club) {
        return res.status(404).json({ error: "Club not found" });
      }
      res.json(club);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/registrations - Create a registration
  app.post("/api/registrations", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      
      // Check if club exists and has capacity
      const club = await storage.getClubById(validatedData.clubId);
      if (!club) {
        return res.status(404).json({ error: "Club not found" });
      }
      
      if (club.currentEnrollment >= club.maxCapacity) {
        return res.status(400).json({ error: "Club is at full capacity" });
      }
      
      const registration = await storage.createRegistration(validatedData);
      
      // Create reminder for 30 minutes before the first class
      const schedule = JSON.parse(club.schedule);
      if (schedule.length > 0) {
        // For demo purposes, create a reminder for tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(parseInt(schedule[0].time.split(":")[0]), parseInt(schedule[0].time.split(":")[1]), 0);
        
        await storage.createReminder({
          registrationId: registration.id,
          activityDate: tomorrow,
          message: `${club.name} starts in 30 minutes at ${club.location}`,
        });
      }
      
      res.json(registration);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/registrations - Get all registrations
  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/schedule - Get user's schedule (all active registrations with club details)
  app.get("/api/schedule", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      const activeRegistrations = registrations.filter(r => r.status === "active");
      
      const scheduleItems = await Promise.all(
        activeRegistrations.map(async (registration) => {
          const club = await storage.getClubById(registration.clubId);
          return {
            registration,
            club,
          };
        })
      );
      
      res.json(scheduleItems.filter(item => item.club !== undefined));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/quiz/generate - Generate quiz questions using Gemini AI
  app.post("/api/quiz/generate", async (req, res) => {
    try {
      const { language } = quizRequestSchema.parse(req.body);
      const quizData = await generateInterestQuiz(language);
      res.json(quizData);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Quiz generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/quiz/recommendations - Get club recommendations based on interests
  app.post("/api/quiz/recommendations", async (req, res) => {
    try {
      const { interests } = req.body;
      
      if (!Array.isArray(interests)) {
        return res.status(400).json({ error: "Interests must be an array" });
      }
      
      const allClubs = await storage.getAllClubs();
      const recommendations = await recommendClubs(interests, allClubs);
      
      // Get recommended clubs with match percentages
      const recommendedClubs = recommendations
        .map(rec => {
          const club = allClubs.find(c => c.id === rec.clubId);
          return club ? { club, matchPercentage: rec.matchPercentage } : null;
        })
        .filter(item => item !== null)
        .sort((a, b) => b!.matchPercentage - a!.matchPercentage);
      
      const clubs = recommendedClubs.map(item => item!.club);
      const matchPercentages: Record<string, number> = {};
      recommendedClubs.forEach(item => {
        matchPercentages[item!.club.id] = item!.matchPercentage;
      });
      
      // Save quiz response
      const sessionId = `session-${Date.now()}`;
      await storage.createQuizResponse({
        sessionId,
        interests: JSON.stringify(interests),
        recommendations: JSON.stringify(recommendations.map(r => r.clubId)),
      });
      
      res.json({
        clubs,
        matchPercentages,
        sessionId,
      });
    } catch (error: any) {
      console.error("Recommendation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/reminders/pending - Get pending reminders (for notification system)
  app.get("/api/reminders/pending", async (req, res) => {
    try {
      const reminders = await storage.getPendingReminders();
      
      // Get registration and club details for each reminder
      const reminderDetails = await Promise.all(
        reminders.map(async (reminder) => {
          const registration = await storage.getRegistrationById(reminder.registrationId);
          if (!registration) return null;
          
          const club = await storage.getClubById(registration.clubId);
          if (!club) return null;
          
          return {
            reminder,
            registration,
            club,
          };
        })
      );
      
      res.json(reminderDetails.filter(item => item !== null));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/reminders/:id/sent - Mark reminder as sent
  app.post("/api/reminders/:id/sent", async (req, res) => {
    try {
      await storage.markReminderSent(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/chat - Chat with AI assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, language = "ru" } = req.body;
      
      if (!Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages must be an array" });
      }
      
      const chatMessages: ChatMessage[] = messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }));
      
      const response = await chatWithAssistant(chatMessages, language);
      res.json({ message: response });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
