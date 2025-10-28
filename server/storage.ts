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
        name: "Robotics & LEGO Construction",
        nameKz: "Робототехника және LEGO құрастыру",
        nameRu: "Робототехника и LEGO-конструирование",
        description: "Build and program robots using LEGO, learn engineering and coding",
        descriptionKz: "LEGO арқылы роботтар құрастыру және бағдарламалау, инженерия мен кодтауды үйрену",
        descriptionRu: "Собирайте и программируйте роботов с помощью LEGO, изучайте инженерию и программирование",
        category: "technology",
        ageGroup: "7-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "15:00", duration: 90 },
          { day: "Thursday", time: "15:00", duration: 90 },
        ]),
        maxCapacity: 15,
        location: "IT Лаборатория 1",
        imageUrl: null,
      },
      {
        name: "3D Prototyping & Modeling",
        nameKz: "3D прототиптеу және модельдеу",
        nameRu: "3D-прототипирование и моделирование",
        description: "Create 3D models and prototypes, learn 3D printing technology",
        descriptionKz: "3D модельдер мен прототиптер жасау, 3D басып шығару технологиясын үйрену",
        descriptionRu: "Создавайте 3D модели и прототипы, изучайте технологию 3D печати",
        category: "technology",
        ageGroup: "11-18",
        skillLevel: "intermediate",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "16:00", duration: 90 },
          { day: "Friday", time: "16:00", duration: 90 },
        ]),
        maxCapacity: 12,
        location: "Кабинет 3D-прототипирования",
        imageUrl: null,
      },
      {
        name: "Programming & Web Development",
        nameKz: "Бағдарламалау және веб-әзірлеу",
        nameRu: "Программирование и веб-разработка",
        description: "Learn programming fundamentals, web development, and design",
        descriptionKz: "Бағдарламалаудың негіздерін, веб-әзірлеуді және дизайнды үйрену",
        descriptionRu: "Изучайте основы программирования, веб-разработки и дизайна",
        category: "technology",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Wednesday", time: "15:00", duration: 90 },
          { day: "Saturday", time: "10:00", duration: 120 },
        ]),
        maxCapacity: 20,
        location: "IT Лаборатория 2",
        imageUrl: null,
      },
      {
        name: "Mechatronics",
        nameKz: "Мехатроника",
        nameRu: "Мехатроника",
        description: "Explore mechatronics systems, automation, and robotics engineering",
        descriptionKz: "Мехатроника жүйелерін, автоматтандыруды және робототехника инженериясын зерттеу",
        descriptionRu: "Изучайте мехатронические системы, автоматизацию и инженерию робототехники",
        category: "technology",
        ageGroup: "14-18",
        skillLevel: "advanced",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "17:00", duration: 90 },
          { day: "Thursday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 10,
        location: "Лаборатория мехатроники",
        imageUrl: null,
      },
      {
        name: "Drone Assembly & Programming",
        nameKz: "Дронды құрастыру және бағдарламалау",
        nameRu: "Сборка и программирование дронов",
        description: "Build and program drones, learn flight control systems",
        descriptionKz: "Дрондарды құрастыру және бағдарламалау, ұшу басқару жүйелерін үйрену",
        descriptionRu: "Собирайте и программируйте дроны, изучайте системы управления полетом",
        category: "technology",
        ageGroup: "14-18",
        skillLevel: "intermediate",
        schedule: JSON.stringify([
          { day: "Monday", time: "16:30", duration: 90 },
          { day: "Friday", time: "16:30", duration: 90 },
        ]),
        maxCapacity: 12,
        location: "IT Лаборатория 3",
        imageUrl: null,
      },
      {
        name: "SDR Radio Technology",
        nameKz: "SDR радио технологиясы",
        nameRu: "Радио SDR",
        description: "Software-defined radio programming and wireless communications",
        descriptionKz: "Бағдарламалық анықталған радио бағдарламалау және сымсыз байланыс",
        descriptionRu: "Программирование программно-определяемого радио и беспроводные коммуникации",
        category: "technology",
        ageGroup: "14-18",
        skillLevel: "advanced",
        schedule: JSON.stringify([
          { day: "Wednesday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 10,
        location: "Радиотехническая лаборатория",
        imageUrl: null,
      },
      {
        name: "Biotechnology Lab",
        nameKz: "Биотехнология зертханасы",
        nameRu: "Лаборатория биотехнологий",
        description: "Modern biotechnology research and experiments",
        descriptionKz: "Қазіргі заманғы биотехнология зерттеулері мен тәжірибелері",
        descriptionRu: "Современные биотехнологические исследования и эксперименты",
        category: "science",
        ageGroup: "11-18",
        skillLevel: "intermediate",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "15:00", duration: 90 },
          { day: "Friday", time: "15:00", duration: 90 },
        ]),
        maxCapacity: 15,
        location: "Лаборатория биотехнологий",
        imageUrl: null,
      },
      {
        name: "Hydroponics - Green Business",
        nameKz: "Гидропоника - Жасыл бизнес",
        nameRu: "Гидропоника - Зеленый бизнес",
        description: "Learn hydroponics, sustainable agriculture and green entrepreneurship",
        descriptionKz: "Гидропониканы, тұрақты ауыл шаруашылығын және жасыл кәсіпкерлікті үйрену",
        descriptionRu: "Изучайте гидропонику, устойчивое сельское хозяйство и зеленое предпринимательство",
        category: "science",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "15:00", duration: 90 },
          { day: "Wednesday", time: "15:00", duration: 90 },
        ]),
        maxCapacity: 12,
        location: "Кабинет гидропоники",
        imageUrl: null,
      },
      {
        name: "Ecology & Environmental Science",
        nameKz: "Экология және қоршаған орта ғылымы",
        nameRu: "Экология",
        description: "Environmental research, ecology and sustainability studies",
        descriptionKz: "Қоршаған орта зерттеулері, экология және тұрақтылық зерттеулері",
        descriptionRu: "Исследования окружающей среды, экология и устойчивое развитие",
        category: "science",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Thursday", time: "15:00", duration: 90 },
        ]),
        maxCapacity: 18,
        location: "Кабинет биологии",
        imageUrl: null,
      },
      {
        name: "Art School",
        nameKz: "Өнер мектебі",
        nameRu: "Художественная школа",
        description: "Fine arts, painting, drawing, and creative expression",
        descriptionKz: "Бейнелеу өнері, кескіндеме, сурет салу және шығармашылық көрініс",
        descriptionRu: "Изобразительное искусство, живопись, рисование и творческое самовыражение",
        category: "arts",
        ageGroup: "7-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "15:00", duration: 120 },
          { day: "Thursday", time: "15:00", duration: 120 },
          { day: "Saturday", time: "10:00", duration: 120 },
        ]),
        maxCapacity: 20,
        location: "Художественная мастерская",
        imageUrl: null,
      },
      {
        name: "Decorative & Applied Arts",
        nameKz: "Қолданбалы өнер",
        nameRu: "Декоративно-прикладное творчество",
        description: "Crafts, handiwork, and decorative art techniques",
        descriptionKz: "Қолөнер, қолжұмыс және декоративті өнер техникалары",
        descriptionRu: "Ремесла, рукоделие и техники декоративного искусства",
        category: "arts",
        ageGroup: "7-14",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "15:00", duration: 90 },
          { day: "Wednesday", time: "15:00", duration: 90 },
        ]),
        maxCapacity: 15,
        location: "Мастерская ДПИ",
        imageUrl: null,
      },
      {
        name: "Choreography",
        nameKz: "Хореография",
        nameRu: "Хореография",
        description: "Dance choreography, modern and traditional styles",
        descriptionKz: "Би хореографиясы, заманауи және дәстүрлі стильдер",
        descriptionRu: "Танцевальная хореография, современные и традиционные стили",
        category: "dance",
        ageGroup: "7-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "16:00", duration: 90 },
          { day: "Wednesday", time: "16:00", duration: 90 },
          { day: "Friday", time: "16:00", duration: 90 },
        ]),
        maxCapacity: 25,
        location: "Хореографический зал",
        imageUrl: null,
      },
      {
        name: "Media Journalism",
        nameKz: "Медиа журналистика",
        nameRu: "Медиажурналистика",
        description: "Journalism fundamentals, media writing, and reporting",
        descriptionKz: "Журналистиканың негіздері, медиа жазу және репортаж",
        descriptionRu: "Основы журналистики, медиаписьменность и репортажи",
        category: "media",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "16:00", duration: 90 },
          { day: "Thursday", time: "16:00", duration: 90 },
        ]),
        maxCapacity: 15,
        location: "Медиацентр",
        imageUrl: null,
      },
      {
        name: "Video Production",
        nameKz: "Бейнеөндіріс",
        nameRu: "Видеопроизводство",
        description: "Video filming, editing, and production techniques",
        descriptionKz: "Бейне түсіру, өңдеу және өндіріс техникалары",
        descriptionRu: "Видеосъемка, монтаж и техники производства",
        category: "media",
        ageGroup: "11-18",
        skillLevel: "intermediate",
        schedule: JSON.stringify([
          { day: "Monday", time: "16:00", duration: 90 },
          { day: "Friday", time: "16:00", duration: 90 },
        ]),
        maxCapacity: 12,
        location: "Видеостудия",
        imageUrl: null,
      },
      {
        name: "Photography",
        nameKz: "Фотография",
        nameRu: "Фотография",
        description: "Photography basics, composition, and digital photo editing",
        descriptionKz: "Фотографияның негіздері, композиция және цифрлық фотосуретті өңдеу",
        descriptionRu: "Основы фотографии, композиция и цифровая обработка фото",
        category: "media",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Wednesday", time: "16:00", duration: 90 },
          { day: "Saturday", time: "11:00", duration: 90 },
        ]),
        maxCapacity: 15,
        location: "Фотостудия",
        imageUrl: null,
      },
      {
        name: "Blogging & Digital Content",
        nameKz: "Блогинг және цифрлық мазмұн",
        nameRu: "Блогинг",
        description: "Content creation, blogging, and social media management",
        descriptionKz: "Мазмұн жасау, блогинг және әлеуметтік медиа басқару",
        descriptionRu: "Создание контента, блогинг и управление социальными сетями",
        category: "media",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Thursday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 15,
        location: "Медиацентр",
        imageUrl: null,
      },
      {
        name: "Business School",
        nameKz: "Бизнес мектебі",
        nameRu: "Бизнес школа",
        description: "Entrepreneurship basics, business planning and project design",
        descriptionKz: "Кәсіпкерліктің негіздері, бизнес жоспарлау және жоба жобалау",
        descriptionRu: "Основы предпринимательства, бизнес-планирование и проектирование",
        category: "business",
        ageGroup: "14-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "17:00", duration: 90 },
          { day: "Friday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 20,
        location: "Бизнес-центр",
        imageUrl: null,
      },
      {
        name: "Financial Literacy",
        nameKz: "Қаржылық сауаттылық",
        nameRu: "Финансовая грамотность",
        description: "Learn money management, investing, and financial planning",
        descriptionKz: "Ақша басқаруды, инвестициялауды және қаржылық жоспарлауды үйрену",
        descriptionRu: "Изучайте управление деньгами, инвестирование и финансовое планирование",
        category: "business",
        ageGroup: "14-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Wednesday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 20,
        location: "Бизнес-центр",
        imageUrl: null,
      },
      {
        name: "Debate Club",
        nameKz: "Дебат клубы",
        nameRu: "Дебатный клуб",
        description: "Public speaking, argumentation, and debate techniques",
        descriptionKz: "Көпшілік алдында сөйлеу, дәлелдеу және дебат техникалары",
        descriptionRu: "Ораторское мастерство, аргументация и техники дебатов",
        category: "languages",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "17:00", duration: 90 },
          { day: "Thursday", time: "17:00", duration: 90 },
        ]),
        maxCapacity: 18,
        location: "Актовый зал",
        imageUrl: null,
      },
      {
        name: "KVN Club",
        nameKz: "КВН клубы",
        nameRu: "КВН и юмор",
        description: "Comedy, improvisation, and KVN team training",
        descriptionKz: "Комедия, импровизация және КВН командасын жаттықтыру",
        descriptionRu: "Комедия, импровизация и тренировка команды КВН",
        category: "theater",
        ageGroup: "11-18",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Tuesday", time: "17:30", duration: 90 },
          { day: "Friday", time: "17:30", duration: 90 },
        ]),
        maxCapacity: 20,
        location: "Актовый зал",
        imageUrl: null,
      },
      {
        name: "Entertainment Center",
        nameKz: "Ойын-сауық орталығы",
        nameRu: "Развлекательный центр",
        description: "Interactive games and activities for younger students",
        descriptionKz: "Кіші оқушыларға арналған интерактивті ойындар мен іс-шаралар",
        descriptionRu: "Интерактивные игры и занятия для младших школьников",
        category: "entertainment",
        ageGroup: "7-11",
        skillLevel: "beginner",
        schedule: JSON.stringify([
          { day: "Monday", time: "14:00", duration: 90 },
          { day: "Wednesday", time: "14:00", duration: 90 },
          { day: "Friday", time: "14:00", duration: 90 },
        ]),
        maxCapacity: 30,
        location: "Игровая зона",
        imageUrl: null,
      },
    ];

    sampleClubs.forEach(club => {
      const id = randomUUID();
      this.clubs.set(id, { 
        ...club, 
        id, 
        currentEnrollment: 0,
        nameKz: club.nameKz ?? null,
        nameRu: club.nameRu ?? null,
        descriptionKz: club.descriptionKz ?? null,
        descriptionRu: club.descriptionRu ?? null,
        imageUrl: club.imageUrl ?? null
      });
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
    const club: Club = { 
      ...insertClub, 
      id, 
      currentEnrollment: 0,
      nameKz: insertClub.nameKz ?? null,
      nameRu: insertClub.nameRu ?? null,
      descriptionKz: insertClub.descriptionKz ?? null,
      descriptionRu: insertClub.descriptionRu ?? null,
      imageUrl: insertClub.imageUrl ?? null
    };
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
