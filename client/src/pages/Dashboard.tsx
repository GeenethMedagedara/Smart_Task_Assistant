import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import SummaryCard from '@/components/dashboard/SummaryCard';
import ProductivityTip from '@/components/dashboard/ProductivityTip';
import { Task, TaskStatus } from '@/components/tasks/TaskCard';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { toast } from 'sonner';
import { CheckSquare, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
];

const productivityTips = [
  {
    tip: "Break large tasks into smaller, more manageable subtasks to avoid feeling overwhelmed.",
    source: "Time Management Principles",
  },
  {
    tip: "Use the 'Two-Minute Rule' - if a task takes less than two minutes, do it immediately.",
    source: "Getting Things Done, David Allen",
  },
  {
    tip: "Schedule your most challenging tasks during your peak energy hours when you're most productive.",
    source: "Productivity Research",
  },
  {
    tip: "Focus on one task at a time. Multitasking can reduce productivity by up to 40%.",
    source: "Stanford University Research",
  },
];

const Dashboard = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
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
  
  const tip = productivityTips[Math.floor(Math.random() * productivityTips.length)];
  
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const overdueTasks = tasks.filter(task => task.status === 'overdue');
  
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
  
  // const handleUpdateTask = (data: any) => {
  //   if (!editingTask) return;
    
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id === editingTask.id) {
  //       return {
  //         ...task,
  //         title: data.title,
  //         description: data.description || '',
  //         dueDate: data.dueDate,
  //         priority: data.priority,
  //         category: data.category || undefined,
  //       };
  //     }
  //     return task;
  //   });
    
  //   setTasks(updatedTasks);
  //   setIsTaskFormOpen(false);
  //   setEditingTask(null);
  //   toast.success('Task updated successfully!');
  // };

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
  
  // const handleDeleteTask = (id: string) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  //   toast.success('Task deleted successfully!');
  // };

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
  
  // const handleCompleteTask = (id: string, completed: boolean) => {
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id === id) {
  //       return {
  //         ...task,
  //         status: completed ? ('completed' as TaskStatus) : ('pending' as TaskStatus),
  //       };
  //     }
  //     return task;
  //   });
    
  //   setTasks(updatedTasks);
  //   toast.success(`Task marked as ${completed ? 'completed' : 'pending'}`);
  // };

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
      <WelcomeSection userName="John" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          title="Total Tasks"
          value={tasks.length}
          icon={<ListTodo className="h-5 w-5 text-blue-600" />}
          description="All assigned tasks"
        />
        <SummaryCard
          title="Pending"
          value={pendingTasks.length}
          icon={<Clock className="h-5 w-5 text-yellow-600" />}
          description="Tasks in progress"
        />
        <SummaryCard
          title="Completed"
          value={completedTasks.length}
          icon={<CheckSquare className="h-5 w-5 text-green-600" />}
          description="Finished tasks"
          trend={{ value: 5, isPositive: true }}
        />
        <SummaryCard
          title="Overdue"
          value={overdueTasks.length}
          icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
          description="Past due date"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <Button onClick={() => {
              setEditingTask(null);
              setIsTaskFormOpen(true);
            }}>
              New Task
            </Button>
          </div>
          
          <TaskList
            tasks={tasks.slice(0, 6)}
            onComplete={handleCompleteTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
          
          <div className="mt-4 text-center">
            <Button variant="link" asChild>
              <a href="/tasks">View All Tasks</a>
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <ProductivityTip tip={tip.tip} source={tip.source} />
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => {
                  setEditingTask(null);
                  setIsTaskFormOpen(true);
                }}
              >
                Add a new task
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                asChild
              >
                <a href="/assistant">Ask the AI Assistant</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
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

export default Dashboard;
