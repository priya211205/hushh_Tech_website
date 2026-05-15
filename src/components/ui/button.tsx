import React, { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children?: ReactNode; // Fixed: Binding element 'children' implicitly has 'any' type
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-black text-white border border-black shadow-lg hover:shadow-xl hover:bg-black/90",
  secondary: "bg-white text-black border border-black hover:bg-gray-50",
  ghost: "bg-transparent text-black border border-transparent hover:bg-gray-100",
  danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700 shadow-sm",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-8 text-base",
  icon: "h-10 w-10 p-0",
};

const BASE_CLASSES = "inline-flex items-center justify-center gap-2 font-semibold tracking-wide whitespace-nowrap rounded-md cursor-pointer transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      children,
      disabled,
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
          VARIANT_CLASSES[variant], // Fixed: Indexing error
          SIZE_CLASSES[size],       // Fixed: Indexing error
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="sr-only">Loading...</span>
            {size !== "icon" && <span>Processing...</span>}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";