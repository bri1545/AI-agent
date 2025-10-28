import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Clubs - after-school activities/circles
export const clubs = pgTable("clubs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameKz: text("name_kz"),
  nameRu: text("name_ru"),
  description: text("description").notNull(),
  descriptionKz: text("description_kz"),
  descriptionRu: text("description_ru"),
  category: text("category").notNull(), // sports, arts, science, music, tech, etc.
  ageGroup: text("age_group").notNull(), // "7-10", "11-14", "15-18"
  skillLevel: text("skill_level").notNull(), // beginner, intermediate, advanced
  schedule: text("schedule").notNull(), // JSON string: [{day: "Mon", time: "15:00", duration: 60}]
  maxCapacity: integer("max_capacity").notNull(),
  currentEnrollment: integer("current_enrollment").notNull().default(0),
  location: text("location").notNull(), // Room number or building
  imageUrl: text("image_url"),
});

// Registrations - student enrollments in clubs
export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  studentAge: integer("student_age").notNull(),
  parentContact: text("parent_contact").notNull(),
  clubId: varchar("club_id").notNull(),
  registeredAt: timestamp("registered_at").notNull().default(sql`now()`),
  status: text("status").notNull().default("active"), // active, cancelled, completed
});

// Reminders - scheduled notifications for upcoming activities
export const reminders = pgTable("reminders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  registrationId: varchar("registration_id").notNull(),
  activityDate: timestamp("activity_date").notNull(),
  reminderSent: boolean("reminder_sent").notNull().default(false),
  message: text("message").notNull(),
});

// Quiz responses - track student interests
export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  interests: text("interests").notNull(), // JSON array of interest tags
  recommendations: text("recommendations").notNull(), // JSON array of club IDs
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Zod schemas for validation
export const insertClubSchema = createInsertSchema(clubs).omit({
  id: true,
  currentEnrollment: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  registeredAt: true,
  status: true,
});

export const insertReminderSchema = createInsertSchema(reminders).omit({
  id: true,
  reminderSent: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
});

// Quiz request schema for AI generation
export const quizRequestSchema = z.object({
  language: z.enum(["en", "kz", "ru"]),
});

export const quizAnswerSchema = z.object({
  questionIndex: z.number(),
  answer: z.string(),
  interests: z.array(z.string()),
});

// Types
export type Club = typeof clubs.$inferSelect;
export type InsertClub = z.infer<typeof insertClubSchema>;

export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;

export type Reminder = typeof reminders.$inferSelect;
export type InsertReminder = z.infer<typeof insertReminderSchema>;

export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;

export type QuizRequest = z.infer<typeof quizRequestSchema>;
export type QuizAnswer = z.infer<typeof quizAnswerSchema>;
