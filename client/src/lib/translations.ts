export type Language = "en" | "hi";

export interface Translations {
  // Navigation
  nav: {
    title: string;
    subtitle: string;
    chatbot: string;
    market: string;
    weather: string;
    language: string;
  };
  
  // Home page
  home: {
    heroTitle: string;
    heroSubtitle: string;
    startChatbot: string;
    marketPrices: string;
    farmersHelped: string;
    aiSupport: string;
    liveData: string;
    comprehensiveTitle: string;
    comprehensiveSubtitle: string;
    aiAdvisoryTitle: string;
    aiAdvisoryDesc: string;
    marketPricesTitle: string;
    marketPricesDesc: string;
    weatherAdvisoryTitle: string;
    weatherAdvisoryDesc: string;
    todaysPrices: string;
    startChatting: string;
    viewPrices: string;
    getWeatherAdvice: string;
    whyChooseTitle: string;
    aiPowered: string;
    aiPoweredDesc: string;
    mobileFirst: string;
    mobileFirstDesc: string;
    multilingual: string;
    multilingualDesc: string;
    available247: string;
    available247Desc: string;
    footerTagline: string;
    features: string;
    support: string;
    helpCenter: string;
    contactUs: string;
    privacyPolicy: string;
    termsOfService: string;
    footerCopyright: string;
  };
  
  // Chatbot
  chatbot: {
    title: string;
    subtitle: string;
    online: string;
    thinking: string;
    placeholder: string;
    welcomeMessage: string;
    fertilizerAdvice: string;
    pestControl: string;
    plantingTime: string;
    cropDisease: string;
    seasonalCrops: string;
    errorTitle: string;
    errorMessage: string;
    disclaimer: string;
  };
  
  // Market
  market: {
    title: string;
    subtitle: string;
    priceSearch: string;
    selectCrop: string;
    selectState: string;
    chooseCrop: string;
    chooseState: string;
    getPrices: string;
    loading: string;
    mandi: string;
    price: string;
    unit: string;
    date: string;
    today: string;
    noPriceData: string;
    availableCrops: string;
    majorCropsTracked: string;
    statesCovered: string;
    agriculturalStates: string;
    dataFreshness: string;
    realTimeUpdates: string;
    high: string;
    moderate: string;
    low: string;
    errorMessage: string;
  };
  
  // Weather
  weather: {
    title: string;
    subtitle: string;
    getWeatherAdvice: string;
    placeholder: string;
    getAdvice: string;
    loading: string;
    quickSelect: string;
    currentWeather: string;
    temperature: string;
    humidity: string;
    farmingAdvisory: string;
    weatherBasedAdvice: string;
    weatherBasedDesc: string;
    locationSpecific: string;
    locationSpecificDesc: string;
    realTimeData: string;
    realTimeDataDesc: string;
    weatherTips: string;
    rainySeason: string;
    drySeason: string;
    rainyTips: string;
    dryTips: string;
    errorTitle: string;
    errorMessage: string;
    cityRequired: string;
  };
  
  // Common
  common: {
    error: string;
    send: string;
    search: string;
    back: string;
    home: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      title: "AgriIntel",
      subtitle: "AI Assistant for Farmers",
      chatbot: "Chatbot",
      market: "Market",
      weather: "Weather",
      language: "Language"
    },
    home: {
      heroTitle: "Smart Farming with AI",
      heroSubtitle: "Get expert crop advice, live market prices, and weather recommendations - all powered by artificial intelligence",
      startChatbot: "Start Chatbot",
      marketPrices: "Market Prices",
      farmersHelped: "Farmers Helped",
      aiSupport: "AI Support",
      liveData: "Live Market Data",
      comprehensiveTitle: "Comprehensive Farming Solutions",
      comprehensiveSubtitle: "Access cutting-edge AI technology designed specifically for Indian agriculture",
      aiAdvisoryTitle: "AI Crop Advisory",
      aiAdvisoryDesc: "Get instant expert advice on crop management, pest control, and farming techniques",
      marketPricesTitle: "Live Market Prices",
      marketPricesDesc: "Track real-time mandi prices across different states and make informed selling decisions",
      weatherAdvisoryTitle: "Weather Advisory",
      weatherAdvisoryDesc: "Get weather-based farming recommendations and optimal timing for agricultural activities",
      todaysPrices: "Today's Prices",
      startChatting: "Start Chatting",
      viewPrices: "View Prices",
      getWeatherAdvice: "Get Weather Advice",
      whyChooseTitle: "Why Choose AgriIntel?",
      aiPowered: "AI-Powered",
      aiPoweredDesc: "Advanced machine learning algorithms trained on Indian agricultural data",
      mobileFirst: "Mobile First",
      mobileFirstDesc: "Designed for smartphones and works offline for rural connectivity",
      multilingual: "Multilingual",
      multilingualDesc: "Support for English, Hindi, and regional Indian languages",
      available247: "24/7 Available",
      available247Desc: "Round-the-clock assistance for urgent farming queries",
      footerTagline: "Empowering farmers with AI",
      features: "Features",
      support: "Support",
      helpCenter: "Help Center",
      contactUs: "Contact Us",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      footerCopyright: "© 2024 AgriIntel. All rights reserved. Built for Indian farmers with ❤️"
    },
    chatbot: {
      title: "AgriBot - AI Farming Assistant",
      subtitle: "AI Farming Assistant",
      online: "Online",
      thinking: "Thinking...",
      placeholder: "Ask about crops, pest control, fertilizers, or farming techniques...",
      welcomeMessage: "Hello! I'm AgriBot, your AI farming assistant. I can help you with crop management, pest control, fertilizers, irrigation, and farming techniques suitable for Indian conditions. How can I assist you today?",
      fertilizerAdvice: "Fertilizer advice",
      pestControl: "Pest control",
      plantingTime: "Planting time",
      cropDisease: "Crop disease",
      seasonalCrops: "Seasonal crops",
      errorTitle: "Error",
      errorMessage: "Failed to get response from AI assistant. Please try again.",
      disclaimer: "This chatbot provides general agricultural advice and should not replace professional consultation.",
    },
    market: {
      title: "Live Market Prices",
      subtitle: "Get real-time mandi prices across different states",
      priceSearch: "Price Search",
      selectCrop: "Select Crop",
      selectState: "Select State",
      chooseCrop: "Choose a crop",
      chooseState: "Choose a state",
      getPrices: "Get Prices",
      loading: "Loading...",
      mandi: "Mandi",
      price: "Price",
      unit: "Unit",
      date: "Date",
      today: "Today",
      noPriceData: "No Price Data Available",
      availableCrops: "Available Crops",
      majorCropsTracked: "Major crops tracked",
      statesCovered: "States Covered",
      agriculturalStates: "Agricultural states",
      dataFreshness: "Data Freshness",
      realTimeUpdates: "Real-time updates",
      high: "High",
      moderate: "Moderate",
      low: "Low",
      errorMessage: "Failed to fetch price data. Please try again."
    },
    weather: {
      title: "Weather Advisory",
      subtitle: "Get weather-based farming recommendations for your location",
      getWeatherAdvice: "Get Weather Advice",
      placeholder: "Enter your city name (e.g., Delhi, Mumbai, Jaipur)",
      getAdvice: "Get Advice",
      loading: "Loading...",
      quickSelect: "Quick select:",
      currentWeather: "Current Weather",
      temperature: "Temperature",
      humidity: "Humidity",
      farmingAdvisory: "Farming Advisory",
      weatherBasedAdvice: "Weather-Based Advice",
      weatherBasedDesc: "Get personalized farming recommendations based on current weather conditions",
      locationSpecific: "Location-Specific",
      locationSpecificDesc: "Advice tailored to your specific geographic location and climate",
      realTimeData: "Real-Time Data",
      realTimeDataDesc: "Up-to-date weather information for accurate farming guidance",
      weatherTips: "Weather Advisory Tips",
      rainySeason: "Rainy Season",
      drySeason: "Dry Season",
      rainyTips: "• Avoid fertilizer application during heavy rain\n• Good time for transplanting rice seedlings\n• Monitor crops for fungal diseases\n• Ensure proper drainage in fields",
      dryTips: "• Increase irrigation frequency\n• Perfect for harvesting mature crops\n• Good conditions for field preparation\n• Ideal for pesticide application",
      errorTitle: "Error",
      errorMessage: "Failed to get weather advice. Please try again.",
      cityRequired: "Please enter a city name."
    },
    common: {
      error: "Error",
      send: "Send",
      search: "Search",
      back: "Back",
      home: "Home"
    }
  },
  hi: {
    nav: {
      title: "एग्रीइंटेल",
      subtitle: "किसानों के लिए AI सहायक",
      chatbot: "चैटबॉट",
      market: "बाज़ार",
      weather: "मौसम",
      language: "भाषा"
    },
    home: {
      heroTitle: "AI के साथ स्मार्ट खेती",
      heroSubtitle: "विशेषज्ञ फसल सलाह, लाइव बाज़ार कीमतें, और मौसम की सिफारिशें प्राप्त करें - सभी कृत्रिम बुद्धिमत्ता द्वारा संचालित",
      startChatbot: "चैटबॉट शुरू करें",
      marketPrices: "बाज़ार की कीमतें",
      farmersHelped: "किसानों की मदद की गई",
      aiSupport: "AI सहायता",
      liveData: "लाइव बाज़ार डेटा",
      comprehensiveTitle: "व्यापक खेती समाधान",
      comprehensiveSubtitle: "भारतीय कृषि के लिए विशेष रूप से डिज़ाइन की गई अत्याधुनिक AI तकनीक तक पहुँच",
      aiAdvisoryTitle: "AI फसल सलाह",
      aiAdvisoryDesc: "फसल प्रबंधन, कीट नियंत्रण, और खेती की तकनीकों पर तुरंत विशेषज्ञ सलाह प्राप्त करें",
      marketPricesTitle: "लाइव बाज़ार की कीमतें",
      marketPricesDesc: "विभिन्न राज्यों में वास्तविक समय की मंडी कीमतों को ट्रैक करें और सूचित बिक्री निर्णय लें",
      weatherAdvisoryTitle: "मौसम सलाह",
      weatherAdvisoryDesc: "मौसम आधारित खेती की सिफारिशें और कृषि गतिविधियों के लिए इष्टतम समय प्राप्त करें",
      todaysPrices: "आज की कीमतें",
      startChatting: "बात शुरू करें",
      viewPrices: "कीमतें देखें",
      getWeatherAdvice: "मौसम सलाह लें",
      whyChooseTitle: "एग्रीइंटेल क्यों चुनें?",
      aiPowered: "AI-संचालित",
      aiPoweredDesc: "भारतीय कृषि डेटा पर प्रशिक्षित उन्नत मशीन लर्निंग एल्गोरिदम",
      mobileFirst: "मोबाइल फर्स्ट",
      mobileFirstDesc: "स्मार्टफोन के लिए डिज़ाइन किया गया और ग्रामीण कनेक्टिविटी के लिए ऑफलाइन काम करता है",
      multilingual: "बहुभाषी",
      multilingualDesc: "अंग्रेजी, हिंदी और क्षेत्रीय भारतीय भाषाओं के लिए समर्थन",
      available247: "24/7 उपलब्ध",
      available247Desc: "तत्काल खेती के प्रश्नों के लिए चौबीसों घंटे सहायता",
      footerTagline: "AI के साथ किसानों को सशक्त बनाना",
      features: "सुविधाएं",
      support: "सहायता",
      helpCenter: "सहायता केंद्र",
      contactUs: "संपर्क करें",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      footerCopyright: "© 2024 एग्रीइंटेल। सभी अधिकार सुरक्षित। भारतीय किसानों के लिए ❤️ के साथ बनाया गया"
    },
    chatbot: {
      title: "एग्रीबॉट - AI खेती सहायक",
      subtitle: "AI खेती सहायक",
      online: "ऑनलाइन",
      thinking: "सोच रहा है...",
      placeholder: "फसलों, कीट नियंत्रण, उर्वरकों, या खेती की तकनीकों के बारे में पूछें...",
      welcomeMessage: "नमस्ते! मैं एग्रीबॉट हूं, आपका AI खेती सहायक। मैं फसल प्रबंधन, कीट नियंत्रण, उर्वरक, सिंचाई, और भारतीय परिस्थितियों के अनुकूल खेती की तकनीकों में आपकी मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
      fertilizerAdvice: "उर्वरक सलाह",
      pestControl: "कीट नियंत्रण",
      plantingTime: "बुआई का समय",
      cropDisease: "फसल रोग",
      seasonalCrops: "मौसमी फसलें",
      errorTitle: "त्रुटि",
      errorMessage: "AI सहायक से प्रतिक्रिया प्राप्त करने में विफल। कृपया पुनः प्रयास करें।",
      disclaimer: "यह चैटबॉट सामान्य कृषि सलाह प्रदान करता है और पेशेवर परामर्श का विकल्प नहीं है।",
    },
    market: {
      title: "लाइव बाज़ार की कीमतें",
      subtitle: "विभिन्न राज्यों में वास्तविक समय की मंडी कीमतें प्राप्त करें",
      priceSearch: "कीमत खोज",
      selectCrop: "फसल चुनें",
      selectState: "राज्य चुनें",
      chooseCrop: "एक फसल चुनें",
      chooseState: "एक राज्य चुनें",
      getPrices: "कीमतें पाएं",
      loading: "लोड हो रहा है...",
      mandi: "मंडी",
      price: "कीमत",
      unit: "इकाई",
      date: "तारीख",
      today: "आज",
      noPriceData: "कोई कीमत डेटा उपलब्ध नहीं",
      availableCrops: "उपलब्ध फसलें",
      majorCropsTracked: "प्रमुख फसलों का ट्रैक",
      statesCovered: "राज्य कवर किए गए",
      agriculturalStates: "कृषि राज्य",
      dataFreshness: "डेटा ताजगी",
      realTimeUpdates: "वास्तविक समय अपडेट",
      high: "उच्च",
      moderate: "मध्यम",
      low: "कम",
      errorMessage: "कीमत डेटा प्राप्त करने में विफल। कृपया पुनः प्रयास करें।"
    },
    weather: {
      title: "मौसम सलाह",
      subtitle: "अपने स्थान के लिए मौसम आधारित खेती की सिफारिशें प्राप्त करें",
      getWeatherAdvice: "मौसम सलाह लें",
      placeholder: "अपने शहर का नाम दर्ज करें (जैसे, दिल्ली, मुंबई, जयपुर)",
      getAdvice: "सलाह लें",
      loading: "लोड हो रहा है...",
      quickSelect: "त्वरित चयन:",
      currentWeather: "वर्तमान मौसम",
      temperature: "तापमान",
      humidity: "नमी",
      farmingAdvisory: "खेती सलाह",
      weatherBasedAdvice: "मौसम आधारित सलाह",
      weatherBasedDesc: "वर्तमान मौसम स्थितियों के आधार पर व्यक्तिगत खेती की सिफारिशें प्राप्त करें",
      locationSpecific: "स्थान विशिष्ट",
      locationSpecificDesc: "आपके विशिष्ट भौगोलिक स्थान और जलवायु के अनुकूल सलाह",
      realTimeData: "वास्तविक समय डेटा",
      realTimeDataDesc: "सटीक खेती मार्गदर्शन के लिए अद्यतन मौसम जानकारी",
      weatherTips: "मौसम सलाह युक्तियां",
      rainySeason: "बारिश का मौसम",
      drySeason: "शुष्क मौसम",
      rainyTips: "• भारी बारिश के दौरान उर्वरक का प्रयोग न करें\n• धान के पौधे रोपने का अच्छा समय\n• फसलों में फंगल रोगों की निगरानी करें\n• खेतों में उचित जल निकासी सुनिश्चित करें",
      dryTips: "• सिंचाई की आवृत्ति बढ़ाएं\n• परिपक्व फसलों की कटाई के लिए उत्तम\n• खेत तैयारी के लिए अच्छी स्थितियां\n• कीटनाशक छिड़काव के लिए आदर्श",
      errorTitle: "त्रुटि",
      errorMessage: "मौसम सलाह प्राप्त करने में विफल। कृपया पुनः प्रयास करें।",
      cityRequired: "कृपया शहर का नाम दर्ज करें।"
    },
    common: {
      error: "त्रुटि",
      send: "भेजें",
      search: "खोजें",
      back: "वापस",
      home: "होम"
    }
  }
};

export function useTranslation(language: Language) {
  return translations[language];
}