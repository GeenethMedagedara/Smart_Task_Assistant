
import React from 'react';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import TaskCard, { Task, TaskStatus } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onComplete, onEdit, onDelete }: TaskListProps) => {
  const [filter, setFilter] = React.useState<TaskStatus | 'all'>('all');
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as TaskStatus | 'all')}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-4">
          <div className="task-grid">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-muted-foreground">
                No tasks found. Create a new task to get started.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="pt-4">
          <div className="task-grid">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-muted-foreground">
                No pending tasks found.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="pt-4">
          <div className="task-grid">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-muted-foreground">
                No completed tasks yet.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="overdue" className="pt-4">
          <div className="task-grid">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-muted-foreground">
                No overdue tasks found.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
