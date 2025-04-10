
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  Bell, 
  Search,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onCreateTask?: () => void;
}

const Header = ({ onCreateTask }: HeaderProps) => {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4 bg-white">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 h-9 w-64 bg-gray-100 rounded-md border-0 focus:ring-2 focus:ring-primary/20 focus:bg-white"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onCreateTask} 
          size="sm" 
          className="hidden md:flex gap-1"
        >
          <Plus className="h-4 w-4" />
          New Task
        </Button>
        <Button 
          onClick={onCreateTask}
          size="sm"
          variant="ghost" 
          className="md:hidden p-2"
        >
          <Plus className="h-5 w-5" />
        </Button>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <div className="font-medium">Task deadline reminder</div>
                <div className="text-sm text-muted-foreground">"Homepage redesign" is due tomorrow</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <div className="font-medium">Task assigned to you</div>
                <div className="text-sm text-muted-foreground">Alex assigned you to "Q4 Planning"</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <div className="font-medium">New AI suggestion</div>
                <div className="text-sm text-muted-foreground">Assistant created task recommendations</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative p-1" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
