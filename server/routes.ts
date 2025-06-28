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

${language === "hi" ? `
Language Instructions: Respond in Hindi (Devanagari script). Use simple, clear Hindi that farmers can understand easily.

Guidelines for responses:
- सभी उत्तर हिंदी में दें
- सरल और व्यावहारिक भाषा का प्रयोग करें
- मात्रा और समय के साथ विशिष्ट सुझाव दें
- भारतीय जलवायु और मिट्टी की स्थितियों को ध्यान में रखें
- स्थानीय/क्षेत्रीय बदलावों का उल्लेख करें

Examples of good responses in Hindi:
Q: "मेरी गेहूं की फसल की पत्तियां पीली हो रही हैं"
A: "गेहूं में पीली पत्तियां अक्सर नाइट्रोजन की कमी दर्शाती हैं। तुरंत 25-30 किलो यूरिया प्रति एकड़ डालें। खेत में जल जमाव की जांच करें और उचित जल निकासी सुनिश्चित करें।"

Q: "पंजाब में धान कब बोना चाहिए?"
A: "पंजाब में मानसून पूर्व बारिश के बाद मई के मध्य से जून के मध्य तक धान बोएं। अप्रैल में नर्सरी तैयार करें। पंजाब की स्थितियों के लिए PR-126 या PR-121 किस्में उपयोग करें।"
` : `
Language Instructions: Respond in English using simple language that farmers can understand.

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
`}

User question: ${query}

Provide helpful farming advice:`,
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
