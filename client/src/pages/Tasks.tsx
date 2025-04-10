
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { Task, TaskStatus } from '@/components/tasks/TaskCard';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const handleCreateTask = (data: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description || '',
      dueDate: data.dueDate,
      priority: data.priority,
      status: 'pending' as TaskStatus,
      category: data.category || undefined,
    };
    
    setTasks([...tasks, newTask]);
    setIsTaskFormOpen(false);
    toast.success('Task created successfully!');
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };
  
  const handleUpdateTask = (data: any) => {
    if (!editingTask) return;
    
    const updatedTasks = tasks.map((task) => {
      if (task.id === editingTask.id) {
        return {
          ...task,
          title: data.title,
          description: data.description || '',
          dueDate: data.dueDate,
          priority: data.priority,
          category: data.category || undefined,
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setIsTaskFormOpen(false);
    setEditingTask(null);
    toast.success('Task updated successfully!');
  };
  
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success('Task deleted successfully!');
  };
  
  const handleCompleteTask = (id: string, completed: boolean) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: completed ? ('completed' as TaskStatus) : ('pending' as TaskStatus),
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    toast.success(`Task marked as ${completed ? 'completed' : 'pending'}`);
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
