import React, { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  leftIcon?: React.ReactNode | string;
  rightIcon?: React.ReactNode | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled = false,
      type = 'text',
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasError = Boolean(error);
    const generatedId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const renderIcon = (icon: React.ReactNode | string) => {
      if (typeof icon === 'string') {
        return <OneIcon name={icon} size="sm" />;
      }
      return icon;
    };

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={generatedId}
            className={cn(
              'text-xs font-semibold tracking-wide',
              hasError ? 'text-oneweb-status-danger' : 'text-oneweb-text-secondary'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-oneweb-text-muted">
              {renderIcon(leftIcon)}
            </div>
          )}

          <input
            ref={ref}
            id={generatedId}
            type={computedType}
            disabled={disabled}
            className={cn(
              'w-full bg-oneweb-surface-subtle text-oneweb-text-primary text-sm rounded-oneweb-xl border transition-all duration-150 outline-none placeholder:text-oneweb-text-muted',
              leftIcon ? 'pl-10' : 'pl-4',
              isPassword || rightIcon ? 'pr-11' : 'pr-4',
              'py-2.5',
              hasError
                ? 'border-oneweb-status-danger focus:ring-1 focus:ring-oneweb-status-danger'
                : 'border-oneweb-border focus:border-oneweb-accent focus:ring-1 focus:ring-oneweb-accent',
              disabled && 'opacity-40 cursor-not-allowed',
              className
            )}
            {...rest}
          />

          {isPassword && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 flex items-center justify-center text-oneweb-text-muted hover:text-oneweb-text-primary transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <OneIcon name={showPassword ? 'visibility_off' : 'visibility'} size="sm" />
            </button>
          )}

          {!isPassword && rightIcon && (
            <div className="absolute right-3.5 flex items-center justify-center text-oneweb-text-muted">
              {renderIcon(rightIcon)}
            </div>
          )}
        </div>

        {typeof error === 'string' && error && (
          <span className="text-xs text-oneweb-status-danger font-medium">{error}</span>
        )}

        {!hasError && helperText && (
          <span className="text-xs text-oneweb-text-muted">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
