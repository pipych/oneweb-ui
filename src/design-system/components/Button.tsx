import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center select-none rounded-full font-semibold transition-all duration-150 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 outline-none',
  {
    variants: {
      variant: {
        primary:
          'bg-oneweb-accent text-black font-bold hover:bg-oneweb-accent-hover focus-visible:ring-2 focus-visible:ring-oneweb-accent border-none shadow-none',
        secondary:
          'bg-white/5 text-oneweb-text-primary hover:bg-white/10 border-none focus-visible:ring-2 focus-visible:ring-white/20',
        outline:
          'bg-transparent text-oneweb-text-primary border border-white/10 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/20',
        ghost:
          'bg-transparent text-oneweb-text-secondary hover:text-oneweb-text-primary hover:bg-white/5 border-none focus-visible:ring-2 focus-visible:ring-white/20',
        danger:
          'bg-oneweb-status-danger/15 text-oneweb-status-danger hover:bg-oneweb-status-danger/25 border-none font-semibold focus-visible:ring-2 focus-visible:ring-oneweb-status-danger',
      },
      size: {
        sm: 'h-9 px-4 text-xs gap-1.5',
        md: 'h-11 px-5 text-sm gap-2',
        lg: 'h-13 px-6 text-base gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled = false,
      children,
      className,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size }), className)}
        {...rest}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
