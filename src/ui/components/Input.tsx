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
 * OneWebUI Input
 * - Strict Pill Shape (rounded-full)
 * - Solid surface background (#14171c)
 * - Zero borders, zero rings (border-none outline-none ring-0 focus:ring-0 focus:outline-none)
 * - Perfectly centered 20px icons (absolute top-1/2 -translate-y-1/2) with automatic pl-11 / pr-11
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
      sm: 'h-10 text-xs',
      md: 'h-12 text-sm',
      lg: 'h-14 text-base',
    };

    const hasRightElement = Boolean(rightIcon || isPassword);

    return (
      <div className="w-full flex flex-col space-y-2 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-[#8e8e93] select-none px-2"
          >
            {label}
          </label>
        )}

        <div className="relative w-full flex items-center">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-[#8e8e93] z-10">
              {React.isValidElement(leftIcon) && (leftIcon.type === Icon || (leftIcon.props as { name?: string }).name)
                ? React.cloneElement(leftIcon as React.ReactElement<{ size?: number; className?: string }>, {
                    size: 20,
                    className: cn('text-[#8e8e93]', (leftIcon.props as { className?: string }).className),
                  })
                : leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={computedType}
            disabled={disabled}
            className={cn(
              'w-full bg-[#14171c] text-white text-sm leading-none placeholder:text-[#8e8e93]',
              'rounded-full border-none outline-none ring-0 focus:ring-0 focus:outline-none',
              'transition-colors duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon ? 'pl-11' : 'px-5',
              hasRightElement ? 'pr-11' : 'px-5',
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
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#8e8e93] hover:text-white transition-colors focus:outline-none cursor-pointer z-10"
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
            </button>
          ) : rightIcon ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-[#8e8e93] z-10">
              {React.isValidElement(rightIcon) && (rightIcon.type === Icon || (rightIcon.props as { name?: string }).name)
                ? React.cloneElement(rightIcon as React.ReactElement<{ size?: number; className?: string }>, {
                    size: 20,
                    className: cn('text-[#8e8e93]', (rightIcon.props as { className?: string }).className),
                  })
                : rightIcon}
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 px-2">
            <Icon name="error" size={16} />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#8e8e93] px-2">{helperText}</p>
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
 * SearchInput - Specialized pill search field with centered 20px search icon and optional clear button
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = 'Поиск...', value, onClear, rightIcon, ...props }, ref) => {
    const hasValue = Boolean(value);

    return (
      <Input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        leftIcon={<Icon name="search" size={20} />}
        rightIcon={
          hasValue && onClear ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className="flex items-center justify-center text-[#8e8e93] hover:text-white transition-colors focus:outline-none cursor-pointer pointer-events-auto"
              aria-label="Очистить поиск"
            >
              <Icon name="cancel" size={20} />
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
