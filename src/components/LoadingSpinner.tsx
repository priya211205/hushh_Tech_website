import { forwardRef } from 'react'
import { cn } from '../lib/utils'

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'slate' | 'white' | 'current'
  fullPage?: boolean
  label?: string
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-[3px]', // Slightly thinner for a cleaner look
  lg: 'w-14 h-14 border-4',
}

const colorMap = {
  blue: 'border-slate-200 border-t-blue-500 dark:border-slate-700 dark:border-t-blue-400',
  slate: 'border-slate-200 border-t-slate-700 dark:border-slate-700 dark:border-t-slate-300',
  white: 'border-white/30 border-t-white',
  current: 'border-current/30 border-t-current', // Inherits text color of parent
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      size = 'md',
      color = 'blue',
      fullPage = false,
      label = 'Loading',
      className,
      ...props
    },
    ref
  ) => {
    const spinner = (
      <div
        aria-hidden="true"
        className={cn(
          'rounded-full animate-spin',
          sizeMap[size],
          colorMap[color]
        )}
      />
    )

    const status = (
      <div
        ref={ref}
        className={cn('inline-flex items-center justify-center', className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        {spinner}
        <span className="sr-only">{label}</span>
      </div>
    )

    if (fullPage) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
          {status}
        </div>
      )
    }

    return status
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner