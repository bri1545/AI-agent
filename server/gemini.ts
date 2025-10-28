import { GoogleGenAI } from "@google/genai";

// Blueprint reference: javascript_gemini integration
// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface QuizQuestion {
  question: string;
  options: { text: string; interests: string[] }[];
}

export async function generateInterestQuiz(language: string): Promise<{ questions: QuizQuestion[] }> {
  const systemPrompt = `You are an expert in educational psychology and club/activity recommendation for children aged 7-18 at Digitalurpaq in Petropavlovsk, Kazakhstan.
Generate 5 engaging quiz questions to understand a student's interests and recommend appropriate clubs.

Available club categories: sports, arts, science, music, technology, languages, dance, theater

Each question should have 4 options, and each option should be tagged with relevant interest keywords.
The questions should be appropriate for the age group and culturally sensitive.

Respond in JSON format with this structure:
{
  "questions": [
    {
      "question": "What do you enjoy doing in your free time?",
      "options": [
        {"text": "Playing sports", "interests": ["sports", "physical", "teamwork"]},
        {"text": "Drawing and painting", "interests": ["arts", "creative", "visual"]},
        {"text": "Building things", "interests": ["science", "technology", "hands-on"]},
        {"text": "Playing music", "interests": ["music", "creative", "performance"]}
      ]
    }
  ]
}`;

  const languageMap: Record<string, string> = {
    en: "English",
    kz: "Kazakh (Қазақ тілі)",
    ru: "Russian (Русский)"
  };

  const userPrompt = `Generate 5 interest quiz questions in ${languageMap[language] || "English"} for students at Digitalurpaq.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string" },
                        interests: {
                          type: "array",
                          items: { type: "string" }
                        }
                      },
                      required: ["text", "interests"]
                    }
                  }
                },
                required: ["question", "options"]
              }
            }
          },
          required: ["questions"]
        }
      },
      contents: userPrompt,
    });

    const rawJson = response.text;
    if (rawJson) {
      return JSON.parse(rawJson);
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error(`Failed to generate quiz: ${error}`);
  }
}

export async function recommendClubs(interests: string[], availableClubs: any[]): Promise<{ clubId: string; matchPercentage: number }[]> {
  const systemPrompt = `You are an AI assistant that matches student interests to appropriate clubs at Digitalurpaq in Petropavlovsk, Kazakhstan.
Based on the student's interests and the available clubs, calculate match percentages (0-100) for each club.

Consider:
- Direct interest matches (higher weight)
- Related/complementary interests
- Age appropriateness
- Skill level progression

Return a JSON array of recommendations with club IDs and match percentages, sorted by match percentage (highest first).
Only include clubs with match percentage >= 40%.

Response format:
{
  "recommendations": [
    {"clubId": "club-id-1", "matchPercentage": 95},
    {"clubId": "club-id-2", "matchPercentage": 78}
  ]
}`;

  const userPrompt = `Student interests: ${interests.join(", ")}

Available clubs:
${availableClubs.map(club => `ID: ${club.id}, Name: ${club.name}, Category: ${club.category}, Description: ${club.description}, Age Group: ${club.ageGroup}, Skill Level: ${club.skillLevel}`).join("\n")}

Calculate match percentages for each club.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            recommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  clubId: { type: "string" },
                  matchPercentage: { type: "number" }
                },
                required: ["clubId", "matchPercentage"]
              }
            }
          },
          required: ["recommendations"]
        }
      },
      contents: userPrompt,
    });

    const rawJson = response.text;
    if (rawJson) {
      const result = JSON.parse(rawJson);
      return result.recommendations;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error(`Failed to generate recommendations: ${error}`);
  }
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function chatWithAssistant(messages: ChatMessage[], language: string): Promise<string> {
  const languageMap: Record<string, string> = {
    en: "English",
    kz: "Kazakh (Қазақ тілі)",
    ru: "Russian (Русский)"
  };

  const systemPrompt = `You are a helpful AI assistant for Digitalurpaq in Petropavlovsk, Kazakhstan (https://digitalurpaq.edu.kz).

IMPORTANT: You should ONLY discuss topics related to Digitalurpaq, including:
- Available clubs, courses, and programs at Digitalurpaq
- IT and technology education (programming, robotics, 3D prototyping, etc.)
- Science programs (biotechnology, chemistry, biology)
- Arts programs (theater, choreography, music, journalism)
- Registration process and schedules
- Facility information and location (ул. Таштинова, Петропавловск 150000)
- Educational opportunities for students aged 7-18
- Contact information and working hours

If a user asks about topics unrelated to Digitalurpaq or education, politely redirect them back to Digitalurpaq-related topics.

Respond in ${languageMap[language] || "Russian"}. Be friendly, encouraging, and informative. Help students and parents discover the best educational opportunities at Digitalurpaq.`;

  try {
    const chatHistory = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      },
      contents: chatHistory,
    });

    const assistantResponse = response.text;
    if (assistantResponse) {
      return assistantResponse;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Error in chat:", error);
    throw new Error(`Failed to generate chat response: ${error}`);
  }
}
