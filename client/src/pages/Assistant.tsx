
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AIAssistant from '@/components/assistant/AIAssistant';

const AssistantPage = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Get help with task planning, scheduling, and productivity tips
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <div className="lg:col-span-2 h-full">
          <AIAssistant />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-5">
            <h2 className="text-lg font-semibold mb-3">How can the AI help you?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>
                <span>
                  <strong className="font-medium block">Task Planning</strong>
                  <span className="text-sm text-muted-foreground">Break down complex tasks into manageable steps</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>
                <span>
                  <strong className="font-medium block">Schedule Optimization</strong>
                  <span className="text-sm text-muted-foreground">Get personalized recommendations for your day</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>
                <span>
                  <strong className="font-medium block">Productivity Tips</strong>
                  <span className="text-sm text-muted-foreground">Learn techniques to improve focus and efficiency</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>
                <span>
                  <strong className="font-medium block">Task Templates</strong>
                  <span className="text-sm text-muted-foreground">Generate templates for recurring tasks</span>
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg border p-5">
            <h2 className="text-lg font-semibold mb-3">Example Questions</h2>
            <div className="space-y-2 text-sm">
              <p className="py-2 px-3 bg-blue-50 rounded-md">"How can I break down my website redesign project?"</p>
              <p className="py-2 px-3 bg-blue-50 rounded-md">"What's the most efficient way to organize my weekly tasks?"</p>
              <p className="py-2 px-3 bg-blue-50 rounded-md">"Suggest a daily routine to improve my productivity"</p>
              <p className="py-2 px-3 bg-blue-50 rounded-md">"Help me prioritize my current tasks"</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AssistantPage;
