import axios from 'axios';

export const chatApi = {
    // This is for the AI assistant chat
    normalChat: async (message: string) => {
      try {
        const response = await axios.post('/ai/assistant-chat', { message });
        return response;
      } catch (error) {
        console.error(`Error sending message to gpt in normal chat:`, error);
        throw error;
      }
    },
    subtaskingChat: async (message: string) => {
        try {
          const response = await axios.post('/ai/subtasks', { message });
          return response;
        } catch (error) {
          console.error(`Error sending message to gpt in subtasking chat:`, error);
          throw error;
        }
      },
    categorizingChat: async (message: string) => {
        try {
          const response = await axios.post('/ai/categorize', { message });
          return response;
        } catch (error) {
          console.error(`Error sending message to gpt in categorizing chat:`, error);
          throw error;
        }
    }
  };