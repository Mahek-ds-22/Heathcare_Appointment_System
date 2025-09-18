# Healthcare Appointment System

A comprehensive healthcare appointment booking system built with React, TypeScript, and Tailwind CSS.

## Features

- **Doctor Search**: Search doctors by name, specialization, and location
- **Calendar View**: Interactive calendar showing available appointment slots
- **Appointment Booking**: Complete booking form with validation
- **Appointment Management**: View upcoming and past appointments
- **Accessibility**: Full ARIA compliance and keyboard navigation
- **Responsive Design**: Optimized for all device sizes

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for development and building

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Header.tsx
│   ├── Search/
│   │   ├── SearchFilters.tsx
│   │   └── DoctorCard.tsx
│   ├── Booking/
│   │   ├── Calendar.tsx
│   │   └── BookingForm.tsx
│   └── Appointments/
│       ├── AppointmentCard.tsx
│       └── AppointmentSummary.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Focus management

## Form Validation

- Real-time validation feedback
- Comprehensive error messages
- Phone number formatting
- Email validation
- Required field validation
