# AgriIntel - AI Assistant for Indian Farmers

A full-stack web application designed to help Indian farmers with AI-powered agricultural assistance. The application provides three main features: an AI chatbot for farming advice, live market price insights for crops, and weather-based farming recommendations.

## Features

- **AI Chatbot**: Get instant expert advice on crop management, pest control, fertilizers, irrigation, and farming techniques
- **Market Prices**: Track real-time mandi prices across different states
- **Weather Advisory**: Get weather-based farming recommendations for your location
- **Multilingual Support**: Complete Hindi and English language support
- **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- TanStack Query (server state management)
- Wouter (routing)
- Tailwind CSS + shadcn/ui components
- Lucide React icons

### Backend
- Express.js with TypeScript
- Ollama LLM integration for AI responses
- Drizzle ORM (ready for PostgreSQL)
- Zod for schema validation

## Project Structure

```
agriintel/
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Language)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and API clients
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app component
│   │   ├── index.css      # Global styles
│   │   └── main.tsx       # Entry point
│   └── index.html
├── server/                # Backend application
│   ├── index.ts           # Express server setup
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Zod schemas and types
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
├── drizzle.config.ts      # Database config
└── README.md              # This file
```

## Prerequisites

- Node.js 18+ and npm
- Ollama running locally (for AI chatbot functionality)
  - Install from: https://ollama.ai
  - Pull a model: `ollama pull llama3`
- PostgreSQL (optional, for production database)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agriintel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
# Create a .env file for database connection (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/agriintel
```

## Running Locally

### Development Mode

Start the development server:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5000
- Backend API: http://localhost:5000/api

### Ollama Setup

1. Install Ollama from https://ollama.ai
2. Start Ollama service (usually starts automatically)
3. Pull a model:
```bash
ollama pull llama3
```
4. Verify it's running:
```bash
curl http://localhost:11434/api/tags
```

### API Endpoints

- `POST /api/chat` - Send chat messages to AI assistant
- `GET /api/market-prices?crop=wheat&state=punjab` - Get crop prices
- `GET /api/weather-advice?city=delhi` - Get weather-based advice
- `GET /api/health` - Health check endpoint

### Testing the Application

1. **Home Page**: Navigate to http://localhost:5000
2. **Language Switch**: Click "हिं" button to switch to Hindi
3. **Chatbot**: 
   - Click "Start Chatbot" or navigate to /chatbot
   - Type farming questions in English or Hindi
   - Use quick action buttons for common queries
4. **Market Prices**:
   - Navigate to /market
   - Select crop and state
   - Click "Get Prices" to view mandi prices
5. **Weather Advisory**:
   - Navigate to /weather
   - Enter city name or use quick select buttons
   - Get weather-based farming recommendations

## Building for Production

```bash
# Build the application
npm run build

# Start production server
NODE_ENV=production node dist/index.js
```

## Database Setup (Optional)

To use PostgreSQL instead of in-memory storage:

1. Create database:
```sql
CREATE DATABASE agriintel;
```

2. Run migrations:
```bash
npm run db:generate
npm run db:migrate
```

## Mock Data

The application includes mock data for:
- **Crops**: Wheat, Rice, Sugarcane, Cotton
- **States**: Punjab, Uttar Pradesh, West Bengal, Maharashtra, Gujarat, etc.
- **Cities**: Delhi, Mumbai, Jaipur, Pune, Chennai, Kolkata, etc.

## Language Support

The application supports:
- **English**: Default language
- **Hindi**: Complete UI translation and AI responses in Hindi

Language preference is stored in browser localStorage.

## Troubleshooting

### Ollama Connection Issues
- Ensure Ollama is running: `ollama serve`
- Check if model is installed: `ollama list`
- Verify API endpoint: `curl http://localhost:11434/api/generate -d '{"model":"llama3","prompt":"test"}'`

### Port Conflicts
- If port 5000 is in use, change it in `server/index.ts`
- Update the port in any API calls accordingly

### Database Connection
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Run migrations if tables don't exist

## Development Tips

- Use `npm run dev` for hot-reload development
- API responses include proper error messages
- Check browser console for frontend errors
- Check terminal for backend errors
- Language translations are in `client/src/lib/translations.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.