# Дворец школьников "Digital Urpaq" - Petropavlovsk

## Project Overview
An interactive web application for Дворец школьников "Digital Urpaq" (Цифровой Урпақ) in Petropavlovsk, Kazakhstan. Features an AI-powered assistant that helps students discover clubs, take interest quizzes, chat with AI about programs, register for activities, and navigate the facility.

## Facility Information
- **Name**: Дворец школьников "DIGITAL URPAQ"
- **Website**: https://digitalurpaq.edu.kz
- **Location**: Petropavlovsk, Kazakhstan
- **Address**: V438+J5W, ул. Таштинова, Петропавловск 150000
- **Coordinates**: 54.8537°N, 69.1458°E
- **Google Maps**: https://www.google.com/maps/place/54.8537,69.1458
- **Phone**: Приемная: +7 (7152) 34-02-40, Ресепшн: +7 (7152) 50-17-03
- **Description**: One of the largest institutions of additional education in Petropavlovsk with over 90 clubs across main directions, 80 of which are FREE
- **Facilities**: 15 modern laboratories with high-tech equipment
- **IT Center**: For intellectual development of children and youth

## Key Features
1. **AI Chat Assistant** - Full conversational AI chat focused on Digitalurpaq topics (NEW!)
2. **Animated Assistant Character** - Friendly mascot with idle animations and motivational speech bubbles
3. **Multi-Language Support** - Full internationalization in English, Kazakh, and Russian
4. **AI-Powered Interest Quiz** - Uses Gemini AI to generate personalized club recommendations
5. **Club Discovery** - Browse and search clubs by category with detailed information
6. **Registration System** - Register for clubs with scheduling and conflict detection
7. **Interactive Schedule** - Calendar view with 30-minute advance reminders
8. **Google Maps Integration** - Virtual tours and directions to the facility (updated to new location)
9. **Responsive Design** - Works on desktop, tablet, and mobile devices

## Main Directions

### 1. IT - ИНФОРМАЦИОННЫЕ ТЕХНОЛОГИИ
- Programming of control and measurement systems
- 3D prototyping and modeling
- LEGO construction and robotics
- Mechatronics
- SDR Radio
- Drone assembly and programming
- Web development and design

### 2. НАУЧНО-БИОЛОГИЧЕСКОЕ НАПРАВЛЕНИЕ
- Biotechnology
- Hydroponics ("Green Business")
- Ecology
- Scientific research activities

### 3. ХУДОЖЕСТВЕННО-ЭСТЕТИЧЕСКОЕ
- Art school
- Fine arts
- Decorative and applied arts
- Choreography

### 4. ЖУРНАЛИСТИКА И МЕДИАТЕХНОЛОГИИ
- Media journalism
- Video production
- Photography
- Blogging

### 5. БИЗНЕС ШКОЛА
- Entrepreneurship basics
- Financial literacy
- Business project design

### 6. ДЕБАТНЫЙ КЛУБ И КВН
- Public speaking mastery
- Art of debates
- KVN and humor

### 7. РАЗВЛЕКАТЕЛЬНЫЙ ЦЕНТР
- Game zones for younger students
- Interactive lessons

## Tech Stack
- **Frontend**: Preact (through React compat layer) + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Express.js + TypeScript
- **AI Integration**: Google Gemini API
- **Data Storage**: In-memory storage (MemStorage) - can be upgraded to PostgreSQL
- **Internationalization**: i18next
- **State Management**: TanStack Query (React Query v5)

## Design System
- **Theme**: Light blue (#E3F2FD, #BBDEFB) and white (#FFFFFF)
- **Style**: Flat design with no gradients, clean and accessible
- **Components**: shadcn/ui with custom light blue theme
- **Icons**: Lucide React

## Architecture

### Frontend Structure
```
client/src/
├── components/          # Reusable UI components
│   ├── AssistantCharacter.tsx
│   ├── QuizInterface.tsx
│   ├── ClubCard.tsx
│   ├── RegistrationForm.tsx
│   ├── GoogleMapsEmbed.tsx
│   ├── MenuNavigation.tsx
│   ├── Header.tsx
│   ├── LanguageSwitcher.tsx
│   └── ui/             # shadcn components
├── pages/              # Route pages
│   ├── Home.tsx
│   ├── Clubs.tsx
│   ├── ClubDetails.tsx
│   ├── Quiz.tsx
│   ├── Schedule.tsx
│   ├── Rules.tsx
│   ├── Behavior.tsx
│   ├── Contacts.tsx
│   └── Settings.tsx
├── lib/
│   ├── i18n.ts         # Internationalization configuration
│   └── queryClient.ts  # TanStack Query setup
└── App.tsx             # Main app with routing
```

### Backend Structure
```
server/
├── index.ts            # Express server entry point
├── routes.ts           # API endpoints
├── gemini.ts           # Gemini AI integration
├── storage.ts          # In-memory data storage
└── vite.ts            # Vite integration
```

### Shared
```
shared/
└── schema.ts           # TypeScript types and Zod schemas
```

## API Endpoints

### Clubs
- `GET /api/clubs` - Get all clubs
- `GET /api/clubs/:id` - Get club details

### Chat (NEW!)
- `POST /api/chat` - Chat with AI assistant about Digitalurpaq

### Quiz
- `POST /api/quiz/generate` - Generate AI quiz questions
- `POST /api/quiz/recommendations` - Get club recommendations based on interests

### Registration
- `POST /api/registrations` - Create new registration
- `GET /api/registrations` - Get all registrations

### Schedule
- `GET /api/schedule` - Get user's schedule with all active registrations

### Reminders
- `GET /api/reminders/pending` - Get pending reminders
- `POST /api/reminders/:id/sent` - Mark reminder as sent

## Environment Variables
- `GEMINI_API_KEY` - Google Gemini API key (required for AI quiz features)
- `DATABASE_URL` - PostgreSQL connection string (available for future database migration)
- `NODE_ENV` - Environment (development/production)

## Data Models

### Club
- id, name, nameKz, nameRu
- description, descriptionKz, descriptionRu
- category, ageGroup, skillLevel
- schedule (JSON), maxCapacity, currentEnrollment
- location, imageUrl

### Registration
- id, studentName, studentAge, parentContact
- clubId, registeredAt, status

### Quiz Response
- id, sessionId, interests (JSON), recommendations (JSON)
- createdAt

### Reminder
- id, registrationId, activityDate, reminderSent, message

## Internationalization
All UI text is fully translated into three languages:
- English (en)
- Kazakh (kz) - Қазақ тілі
- Russian (ru) - Русский (default for Petropavlovsk)

Translation keys are organized by feature/component in `client/src/lib/i18n.ts`.

## Development

### Running the Project
```bash
npm run dev
```
This starts both the Express backend (port 5000) and Vite frontend dev server.

### Database Setup (Optional)
The project currently uses in-memory storage. To enable PostgreSQL:
```bash
npm run db:push
```

### Available Clubs
The application includes actual clubs from Дворец школьников "Digital Urpaq":
- **IT & Technology**: Robotics & LEGO, 3D Prototyping, Programming & Web Dev, Mechatronics, Drone Assembly, SDR Radio
- **Science**: Biotechnology Lab, Hydroponics - Green Business, Ecology & Environmental Science
- **Arts**: Art School, Decorative & Applied Arts, Choreography
- **Media**: Media Journalism, Video Production, Photography, Blogging
- **Business**: Business School, Financial Literacy
- **Languages & Culture**: Debate Club, KVN Club
- **Entertainment**: Entertainment Center for younger students

## User Workflows

### 1. Discovering Clubs
1. User lands on home page with animated assistant
2. Can browse all clubs or take interest quiz
3. Search and filter clubs by category
4. View detailed club information

### 2. Taking Interest Quiz
1. Click "Take Quiz" on home page
2. AI generates personalized questions in user's language
3. Answer questions about interests and preferences
4. Receive club recommendations with match percentages
5. Register directly from recommendations

### 3. Registration
1. Select a club
2. Fill registration form (student info, parent contact)
3. Confirm registration
4. Automatically added to schedule

### 4. Managing Schedule
1. View calendar with all registered activities
2. Receive 30-minute advance reminders
3. See club details, location
4. Track enrollment status

## Security & Best Practices
- No API keys exposed in client code
- Input validation with Zod schemas
- Type-safe API with TypeScript
- Proper error handling and loading states
- Environment variables for sensitive data

## Recent Changes (October 2025)
- Project adapted for Дворец школьников "Digital Urpaq" Petropavlovsk
- **NEW**: Added full AI chat feature with topic-focused conversation
- **NEW**: Chat assistant only discusses Digital Urpaq-related topics
- **NEW**: Added animated assistant character with interactive emotions
- **UPDATED**: Location to correct address (V438+J5W, ул. Таштинова, Петропавловск 150000)
- **UPDATED**: Google Maps integration with correct coordinates (54.8537°N, 69.1458°E)
- **FIXED**: Chat message duplication issue and error handling
- **UPDATED**: All club data with actual programs from Digital Urpaq
- **UPDATED**: Contact information (Приемная: +7 (7152) 34-02-40, Ресепшн: +7 (7152) 50-17-03)
- Added all 7 main directions of education
- Over 20 actual clubs from Digital Urpaq programs
- Configured for Replit environment with proper host settings
- Set up Google Gemini API integration
- Configured Vite dev server to allow all hosts for iframe proxy
- Installed all npm dependencies

## Known Limitations
- Uses ReactDOM.render (React 17 API) through Preact compat - shows deprecation warning but works correctly
- In-memory storage - data resets on server restart (can be upgraded to PostgreSQL)
- Sample club data - needs to be populated with actual Petropavlovsk programs

## Future Enhancements
- Migrate to persistent PostgreSQL database
- Populate real club data from Petropavlovsk Palace
- User authentication system
- Admin dashboard for club management
- Email/SMS notifications for reminders
- Photo gallery for clubs
- Student progress tracking
- Certificate generation
- Integration with official website https://digitalurpaq.edu.kz
- Virtual 3D tour integration
