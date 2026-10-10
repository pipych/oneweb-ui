import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full font-black tracking-wider uppercase select-none transition-colors border-none',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white',
        accent: 'bg-[#c0ff00]/15 text-[#c0ff00]',
        success: 'bg-[#1bd96a]/15 text-[#1bd96a]',
        warning: 'bg-amber-500/15 text-amber-400',
        danger: 'bg-red-500/15 text-red-400',
        subtle: 'bg-white/5 text-[#8e8e93]',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px] gap-1.5',
        md: 'px-2.5 py-1 text-xs gap-1.5',
        lg: 'px-3 py-1.5 text-xs gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const dotColorClass =
    variant === 'accent'
      ? 'bg-[#c0ff00]'
      : variant === 'success'
      ? 'bg-[#1bd96a]'
      : variant === 'warning'
      ? 'bg-amber-400'
      : variant === 'danger'
      ? 'bg-red-500'
      : 'bg-white';

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColorClass)} />}
      <span>{children}</span>
    </div>
  );
}
