'use client';

import * as React from 'react';
import { cn } from '@/shared/presentation/utils/shadcn';

export interface Option {
  value: string;
  label: string;
}

export interface AutocompleteSelectProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> {
  options: Option[];
  onSelect?: (option: Option) => void;
}

const AutocompleteSelect = React.forwardRef<HTMLInputElement, AutocompleteSelectProps>(
  ({ className, options, onSelect, value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState((value as string) || '');
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [filtered, setFiltered] = React.useState<Option[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Sync with external value changes and set display label
    React.useEffect(() => {
      if (value) {
        const option = options.find((opt) => opt.value === value);
        setInputValue(option?.label || (value as string));
        setSelectedValue(value as string);
      }
    }, [value, options]);

    React.useEffect(() => {
      if (typeof inputValue === 'string' && inputValue.length > 0) {
        setFiltered(options.filter((o) => o.label.toLowerCase().includes(inputValue.toLowerCase())));
      } else {
        setFiltered(options);
      }
    }, [inputValue, options]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e as React.ChangeEvent<HTMLInputElement>);
      setShowSuggestions(true);
    };

    const handleSelect = (opt: Option) => {
      setInputValue(opt.label);
      setSelectedValue(opt.value);
      setShowSuggestions(false);
      onSelect?.(opt);
      // create a synthetic event with the value (not label) for parent form libraries
      const syntheticEvent = {
        target: {
          value: opt.value,
          name: props.name,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    return (
      <div ref={containerRef} className="relative">
        <input ref={ref} type="hidden" name={props.name} value={selectedValue} />
        <input
          value={inputValue}
          autoComplete="off"
          placeholder={props.placeholder}
          onChange={handleInput}
          onFocus={() => setShowSuggestions(true)}
          className={cn(
            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent px-4 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            showSuggestions && filtered.length > 0 && 'rounded-b-none',
            className
          )}
          {...props}
        />

        {showSuggestions && filtered.length > 0 && (
          <div className="absolute z-50 mt-0 w-full rounded-b-md border border-t-0 border-input bg-background ">
            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(opt)}
                className="flex w-full items-center bg-card gap-2 border-t px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent/10 first:border-t-0"
              >
                <span className="text-foreground">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

AutocompleteSelect.displayName = 'AutocompleteSelect';

export { AutocompleteSelect };
