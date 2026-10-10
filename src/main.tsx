import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './showcase/App';
import './index.css';

interface RootBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<{ children: ReactNode }, RootBoundaryState> {
  state: RootBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): RootBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[OneWebUI Root Crash]:', error, info);
  }

  handleHardReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#090b0e',
            color: '#ffffff',
            fontFamily: 'sans-serif',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              background: '#14171c',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                fontSize: '22px',
              }}
            >
              ⚠️
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px 0' }}>
              Не удалось загрузить страницу OneWebUI
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: '#8e8e93',
                lineHeight: 1.5,
                margin: '0 0 20px 0',
              }}
            >
              Возник конфликт устаревшего кэша браузера или ошибка рендеринга.
              Нажмите кнопку ниже для полной очистки кэша и перезагрузки.
            </p>
            {this.state.error && (
              <pre
                style={{
                  background: '#090b0e',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#f87171',
                  textAlign: 'left',
                  overflowX: 'auto',
                  marginBottom: '20px',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleHardReload}
              style={{
                background: '#c0ff00',
                color: '#090b0e',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px 24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Очистить кэш и перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);
