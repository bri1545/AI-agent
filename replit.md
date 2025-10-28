# Palace of Schoolchildren Interactive Assistant

## Project Overview
An interactive web application for the Palace of Schoolchildren in Almaty, Kazakhstan. Features an animated AI assistant character that helps students discover clubs, take interest quizzes, register for activities, and navigate the facility.

## Key Features
1. **Animated Assistant Character** - Friendly mascot with idle animations and motivational speech bubbles
2. **Multi-Language Support** - Full internationalization in English, Kazakh, and Russian
3. **AI-Powered Interest Quiz** - Uses Gemini AI to generate personalized club recommendations
4. **Club Discovery** - Browse and search clubs by category with detailed information
5. **Registration System** - Register for clubs with scheduling and conflict detection
6. **Interactive Schedule** - Calendar view with 30-minute advance reminders
7. **Google Maps Integration** - Virtual tours and directions to the facility
8. **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack
- **Frontend**: Preact (through React compat layer) + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Express.js + TypeScript
- **AI Integration**: Google Gemini API
- **Data Storage**: In-memory storage (MemStorage)
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
- `GET /api/clubs/category/:category` - Get clubs by category

### Quiz
- `POST /api/quiz/generate` - Generate AI quiz questions
- `POST /api/quiz/recommendations` - Get club recommendations based on interests

### Registration
- `POST /api/registrations` - Create new registration
- `GET /api/registrations` - Get all registrations
- `DELETE /api/registrations/:id` - Cancel registration

### Reminders
- `GET /api/reminders` - Get upcoming reminders
- `PATCH /api/reminders/:id` - Mark reminder as read

## Environment Variables
- `GEMINI_API_KEY` - Google Gemini API key (required)
- `SESSION_SECRET` - Express session secret (required)
- `NODE_ENV` - Environment (development/production)

## Data Models

### Club
- id, name, description, category
- instructor, schedule, capacity
- ageRange, duration, location
- imageUrl

### Registration
- id, studentName, studentAge, parentContact
- clubId, timeSlot, status, registrationDate

### Quiz
- questions, options, interests mapping

### Reminder
- id, registrationId, clubName, scheduledTime
- reminderTime, read

## Internationalization
All UI text is fully translated into three languages:
- English (en) - Default
- Kazakh (kz)
- Russian (ru)

Translation keys are organized by feature/component in `client/src/lib/i18n.ts`.

## Development

### Running the Project
```bash
npm run dev
```
This starts both the Express backend (port 5000) and Vite frontend dev server.

### Sample Data
The application includes sample clubs across multiple categories:
- Sports: Basketball Club, Swimming Academy
- Arts: Digital Art Studio, Photography Club
- Science: Robotics Lab, Chemistry Club  
- Music: Piano Lessons, Guitar Workshop
- Technology: Coding Academy, Web Development
- Languages: English Speaking Club
- Dance: Modern Dance, Ballet School
- Theater: Drama Workshop

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
3. Choose time slot
4. Confirm registration
5. Automatically added to schedule

### 4. Managing Schedule
1. View calendar with all registered activities
2. Receive 30-minute advance reminders
3. See club details, instructor, location
4. Cancel registrations if needed

## Security & Best Practices
- No API keys exposed in client code
- Google Maps links used instead of embedded maps
- Session management with secure secrets
- Input validation with Zod schemas
- Type-safe API with TypeScript
- Proper error handling and loading states

## Recent Changes
- Fixed Preact/React compatibility issues
- Removed hard-coded Google Maps API key from client
- Internationalized all content pages (Rules, Behavior, Contacts, Settings)
- Added complete translations for all three languages
- Implemented in-memory storage with sample data
- Integrated Gemini AI for quiz generation and recommendations
- Created animated assistant character with speech bubbles
- Built responsive design with light blue-white theme

## Known Limitations
- Uses ReactDOM.render (React 17 API) through Preact compat - shows deprecation warning but works correctly
- In-memory storage - data resets on server restart
- Google Maps integration uses direct links (no embedded maps)

## Future Enhancements
- Persistent database (PostgreSQL)
- User authentication
- Admin dashboard for club management
- Email notifications for reminders
- Photo gallery for clubs
- Student progress tracking
- Certificate generation
