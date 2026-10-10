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
      <div className="w-full flex flex-col gap-2 text-left">
        {label && (
          <label
            htmlFor={generatedId}
            className={cn(
              'text-xs font-semibold tracking-wide',
              hasError ? 'text-rose-400' : 'text-[#8e8e93]'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-4 flex items-center justify-center pointer-events-none text-white/40">
              {renderIcon(leftIcon)}
            </div>
          )}

          <input
            ref={ref}
            id={generatedId}
            type={computedType}
            disabled={disabled}
            className={cn(
              'w-full h-12 bg-white/[0.05] text-white text-sm rounded-2xl border transition-all duration-150 outline-none',
              'placeholder:text-white/30',
              leftIcon ? 'pl-11' : 'pl-4',
              isPassword || rightIcon ? 'pr-12' : 'pr-4',
              hasError
                ? 'border-rose-500/40 bg-rose-500/[0.05] focus:border-rose-500'
                : 'border-white/[0.04] focus:border-[#c0ff00]/40 focus:bg-white/[0.08]',
              disabled && 'opacity-30 cursor-not-allowed',
              className
            )}
            {...rest}
          />

          {isPassword && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 flex items-center justify-center text-white/40 hover:text-white transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <OneIcon name={showPassword ? 'visibility_off' : 'visibility'} size="sm" />
            </button>
          )}

          {!isPassword && rightIcon && (
            <div className="absolute right-4 flex items-center justify-center text-white/40">
              {renderIcon(rightIcon)}
            </div>
          )}
        </div>

        {typeof error === 'string' && error && (
          <span className="text-xs text-rose-400 font-medium">{error}</span>
        )}

        {!hasError && helperText && (
          <span className="text-xs text-white/40">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
