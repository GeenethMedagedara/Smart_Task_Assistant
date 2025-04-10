
import React, { useState } from 'react';
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
  
  const tip = productivityTips[Math.floor(Math.random() * productivityTips.length)];
  
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const overdueTasks = tasks.filter(task => task.status === 'overdue');
  
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
