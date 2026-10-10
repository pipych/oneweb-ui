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

/**
 * OneWebUI Input - Strict Pill Shape (rounded-full)
 */
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
      sm: 'h-8 text-xs px-3.5 rounded-full',
      md: 'h-10 text-sm px-4.5 rounded-full',
      lg: 'h-12 text-base px-5.5 rounded-full',
    };

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-oneweb-text-secondary select-none px-1"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-oneweb-text-secondary">
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
              'border border-oneweb-border-subtle rounded-full transition-all duration-150',
              'focus:outline-none focus:border-oneweb-accent focus:ring-1 focus:ring-oneweb-accent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon ? 'pl-10' : 'pl-4',
              (rightIcon || isPassword) ? 'pr-11' : 'pr-4',
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
              className="absolute right-3.5 p-1 text-oneweb-text-secondary hover:text-oneweb-text-primary transition-colors focus:outline-none cursor-pointer"
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-oneweb-text-secondary">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="text-xs text-oneweb-status-danger font-medium flex items-center gap-1 px-1">
            <Icon name="error" size={14} />
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-oneweb-text-secondary px-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface SearchInputProps extends Omit<InputProps, 'type' | 'leftIcon'> {
  onClear?: () => void;
}

/**
 * SearchInput - Specialized search pill input with search icon & quick clear
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = 'Поиск...', value, onClear, rightIcon, ...props }, ref) => {
    const hasValue = Boolean(value);

    return (
      <Input
        ref={ref}
        type="search"
        placeholder={placeholder}
        value={value}
        leftIcon={<Icon name="search" size={18} />}
        rightIcon={
          hasValue && onClear ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className="p-0.5 text-oneweb-text-secondary hover:text-oneweb-text-primary transition-colors focus:outline-none cursor-pointer"
            >
              <Icon name="cancel" size={16} />
            </button>
          ) : (
            rightIcon
          )
        }
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
