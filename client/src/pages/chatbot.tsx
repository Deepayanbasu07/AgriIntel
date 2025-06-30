import { useState, useRef, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, ArrowDown, Lightbulb, Sparkles } from "lucide-react";
import { chatApi } from "@/lib/api";
import type { ChatRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "react-error-boundary";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "What's the best fertilizer for wheat crops?",
  "How to control pests in tomato plants?",
  "When is the best time to plant rice in Punjab?",
  "My crop leaves are turning yellow, what should I do?",
  "What crops should I plant this month?",
];

export default function Chatbot() {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: t.chatbot.welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: (request: ChatRequest) => chatApi.sendMessage(request),
    onSuccess: (response) => {
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: response.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
    onError: (error) => {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: "bot",
        content: t.chatbot.errorMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: t.chatbot.errorTitle,
        description: t.chatbot.errorMessage,
        variant: "destructive",
      });
      console.error("Chat error:", error);
    },
  });

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate({
      query: inputValue,
      language: language,
    });
    setInputValue("");
  }, [inputValue, language, chatMutation]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const atBottom = scrollHeight - scrollTop <= clientHeight + 10;
    setIsAtBottom(atBottom);
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
      setIsAtBottom(true);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  // Always scroll to bottom when a new message is added, even if not at bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  function ErrorFallback({ error }: { error: Error }) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded mb-4">
        <strong>Something went wrong:</strong>
        <pre className="whitespace-pre-wrap break-words">{error.message}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gradient-to-br from-[var(--agri-green-50)] to-green-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="flex flex-col border border-[var(--agri-green-200)] shadow-lg min-h-[500px] max-h-[90vh] h-auto">
            <CardHeader className="bg-gradient-to-r from-[var(--agri-primary)] to-[var(--agri-primary-dark)] text-white rounded-t-lg py-4">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 break-words whitespace-pre-wrap w-full">
                <div className="flex items-center space-x-3 w-full">
                  <Bot size={24} className="text-green-200 flex-shrink-0" />
                  <span className="text-xl font-bold break-words whitespace-pre-wrap w-full">{t.chatbot.title}</span>
                </div>
                <div className="ml-0 sm:ml-auto flex items-center space-x-2 bg-[var(--agri-primary-light)] px-3 py-1 rounded-full w-max">
                  <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium break-words whitespace-pre-wrap">{t.chatbot.online}</span>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-0">
              <div className="relative flex-1 min-h-0 flex flex-col">
                <ScrollArea
                  ref={scrollAreaRef}
                  className="flex-1 w-full p-4 bg-[var(--agri-green-25)] overflow-y-auto min-h-0"
                  onScroll={handleScroll}
                >
                  <div className="space-y-5 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.type === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] min-w-[20%] px-4 py-3 rounded-2xl shadow-sm",
                            message.type === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white border border-[var(--agri-green-100)] text-[var(--agri-primary-darker)] rounded-bl-none"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {message.type === "bot" ? (
                                <Bot size={18} className="text-[var(--agri-primary)]" />
                              ) : (
                                <User size={18} className="text-blue-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              {message.type === "bot" ? (
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  rehypePlugins={[rehypeHighlight]}
                                  components={{
                                    p: ({ node, ...props }) => (
                                      <p {...props} className="mb-3 text-base leading-relaxed whitespace-pre-wrap text-[var(--agri-primary-darker)]" />
                                    ),
                                    strong: ({ node, ...props }) => (
                                      <strong {...props} className="font-semibold text-[var(--agri-primary-dark)]" />
                                    ),
                                    ul: ({ node, ...props }) => (
                                      <ul {...props} className="ml-5 mb-3 list-disc space-y-1" />
                                    ),
                                    ol: ({ node, ...props }) => (
                                      <ol {...props} className="ml-5 mb-3 list-decimal space-y-1" />
                                    ),
                                    li: ({ node, ...props }) => (
                                      <li {...props} className="pl-1" />
                                    ),
                                    code: ({ node, inline, className, children, ...props }: any) => (
                                      <code
                                        className={cn(
                                          className,
                                          "bg-[var(--agri-green-75)] border border-[var(--agri-green-150)] rounded px-1 py-0.5 text-[0.9em] text-gray-800",
                                          !inline && "block p-3 my-2"
                                        )}
                                        {...props}
                                      >
                                        {children}
                                      </code>
                                    ),
                                    a: ({ node, ...props }) => (
                                      <a
                                        {...props}
                                        className="text-[var(--agri-primary)] hover:text-[var(--agri-primary-dark)] underline font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      />
                                    ),
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              ) : (
                                <p className="text-base whitespace-pre-wrap">{message.content}</p>
                              )}
                              <p className={cn(
                                "text-xs mt-2",
                                message.type === "user" 
                                  ? "text-blue-100" 
                                  : "text-[var(--agri-green-600)]"
                              )}>
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {chatMutation.isPending && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-[var(--agri-green-100)] text-[var(--agri-primary-darker)] px-4 py-3 rounded-2xl rounded-bl-none">
                          <div className="flex items-center space-x-3">
                            <Bot size={18} className="text-[var(--agri-primary)]" />
                            <Loader2 size={18} className="animate-spin text-[var(--agri-primary)]" />
                            <span className="text-sm font-medium">{t.chatbot.thinking}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="border-t border-[var(--agri-green-200)] px-4 py-3 bg-white sticky bottom-0 z-10">
                  <div className="flex items-end gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={t.chatbot.placeholder}
                      className="flex-1 min-h-[56px] py-3 resize-none bg-white"
                      disabled={chatMutation.isPending}
                      aria-label="Type your message"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || chatMutation.isPending}
                      className="bg-gradient-to-r from-[var(--agri-primary)] to-[var(--agri-primary-dark)] hover:from-[var(--agri-primary-dark)] hover:to-[var(--agri-primary-darker)] h-[56px] w-[56px]"
                      aria-label="Send message"
                    >
                      {chatMutation.isPending ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Send size={20} />
                      )}
                    </Button>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={16} className="text-[var(--agri-primary)]" />
                      <span className="text-sm font-medium text-[var(--agri-primary-dark)]">
                        Quick Prompts
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_PROMPTS.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="bg-white border-[var(--agri-green-200)] text-[var(--agri-primary-darker)] hover:bg-[var(--agri-green-50)] whitespace-normal text-left h-auto py-2 font-medium"
                          onClick={() => handleQuickPrompt(prompt)}
                          disabled={chatMutation.isPending}
                        >
                          <Sparkles size={14} className="mr-2 text-[var(--agri-primary)] flex-shrink-0" />
                          <span className="font-normal">{prompt}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-[var(--agri-green-50)] border-t border-[var(--agri-green-200)] py-2 px-4">
              <p className="text-xs text-[var(--agri-primary-dark)] opacity-75">
                {t.chatbot.disclaimer}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
}