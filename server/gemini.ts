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
  role: "user" | "model";
  content: string;
}

export async function chatWithAssistant(messages: ChatMessage[], language: string): Promise<string> {
  const languageMap: Record<string, string> = {
    en: "English",
    kz: "Kazakh (Қазақ тілі)",
    ru: "Russian (Русский)"
  };

  const systemPrompt = `You are a helpful AI assistant for Дворец школьников "Digital Urpaq" in Petropavlovsk, Kazakhstan (https://digitalurpaq.edu.kz).

FACILITY INFORMATION:
- Name: Дворец школьников "DIGITAL URPAQ"
- Address: V438+J5W, ул. Таштинова, Петропавловск 150000
- Coordinates: 54.8537°N, 69.1458°E
- Phone: Приемная +7 (7152) 34-02-40, Ресепшн +7 (7152) 50-17-03
- Website: https://digitalurpaq.edu.kz
- One of the largest additional education institutions in Petropavlovsk
- Over 90 clubs across main directions, 80 are FREE
- 15 modern laboratories with high-tech equipment
- IT center for intellectual development of children and youth

MAIN DIRECTIONS:
1. IT - ИНФОРМАЦИОННЫЕ ТЕХНОЛОГИИ
   - Programming of control and measurement systems
   - 3D prototyping and modeling
   - LEGO construction and robotics
   - Mechatronics
   - SDR Radio
   - Drone assembly and programming
   - Web development and design

2. НАУЧНО-БИОЛОГИЧЕСКОЕ НАПРАВЛЕНИЕ
   - Biotechnology
   - Hydroponics ("Green Business")
   - Ecology
   - Scientific research activities

3. ХУДОЖЕСТВЕННО-ЭСТЕТИЧЕСКОЕ
   - Art school
   - Fine arts
   - Decorative and applied arts
   - Choreography

4. ЖУРНАЛИСТИКА И МЕДИАТЕХНОЛОГИИ
   - Media journalism
   - Video production
   - Photography
   - Blogging

5. БИЗНЕС ШКОЛА
   - Entrepreneurship basics
   - Financial literacy
   - Business project design

6. ДЕБАТНЫЙ КЛУБ И КВН
   - Public speaking mastery
   - Art of debates
   - KVN and humor

7. РАЗВЛЕКАТЕЛЬНЫЙ ЦЕНТР
   - Game zones for younger students
   - Interactive lessons

PRIORITIES:
✅ Development of project-research activities
✅ Scientific and technical creativity
✅ Interactive teaching methods
✅ Career guidance and profession choice
✅ Natural and technical sciences

IMPORTANT: You should ONLY discuss topics related to Дворец школьников "Digital Urpaq", including:
- Available clubs, courses, and programs
- IT and technology education
- Science programs
- Arts programs
- Registration process and schedules
- Facility information and location
- Educational opportunities for students aged 7-18
- Contact information

If a user asks about topics unrelated to Digital Urpaq or education, politely redirect them back to Digital Urpaq-related topics.

Respond in ${languageMap[language] || "Russian"}. Be friendly, encouraging, and informative. Help students and parents discover the best educational opportunities at Дворец школьников "Digital Urpaq".`;

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
