import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  constructor(props: Props) {
    super(props);
    // State to track if an error has occurred
    this.state = { hasError: false };
  }

  // Use static getDerivedStateFromError to render a fallback UI
  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  // Use componentDidCatch to log error information
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return this.props.fallback ?? <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
