import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { chatApi } from "@/lib/api";
import type { ChatRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm AgriBot, your AI farming assistant. I can help you with crop management, pest control, fertilizers, irrigation, and farming techniques suitable for Indian conditions. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: (request: ChatRequest) => chatApi.sendMessage(request),
    onSuccess: (response) => {
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: response.reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to get response from AI assistant. Please try again.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    }
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user", 
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    chatMutation.mutate({
      query: inputValue,
      language: "en"
    });

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--agri-green-50)] to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="h-[80vh] flex flex-col">
          <CardHeader className="bg-[var(--agri-primary)] text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Bot size={24} />
              <span>AgriBot - AI Farming Assistant</span>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm">Online</span>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-[var(--agri-primary)] text-white"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "bot" && <Bot size={16} className="mt-1 flex-shrink-0" />}
                        {message.type === "user" && <User size={16} className="mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {chatMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-[var(--agri-primary)] text-white px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot size={16} />
                        <Loader2 size={16} className="animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about crops, pest control, fertilizers, or farming techniques..."
                  className="flex-1"
                  disabled={chatMutation.isPending}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || chatMutation.isPending}
                  className="bg-[var(--agri-primary)] hover:bg-[var(--agri-primary)]/90"
                >
                  <Send size={16} />
                </Button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("What's the best fertilizer for wheat crops?")}
                  disabled={chatMutation.isPending}
                >
                  Fertilizer advice
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("How to control pests in tomato plants?")}
                  disabled={chatMutation.isPending}
                >
                  Pest control
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("When is the best time to plant rice?")}
                  disabled={chatMutation.isPending}
                >
                  Planting time
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
