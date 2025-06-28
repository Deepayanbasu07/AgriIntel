import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  chatRequestSchema, 
  marketPriceRequestSchema, 
  weatherAdviceRequestSchema,
  type ChatResponse,
  type MarketPriceResponse,
  type WeatherAdviceResponse
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Chat endpoint - connects to Ollama LLM
  app.post("/api/chat", async (req, res) => {
    try {
      const { query, language = "en" } = chatRequestSchema.parse(req.body);
      
      // Call Ollama API
      const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3",
          prompt: `You are AgriBot, an expert AI assistant specifically designed to help Indian farmers. You have deep knowledge of:
- Indian crops: wheat, rice, sugarcane, cotton, maize, pulses, vegetables
- Regional farming practices across different Indian states
- Monsoon patterns and seasonal farming calendar
- Pest control using both organic and chemical methods
- Fertilizer recommendations for Indian soil conditions
- Irrigation techniques suitable for Indian agriculture
- Government schemes and support for farmers

Guidelines for responses:
- Keep answers practical and actionable
- Use simple language that farmers can understand
- Include specific recommendations with quantities/timing when possible
- Consider Indian climate and soil conditions
- Mention local/regional variations when relevant
- If the question is not farming-related, politely redirect to agricultural topics

Examples of good responses:
Q: "My wheat crop has yellow leaves"
A: "Yellow leaves in wheat often indicate nitrogen deficiency. Apply 25-30 kg urea per acre immediately. Also check for waterlogging in fields and ensure proper drainage."

Q: "When to plant rice in Punjab?"
A: "In Punjab, plant rice during mid-May to mid-June after pre-monsoon showers. Prepare nursery beds in April. Use varieties like PR-126 or PR-121 for best results in Punjab conditions."

User question: ${query}

Provide helpful farming advice in simple language:`,
          stream: false
        })
      });

      let reply = "I'm here to help with your farming questions, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
      
      if (ollamaResponse.ok) {
        const ollamaData = await ollamaResponse.json();
        reply = ollamaData.response || reply;
      }

      const response: ChatResponse = {
        reply,
        language
      };

      res.json(response);
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        error: "Failed to process chat request",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Market prices endpoint
  app.get("/api/market-prices", async (req, res) => {
    try {
      const { crop, state } = marketPriceRequestSchema.parse({
        crop: req.query.crop,
        state: req.query.state
      });

      const priceData = await storage.getCropPrices(crop, state);
      res.json(priceData);
    } catch (error) {
      console.error("Market prices error:", error);
      res.status(400).json({ 
        error: "Invalid request parameters",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Weather advice endpoint
  app.get("/api/weather-advice", async (req, res) => {
    try {
      const { city, language = "en" } = weatherAdviceRequestSchema.parse({
        city: req.query.city,
        language: req.query.language || "en"
      });

      const weatherData = await storage.getWeatherAdvice(city);
      
      const response: WeatherAdviceResponse = {
        city,
        weather: weatherData.weather,
        advice: weatherData.advice,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        language
      };

      res.json(response);
    } catch (error) {
      console.error("Weather advice error:", error);
      res.status(400).json({ 
        error: "Invalid request parameters",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      services: {
        ollama: "Check http://localhost:11434 for Ollama status"
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
