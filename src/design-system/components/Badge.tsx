import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center font-medium rounded-full select-none tracking-wide transition-colors border-none',
  {
    variants: {
      variant: {
        default: 'bg-white/5 text-white/80',
        accent: 'bg-[#c0ff00]/10 text-[#c0ff00] font-semibold',
        success: 'bg-emerald-500/10 text-emerald-400',
        danger: 'bg-rose-500/10 text-rose-400',
        warning: 'bg-amber-500/10 text-amber-400',
      },
      size: {
        sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
        md: 'text-xs px-3 py-1 gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const dotColors = {
  default: 'bg-white/60',
  accent: 'bg-[#c0ff00] shadow-[0_0_6px_#c0ff00]',
  success: 'bg-emerald-400',
  danger: 'bg-rose-400',
  warning: 'bg-amber-400',
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
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[selectedVariant])} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
