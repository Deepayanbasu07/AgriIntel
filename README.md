# AgriIntel - AI Assistant for Indian Farmers

![AgriIntel Chatbot UI](attached_assets/agriintel_chatbot_screenshot.png)
![AgriIntel Market Prices UI](attached_assets/agriintel_market_screenshot.png)

A full-stack web application that empowers Indian farmers with AI-powered agricultural advice, live mandi prices, and weather-based recommendations. The app uses a local LLM (Ollama Llama 3), live web scraping from Agmarknet, and OpenWeatherMap for real-time data.

---

## Features
- **AI Chatbot:** Get instant, expert farming advice in English or Hindi using a local LLM (Ollama Llama 3).
- **Live Market Prices:** Fetches real-time mandi prices for major crops and states by scraping the Agmarknet portal (no API key required).
- **Weather Advisory:** Provides weather-based farming tips using OpenWeatherMap and LLM-generated advice.
- **Modern UI:** Responsive, mobile-friendly, and accessible design with sticky input, quick prompts, and beautiful tables.
- **Multilingual:** Supports both English and Hindi for all major features.
- **CI/CD:** Automated build and test with GitHub Actions.

---

## Screenshots

### Chatbot UI
![Chatbot Screenshot](attached_assets/agriintel_chatbot_screenshot.png)

### Market Prices UI
![Market Prices Screenshot](attached_assets/agriintel_market_screenshot.png)

---

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite, TanStack Query, Wouter, Tailwind CSS, shadcn/ui, Lucide React
- **Backend:** Node.js, Express, TypeScript, Zod, Ollama Llama 3 (local), Python (Selenium + BeautifulSoup for scraping)
- **Data:** Agmarknet (scraped), OpenWeatherMap

---

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Python 3.8+
- Chrome browser (latest)
- ChromeDriver (matching your Chrome version)

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd AgriculturalAiHelper
```

### 3. Install Node.js Dependencies
```bash
npm install
```

### 4. Python Environment
Install required Python packages:
```bash
pip install selenium beautifulsoup4
```
Download [ChromeDriver](https://storage.googleapis.com/chrome-for-testing-public/138.0.7204.49/win64/chromedriver-win64.zip) and place `chromedriver.exe` in your PATH or update the script path.

### 5. Environment Variables
Create a `.env` file in the project root:
```
CROP_PRICE_API_KEY=SCRAPER
WEATHER_API_KEY=your_openweathermap_api_key
```
- Set `CROP_PRICE_API_KEY=SCRAPER` to always use the web scraper for market prices.
- Get your weather API key from [OpenWeatherMap](https://openweathermap.org/api).

### 6. Start the Application
```bash
npm run dev
```
- The backend and frontend will start.
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## How It Works
- **Market Prices:**
  - The frontend calls `/api/market-prices` with crop and state.
  - The backend runs a Python script (`fetch_market_price.py`) that scrapes Agmarknet for the latest mandi prices and returns them as JSON.
  - The frontend displays the results in a sortable, color-coded table.
- **Weather Advisory:**
  - The frontend calls `/api/weather-advice` with a city name.
  - The backend fetches weather from OpenWeatherMap and generates a farming tip using Ollama Llama 3.
- **Chatbot:**
  - The frontend calls `/api/chat` for farming questions.
  - The backend uses Ollama Llama 3 to generate expert advice.

---

## Troubleshooting
- Ensure Python, Selenium, BeautifulSoup, and ChromeDriver are installed and accessible.
- If you see `No Price Data Available`, try different crop/state combinations or check the Agmarknet portal for data availability.
- For ChromeDriver issues, ensure the version matches your installed Chrome browser.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

