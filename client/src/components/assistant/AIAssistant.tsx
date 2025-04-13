import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontal, Bot, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI task assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    try {
      // Send API request using axios
      const response = await axios.post('/ai/assistant-chat', {
        message: input,
      });

      // Add AI response
      console.log(response.data.reply);
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.data.reply, // Assuming the API returns the response in a field named 'response'
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  const handleGenerateSubtasks = async () => {
    try {
      const response = await axios.post('/ai/subtasks', {
        message: input,
      });

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.data.subtasks, // Assuming the API returns subtasks in a field named 'subtasks'
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating subtasks:', error);
    }
  };

  const handleOptimizeSchedule = async () => {
    try {
      const response = await axios.post('/ai/categorize', {
        message: input,
      });

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.data.category, // Assuming the API returns the optimized schedule in a field named 'optimizedSchedule'
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error optimizing schedule:', error);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="px-4 py-3 border-b bg-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Task Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[85%]",
                message.isUser ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <Avatar className="h-8 w-8">
                {message.isUser ? (
                  <>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary">JD</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarFallback className="bg-blue-600">AI</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={cn(
                  "rounded-lg px-4 py-2 text-sm",
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for task suggestions or productivity tips..."
              className="min-h-[60px] flex-1"
            />
            <Button className="shrink-0" onClick={handleSendMessage}>
              <SendHorizontal className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={handleGenerateSubtasks}
            >
              <PlusCircle className="h-3 w-3 mr-1" />
              Generate subtasks
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={handleOptimizeSchedule}
            >
              <PlusCircle className="h-3 w-3 mr-1" />
              Optimize my schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
