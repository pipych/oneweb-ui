import React, { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-oneweb-accent text-oneweb-text-inverse hover:bg-oneweb-accent-hover font-semibold shadow-oneweb-sm focus-visible:ring-2 focus-visible:ring-oneweb-accent',
  secondary:
    'bg-oneweb-surface-subtle text-oneweb-text-primary hover:bg-oneweb-surface-elevated font-medium border border-oneweb-border focus-visible:ring-2 focus-visible:ring-oneweb-border-strong',
  outline:
    'bg-transparent text-oneweb-text-primary border border-oneweb-border hover:border-oneweb-border-strong hover:bg-oneweb-surface-subtle font-medium focus-visible:ring-2 focus-visible:ring-oneweb-border-accent',
  ghost:
    'bg-transparent text-oneweb-text-secondary hover:text-oneweb-text-primary hover:bg-oneweb-surface-subtle font-medium focus-visible:ring-2 focus-visible:ring-oneweb-border',
  danger:
    'bg-oneweb-status-danger text-oneweb-text-primary hover:opacity-90 font-semibold shadow-oneweb-sm focus-visible:ring-2 focus-visible:ring-oneweb-status-danger',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-oneweb-md gap-1.5',
  md: 'text-sm px-4 py-2 rounded-oneweb-lg gap-2',
  lg: 'text-base px-5 py-2.5 rounded-oneweb-xl gap-2.5',
};

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
      className = '',
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
        className={`inline-flex items-center justify-center select-none transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 outline-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...rest}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-oneweb-full animate-spin" />
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
