import React, { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';
import { SFSymbol } from './SFSymbol';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      leftIcon,
      rightIcon,
      error,
      isPassword = false,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="flex flex-col gap-1.5 w-full min-w-0">
        <div className="relative flex items-center w-full min-w-0">
          {leftIcon && (
            <div className="absolute left-4.5 z-10 flex items-center justify-center text-white/40 pointer-events-none">
              {typeof leftIcon === 'string' ? (
                <SFSymbol name={leftIcon} size={18} />
              ) : (
                leftIcon
              )}
            </div>
          )}

          <input
            ref={ref}
            type={effectiveType}
            disabled={disabled}
            className={cn(
              'w-full h-12 rounded-full bg-white/[0.06] hover:bg-white/[0.08] focus:bg-white/[0.09]',
              'text-white text-sm font-medium placeholder:text-white/30 border-none outline-none',
              'transition-all duration-200 px-4.5',
              leftIcon ? 'pl-11' : 'pl-4.5',
              (isPassword || rightIcon) ? 'pr-11' : 'pr-4.5',
              error && 'bg-red-500/10 text-red-300 placeholder:text-red-400/50',
              disabled && 'opacity-40 cursor-not-allowed',
              className
            )}
            {...rest}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 z-10 p-1.5 rounded-full text-white/40 hover:text-white/80 active:scale-90 sf-tap transition-colors"
              tabIndex={-1}
            >
              <SFSymbol name={showPassword ? 'eye.slash.fill' : 'eye.fill'} size={17} />
            </button>
          ) : (
            rightIcon && (
              <div className="absolute right-4.5 z-10 flex items-center justify-center text-white/40 pointer-events-none">
                {typeof rightIcon === 'string' ? (
                  <SFSymbol name={rightIcon} size={18} />
                ) : (
                  rightIcon
                )}
              </div>
            )
          )}
        </div>

        {error && (
          <span className="text-xs font-semibold text-red-400 pl-4">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
