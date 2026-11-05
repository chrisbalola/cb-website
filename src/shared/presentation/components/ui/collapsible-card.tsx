'use client';

import { ReactNode, useState } from 'react';
import { Card } from './card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/shared/presentation/utils/shadcn';

interface CollapsibleCardProps {
  title: ReactNode;
  children: ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
}

export function CollapsibleCard({ title, children, defaultCollapsed = false, className }: CollapsibleCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <Card className={cn('p-4', className)}>
      <button onClick={() => setIsCollapsed(!isCollapsed)} className={cn('flex items-center justify-between w-full group', !isCollapsed && 'mb-4')}>
        {typeof title === 'string' ? <h3 className="font-semibold text-sm">{title}</h3> : title}
        {isCollapsed ? (
          <ChevronDown className="h-4 w-4 cursor-pointer group-hover:text-accent transition-colors" />
        ) : (
          <ChevronUp className="h-4 w-4 cursor-pointer group-hover:text-accent transition-colors" />
        )}
      </button>

      <div className={cn('space-y-3', isCollapsed && 'hidden')}>{children}</div>
    </Card>
  );
}
