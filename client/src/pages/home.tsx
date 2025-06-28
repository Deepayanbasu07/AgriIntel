import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, TrendingUp, CloudSun, Brain, Smartphone, Globe, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--agri-green-50)] to-green-100">
      {/* Hero Section */}
      <div className="agri-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Smart Farming with AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Get expert crop advice, live market prices, and weather recommendations - all powered by artificial intelligence
          </p>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/chatbot">
              <Button className="bg-white text-[var(--agri-primary)] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg min-w-44">
                <MessageCircle className="mr-2" size={20} />
                Start Chatbot
              </Button>
            </Link>
            <Link href="/market">
              <Button 
                variant="outline" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[var(--agri-primary)] transition-all transform hover:scale-105 min-w-44"
              >
                <TrendingUp className="mr-2" size={20} />
                Market Prices
              </Button>
            </Link>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-green-200">Farmers Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-green-200">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">Live</div>
              <div className="text-green-200">Market Data</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Farming Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access cutting-edge AI technology designed specifically for Indian agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chatbot Card */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-green-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-[var(--agri-primary)] p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <MessageCircle className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Crop Advisory</h3>
                  <p className="text-gray-600 mb-6">Get instant expert advice on crop management, pest control, and farming techniques</p>
                </div>
                
                {/* Mock Chat Interface Preview */}
                <div className="bg-white rounded-lg p-4 mb-6 shadow-inner">
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">My wheat crop has yellow leaves. What should I do?</p>
                    </div>
                    <div className="bg-[var(--agri-primary)] text-white rounded-lg p-3 max-w-xs ml-auto">
                      <p className="text-sm">This could indicate nitrogen deficiency. I recommend soil testing and applying urea fertilizer...</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/chatbot">
                  <Button className="w-full bg-[var(--agri-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--agri-primary)]/90 transition-colors">
                    Start Chatting
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Market Card */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-orange-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-[var(--price-amber)] p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Live Market Prices</h3>
                  <p className="text-gray-600 mb-6">Track real-time mandi prices across different states and make informed selling decisions</p>
                </div>
                
                {/* Mock Price Table Preview */}
                <div className="bg-white rounded-lg p-4 mb-6 shadow-inner">
                  <div className="text-center mb-3">
                    <div className="text-sm font-medium text-gray-700">Today's Prices</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">Wheat (Punjab)</span>
                      <span className="text-sm font-bold text-[var(--price-amber)]">₹2,200/qt</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">Rice (W.Bengal)</span>
                      <span className="text-sm font-bold text-[var(--price-amber)]">₹2,500/qt</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/market">
                  <Button className="w-full bg-[var(--price-amber)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--price-amber)]/90 transition-colors">
                    View Prices
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Weather Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-blue-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-[var(--weather-blue)] p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <CloudSun className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Weather Advisory</h3>
                  <p className="text-gray-600 mb-6">Get weather-based farming recommendations and optimal timing for agricultural activities</p>
                </div>
                
                {/* Mock Weather Card Preview */}
                <div className="bg-white rounded-lg p-4 mb-6 shadow-inner">
                  <div className="text-center mb-3">
                    <div className="text-sm font-medium text-gray-700">Delhi Weather</div>
                    <div className="text-lg font-bold text-[var(--weather-blue)]">Light Rain Expected</div>
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    Ideal conditions for sowing bajra. Avoid fertilizer application.
                  </div>
                </div>
                
                <Link href="/weather">
                  <Button className="w-full bg-[var(--weather-blue)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--weather-blue)]/90 transition-colors">
                    Get Weather Advice
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgriIntel?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[var(--agri-green-100)] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="text-[var(--agri-primary)]" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">Advanced machine learning algorithms trained on Indian agricultural data</p>
            </div>

            <div className="text-center">
              <div className="bg-[var(--agri-green-100)] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="text-[var(--agri-primary)]" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile First</h3>
              <p className="text-gray-600 text-sm">Designed for smartphones and works offline for rural connectivity</p>
            </div>

            <div className="text-center">
              <div className="bg-[var(--agri-green-100)] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="text-[var(--agri-primary)]" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multilingual</h3>
              <p className="text-gray-600 text-sm">Support for English, Hindi, and regional Indian languages</p>
            </div>

            <div className="text-center">
              <div className="bg-[var(--agri-green-100)] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="text-[var(--agri-primary)]" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Available</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance for urgent farming queries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-[var(--agri-primary)] p-2 rounded-lg">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AgriIntel</h3>
                  <p className="text-gray-400 text-sm">Empowering farmers with AI</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                AgriIntel is dedicated to revolutionizing Indian agriculture through cutting-edge AI technology, 
                providing farmers with intelligent solutions for better crop management and increased productivity.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/chatbot" className="hover:text-white transition-colors">AI Chatbot</Link></li>
                <li><Link href="/market" className="hover:text-white transition-colors">Market Prices</Link></li>
                <li><Link href="/weather" className="hover:text-white transition-colors">Weather Advisory</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgriIntel. All rights reserved. Built for Indian farmers with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
