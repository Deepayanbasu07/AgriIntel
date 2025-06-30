import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, MapPin, Thermometer, Droplets, Loader2, AlertCircle } from "lucide-react";
import { weatherApi } from "@/lib/api";
import type { WeatherAdviceRequest, WeatherAdviceResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Weather() {
  const { language, t } = useLanguage();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherAdviceResponse | null>(null);
  const { toast } = useToast();

  const weatherMutation = useMutation({
    mutationFn: (request: WeatherAdviceRequest) => weatherApi.getAdvice(request),
    onSuccess: (response) => {
      setWeatherData(response);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to get weather advice. Please try again.",
        variant: "destructive",
      });
      console.error("Weather error:", error);
    }
  });

  const handleGetWeatherAdvice = () => {
    if (!city.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name.",
        variant: "destructive",
      });
      return;
    }

    weatherMutation.mutate({
      city: city.trim(),
      language: language
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGetWeatherAdvice();
    }
  };

  const quickCities = ["Delhi", "Mumbai", "Jaipur", "Pune", "Chandigarh", "Lucknow", "Kolkata", "Chennai"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--agri-green-50)] to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 break-words whitespace-pre-wrap">{t.weather.title}</h1>
          <p className="text-xl text-gray-600">
            {t.weather.subtitle}
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CloudSun className="text-[var(--weather-blue)]" size={24} />
              <span>Get Weather Advice</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your city name (e.g., Delhi, Mumbai, Jaipur)"
                    className="w-full"
                    disabled={weatherMutation.isPending}
                  />
                </div>
                <Button 
                  onClick={handleGetWeatherAdvice}
                  disabled={!city.trim() || weatherMutation.isPending}
                  className="bg-[var(--weather-blue)] hover:bg-[var(--weather-blue)]/90 text-white"
                >
                  {weatherMutation.isPending ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <MapPin size={16} className="mr-2" />
                      Get Advice
                    </>
                  )}
                </Button>
              </div>

              {/* Quick City Buttons */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Quick select:</p>
                <div className="flex flex-wrap gap-2">
                  {quickCities.map((quickCity) => (
                    <Button
                      key={quickCity}
                      variant="outline"
                      size="sm"
                      onClick={() => setCity(quickCity)}
                      disabled={weatherMutation.isPending}
                    >
                      {quickCity}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Result */}
        {weatherData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="text-[var(--weather-blue)]" size={20} />
                <span>{weatherData.city}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weather Info */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Current Weather</h3>
                    <p className="text-lg font-medium text-[var(--weather-blue)]">
                      {weatherData.weather}
                    </p>
                  </div>

                  {(weatherData.temperature || weatherData.humidity) && (
                    <div className="grid grid-cols-2 gap-4">
                      {weatherData.temperature && (
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
                          <Thermometer className="mx-auto mb-2 text-orange-500" size={24} />
                          <p className="text-lg font-bold text-orange-600">
                            {weatherData.temperature}°C
                          </p>
                          <p className="text-sm text-gray-600">Temperature</p>
                        </div>
                      )}

                      {weatherData.humidity && (
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                          <Droplets className="mx-auto mb-2 text-blue-500" size={24} />
                          <p className="text-lg font-bold text-blue-600">
                            {weatherData.humidity}%
                          </p>
                          <p className="text-sm text-gray-600">Humidity</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Farming Advice */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <CloudSun className="text-[var(--agri-primary)]" size={20} />
                    <span>Farming Advisory</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {weatherData.advice}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <CloudSun className="mx-auto mb-4 text-[var(--agri-primary)]" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Weather-Based Advice</h3>
              <p className="text-sm text-gray-600">
                Get personalized farming recommendations based on current weather conditions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <MapPin className="mx-auto mb-4 text-[var(--weather-blue)]" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Location-Specific</h3>
              <p className="text-sm text-gray-600">
                Advice tailored to your specific geographic location and climate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 text-center">
              <Thermometer className="mx-auto mb-4 text-[var(--price-amber)]" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Data</h3>
              <p className="text-sm text-gray-600">
                Up-to-date weather information for accurate farming guidance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weather Advisory Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Rainy Season</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Avoid fertilizer application during heavy rain</li>
                  <li>• Good time for transplanting rice seedlings</li>
                  <li>• Monitor crops for fungal diseases</li>
                  <li>• Ensure proper drainage in fields</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Dry Season</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Increase irrigation frequency</li>
                  <li>• Perfect for harvesting mature crops</li>
                  <li>• Good conditions for field preparation</li>
                  <li>• Ideal for pesticide application</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
