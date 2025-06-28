# AgriIntel - AI Assistant for Indian Farmers

## Overview

AgriIntel is a full-stack web application designed to help Indian farmers with AI-powered agricultural assistance. The application provides three main features: an AI chatbot for farming advice, live market price insights for crops, and weather-based farming recommendations. The system is built with a modern technology stack including React, Express, and TypeScript, with plans for PostgreSQL integration through Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom agricultural theme colors
- **Structure**: Single-page application with four main routes:
  - Home (`/`) - Landing page with feature overview
  - Chatbot (`/chatbot`) - AI chat interface
  - Market (`/market`) - Crop price insights
  - Weather (`/weather`) - Weather-based farming advice

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints under `/api` prefix
- **Development**: Vite integration for hot module replacement in development
- **Data Storage**: In-memory storage with plans for PostgreSQL migration
- **External Integration**: Configured to connect with Ollama LLM API (localhost:11434)

### Database Strategy
- **Current**: In-memory storage using Map data structures for development
- **Planned**: PostgreSQL with Drizzle ORM (configuration already present)
- **Schema**: Prepared user schema and market price data structures
- **Migration**: Drizzle Kit configured for database migrations

## Key Components

### API Endpoints
1. **Chat API** (`POST /api/chat`):
   - Integrates with Ollama LLM for agricultural advice
   - Supports English and Hindi languages
   - Fallback responses when LLM is unavailable

2. **Market Price API** (`GET /api/market-prices`):
   - Query parameters: crop and state
   - Returns mandi prices across different locations
   - Mock data for major crops (wheat, rice, sugarcane, cotton)

3. **Weather Advice API** (`GET /api/weather-advice`):
   - Query parameters: city and language
   - Provides farming recommendations based on weather conditions
   - Mock weather data with practical farming advice

### UI Components
- **Navigation**: Responsive navigation bar with agriculture-themed branding
- **Chat Interface**: Real-time messaging with bot responses
- **Market Dashboard**: Dropdown selections for crop and state with price tables
- **Weather Interface**: City input with weather cards displaying recommendations
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Data Models
- **Chat**: Request/response schemas with language support
- **Market Prices**: Structured data with mandi, price, unit information
- **Weather**: City-based advice with temperature and humidity data
- **User**: Prepared schema for future authentication features

## Data Flow

1. **User Interaction**: Users interact through React components
2. **API Calls**: TanStack Query manages API requests with caching
3. **Backend Processing**: Express routes handle business logic
4. **External Services**: Ollama integration for AI responses
5. **Data Storage**: Current in-memory storage, future PostgreSQL
6. **Response Handling**: Structured JSON responses with error handling

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, TanStack Query, Wouter
- **UI Framework**: Radix UI, shadcn/ui, Tailwind CSS
- **Backend**: Express, TypeScript, Vite
- **Database**: Drizzle ORM, PostgreSQL drivers
- **External AI**: Ollama LLM (localhost:11434)

### Development Tools
- **Build System**: Vite with TypeScript support
- **Package Manager**: npm with lockfile
- **Code Quality**: TypeScript strict mode
- **Development**: Hot reload, error overlays

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Enabled for both frontend and backend
- **API Proxy**: Vite configured to proxy API requests to Express
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Production Build
- **Frontend Build**: Vite builds React app to `dist/public`
- **Backend Build**: esbuild bundles Express server to `dist/index.js`
- **Static Serving**: Express serves built frontend in production
- **Database**: PostgreSQL with Drizzle migrations

### Infrastructure Requirements
- **Node.js Runtime**: For Express server
- **PostgreSQL Database**: For production data storage
- **Ollama Service**: Local LLM API for chat functionality
- **Static Assets**: Served through Express in production

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```