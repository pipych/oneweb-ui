import React, { useEffect } from 'react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        className={`relative z-10 w-full max-w-lg bg-oneweb-surface-elevated border border-oneweb-border rounded-oneweb-2xl shadow-oneweb-modal overflow-hidden flex flex-col animate-slide-up ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <div
      className={`p-6 pb-4 border-b border-oneweb-border flex items-start justify-between gap-4 ${className}`}
      {...rest}
    >
      <div className="flex flex-col gap-1 w-full">{children}</div>
    </div>
  );
};

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <h2
      className={`text-lg font-bold text-oneweb-text-primary tracking-tight ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <p
      className={`text-xs text-oneweb-text-secondary leading-relaxed ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <div className={`p-6 text-sm text-oneweb-text-secondary ${className}`} {...rest}>
      {children}
    </div>
  );
};

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <div
      className={`p-6 pt-4 border-t border-oneweb-border/60 flex items-center justify-end gap-3 bg-oneweb-surface/50 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export const DialogClose: React.FC<{
  onClose: () => void;
  className?: string;
}> = ({ onClose, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close dialog"
      className={`text-oneweb-text-muted hover:text-oneweb-text-primary transition-colors p-1 rounded-oneweb-lg hover:bg-oneweb-surface-subtle focus:outline-none ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};
