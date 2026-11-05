import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '../../utils/shadcn';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({ value, onChange, className, ...props }, ref) => {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value || '');

  React.useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, '');

    // Auto-format com barras
    if (newValue.length >= 2) {
      newValue = newValue.slice(0, 2) + '/' + newValue.slice(2);
    }
    if (newValue.length >= 5) {
      newValue = newValue.slice(0, 5) + '/' + newValue.slice(5);
    }
    if (newValue.length > 10) {
      newValue = newValue.slice(0, 10);
    }

    setInputValue(newValue);

    // Create synthetic event for React Hook Form
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
        name: props.name || '',
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(syntheticEvent);

    // Parse dd/MM/yyyy format
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = newValue.match(dateRegex);

    if (match) {
      const [, day, month, year] = match;
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      // Validate date
      if (parsedDate.getDate() === parseInt(day) && parsedDate.getMonth() === parseInt(month) - 1 && parsedDate.getFullYear() === parseInt(year)) {
        setDate(parsedDate);
      }
    }
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    const formattedDate = newDate ? format(newDate, 'dd/MM/yyyy') : '';
    setInputValue(formattedDate);

    // Create synthetic event for React Hook Form
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: formattedDate,
          name: props.name || '',
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <Input
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="DD/MM/YYYY"
          className={cn('pr-10 h-12', className)}
          autoComplete="off"
          {...props}
        />
        <PopoverTrigger asChild>
          <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          captionLayout="dropdown"
          startMonth={new Date(1900, 0)}
          endMonth={new Date()}
          classNames={{
            day: 'h-9 w-9 p-0 font-normal',
            day_selected: 'h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90',
            day_today: 'border border-primary',
            day_outside: 'text-muted-foreground opacity-50',
            head_cell: 'text-muted-foreground text-xs font-medium',
          }}
        />
      </PopoverContent>
    </Popover>
  );
});

DatePicker.displayName = 'DatePicker';
