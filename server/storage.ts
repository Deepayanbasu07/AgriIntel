import { users, type User, type InsertUser, type MarketPriceResponse } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCropPrices(crop: string, state: string): Promise<MarketPriceResponse>;
  getWeatherAdvice(city: string): Promise<{ weather: string; advice: string; temperature?: number; humidity?: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  
  // Mock crop price data
  private cropPrices: Record<string, Record<string, Array<{ mandi: string; price: number; unit: string }>>> = {
    "wheat": {
      "punjab": [
        { mandi: "Ludhiana", price: 2200, unit: "quintal" },
        { mandi: "Amritsar", price: 2180, unit: "quintal" },
        { mandi: "Jalandhar", price: 2210, unit: "quintal" }
      ],
      "uttar pradesh": [
        { mandi: "Kanpur", price: 2100, unit: "quintal" },
        { mandi: "Lucknow", price: 2120, unit: "quintal" },
        { mandi: "Agra", price: 2090, unit: "quintal" }
      ],
      "haryana": [
        { mandi: "Karnal", price: 2190, unit: "quintal" },
        { mandi: "Ambala", price: 2170, unit: "quintal" }
      ]
    },
    "rice": {
      "west bengal": [
        { mandi: "Kolkata", price: 2500, unit: "quintal" },
        { mandi: "Howrah", price: 2480, unit: "quintal" },
        { mandi: "Durgapur", price: 2520, unit: "quintal" }
      ],
      "punjab": [
        { mandi: "Amritsar", price: 2450, unit: "quintal" },
        { mandi: "Ludhiana", price: 2470, unit: "quintal" }
      ],
      "andhra pradesh": [
        { mandi: "Vijayawada", price: 2300, unit: "quintal" },
        { mandi: "Guntur", price: 2320, unit: "quintal" }
      ]
    },
    "sugarcane": {
      "uttar pradesh": [
        { mandi: "Muzaffarnagar", price: 350, unit: "quintal" },
        { mandi: "Meerut", price: 340, unit: "quintal" },
        { mandi: "Saharanpur", price: 360, unit: "quintal" }
      ],
      "maharashtra": [
        { mandi: "Pune", price: 370, unit: "quintal" },
        { mandi: "Kolhapur", price: 380, unit: "quintal" }
      ]
    },
    "cotton": {
      "gujarat": [
        { mandi: "Rajkot", price: 6500, unit: "quintal" },
        { mandi: "Ahmedabad", price: 6480, unit: "quintal" }
      ],
      "maharashtra": [
        { mandi: "Nagpur", price: 6400, unit: "quintal" },
        { mandi: "Akola", price: 6420, unit: "quintal" }
      ]
    }
  };

  // Mock weather advice data
  private weatherAdvice: Record<string, { weather: string; advice: string; temperature: number; humidity: number }> = {
    "delhi": {
      weather: "Light rain expected",
      advice: "Ideal conditions for sowing bajra. Avoid fertilizer application during rain.",
      temperature: 28,
      humidity: 75
    },
    "mumbai": {
      weather: "Heavy rain expected",
      advice: "Delay fertilizer application. Good time for transplanting rice seedlings.",
      temperature: 26,
      humidity: 85
    },
    "jaipur": {
      weather: "Dry and sunny",
      advice: "Perfect weather for harvesting wheat. Irrigate vegetable crops in evening.",
      temperature: 32,
      humidity: 45
    },
    "pune": {
      weather: "Partly cloudy",
      advice: "Good conditions for spraying pesticides. Monitor soil moisture levels.",
      temperature: 29,
      humidity: 60
    },
    "chandigarh": {
      weather: "Clear skies",
      advice: "Excellent weather for field preparation. Start sowing summer crops.",
      temperature: 30,
      humidity: 50
    },
    "lucknow": {
      weather: "Light fog in morning",
      advice: "Wait for fog to clear before spraying. Good for wheat crop development.",
      temperature: 25,
      humidity: 70
    },
    "kolkata": {
      weather: "High humidity",
      advice: "Monitor crops for fungal diseases. Good time for rice cultivation.",
      temperature: 31,
      humidity: 80
    },
    "chennai": {
      weather: "Hot and humid",
      advice: "Increase irrigation frequency. Provide shade to sensitive crops.",
      temperature: 34,
      humidity: 65
    }
  };

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
    const normalizedCrop = crop.toLowerCase().trim();
    const normalizedState = state.toLowerCase().trim();
    
    const cropData = this.cropPrices[normalizedCrop];
    
    if (!cropData) {
      return {
        crop,
        state,
        prices: [],
        message: `Price data not available for ${crop}. Available crops: ${Object.keys(this.cropPrices).join(', ')}`
      };
    }

    const stateData = cropData[normalizedState];
    
    if (!stateData) {
      return {
        crop,
        state,
        prices: [],
        message: `Price data not available for ${crop} in ${state}. Available states for ${crop}: ${Object.keys(cropData).join(', ')}`
      };
    }

    return {
      crop,
      state,
      prices: stateData.map((item: { mandi: string; price: number; unit: string }) => ({
        ...item,
        date: new Date().toISOString().split('T')[0]
      }))
    };
  }

  async getWeatherAdvice(city: string): Promise<{ weather: string; advice: string; temperature?: number; humidity?: number }> {
    const normalizedCity = city.toLowerCase().trim();
    
    const advice = this.weatherAdvice[normalizedCity];
    
    if (!advice) {
      return {
        weather: "Weather data not available",
        advice: `Weather information not available for ${city}. Available cities: ${Object.keys(this.weatherAdvice).join(', ')}`,
        temperature: undefined,
        humidity: undefined
      };
    }

    return advice;
  }
}

export const storage = new MemStorage();
