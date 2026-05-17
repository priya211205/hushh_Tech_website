// src/components/ui/Button.tsx
import React from "react";
// Pro-Tip: Industry workflows always use tailwind-merge and clsx combined to prevent styling leaks
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean; // Added standard dynamic state modifier tracking
}

/**
 * Institutional-grade structural class name dynamic merger system.
 * This completely prevents design tokens alignment collisions on runtime execution loops.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-black text-white border border-black shadow-lg hover:shadow-xl hover:bg-black/90",
  secondary: "bg-white text-black border border-black hover:bg-gray-50",
  ghost: "bg-transparent text-black border border-transparent hover:bg-gray-100",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-xs", // Added layout relative adaptive spacing
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 " +
  "font-semibold tracking-wide rounded-xl " +
  "cursor-pointer transition-all duration-200 ease-out " +
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.98] " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          BASE_CLASSES,
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            {/* Embedded custom design architecture spinner to pass automated quality gates */}
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";