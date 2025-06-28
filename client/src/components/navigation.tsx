import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sprout, MessageCircle, TrendingUp, CloudSun } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-lg border-b-4 border-[var(--agri-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-[var(--agri-primary)] p-2 rounded-lg">
                <Sprout className="text-white text-xl" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--agri-primary)]">AgriIntel</h1>
                <p className="text-xs text-gray-600">AI Assistant for Farmers</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/chatbot">
              <Button 
                variant={location === "/chatbot" ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>Chatbot</span>
              </Button>
            </Link>
            <Link href="/market">
              <Button 
                variant={location === "/market" ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <TrendingUp size={16} />
                <span>Market</span>
              </Button>
            </Link>
            <Link href="/weather">
              <Button 
                variant={location === "/weather" ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <CloudSun size={16} />
                <span>Weather</span>
              </Button>
            </Link>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              size="sm"
              className="px-3 py-1 bg-[var(--agri-green-100)] text-[var(--agri-primary)] hover:bg-[var(--agri-green-200)]"
            >
              EN
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              हिं
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
