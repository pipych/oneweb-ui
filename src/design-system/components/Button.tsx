import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { BrandLoader } from './BrandLoader';

export const buttonVariants = cva(
  'rounded-full font-black text-sm flex items-center justify-center transition-all sf-tap select-none disabled:opacity-50 disabled:cursor-not-allowed outline-none border-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[#c0ff00] text-[#090b0e] active:scale-95',
        secondary:
          'bg-white/10 hover:bg-white/15 text-white active:scale-95',
        danger:
          'bg-red-500/20 text-red-400 hover:bg-red-500/30 active:scale-95',
        warning:
          'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 active:scale-95',
        orange:
          'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 active:scale-95',
        ghost:
          'bg-transparent hover:bg-white/5 text-white/80 hover:text-white active:scale-95',
        pillAction:
          'bg-white/5 text-[11px] font-bold text-[#c0ff00] hover:bg-[#c0ff00]/15 active:scale-95',
      },
      size: {
        sm: 'h-9 px-3.5 text-xs gap-1.5',
        md: 'h-12 px-5 text-sm gap-2.5',
        lg: 'h-14 px-6 text-base gap-3',
        action: 'px-3 py-1 text-[11px] gap-1',
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
      variant = 'primary',
      size = 'md',
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

    const loaderColor =
      variant === 'primary'
        ? '#090b0e'
        : variant === 'danger'
        ? '#f87171'
        : variant === 'warning'
        ? '#fbbf24'
        : variant === 'orange'
        ? '#f97316'
        : '#c0ff00';

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size }), className)}
        {...rest}
      >
        {isLoading ? (
          <BrandLoader size={12} color={loaderColor} />
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
