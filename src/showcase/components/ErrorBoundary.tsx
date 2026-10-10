import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Button, Badge } from '@one/web-ui';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[OneWebUI ErrorBoundary caught an error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-2xl mx-auto my-8 space-y-4">
          <Card variant="glass" className="p-6 space-y-4 border border-red-500/20">
            <div className="flex items-center gap-3">
              <Badge variant="danger">Ошибка рендеринга</Badge>
              <h2 className="text-lg font-bold text-white">
                {this.props.fallbackTitle || 'Произошла непредвиденная ошибка'}
              </h2>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              Компонент вызвал исключение во время рендеринга интерфейса.
            </p>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400 font-mono text-xs overflow-x-auto">
                {this.state.error.toString()}
              </div>
            )}
            <div className="pt-2">
              <Button variant="primary" size="sm" onClick={this.handleReset}>
                Перезагрузить страницу
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
