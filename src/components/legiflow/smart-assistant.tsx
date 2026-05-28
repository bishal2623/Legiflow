'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { processQuery, ChatMessage } from '@/lib/assistant-logic';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  "Show my pending cases",
  "Upcoming hearings",
  "Recent documents",
  "Give me insights"
];

const markdownComponents = {
  p: ({node, ...props}: any) => <p className="mb-1.5 last:mb-0" {...props} />,
  ul: ({node, ...props}: any) => <ul className="pl-4 mb-1.5 space-y-1 list-disc" {...props} />,
  li: ({node, ...props}: any) => <li className="marker:text-muted-foreground text-xs" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-foreground" {...props} />
};

export function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Welcome message
      setMessages([
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Hello! I'm your Legiflow Assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate network/bot delay
    setTimeout(async () => {
      const responseContent = await processQuery(text, messages);
      const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full sm:w-[380px] h-[550px] mb-4 shadow-2xl flex flex-col border border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 overflow-hidden rounded-2xl"
          >
            <Card className="border-0 bg-transparent flex flex-col h-full rounded-none">
              {/* Header */}
              <CardHeader className="p-4 border-b bg-muted/30 flex flex-row items-center justify-between space-y-0 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Smart Assistant</CardTitle>
                    <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Always here to help</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={toggleChat}>
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin" ref={scrollRef}>
                 {messages.map((msg) => (
                    <motion.div 
                      key={msg.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-full space-y-1`}
                    >
                        <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted border text-foreground'}`}>
                                {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                            </div>
                            
                            {/* Bubble */}
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                    ? 'bg-primary text-primary-foreground rounded-br-sm shadow-md shadow-primary/10' 
                                    : 'bg-muted/65 text-foreground border border-border/50 rounded-bl-sm prose prose-sm dark:prose-invert max-w-none shadow-sm'
                            }`}>
                                {msg.role === 'user' ? (
                                    msg.content
                                ) : (
                                    <ReactMarkdown components={markdownComponents}>
                                      {msg.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </div>
                        {/* Timestamp */}
                        <span className="text-[9px] text-muted-foreground px-8 opacity-70">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </motion.div>
                 ))}

                 {isTyping && (
                    <div className="flex flex-col items-start space-y-1">
                        <div className="flex items-end gap-2 flex-row">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted border text-foreground flex items-center justify-center">
                                <Bot className="w-3 h-3" />
                            </div>
                            <div className="p-3.5 rounded-2xl rounded-bl-sm bg-muted/65 border border-border/50 flex gap-1 items-center h-[38px] shadow-sm">
                                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                 )}
              </div>

              {/* Input Area */}
              <div className="p-3 border-t bg-card/40 border-border/30 rounded-b-2xl">
                {/* Suggestions */}
                {messages.length < 3 && (
                   <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2.5 mb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                      {SUGGESTIONS.map((sug, i) => (
                        <button 
                           key={i} 
                           onClick={() => handleSend(sug)}
                           className="whitespace-nowrap px-3 py-1.5 bg-secondary/60 hover:bg-secondary text-secondary-foreground text-[10px] rounded-full transition-all border border-border/40 font-medium active:scale-95"
                        >
                          {sug}
                        </button>
                      ))}
                   </div>
                )}
                
                <div className="flex gap-2">
                   <Input 
                     placeholder="Type a message..." 
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={handleKeyDown}
                     className="flex-1 rounded-full bg-background/50 border-border/50 focus-visible:ring-1 focus-visible:ring-primary/40 placeholder:text-muted-foreground/60 text-sm h-9"
                   />
                   <Button 
                     onClick={() => handleSend(inputValue)} 
                     disabled={!inputValue.trim() || isTyping}
                     size="icon"
                     className="rounded-full shadow-md shrink-0 h-9 w-9 bg-primary hover:bg-primary/95"
                   >
                     <Send className="w-3.5 h-3.5" />
                   </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          size="icon" 
          onClick={toggleChat}
          className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-muted text-foreground hover:bg-muted/80' : 'bg-primary hover:bg-primary/95'} flex items-center justify-center`}
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        </Button>
      </motion.div>
    </div>
  );
}
