import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center font-medium border rounded-oneweb-full select-none tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-oneweb-surface-subtle text-oneweb-text-secondary border-oneweb-border',
        accent: 'bg-oneweb-accent-subtle text-oneweb-accent border-oneweb-border-accent font-semibold',
        success: 'bg-oneweb-status-success/15 text-oneweb-status-success border-oneweb-status-success/30',
        danger: 'bg-oneweb-status-danger/15 text-oneweb-status-danger border-oneweb-status-danger/30',
        warning: 'bg-oneweb-status-warning/15 text-oneweb-status-warning border-oneweb-status-warning/30',
      },
      size: {
        sm: 'text-[10px] px-2 py-0.5 gap-1',
        md: 'text-xs px-2.5 py-1 gap-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const dotColors = {
  default: 'bg-oneweb-text-secondary',
  accent: 'bg-oneweb-accent shadow-oneweb-accent-glow',
  success: 'bg-oneweb-status-success',
  danger: 'bg-oneweb-status-danger',
  warning: 'bg-oneweb-status-warning',
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, children, className, ...rest }, ref) => {
    const selectedVariant = variant || 'default';

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...rest}
      >
        {dot && (
          <span className={cn('w-1.5 h-1.5 rounded-oneweb-full animate-pulse', dotColors[selectedVariant])} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
