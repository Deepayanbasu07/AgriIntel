import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Chat schemas
export const chatRequestSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
  language: z.enum(["en", "hi"]).default("en")
});

export const chatResponseSchema = z.object({
  reply: z.string(),
  language: z.string()
});

// Market price schemas
export const marketPriceRequestSchema = z.object({
  crop: z.string().min(1, "Crop name is required"),
  state: z.string().min(1, "State name is required")
});

export const marketPriceDataSchema = z.object({
  mandi: z.string(),
  price: z.number(),
  date: z.string().optional(),
  unit: z.string().default("quintal")
});

export const marketPriceResponseSchema = z.object({
  crop: z.string(),
  state: z.string(),
  prices: z.array(marketPriceDataSchema),
  message: z.string().optional()
});

// Weather advice schemas
export const weatherAdviceRequestSchema = z.object({
  city: z.string().min(1, "City name is required"),
  language: z.enum(["en", "hi"]).default("en")
});

export const weatherAdviceResponseSchema = z.object({
  city: z.string(),
  weather: z.string(),
  advice: z.string(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  language: z.string()
});

// Types
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type MarketPriceRequest = z.infer<typeof marketPriceRequestSchema>;
export type MarketPriceResponse = z.infer<typeof marketPriceResponseSchema>;
export type WeatherAdviceRequest = z.infer<typeof weatherAdviceRequestSchema>;
export type WeatherAdviceResponse = z.infer<typeof weatherAdviceResponseSchema>;

// User table (keeping existing structure)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
