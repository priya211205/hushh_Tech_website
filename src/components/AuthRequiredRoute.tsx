import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthSession } from "../auth/AuthSessionProvider";
import { buildLoginRedirectPath } from "../auth/routePolicy";
import { cn } from "../lib/utils"; // Using the utility you recently standardized

interface AuthRequiredRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // Allows passing custom skeleton loaders
  className?: string; // Allows overriding the loader container styles
}

const AuthRequiredRoute: React.FC<AuthRequiredRouteProps> = ({
  children,
  fallback,
  className
}) => {
  const location = useLocation();
  const { session, status } = useAuthSession();

  if (status === "booting") {
    // Return custom fallback if provided, otherwise show default flexible loader
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full p-8 min-h-[50vh]",
          className
        )}
      >
        <div
          role="status"
          aria-label="Checking authentication status"
          className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"
        />
        <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">
          Verifying secure session...
        </p>
      </div>
    );
  }

  // Defensive check: ensure both status is authenticated AND user data actually exists
  if (status !== "authenticated" || !session?.user?.id) {
    return (
      <Navigate
        to={buildLoginRedirectPath(
          location.pathname,
          location.search,
          location.hash
        )}
        // Standard React Router pattern for redirecting back after login
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default AuthRequiredRoute;