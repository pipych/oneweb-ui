import React, { forwardRef } from 'react';

export type BadgeVariant = 'default' | 'success' | 'danger' | 'warning' | 'accent';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  default: {
    container: 'bg-oneweb-surface-subtle text-oneweb-text-secondary border-oneweb-border',
    dot: 'bg-oneweb-text-secondary',
  },
  accent: {
    container: 'bg-oneweb-accent-subtle text-oneweb-accent border-oneweb-border-accent',
    dot: 'bg-oneweb-accent',
  },
  success: {
    container: 'bg-oneweb-status-success/15 text-oneweb-status-success border-oneweb-status-success/30',
    dot: 'bg-oneweb-status-success',
  },
  danger: {
    container: 'bg-oneweb-status-danger/15 text-oneweb-status-danger border-oneweb-status-danger/30',
    dot: 'bg-oneweb-status-danger',
  },
  warning: {
    container: 'bg-oneweb-status-warning/15 text-oneweb-status-warning border-oneweb-status-warning/30',
    dot: 'bg-oneweb-status-warning',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const { container, dot: dotColor } = variantStyles[variant];

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-medium border rounded-oneweb-full select-none tracking-wide ${container} ${sizeStyles[size]} ${className}`}
        {...rest}
      >
        {dot && (
          <span className={`w-1.5 h-1.5 rounded-oneweb-full ${dotColor} animate-pulse`} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
