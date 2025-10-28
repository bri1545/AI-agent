import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: i18n.language === "ru" 
        ? "Здравствуйте! Я ваш помощник по Digital Urpaq. Чем могу помочь вам сегодня?" 
        : i18n.language === "kz"
        ? "Сәлеметсіз бе! Мен Digital Urpaq бойынша сіздің көмекшіңізбін. Бүгін сізге қалай көмектесе аламын?"
        : "Hello! I'm your Digital Urpaq assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [assistantEmotion, setAssistantEmotion] = useState<"happy" | "thinking" | "excited" | "wink">("happy");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      setAssistantEmotion("thinking");
      
      // Get current messages state
      let currentMessages: Message[] = [];
      setMessages(prev => {
        currentMessages = prev;
        return prev;
      });
      
      // Add the user message to the conversation
      const newMessages = [...currentMessages, { role: "user" as const, content: userMessage }];
      
      // Send the full conversation history to the backend
      const response = await apiRequest("POST", "/api/chat", {
        messages: newMessages,
        language: i18n.language
      });
      
      return { response, userMessage };
    },
    onSuccess: (data) => {
      // Only append user message and assistant response
      setMessages(prev => [
        ...prev,
        { role: "user", content: data.userMessage },
        { role: "assistant", content: data.response.message }
      ]);
      setAssistantEmotion("excited");
      setTimeout(() => setAssistantEmotion("happy"), 2000);
    },
    onError: (error: Error) => {
      setAssistantEmotion("happy");
      console.error("Chat error:", error);
      // Show error to user
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: i18n.language === "ru" 
            ? "Извините, произошла ошибка. Пожалуйста, попробуйте ещё раз."
            : i18n.language === "kz"
            ? "Кешіріңіз, қате орын алды. Қайталап көріңіз."
            : "Sorry, an error occurred. Please try again."
        }
      ]);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setInput("");
    chatMutation.mutate(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handle clicking on assistant character
  const handleAssistantClick = () => {
    const emotions: Array<"happy" | "thinking" | "excited" | "wink"> = ["happy", "thinking", "excited", "wink"];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setAssistantEmotion(randomEmotion);
    setTimeout(() => setAssistantEmotion("happy"), 2000);
  };

  // Animated assistant character component
  const AnimatedAssistant = ({ emotion }: { emotion: string }) => {
    const getEyesAndMouth = () => {
      switch (emotion) {
        case "happy":
          return {
            leftEye: "88,65",
            rightEye: "112,65",
            mouth: "M 85 80 Q 100 88 115 80"
          };
        case "thinking":
          return {
            leftEye: "86,65",
            rightEye: "114,65",
            mouth: "M 85 82 L 115 82"
          };
        case "excited":
          return {
            leftEye: "88,63",
            rightEye: "112,63",
            mouth: "M 82 78 Q 100 92 118 78"
          };
        case "wink":
          return {
            leftEye: "88,65",
            rightEye: "112,70",
            mouth: "M 88 82 Q 100 86 112 82"
          };
        default:
          return {
            leftEye: "88,65",
            rightEye: "112,65",
            mouth: "M 85 80 Q 100 88 115 80"
          };
      }
    };

    const { leftEye, rightEye, mouth } = getEyesAndMouth();

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAssistantClick}
        className="cursor-pointer"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <circle cx="100" cy="120" r="60" fill="#42A5F5" />
          <circle cx="100" cy="70" r="40" fill="#64B5F6" />
          <circle
            cx={leftEye.split(',')[0]}
            cy={leftEye.split(',')[1]}
            r={emotion === "wink" ? "2" : "6"}
            fill="#212121"
          />
          <circle
            cx={rightEye.split(',')[0]}
            cy={rightEye.split(',')[1]}
            r="6"
            fill="#212121"
          />
          <path
            d={mouth}
            stroke="#212121"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="60" cy="110" r="15" fill="#42A5F5" />
          <circle cx="140" cy="110" r="15" fill="#42A5F5" />
          <rect x="75" y="130" width="50" height="35" rx="4" fill="#BBDEFB" />
          <line x1="80" y1="140" x2="120" y2="140" stroke="#42A5F5" strokeWidth="2" />
          <line x1="80" y1="148" x2="120" y2="148" stroke="#42A5F5" strokeWidth="2" />
          <line x1="80" y1="156" x2="110" y2="156" stroke="#42A5F5" strokeWidth="2" />
        </svg>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center mb-4">
            <AnimatedAssistant emotion={assistantEmotion} />
          </div>
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-chat-title">
            {t("chatWithAssistant")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("askAboutDigitalurpaq")}
          </p>
        </div>

        <Card className="h-[600px] flex flex-col" data-testid="chat-container">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
                data-testid={`chat-message-${index}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {chatMutation.isPending && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("typeYourMessage") || "Type your message..."}
                className="flex-1 resize-none"
                rows={2}
                disabled={chatMutation.isPending}
                data-testid="chat-input"
              />
              <Button
                type="submit"
                disabled={!input.trim() || chatMutation.isPending}
                className="self-end"
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
