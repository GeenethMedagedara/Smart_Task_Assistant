
import React from 'react';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection = ({ userName }: WelcomeSectionProps) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }
  
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentTime);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">
        {greeting}, {userName}! 👋
      </h1>
      <p className="text-muted-foreground mt-1">
        Today is {currentDate}. Here's an overview of your tasks.
      </p>
    </div>
  );
};

export default WelcomeSection;
