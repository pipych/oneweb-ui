import React, { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  leftIcon?: React.ReactNode | string;
  rightIcon?: React.ReactNode | string;
  inputSize?: 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      inputSize = 'md',
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
        return <OneIcon name={icon} size={inputSize === 'lg' ? 'md' : 'sm'} />;
      }
      return icon;
    };

    return (
      <div className="w-full min-w-0 flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={generatedId}
            className={cn(
              'text-xs font-semibold tracking-wide pl-2',
              hasError ? 'text-rose-400' : 'text-[#8e8e93]'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full min-w-0">
          {leftIcon && (
            <div className={cn(
              'absolute flex items-center justify-center pointer-events-none text-white/40',
              inputSize === 'lg' ? 'left-5' : 'left-4'
            )}>
              {renderIcon(leftIcon)}
            </div>
          )}

          <input
            ref={ref}
            id={generatedId}
            type={computedType}
            disabled={disabled}
            className={cn(
              'w-full min-w-0 bg-[#14171c] text-white text-sm rounded-full border transition-all duration-200 outline-none',
              'placeholder:text-white/30',
              inputSize === 'lg' ? 'h-14 text-base' : 'h-12 text-sm',
              leftIcon ? (inputSize === 'lg' ? 'pl-14' : 'pl-11') : (inputSize === 'lg' ? 'pl-6' : 'pl-5'),
              isPassword || rightIcon ? (inputSize === 'lg' ? 'pr-14' : 'pr-12') : (inputSize === 'lg' ? 'pr-6' : 'pr-5'),
              hasError
                ? 'border-rose-500/40 bg-rose-500/[0.05] focus:border-rose-500'
                : 'border-white/[0.04] focus:border-oneweb-accent/50 focus:bg-[#181c23]',
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
              className={cn(
                'absolute flex items-center justify-center text-white/40 hover:text-white transition-colors focus:outline-none',
                inputSize === 'lg' ? 'right-5' : 'right-4'
              )}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <OneIcon name={showPassword ? 'visibility_off' : 'visibility'} size="sm" />
            </button>
          )}

          {!isPassword && rightIcon && (
            <div className={cn(
              'absolute flex items-center justify-center text-white/40',
              inputSize === 'lg' ? 'right-5' : 'right-4'
            )}>
              {renderIcon(rightIcon)}
            </div>
          )}
        </div>

        {(hasError || helperText) && (
          <p
            className={cn(
              'text-xs leading-normal pl-2',
              hasError ? 'text-rose-400 font-medium' : 'text-[#8e8e93]'
            )}
          >
            {typeof error === 'string' ? error : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
