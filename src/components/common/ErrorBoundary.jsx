import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    
    // You can also log the error to an error reporting service like Sentry here
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      if (fallback) {
        return fallback;
      }
      
      return (
        <div className="p-4 bg-red-50 border border-red-100 rounded-md">
          <h3 className="text-sm font-medium text-red-800 mb-2">
            Something went wrong with this component
          </h3>
          {error && (
            <p className="text-xs text-red-700">
              {error.toString()}
            </p>
          )}
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
