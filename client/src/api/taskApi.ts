import axios from 'axios';


export const taskApi = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await axios.get('/tasks/getall');
      return response;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (newTask2: any) => {
    console.log('Creating task with data:', newTask2);
    try {
      const response = await axios.post('/tasks/add', {newTask2});
      return response;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update an existing task
  updateTask: async (id: string, taskData: any) => {
    try {
      const response = await axios.post('/tasks/update', { id, ...taskData });
      return response.data;
    } catch (error) {
      console.error(`Error updating task with id ${id}:`, error);
      throw error;
    }
  },

  // Update task status only (mark as complete/pending/etc)
  updateTaskStatus: async (id: string, completed: boolean) => {
    try {
      const response = await axios.post('/tasks/completion', { id, completed });
      return response.data;
    } catch (error) {
      console.error(`Error updating task status for id ${id}:`, error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id: string) => {
    try {
      await axios.post('/tasks/delete', { id });
      return true;
    } catch (error) {
      console.error(`Error deleting task with id ${id}:`, error);
      throw error;
    }
  }
};
