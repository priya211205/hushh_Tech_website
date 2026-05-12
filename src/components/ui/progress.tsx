import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, ...props }, ref) => {
  // Allow null/undefined to pass through for Radix's indeterminate state
  // Otherwise, ensure the value is between 0 and 100
  const safeValue = value === null || value === undefined
    ? null
    : Math.min(100, Math.max(0, value));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={safeValue}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          // Added a default background color (bg-primary or bg-slate-900)
          'h-full w-full flex-1 bg-slate-900 transition-all duration-500 ease-out dark:bg-slate-50',
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (safeValue || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };