import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { Task, TaskStatus } from '@/components/tasks/TaskCard';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import axios from 'axios';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete dashboard design',
    description: 'Finish the UI design for the dashboard and export assets for development',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    priority: 'high',
    status: 'pending',
    category: 'Design',
  },
  {
    id: '2',
    title: 'Weekly team meeting',
    description: 'Discuss project progress and assign new tasks',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    priority: 'medium',
    status: 'pending',
    category: 'Meetings',
  },
  {
    id: '3',
    title: 'Review client feedback',
    description: 'Go through client feedback and make necessary adjustments',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    priority: 'high',
    status: 'overdue',
    category: 'Client',
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Update the project documentation with recent changes',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    priority: 'low',
    status: 'completed',
    category: 'Documentation',
  },
  {
    id: '5',
    title: 'Prepare for client presentation',
    description: 'Create slides and gather materials for the upcoming client meeting',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    priority: 'high',
    status: 'pending',
    category: 'Client',
  },
  {
    id: '6',
    title: 'Research new technologies',
    description: 'Explore new frameworks and tools that could improve our development process',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    priority: 'low',
    status: 'pending',
    category: 'Research',
  },
  {
    id: '7',
    title: 'Fix navigation bug',
    description: 'Address the issue with the navigation menu on mobile devices',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    priority: 'medium',
    status: 'overdue',
    category: 'Development',
  },
  {
    id: '8',
    title: 'Update team on project status',
    description: 'Send out a status report to all team members',
    dueDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    priority: 'medium',
    status: 'completed',
    category: 'Communication',
  },
];

const TasksPage = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  // const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    getalltasks();
  }, []);

  const getalltasks = async () => {
    try {
      const res = await axios.get('/tasks/getall');
      console.log('Tasks fetched:', res.data);

      const updatedTasks = res.data.map((task: any) => {
        const dueDate = new Date(task.dueDate);
        let status: TaskStatus = 'pending';

        if (task.completed) {
          status = 'completed';
        } else if (dueDate < new Date()) {
          status = 'overdue';
        }

        return {
          ...task,
          id: task._id, // Use MongoDB _id as id
          status,
        };
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (data: any) => {

    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description || '',
      dueDate: data.dueDate,
      priority: data.priority,
      status: 'pending' as TaskStatus,
      category: data.category || undefined,
    };

    const newTask2: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description || '',
      dueDate: data.dueDate,
      priority: data.priority,
      category: data.category || undefined,
      recurring: data.recurring,
    };

    try {
      const res = await axios.post('/tasks/add', {newTask2})
      console.log('Task created:', res);
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
    

    setTasks([...tasks, newTask]);
    setIsTaskFormOpen(false);
    toast.success('Task created successfully!');
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };
  
  const handleUpdateTask = async (data: any) => {
    if (!editingTask) return;

    const updatedTask = {
      ...editingTask,
      title: data.title,
      description: data.description || '',
      dueDate: data.dueDate,
      priority: data.priority,
      category: data.category || undefined,
    };

    try {
      await axios.post('/tasks/update', { id: editingTask._id, ...updatedTask });

      const updatedTasks = tasks.map((task) => {
        if (task._id === editingTask._id) {
          return updatedTask;
        }
        return task;
      });

      setTasks(updatedTasks);
      setIsTaskFormOpen(false);
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };
  
  const handleDeleteTask = async (_id: string) => {
    try {
      await axios.post('/tasks/delete', { id: _id });

      setTasks(tasks.filter((task) => task._id !== _id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };
  
  const handleCompleteTask = async (_id: string, completed: boolean) => {
    try {
      await axios.post('/tasks/completion', { id: _id, completed });

      const updatedTasks = tasks.map((task) => {
        if (task._id === _id) {
          return {
            ...task,
            status: completed ? ('completed' as TaskStatus) : ('pending' as TaskStatus),
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      toast.success(`Task marked as ${completed ? 'completed' : 'pending'}`);
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
    }
  };
  
  const handleFormSubmit = (data: any) => {
    if (editingTask) {
      handleUpdateTask(data);
    } else {
      handleCreateTask(data);
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your tasks and stay organized
          </p>
        </div>
        <Button onClick={() => {
          setEditingTask(null);
          setIsTaskFormOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
      
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      
      <TaskForm
        open={isTaskFormOpen}
        onOpenChange={setIsTaskFormOpen}
        onSubmit={handleFormSubmit}
        defaultValues={editingTask || undefined}
        isEditing={!!editingTask}
      />
    </AppLayout>
  );
};

export default TasksPage;