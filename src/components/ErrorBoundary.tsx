import { Component, ErrorInfo, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
  }

  resetErrorBoundary = () => {
    // Allows parent components to retry failed operations before resetting the UI
    this.props.onReset?.();
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Safe environment check for both Webpack (Next.js/CRA) and Vite
      const isDev =
        (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
        (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV);

      return (
        <div className={cn("flex flex-col items-center justify-center p-6 w-full h-full min-h-[300px] bg-gray-50 rounded-xl border border-gray-200", this.props.className)}>
          <div className="text-center max-w-md w-full">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-3">
              Component Error
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              We're sorry for the inconvenience. An unexpected error occurred in this section of the app.
            </p>

            {isDev && this.state.error && (
              <details className="mb-6 text-left bg-gray-100 p-4 rounded-lg border border-gray-200">
                <summary className="cursor-pointer font-semibold text-xs text-gray-700 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Error Details (Development Only)
                </summary>
                <pre className="text-[11px] text-red-600 overflow-auto whitespace-pre-wrap break-words max-h-48">
                  {this.state.error.toString()}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.resetErrorBoundary}
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;