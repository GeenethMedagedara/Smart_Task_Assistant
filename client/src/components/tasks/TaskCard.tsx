
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Clock, MoreVertical, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'completed' | 'pending' | 'overdue';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  category?: string;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityStyles = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusStyles = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-gray-100 text-gray-800',
  overdue: 'bg-red-100 text-red-800',
};

const TaskCard = ({ task, onComplete, onEdit, onDelete }: TaskCardProps) => {
  const isCompleted = task.status === 'completed';
  
  const handleCheckboxChange = (checked: boolean) => {
    onComplete(task.id, checked);
  };
  
  return (
    <Card className={cn(
      "card-hover overflow-hidden",
      isCompleted && "opacity-70"
    )}>
      <CardContent className="p-5 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Checkbox 
              id={`task-${task.id}`}
              checked={isCompleted}
              onCheckedChange={handleCheckboxChange}
              className="mt-1"
            />
            <div className="space-y-1">
              <h3 
                className={cn(
                  "font-medium text-balance", 
                  isCompleted && "line-through text-gray-500"
                )}
              >
                {task.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {task.description || "No description"}
              </p>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 focus:text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-5 py-3 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          {task.status === 'overdue' ? (
            <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
          ) : (
            <Clock className="h-3.5 w-3.5" />
          )}
          <span>
            {format(task.dueDate, 'MMM d')}
          </span>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={priorityStyles[task.priority]}>
            {task.priority}
          </Badge>
          <Badge variant="outline" className={statusStyles[task.status]}>
            {task.status}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
