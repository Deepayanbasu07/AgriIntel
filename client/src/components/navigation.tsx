import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sprout, MessageCircle, TrendingUp, CloudSun, Menu } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [language, setLanguage] = useState<"en" | "hi">("en");

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
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <MessageCircle size={16} />
                <span>Chatbot</span>
              </Button>
            </Link>
            <Link href="/market">
              <Button 
                variant={location === "/market" ? "default" : "ghost"}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <TrendingUp size={16} />
                <span>Market</span>
              </Button>
            </Link>
            <Link href="/weather">
              <Button 
                variant={location === "/weather" ? "default" : "ghost"}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <CloudSun size={16} />
                <span>Weather</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/chatbot">
                    <Button 
                      variant={location === "/chatbot" ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      Chatbot
                    </Button>
                  </Link>
                  <Link href="/market">
                    <Button 
                      variant={location === "/market" ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <TrendingUp size={16} className="mr-2" />
                      Market
                    </Button>
                  </Link>
                  <Link href="/weather">
                    <Button 
                      variant={location === "/weather" ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <CloudSun size={16} className="mr-2" />
                      Weather
                    </Button>
                  </Link>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Language</p>
                    <div className="flex space-x-2">
                      <Button 
                        variant={language === "en" ? "outline" : "ghost"}
                        size="sm"
                        onClick={() => setLanguage("en")}
                        className="flex-1"
                      >
                        EN
                      </Button>
                      <Button 
                        variant={language === "hi" ? "outline" : "ghost"}
                        size="sm"
                        onClick={() => setLanguage("hi")}
                        className="flex-1"
                      >
                        हिं
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop Language Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant={language === "en" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 ${
                language === "en" 
                  ? "bg-[var(--agri-green-100)] text-[var(--agri-primary)] hover:bg-[var(--agri-green-200)]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              EN
            </Button>
            <Button 
              variant={language === "hi" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setLanguage("hi")}
              className={`px-3 py-1 ${
                language === "hi" 
                  ? "bg-[var(--agri-green-100)] text-[var(--agri-primary)] hover:bg-[var(--agri-green-200)]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              हिं
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
