import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      rules: "Rules",
      schedule: "Schedule",
      registration: "Registration",
      contacts: "Contacts",
      behaviorGuidelines: "Behavior Guidelines",
      languageSettings: "Language Settings",
      about: "About",
      
      // Home page
      welcome: "Welcome to Digitalurpaq",
      findYourClub: "Find Your Perfect Club",
      exploreClubs: "Explore what interests you!",
      checkSchedule: "Check your schedule today!",
      readyToDiscover: "Ready to find your perfect club?",
      
      // Quick actions
      viewRules: "View Rules",
      rulesDesc: "Learn about our guidelines and policies",
      viewSchedule: "View Schedule",
      scheduleDesc: "Check your activities and upcoming events",
      registerNow: "Register Now",
      registerDesc: "Sign up for clubs and activities",
      contactUs: "Contact Us",
      contactDesc: "Get in touch with our team",
      
      // Quiz
      takeQuiz: "Take Interest Quiz",
      quizTitle: "Let's Find Your Perfect Club!",
      quizDesc: "Answer a few questions to get personalized recommendations",
      startQuiz: "Start Quiz",
      nextQuestion: "Next",
      previousQuestion: "Back",
      notSure: "I'm not sure",
      viewResults: "View Results",
      quizProgress: "Question {{current}} of {{total}}",
      
      // Recommendations
      recommendedForYou: "Recommended For You",
      matchPercentage: "{{percent}}% Match",
      learnMore: "Learn More",
      registerForClub: "Register for This Club",
      
      // Clubs
      allClubs: "All Clubs",
      clubCategories: "Categories",
      sports: "Sports",
      arts: "Arts",
      science: "Science",
      music: "Music",
      technology: "Technology",
      languages: "Languages",
      dance: "Dance",
      theater: "Theater",
      
      // Registration
      registrationForm: "Registration Form",
      studentName: "Student Name",
      studentAge: "Student Age",
      parentContact: "Parent Contact",
      selectTimeSlot: "Select Time Slot",
      confirmRegistration: "Confirm Registration",
      registrationSuccess: "Registration Successful!",
      registrationComplete: "You've been registered successfully",
      
      // Schedule
      mySchedule: "My Schedule",
      upcomingActivities: "Upcoming Activities",
      todaySchedule: "Today's Schedule",
      noActivities: "No activities scheduled",
      
      // Map
      viewLocation: "View Location",
      virtualTour: "Virtual Tour",
      getDirections: "Get Directions",
      
      // Reminders
      reminder: "Reminder",
      startsIn30Min: "Starts in 30 minutes",
      viewDetails: "View Details",
      
      // Chat
      chat: "AI Chat",
      chatWithAssistant: "Chat with AI Assistant",
      askAboutDigitalurpaq: "Ask me anything about Digital Urpaq",
      typeYourMessage: "Type your message...",
      
      // Common
      loading: "Loading...",
      error: "Error",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      submit: "Submit",
      back: "Back",
      next: "Next",
      finish: "Finish",
      quickAccess: "Quick Access",
      enrolled: "enrolled",
      student: "Student",
      searchClubs: "Search clubs...",
      noClubsFound: "No clubs found",
      clubNotFound: "Club not found",
      basedOnYourInterests: "Based on your interests",
      viewAllClubs: "View All Clubs",
      registerToSeeSchedule: "Register for clubs to see your schedule",
      
      // Rules page
      rulesItem1: "Be respectful to all students, teachers, and staff members",
      rulesItem2: "Arrive on time for all scheduled activities and classes",
      rulesItem3: "Bring required materials and equipment for your club activities",
      rulesItem4: "Follow safety guidelines and instructions from instructors",
      rulesItem5: "Keep the Palace of Schoolchildren clean and well-maintained",
      rulesItem6: "No running in hallways or common areas",
      rulesItem7: "Mobile phones should be on silent during activities",
      rulesItem8: "Report any accidents or injuries to staff immediately",
      rulesItem9: "Respect others' belongings and personal space",
      rulesItem10: "Have fun and enjoy learning new skills!",
      
      // Behavior Guidelines
      behaviorRespectTitle: "Respect and Kindness",
      behaviorRespectDesc: "Treat everyone with kindness, empathy, and respect. We celebrate diversity and create an inclusive environment for all.",
      behaviorSafetyTitle: "Safety First",
      behaviorSafetyDesc: "Your safety is our priority. Follow all safety rules, report concerns, and help create a secure environment.",
      behaviorExcellenceTitle: "Excellence and Effort",
      behaviorExcellenceDesc: "Strive for your personal best. We value effort, growth, and dedication in all activities.",
      behaviorResponsibilityTitle: "Responsibility",
      behaviorResponsibilityDesc: "Take ownership of your actions, attendance, and learning. Be accountable and reliable.",
      behaviorSubtitle: "Our values and expectations for all community members",
      
      // Contacts
      contactPhone: "Phone",
      contactEmail: "Email",
      contactAddress: "Address",
      contactHours: "Working Hours",
      contactPhoneValue: "Reception: +7 (7152) 34-02-40, Front Desk: +7 (7152) 50-17-03",
      contactEmailValue: "dvorecsko@sqo.gov.kz",
      contactAddressValue: "V438+J5W, Tashtinova street, Petropavlovsk 150000",
      contactHoursValue: "Mon-Fri: 09:00-20:10 (break 12:00-15:00), Sat-Sun: 9:00-18:00",
      
      // Settings
      settingsSubtitle: "Choose your preferred language",
      settingsLanguageLabel: "Language / Тіл / Язык",
      settingsNote: "The interface will automatically update to your selected language",
      clickToOpenMap: "Click to open in Google Maps",
    }
  },
  kz: {
    translation: {
      // Navigation
      home: "Басты бет",
      rules: "Ережелер",
      schedule: "Кесте",
      registration: "Тіркелу",
      contacts: "Байланыс",
      behaviorGuidelines: "Мінез-құлық ережелері",
      languageSettings: "Тіл параметрлері",
      about: "Біз туралы",
      
      // Home page
      welcome: "Digitalurpaq-қа қош келдіңіз",
      findYourClub: "Өзіңізге ұнайтын үйірме табыңыз",
      exploreClubs: "Сізді қызықтыратын нәрселерді зерттеңіз!",
      checkSchedule: "Бүгінгі кестені қараңыз!",
      readyToDiscover: "Өзіңізге керек үйірмені табуға дайынсыз ба?",
      
      // Quick actions
      viewRules: "Ережелерді қарау",
      rulesDesc: "Біздің нұсқаулықтар мен ережелер туралы біліңіз",
      viewSchedule: "Кестені қарау",
      scheduleDesc: "Өз іс-шараларыңыз бен алдағы оқиғаларды тексеріңіз",
      registerNow: "Қазір тіркелу",
      registerDesc: "Үйірмелер мен іс-шараларға жазылыңыз",
      contactUs: "Бізбен байланысу",
      contactDesc: "Біздің командамызбен байланысыңыз",
      
      // Quiz
      takeQuiz: "Қызығушылық сауалнамасын өтіңіз",
      quizTitle: "Сізге қолайлы үйірмені табайық!",
      quizDesc: "Жеке ұсыныстарды алу үшін бірнеше сұраққа жауап беріңіз",
      startQuiz: "Сауалнаманы бастау",
      nextQuestion: "Келесі",
      previousQuestion: "Артқа",
      notSure: "Білмеймін",
      viewResults: "Нәтижелерді қарау",
      quizProgress: "Сұрақ {{current}} / {{total}}",
      
      // Recommendations
      recommendedForYou: "Сізге ұсынылған",
      matchPercentage: "{{percent}}% сәйкестік",
      learnMore: "Толығырақ",
      registerForClub: "Бұл үйірмеге тіркелу",
      
      // Clubs
      allClubs: "Барлық үйірмелер",
      clubCategories: "Санаттар",
      sports: "Спорт",
      arts: "Өнер",
      science: "Ғылым",
      music: "Музыка",
      technology: "Технология",
      languages: "Тілдер",
      dance: "Би",
      theater: "Театр",
      
      // Registration
      registrationForm: "Тіркеу нысаны",
      studentName: "Оқушының аты-жөні",
      studentAge: "Оқушының жасы",
      parentContact: "Ата-ананың байланысы",
      selectTimeSlot: "Уақытты таңдаңыз",
      confirmRegistration: "Тіркелуді растау",
      registrationSuccess: "Тіркелу сәтті өтті!",
      registrationComplete: "Сіз сәтті тіркелдіңіз",
      
      // Schedule
      mySchedule: "Менің кестем",
      upcomingActivities: "Алдағы іс-шаралар",
      todaySchedule: "Бүгінгі кесте",
      noActivities: "Жоспарланған іс-шаралар жоқ",
      
      // Map
      viewLocation: "Орынды қарау",
      virtualTour: "Виртуалды тур",
      getDirections: "Бағыт алу",
      
      // Reminders
      reminder: "Еске салу",
      startsIn30Min: "30 минуттан кейін басталады",
      viewDetails: "Толығырақ қарау",
      
      // Chat
      chat: "AI Чат",
      chatWithAssistant: "AI көмекшісімен сөйлесу",
      askAboutDigitalurpaq: "Digital Urpaq туралы кез келген нәрсе сұраңыз",
      typeYourMessage: "Хабарламаңызды теріңіз...",
      
      // Common
      loading: "Жүктелуде...",
      error: "Қате",
      save: "Сақтау",
      cancel: "Бас тарту",
      close: "Жабу",
      submit: "Жіберу",
      back: "Артқа",
      next: "Келесі",
      finish: "Аяқтау",
      quickAccess: "Жылдам қол жеткізу",
      enrolled: "тіркелген",
      student: "Оқушы",
      searchClubs: "Үйірмелерді іздеу...",
      noClubsFound: "Үйірмелер табылмады",
      clubNotFound: "Үйірме табылмады",
      basedOnYourInterests: "Сіздің қызығушылықтарыңызға сүйене отырып",
      viewAllClubs: "Барлық үйірмелерді қарау",
      registerToSeeSchedule: "Кестені көру үшін үйірмелерге тіркеліңіз",
      
      // Rules page
      rulesItem1: "Барлық оқушыларға, мұғалімдерге және қызметкерлерге құрметпен қараңыз",
      rulesItem2: "Барлық жоспарланған іс-шараларға және сабақтарға уақытында келіңіз",
      rulesItem3: "Үйірме іс-шараларына қажетті материалдар мен жабдықтарды алып келіңіз",
      rulesItem4: "Қауіпсіздік ережелері мен нұсқаулықтарды орындаңыз",
      rulesItem5: "Оқушылар сарайын таза және жақсы күйде ұстаңыз",
      rulesItem6: "Дәліздерде немесе жалпы аймақтарда жүгірмеңіз",
      rulesItem7: "Іс-шаралар кезінде ұялы телефондар үнсіз режимде болуы керек",
      rulesItem8: "Кез келген жазатайым оқиғалар немесе жарақаттар туралы дереу қызметкерлерге хабарлаңыз",
      rulesItem9: "Басқалардың заттары мен жеке кеңістігін құрметтеңіз",
      rulesItem10: "Көңіл көтеріп, жаңа дағдыларды үйренуден ләззат алыңыз!",
      
      // Behavior Guidelines
      behaviorRespectTitle: "Құрмет және мейірімділік",
      behaviorRespectDesc: "Барлығына мейірімділікпен, эмпатиямен және құрметпен қараңыз. Біз әртүрлілікті тойлаймыз және барлығы үшін инклюзивті орта жасаймыз.",
      behaviorSafetyTitle: "Қауіпсіздік бірінші",
      behaviorSafetyDesc: "Сіздің қауіпсіздігіңіз біздің басымдығымыз. Барлық қауіпсіздік ережелерін орындаңыз, алаңдаушылық туралы хабарлаңыз және қауіпсіз орта құруға көмектесіңіз.",
      behaviorExcellenceTitle: "Үздік нәтиже және күш салу",
      behaviorExcellenceDesc: "Өзіңіздің ең жақсы нәтижеңізге ұмтылыңыз. Біз барлық іс-шараларда күш салу, өсу және адалдықты бағалаймыз.",
      behaviorResponsibilityTitle: "Жауапкершілік",
      behaviorResponsibilityDesc: "Өз әрекеттеріңіз, қатысуыңыз және оқуыңыз үшін жауапкершілік алыңыз. Жауапты және сенімді болыңыз.",
      behaviorSubtitle: "Барлық қоғамдастық мүшелері үшін біздің құндылықтарымыз және күтулеріміз",
      
      // Contacts
      contactPhone: "Телефон",
      contactEmail: "Электрондық пошта",
      contactAddress: "Мекенжай",
      contactHours: "Жұмыс уақыты",
      contactPhoneValue: "Қабылдау: +7 (7152) 34-02-40, Ресепшн: +7 (7152) 50-17-03",
      contactEmailValue: "dvorecsko@sqo.gov.kz",
      contactAddressValue: "V438+J5W, Таштинова көшесі, Петропавл 150000",
      contactHoursValue: "Дс-Жм: 09:00-20:10 (үзіліс 12:00-15:00), Сб-Жс: 9:00-18:00",
      
      // Settings
      settingsSubtitle: "Өзіңіз үшін ыңғайлы тілді таңдаңыз",
      settingsLanguageLabel: "Language / Тіл / Язык",
      settingsNote: "Интерфейс таңдалған тілге автоматты түрде жаңартылады",
      clickToOpenMap: "Google Maps ашу үшін басыңыз",
    }
  },
  ru: {
    translation: {
      // Navigation
      home: "Главная",
      rules: "Правила",
      schedule: "Расписание",
      registration: "Регистрация",
      contacts: "Контакты",
      behaviorGuidelines: "Правила поведения",
      languageSettings: "Языковые настройки",
      about: "О нас",
      
      // Home page
      welcome: "Добро пожаловать в Digitalurpaq",
      findYourClub: "Найдите свой идеальный кружок",
      exploreClubs: "Исследуйте то, что вас интересует!",
      checkSchedule: "Проверьте свое расписание сегодня!",
      readyToDiscover: "Готовы найти свой идеальный кружок?",
      
      // Quick actions
      viewRules: "Просмотр правил",
      rulesDesc: "Узнайте о наших правилах и политиках",
      viewSchedule: "Просмотр расписания",
      scheduleDesc: "Проверьте свои занятия и предстоящие события",
      registerNow: "Зарегистрироваться",
      registerDesc: "Запишитесь в кружки и секции",
      contactUs: "Связаться с нами",
      contactDesc: "Свяжитесь с нашей командой",
      
      // Quiz
      takeQuiz: "Пройти тест интересов",
      quizTitle: "Давайте найдем ваш идеальный кружок!",
      quizDesc: "Ответьте на несколько вопросов, чтобы получить персональные рекомендации",
      startQuiz: "Начать тест",
      nextQuestion: "Далее",
      previousQuestion: "Назад",
      notSure: "Не уверен",
      viewResults: "Посмотреть результаты",
      quizProgress: "Вопрос {{current}} из {{total}}",
      
      // Recommendations
      recommendedForYou: "Рекомендовано для вас",
      matchPercentage: "{{percent}}% совпадение",
      learnMore: "Узнать больше",
      registerForClub: "Записаться в этот кружок",
      
      // Clubs
      allClubs: "Все кружки",
      clubCategories: "Категории",
      sports: "Спорт",
      arts: "Искусство",
      science: "Наука",
      music: "Музыка",
      technology: "Технология",
      languages: "Языки",
      dance: "Танцы",
      theater: "Театр",
      
      // Registration
      registrationForm: "Форма регистрации",
      studentName: "Имя ученика",
      studentAge: "Возраст ученика",
      parentContact: "Контакт родителя",
      selectTimeSlot: "Выберите время",
      confirmRegistration: "Подтвердить регистрацию",
      registrationSuccess: "Регистрация успешна!",
      registrationComplete: "Вы успешно зарегистрировались",
      
      // Schedule
      mySchedule: "Мое расписание",
      upcomingActivities: "Предстоящие занятия",
      todaySchedule: "Расписание на сегодня",
      noActivities: "Нет запланированных занятий",
      
      // Map
      viewLocation: "Посмотреть местоположение",
      virtualTour: "Виртуальный тур",
      getDirections: "Получить направление",
      
      // Reminders
      reminder: "Напоминание",
      startsIn30Min: "Начинается через 30 минут",
      viewDetails: "Подробнее",
      
      // Chat
      chat: "AI Чат",
      chatWithAssistant: "Чат с AI помощником",
      askAboutDigitalurpaq: "Спросите меня о Digital Urpaq",
      typeYourMessage: "Введите ваше сообщение...",
      
      // Common
      loading: "Загрузка...",
      error: "Ошибка",
      save: "Сохранить",
      cancel: "Отмена",
      close: "Закрыть",
      submit: "Отправить",
      back: "Назад",
      next: "Далее",
      finish: "Завершить",
      quickAccess: "Быстрый доступ",
      enrolled: "записано",
      student: "Ученик",
      searchClubs: "Поиск кружков...",
      noClubsFound: "Кружки не найдены",
      clubNotFound: "Кружок не найден",
      basedOnYourInterests: "На основе ваших интересов",
      viewAllClubs: "Посмотреть все кружки",
      registerToSeeSchedule: "Зарегистрируйтесь в кружках, чтобы увидеть расписание",
      
      // Rules page
      rulesItem1: "Будьте уважительны ко всем ученикам, учителям и сотрудникам",
      rulesItem2: "Приходите вовремя на все запланированные занятия и мероприятия",
      rulesItem3: "Приносите необходимые материалы и оборудование для занятий в кружке",
      rulesItem4: "Следуйте правилам безопасности и инструкциям преподавателей",
      rulesItem5: "Поддерживайте чистоту и порядок во Дворце школьников",
      rulesItem6: "Не бегайте в коридорах и общих зонах",
      rulesItem7: "Мобильные телефоны должны быть на беззвучном режиме во время занятий",
      rulesItem8: "Немедленно сообщайте сотрудникам о любых несчастных случаях или травмах",
      rulesItem9: "Уважайте чужие вещи и личное пространство",
      rulesItem10: "Получайте удовольствие и наслаждайтесь изучением новых навыков!",
      
      // Behavior Guidelines
      behaviorRespectTitle: "Уважение и доброта",
      behaviorRespectDesc: "Относитесь ко всем с добротой, эмпатией и уважением. Мы ценим разнообразие и создаем инклюзивную среду для всех.",
      behaviorSafetyTitle: "Безопасность прежде всего",
      behaviorSafetyDesc: "Ваша безопасность - наш приоритет. Следуйте всем правилам безопасности, сообщайте о проблемах и помогайте создавать безопасную среду.",
      behaviorExcellenceTitle: "Превосходство и усилия",
      behaviorExcellenceDesc: "Стремитесь к лучшему результату. Мы ценим усилия, рост и преданность во всех мероприятиях.",
      behaviorResponsibilityTitle: "Ответственность",
      behaviorResponsibilityDesc: "Берите на себя ответственность за свои действия, посещаемость и обучение. Будьте подотчетны и надежны.",
      behaviorSubtitle: "Наши ценности и ожидания для всех членов сообщества",
      
      // Contacts
      contactPhone: "Телефон",
      contactEmail: "Email",
      contactAddress: "Адрес",
      contactHours: "Часы работы",
      contactPhoneValue: "Приемная: +7 (7152) 34-02-40, Ресепшн: +7 (7152) 50-17-03",
      contactEmailValue: "dvorecsko@sqo.gov.kz",
      contactAddressValue: "V438+J5W, ул. Таштинова, Петропавловск 150000",
      contactHoursValue: "Пн-Пт: 09:00-20:10 (перерыв 12:00-15:00), Сб-Вс: 9:00-18:00",
      
      // Settings
      settingsSubtitle: "Выберите предпочитаемый язык",
      settingsLanguageLabel: "Language / Тіл / Язык",
      settingsNote: "Интерфейс автоматически обновится на выбранный язык",
      clickToOpenMap: "Нажмите, чтобы открыть в Google Maps",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
