import { apiRequest } from "./queryClient";
import type { 
  ChatRequest, 
  ChatResponse, 
  MarketPriceRequest, 
  MarketPriceResponse, 
  WeatherAdviceRequest, 
  WeatherAdviceResponse 
} from "@shared/schema";

export const chatApi = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await apiRequest("POST", "/api/chat", request);
    return response.json();
  }
};

export const marketApi = {
  getPrices: async (request: MarketPriceRequest): Promise<MarketPriceResponse> => {
    const params = new URLSearchParams({
      crop: request.crop,
      state: request.state
    });
    const response = await apiRequest("GET", `/api/market-prices?${params}`);
    return response.json();
  }
};

export const weatherApi = {
  getAdvice: async (request: WeatherAdviceRequest): Promise<WeatherAdviceResponse> => {
    const params = new URLSearchParams({
      city: request.city,
      language: request.language || "en"
    });
    const response = await apiRequest("GET", `/api/weather-advice?${params}`);
    return response.json();
  }
};
