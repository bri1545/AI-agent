import { randomUUID } from "crypto";
import type {
  Club,
  InsertClub,
  Registration,
  InsertRegistration,
  Reminder,
  InsertReminder,
  QuizResponse,
  InsertQuizResponse,
} from "@shared/schema";

export interface IStorage {
  // Clubs
  getAllClubs(): Promise<Club[]>;
  getClubById(id: string): Promise<Club | undefined>;
  createClub(club: InsertClub): Promise<Club>;
  updateClubEnrollment(clubId: string, delta: number): Promise<void>;
  
  // Registrations
  getAllRegistrations(): Promise<Registration[]>;
  getRegistrationById(id: string): Promise<Registration | undefined>;
  getRegistrationsByClubId(clubId: string): Promise<Registration[]>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  updateRegistrationStatus(id: string, status: string): Promise<void>;
  
  // Reminders
  createReminder(reminder: InsertReminder): Promise<Reminder>;
  getPendingReminders(): Promise<Reminder[]>;
  markReminderSent(id: string): Promise<void>;
  
  // Quiz Responses
  createQuizResponse(quizResponse: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponseBySessionId(sessionId: string): Promise<QuizResponse | undefined>;
}

export class MemStorage implements IStorage {
  private clubs: Map<string, Club>;
  private registrations: Map<string, Registration>;
  private reminders: Map<string, Reminder>;
  private quizResponses: Map<string, QuizResponse>;

  constructor() {
    this.clubs = new Map();
    this.registrations = new Map();
    this.reminders = new Map();
    this.quizResponses = new Map();
    
    // Initialize with sample clubs
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleClubs: InsertClub[] = [
      {
        name: "Basketball Club",
        nameKz: "Баскетбол үйірмесі",
        nameRu: "Кружок баскетбола",
        description: "Learn basketball fundamentals, teamwork, and competitive play",
        descriptionKz: "Баскетболдың негіздерін, топтық жұмысты және бәсекелес ойынды үйреніңіз",
        descriptionRu: "Изучите основы баскетбола, командную работу и соревновательную игру",
        category: "sports",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "16:00", duration: 90 },
          { day: "Wednesday", time: "16:00", duration: 90 },
        ]),
        maxCapacity: 20,
        location: "Sports Hall A",
        imageUrl: null,
      },
      {
        name: "Art Studio",
        nameKz: "Өнер студиясы",
        nameRu: "Художественная студия",
        description: "Explore painting, drawing, and creative expression",
        descriptionKz: "Кескіндемені, сызбаны және шығармашылық өрнекті зерттеңіз",
        descriptionRu: "Исследуйте живопись, рисование и творческое самовыражение",
        category: "arts",
        ageGroup: "7-14",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "15:00", duration: 120 },
          { day: "Thursday", time: "15:00", duration: 120 },
        ]),
        maxCapacity: 15,
        location: "Room 201",
        imageUrl: null,
      },
      {
        name: "Robotics Lab",
        nameKz: "Робототехника зертханасы",
        nameRu: "Лаборатория робототехники",
        description: "Build and program robots, learn engineering principles",
        descriptionKz: "Роботтарды құрастырыңыз және бағдарламалаңыз, инженерлік принциптерді үйреніңіз",
        descriptionRu: "Создавайте и программируйте роботов, изучайте инженерные принципы",
        category: "technology",
        ageGroup: "11-18",
        skillLevel: "intermediate",
        schedule: JSON.stringify([
          { day: "Wednesday", time: "17:00", duration: 90 },
          { day: "Friday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 12,
        location: "Tech Lab 1",
        imageUrl: null,
      },
      {
        name: "Piano Lessons",
        nameKz: "Фортепиано сабақтары",
        nameRu: "Уроки фортепиано",
        description: "Individual and group piano instruction for all levels",
        descriptionKz: "Барлық деңгейлер үшін жеке және топтық фортепиано сабақтары",
        descriptionRu: "Индивидуальные и групповые уроки фортепиано для всех уровней",
        category: "music",
        ageGroup: "7-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "14:00", duration: 60 },
          { day: "Wednesday", time: "14:00", duration: 60 },
          { day: "Friday", time: "14:00", duration: 60 },
        ]),
        maxCapacity: 10,
        location: "Music Room 1",
        imageUrl: null,
      },
      {
        name: "Science Explorers",
        nameKz: "Ғылым зерттеушілері",
        nameRu: "Исследователи науки",
        description: "Hands-on experiments and scientific discovery",
        descriptionKz: "Практикалық тәжірибелер және ғылыми жаңалықтар",
        descriptionRu: "Практические эксперименты и научные открытия",
        category: "science",
        ageGroup: "7-14",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "16:00", duration: 90 },
          { day: "Thursday", time: "16:00", duration: 90 },
        ]),
        maxCapacity: 18,
        location: "Science Lab",
        imageUrl: null,
      },
      {
        name: "Dance Academy",
        nameKz: "Би академиясы",
        nameRu: "Академия танца",
        description: "Modern and traditional dance styles, choreography",
        descriptionKz: "Заманауи және дәстүрлі би стильдері, хореография",
        descriptionRu: "Современные и традиционные танцевальные стили, хореография",
        category: "dance",
        ageGroup: "7-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "17:00", duration: 90 },
          { day: "Thursday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 25,
        location: "Dance Studio",
        imageUrl: null,
      },
    ];

    sampleClubs.forEach(club => {
      const id = randomUUID();
      this.clubs.set(id, { ...club, id, currentEnrollment: 0 });
    });
  }

  // Clubs
  async getAllClubs(): Promise<Club[]> {
    return Array.from(this.clubs.values());
  }

  async getClubById(id: string): Promise<Club | undefined> {
    return this.clubs.get(id);
  }

  async createClub(insertClub: InsertClub): Promise<Club> {
    const id = randomUUID();
    const club: Club = { ...insertClub, id, currentEnrollment: 0 };
    this.clubs.set(id, club);
    return club;
  }

  async updateClubEnrollment(clubId: string, delta: number): Promise<void> {
    const club = this.clubs.get(clubId);
    if (club) {
      club.currentEnrollment += delta;
      this.clubs.set(clubId, club);
    }
  }

  // Registrations
  async getAllRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values());
  }

  async getRegistrationById(id: string): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }

  async getRegistrationsByClubId(clubId: string): Promise<Registration[]> {
    return Array.from(this.registrations.values()).filter(
      (reg) => reg.clubId === clubId
    );
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registration: Registration = {
      ...insertRegistration,
      id,
      registeredAt: new Date(),
      status: "active",
    };
    this.registrations.set(id, registration);
    
    // Update club enrollment
    await this.updateClubEnrollment(insertRegistration.clubId, 1);
    
    return registration;
  }

  async updateRegistrationStatus(id: string, status: string): Promise<void> {
    const registration = this.registrations.get(id);
    if (registration) {
      const oldStatus = registration.status;
      registration.status = status;
      this.registrations.set(id, registration);
      
      // Update club enrollment if status changes to/from active
      if (oldStatus === "active" && status !== "active") {
        await this.updateClubEnrollment(registration.clubId, -1);
      } else if (oldStatus !== "active" && status === "active") {
        await this.updateClubEnrollment(registration.clubId, 1);
      }
    }
  }

  // Reminders
  async createReminder(insertReminder: InsertReminder): Promise<Reminder> {
    const id = randomUUID();
    const reminder: Reminder = {
      ...insertReminder,
      id,
      reminderSent: false,
    };
    this.reminders.set(id, reminder);
    return reminder;
  }

  async getPendingReminders(): Promise<Reminder[]> {
    const now = new Date();
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
    
    return Array.from(this.reminders.values()).filter(
      (reminder) =>
        !reminder.reminderSent &&
        reminder.activityDate <= thirtyMinutesFromNow &&
        reminder.activityDate > now
    );
  }

  async markReminderSent(id: string): Promise<void> {
    const reminder = this.reminders.get(id);
    if (reminder) {
      reminder.reminderSent = true;
      this.reminders.set(id, reminder);
    }
  }

  // Quiz Responses
  async createQuizResponse(insertQuizResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = randomUUID();
    const quizResponse: QuizResponse = {
      ...insertQuizResponse,
      id,
      createdAt: new Date(),
    };
    this.quizResponses.set(id, quizResponse);
    return quizResponse;
  }

  async getQuizResponseBySessionId(sessionId: string): Promise<QuizResponse | undefined> {
    return Array.from(this.quizResponses.values()).find(
      (response) => response.sessionId === sessionId
    );
  }
}

export const storage = new MemStorage();
