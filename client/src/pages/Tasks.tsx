import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { Task, TaskStatus } from '@/components/tasks/TaskCard';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { taskApi } from '@/api/taskApi';

const TasksPage = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    getalltasks();
  }, []);

  const getalltasks = async () => {
    try {
      const res = await taskApi.getAllTasks();
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
      const res = await taskApi.createTask(newTask2);
      console.log('Task created:', res);
      if(res.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
    
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
      await taskApi.updateTask(editingTask._id, updatedTask )

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
      await taskApi.deleteTask(_id);

      setTasks(tasks.filter((task) => task._id !== _id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };
  
  const handleCompleteTask = async (_id: string, completed: boolean) => {
    try {
      await taskApi.updateTaskStatus(_id, completed);

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