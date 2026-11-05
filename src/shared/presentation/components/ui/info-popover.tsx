'use client';

import { Info } from 'lucide-react';
import { Button } from '@/shared/presentation/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/presentation/components/ui/popover';

interface InfoPopoverProps {
  title: string;
  description: string;
}

export function InfoPopover({ title, description }: InfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="h-auto w-auto p-0 text-muted-foreground hover:text-foreground hover:bg-transparent"
        >
          <Info className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-64">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </PopoverContent>
    </Popover>
  );
}
