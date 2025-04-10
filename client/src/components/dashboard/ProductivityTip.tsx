
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface ProductivityTipProps {
  tip: string;
  source?: string;
}

const ProductivityTip = ({ tip, source }: ProductivityTipProps) => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Daily Productivity Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm italic text-balance">"{tip}"</p>
        {source && (
          <p className="text-xs text-muted-foreground mt-2">- {source}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductivityTip;
