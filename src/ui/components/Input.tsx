import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { Icon, OneIcon } from './Icon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: string | React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * OneWebUI Input
 * - Strict Pill Shape (rounded-full)
 * - Solid surface background (#14171c)
 * - Zero borders, zero rings (border-none outline-none ring-0 focus:ring-0 focus:outline-none)
 * - Perfectly centered icons (absolute left-4 top-1/2 -translate-y-1/2) with fixed pl-11 padding
 * - Prevents text and icon overlap
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      icon,
      leftIcon,
      rightIcon,
      rightAction,
      clearable,
      onClear,
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
      md: 'h-11 md:h-12 text-sm font-medium',
      lg: 'h-13 md:h-14 text-base font-medium',
    };

    const effectiveLeftIcon = icon || leftIcon;
    const hasLeftIcon = Boolean(effectiveLeftIcon);
    const hasRightElement = Boolean(rightIcon || rightAction || (clearable && Boolean(props.value)) || isPassword);

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[#8e8e93] select-none px-3"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {hasLeftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#8e8e93] z-10">
              {typeof effectiveLeftIcon === 'string' ? (
                <OneIcon name={effectiveLeftIcon} size={20} />
              ) : React.isValidElement(effectiveLeftIcon) ? (
                React.cloneElement(effectiveLeftIcon as React.ReactElement<{ size?: number; className?: string }>, {
                  size: 20,
                  className: cn('text-[#8e8e93]', (effectiveLeftIcon as React.ReactElement<{ className?: string }>).props?.className),
                })
              ) : (
                effectiveLeftIcon
              )}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={computedType}
            disabled={disabled}
            className={cn(
              'w-full rounded-full bg-[#14171c] text-white',
              'placeholder:text-[#8e8e93] border-none outline-none focus:outline-none focus:ring-0 ring-0',
              'transition-colors duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              hasLeftIcon ? 'pl-11' : 'pl-4',
              rightAction ? 'pr-24' : hasRightElement ? 'pr-11' : 'pr-4',
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
              <OneIcon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
            </button>
          ) : rightAction ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
              {rightAction}
            </div>
          ) : clearable && Boolean(props.value) && onClear ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#8e8e93] hover:text-white transition-colors focus:outline-none cursor-pointer z-10"
              aria-label="Очистить поле"
            >
              <OneIcon name="cancel" size={18} />
            </button>
          ) : rightIcon ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#8e8e93] z-10">
              {typeof rightIcon === 'string' ? (
                <OneIcon name={rightIcon} size={20} />
              ) : React.isValidElement(rightIcon) ? (
                React.cloneElement(rightIcon as React.ReactElement<{ size?: number; className?: string }>, {
                  size: 20,
                  className: cn('text-[#8e8e93]', (rightIcon as React.ReactElement<{ className?: string }>).props?.className),
                })
              ) : (
                rightIcon
              )}
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 px-3">
            <OneIcon name="error" size={16} />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#8e8e93] px-3">{helperText}</p>
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
  ({ placeholder = 'Поиск...', value, onClear, rightIcon, rightAction, icon = 'search', ...props }, ref) => {
    const hasValue = Boolean(value);

    return (
      <Input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        icon={icon}
        rightAction={rightAction}
        rightIcon={
          !rightAction && hasValue && onClear ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className="flex items-center justify-center text-[#8e8e93] hover:text-white transition-colors focus:outline-none cursor-pointer pointer-events-auto"
              aria-label="Очистить поиск"
            >
              <Icon name="cancel" size={18} />
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
