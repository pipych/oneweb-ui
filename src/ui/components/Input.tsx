import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      disabled,
      id,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || React.useId();
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const sizeStyles = {
      sm: 'h-8 text-xs px-2.5 rounded-oneweb-md',
      md: 'h-10 text-sm px-3.5 rounded-oneweb-lg',
      lg: 'h-12 text-base px-4 rounded-oneweb-xl',
    };

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-oneweb-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-oneweb-text-secondary">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={computedType}
            disabled={disabled}
            className={cn(
              'w-full bg-oneweb-surface-subtle text-oneweb-text-primary placeholder:text-oneweb-text-secondary/50',
              'border border-oneweb-border-subtle transition-all duration-150',
              'focus:outline-none focus:border-oneweb-accent focus:ring-1 focus:ring-oneweb-accent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-9',
              (rightIcon || isPassword) && 'pr-10',
              error && 'border-oneweb-status-danger focus:border-oneweb-status-danger focus:ring-oneweb-status-danger',
              sizeStyles[size],
              className
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 p-1 text-oneweb-text-secondary hover:text-oneweb-text-primary transition-colors focus:outline-none"
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3 flex items-center pointer-events-none text-oneweb-text-secondary">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="text-xs text-oneweb-status-danger font-medium flex items-center gap-1">
            <Icon name="error" size={14} />
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-oneweb-text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
