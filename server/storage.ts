import axios from 'axios';
import { users, type User, type InsertUser, type MarketPriceResponse } from "@shared/schema";
import { spawn } from 'child_process';

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCropPrices(crop: string, state: string): Promise<MarketPriceResponse>;
  getWeatherAdvice(city: string): Promise<{ weather: string; advice: string; temperature?: number; humidity?: number }>;
}

export class LiveStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCropPrices(crop: string, state: string): Promise<MarketPriceResponse> {
    // Use the Python scraper if no API key is present or if explicitly set
    if (!process.env.CROP_PRICE_API_KEY || process.env.CROP_PRICE_API_KEY === "SCRAPER") {
      return new Promise((resolve) => {
        const py = spawn('python', [
          './AgriMarket-main/fetch_market_price.py',
          crop,
          state
        ]);
        let data = '';
        py.stdout.on('data', (chunk) => {
          data += chunk.toString();
        });
        py.stderr.on('data', (err) => {
          console.error('Python scraper error:', err.toString());
        });
        py.on('close', () => {
          try {
            const result = JSON.parse(data);
            resolve({
              crop,
              state,
              prices: result.prices || [],
              message: result.error || undefined
            });
          } catch (e) {
            resolve({
              crop,
              state,
              prices: [],
              message: 'Failed to parse scraper output.'
            });
          }
        });
      });
    } else {
      // Use the Agmarknet API if API key is present
      try {
        const response = await axios.get(
          `https://api.data.gov.in/resource/9ef84268-d583-457a-9d56-604376e4efee`,
          {
            params: {
              'api-key': process.env.CROP_PRICE_API_KEY,
              format: 'json',
              filters: `commodity=${crop}, state=${state}`,
              limit: 10
            }
          }
        );

        if (!response.data.records || response.data.records.length === 0) {
          return {
            crop,
            state,
            prices: [],
            message: `No price data available for ${crop} in ${state}`
          };
        }

        return {
          crop,
          state,
          prices: response.data.records.map((record: any) => ({
            mandi: record.market,
            price: parseFloat(record.modal_price),
            unit: 'quintal',
            date: record.arrival_date
          })),
          message: undefined
        };
      } catch (error) {
        console.error('Crop price API error:', error);
        return {
          crop,
          state,
          prices: [],
          message: `Failed to fetch prices. Please try again later.`
        };
      }
    }
  }

  async getWeatherAdvice(city: string): Promise<{ 
    weather: string; 
    advice: string; 
    temperature?: number; 
    humidity?: number 
  }> {
    try {
      // Using OpenWeatherMap API for weather data (per documentation)
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city, // city name, e.g. 'Delhi'
            appid: process.env.WEATHER_API_KEY,
            units: 'metric'
          }
        }
      );

      const weatherData = weatherResponse.data;
      const weather = weatherData.weather[0].description;
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;

      // Use Ollama Llama 3 for AI-generated agricultural advice
      const ollamaPrompt = `You are AgriBot, an expert AI assistant for Indian farmers. Based on the following weather conditions, provide a short, practical farming tip (1-2 sentences) for a farmer in ${city}:
\nWeather: ${weather}\nTemperature: ${temperature}°C\nHumidity: ${humidity}%\n\nAdvice:`;

      let advice = "";
      try {
        const ollamaResponse = await axios.post(
          "http://localhost:11434/api/generate",
          {
            model: "llama3",
            prompt: ollamaPrompt,
            stream: false
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );
        if (ollamaResponse.data && ollamaResponse.data.response) {
          advice = ollamaResponse.data.response.trim();
        }
      } catch (ollamaError) {
        console.error("Ollama API error for weather advice:", ollamaError);
        advice = "";
      }

      return {
        weather,
        advice,
        temperature,
        humidity
      };
    } catch (error) {
      console.error('Weather API error:', error);
      return {
        weather: "Weather data unavailable",
        advice: "",
        temperature: undefined,
        humidity: undefined
      };
    }
  }
}

export const storage = new LiveStorage();
