// src/components/ui/Button.tsx
import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// A fast utility function to filter out falsy values and combine strings safely
const clsx = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-black text-white border border-black shadow-lg hover:shadow-xl hover:bg-black/90",
  secondary: "bg-white text-black border border-black hover:bg-gray-50",
  ghost: "bg-transparent text-black border border-transparent hover:bg-gray-100",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-10 px-4",
  md: "h-12 px-5",
  lg: "h-14 px-6",
  icon: "h-10 w-10 p-0",
};

const BASE_CLASSES = clsx(
  "inline-flex items-center justify-center gap-2",
  "font-semibold tracking-wide text-sm rounded-xl", // Centralized text-sm & added standard rounded edges
  "cursor-pointer transition-all duration-200 ease-out",
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    // If your project has 'tailwind-merge', use: twMerge(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)
    const combinedClasses = clsx(
      BASE_CLASSES,
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClasses}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";