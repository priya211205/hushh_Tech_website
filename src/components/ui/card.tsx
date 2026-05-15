import React, { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "article" | "section" | "aside";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "rounded-2xl border border-gray-200 bg-white shadow-sm transition-all p-4",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);

Card.displayName = "Card";

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-2 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";