# Design Guidelines: Palace of Schoolchildren Interactive Assistant

## Design Approach
**Selected Approach:** Hybrid - Material Design principles for data-dense sections (schedules, registration forms) combined with custom playful elements for the assistant character interface.

**Key Design Principles:**
- **Friendly & Approachable:** Soft, rounded components with playful assistant character as focal point
- **Clarity First:** Clean information hierarchy for schedules, rules, and registration flows
- **Culturally Adaptive:** Interface adapts seamlessly across English, Kazakh, and Russian languages

## Color Palette (User-Specified)
- **Primary:** Light blue (#E3F2FD to #BBDEFB range)
- **Background:** Pure white (#FFFFFF)
- **Accents:** Mid-blue (#42A5F5)
- **Text:** Dark gray (#212121) and medium gray (#757575)
- **Success/Actions:** Bright blue (#2196F3)
- **No gradients:** Flat color fills only

## Typography Hierarchy
**Font Families:**
- Primary: 'Inter' or 'Nunito' for friendly, readable interface
- Headings: 600-700 weight
- Body: 400-500 weight
- Assistant speech bubbles: 500 weight, slightly larger (18px)

**Scale:**
- Hero/Assistant name: 32px (mobile) / 48px (desktop)
- Section headings: 24px / 32px
- Card titles: 18px / 20px
- Body text: 14px / 16px
- Button text: 14px / 16px, 500 weight

## Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl with px-4

**Grid Strategy:**
- Main layout: Single column on mobile, sidebar + content on desktop (lg:grid-cols-[300px_1fr])
- Club cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Quick actions: grid-cols-2 md:grid-cols-4

## Core Components

### Assistant Character Hub
**Center Stage Element:**
- Animated SVG character (friendly, approachable mascot design)
- Character container: rounded-3xl card with subtle shadow, p-8
- Idle animations: Gentle bounce every 8-10 seconds, blinking eyes
- Speech bubble: Absolutely positioned above character, rounded-2xl, tail pointing down, appears with slide-down + fade animation every 2-3 minutes
- Speech bubble messages rotate: "Ready to find your perfect club?", "Explore what interests you!", "Check your schedule today!"

### Language Switcher
**Top-right corner:**
- Pill-style toggle with three options: EN | KZ | RU
- Active language: filled blue background, white text
- Inactive: transparent with blue border and text
- Smooth transition animation (150ms) between states

### Quick Action Grid
**Below assistant character:**
- Four prominent cards: Rules, Schedule, Registration, Contacts
- Each card: Icon (64px) + Title + Brief description
- Hover: Lift effect (translateY -2px) with shadow increase
- Click: Scale down slightly (0.98) then navigate

### AI Interest Quiz Interface
**Multi-step flow:**
- Progress bar at top: Filled sections in blue, remaining in light gray
- Question cards: Large, centered, one question per screen
- Answer options: Grid of rounded buttons with icons
- "I'm not sure" option always available
- Results page: Recommended clubs in masonry grid with match percentage badges

### Club Cards
**Grid layout with rich information:**
- Card structure: Image preview (if available) + Club name + Description snippet + Tags (age group, skill level) + "Learn More" button
- Hover: Card lifts, shadow increases
- Tags: Small rounded pills in light blue with darker blue text
- Action button: Full-width, rounded-lg

### Registration Flow
**Step-by-step wizard:**
1. Select club (if not pre-selected)
2. Choose schedule/time slots - Calendar view with available slots in blue
3. Personal information form - Stacked inputs with floating labels
4. Confirmation screen with summary card

### Schedule/Calendar View
**Month calendar grid:**
- Days with activities: Blue circle badge with count
- Today: Blue border
- Selected day: Filled blue background, white text
- Side panel shows day's activities as timeline

### Google Maps Integration
**Two modes:**
- Location pin: Embedded map showing Palace location with custom blue marker
- Virtual tour button: Opens full-screen Street View in modal overlay

### Notification/Reminder System
**30-minute advance reminders:**
- Toast notification: Slide in from top-right, rounded-lg card
- Contains: Activity name, time, location, "View Details" link
- Auto-dismiss after 10 seconds or manual close

### Menu/Navigation
**Slide-out sidebar (desktop) or bottom sheet (mobile):**
- Sections clearly separated with subtle dividers
- Items: Rules, Behavior Guidelines, Language Settings, Contacts, About
- Each with icon + label in clean list format

## Animation Guidelines
**Purposeful & Playful:**
- Assistant idle: Subtle bounce (translateY -4px to 0) every 8-10 seconds
- Speech bubbles: Slide down + fade in (200ms ease-out)
- Page transitions: Cross-fade between views (150ms)
- Button interactions: Scale transform on click (0.98)
- Card hovers: Lift effect (translateY -2px, shadow increase, 200ms)
- Loading states: Pulsing blue dot animation for data fetching
- Toast notifications: Slide + fade from top-right

**Avoid:** Spinning icons, excessive parallax, distracting background animations

## Responsive Strategy
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Assistant character scales down proportionally on mobile
- Grid columns collapse to single column below md breakpoint
- Navigation switches to bottom sheet on mobile

## Accessibility
- All interactive elements: Minimum 44px touch target
- Form inputs: Clear labels, error states with red borders and messages
- Color contrast: Minimum 4.5:1 for all text
- Focus indicators: 2px blue outline on keyboard navigation
- Screen reader: Proper ARIA labels for all interactive elements
- Language-specific fonts support Cyrillic and Latin characters

## Images
**No large hero image.** Application centers around the interactive assistant character (SVG-based). Supplementary images:
- Club preview images: 16:9 ratio, 400x225px, rounded corners
- Location map: Embedded Google Maps (responsive)
- Icon set: Consistent line-style icons for navigation and features

This design creates a friendly, functional educational platform that balances playful elements with practical scheduling and registration tools.