import React from 'react';
import { cn } from '../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot = false, children, ...props }, ref) => {
    const variants = {
      default:
        'bg-oneweb-surface-subtle text-oneweb-text-secondary border border-oneweb-border-subtle',
      accent:
        'bg-oneweb-accent-subtle text-oneweb-accent border border-oneweb-border-accent',
      success:
        'bg-oneweb-status-success/15 text-oneweb-status-success border border-oneweb-status-success/30',
      warning:
        'bg-oneweb-status-warning/15 text-oneweb-status-warning border border-oneweb-status-warning/30',
      danger:
        'bg-oneweb-status-danger/15 text-oneweb-status-danger border border-oneweb-status-danger/30',
    };

    const dotColors = {
      default: 'bg-oneweb-text-secondary',
      accent: 'bg-oneweb-accent shadow-[0_0_8px_#c0ff00]',
      success: 'bg-oneweb-status-success shadow-[0_0_8px_#1bd96a]',
      warning: 'bg-oneweb-status-warning',
      danger: 'bg-oneweb-status-danger shadow-[0_0_8px_#ef4444]',
    };

    const sizes = {
      sm: 'text-[11px] px-2 py-0.5 rounded-oneweb-full gap-1',
      md: 'text-xs px-2.5 py-1 rounded-oneweb-full gap-1.5',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium select-none tracking-wide',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full inline-block shrink-0', dotColors[variant])}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
