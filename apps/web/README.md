# evomstay - React Application

A luxurious rental platform built with React, designed with evomstay's premium design system.

## Quick Start

### Installation

```bash
cd apps/web
npm install
```

### Development

```bash
npm run dev
```

The app will start at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
apps/web/
├── src/
│   ├── components/          # Shared UI components
│   │   ├── chrome.jsx       # Header, footer, search bar, property card
│   │   ├── data.jsx         # Sample data (properties, reviews, etc.)
│   │   ├── icons.jsx        # Icon library and primitives
│   │   ├── design-canvas.jsx # Design system canvas
│   │   └── tweaks-panel.jsx  # Design tweaks panel
│   ├── screens/             # Page components
│   │   ├── landing.jsx      # Landing page
│   │   ├── auth.jsx         # Login & registration
│   │   ├── search-detail.jsx # Search results & property detail
│   │   ├── booking-guest-chat.jsx # Booking flow & messaging
│   │   ├── host.jsx         # Host dashboard
│   │   ├── admin-profile.jsx # Admin & profile pages
│   │   └── mobile.jsx       # Mobile views
│   ├── styles/
│   │   ├── tokens.css       # Design tokens (colors, typography, spacing)
│   │   └── index.css        # Global styles
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Vite entry point
│   └── index.js             # Component exports
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## Features

- **Landing Page**: Hero section with search bar, category filters, and featured properties
- **Authentication**: Login and registration screens with role selection
- **Search & Discovery**: Search results with map view and category filters
- **Property Details**: Full property information with photos, reviews, and pricing
- **Booking Flow**: Multi-step booking process with date/guest selection
- **Guest Dashboard**: View trips and bookings
- **Messaging**: Real-time chat between guests and hosts
- **Host Dashboard**: Manage listings, calendar, and analytics
- **Admin Panel**: Administrative tools and profiles
- **Mobile Views**: Optimized mobile experiences

## Design System

The app uses a sophisticated design system based on:

### Colors
- **Brand**: Deep navy (#0B1F3A) to teal (#1AA8A1) gradient
- **CTA**: Electric blue (#0066FF)
- **Neutrals**: Soft warm slate palette
- **Status**: Success, warning, danger indicators

### Typography
- **Display**: Fraunces (serif)
- **Body**: Plus Jakarta Sans (sans-serif)
- **Mono**: JetBrains Mono (monospace)

### Components
- Buttons (primary, ghost, outline)
- Cards with glass-morphism effects
- Search bar with date/guest selection
- Property cards with ratings and reviews
- Category navigation
- Avatar & verified shields

## Routing

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration
- `/search` - Search results
- `/property/:id` - Property detail
- `/checkout` - Booking flow
- `/trips` - Guest dashboard
- `/chat` - Messaging
- `/hosting` - Host dashboard
- `/admin` - Admin panel
- `/mobile` - Mobile preview

## API Integration

Update the API base URL in `vite.config.js` to point to your backend:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3001', // Change to your API URL
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- The app uses React Router v6 for navigation
- CSS-in-JS styling with inline styles
- Component-based architecture
- Responsive design with CSS Grid and Flexbox
- CSS variables for theming support

## Future Enhancements

- [ ] State management (Redux/Zustand)
- [ ] Form validation and handling
- [ ] Backend API integration
- [ ] Authentication flow
- [ ] Payment processing
- [ ] Image optimization
- [ ] PWA support
- [ ] Internationalization (i18n)

## License

© 2026 evomstay - All rights reserved
