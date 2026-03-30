"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-red-50 border border-red-100 flex flex-col items-center justify-center text-center">
          <AlertTriangle className="text-red-500 mb-2" size={32} />
          <h2 className="text-lg font-bold text-red-700 mb-1">Component Rendering Error</h2>
          <p className="text-red-600 text-sm">Something went wrong while displaying this section.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
