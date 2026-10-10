import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center select-none rounded-full aspect-square font-semibold transition-all duration-150 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 outline-none shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-oneweb-accent text-black hover:bg-oneweb-accent-hover shadow-[0_0_12px_rgba(192,255,0,0.3)] focus-visible:ring-2 focus-visible:ring-oneweb-accent border-none',
        secondary:
          'bg-white/5 text-white hover:bg-white/10 hover:text-white border border-white/[0.04] focus-visible:ring-2 focus-visible:ring-white/20',
        outline:
          'bg-transparent text-white border border-white/10 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/20',
        ghost:
          'bg-transparent text-[#8e8e93] hover:text-white hover:bg-white/5 border-none focus-visible:ring-2 focus-visible:ring-white/20',
        danger:
          'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border-none focus-visible:ring-2 focus-visible:ring-rose-500',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-14 w-14 text-lg',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon?: string | React.ReactNode;
  iconSize?: 'sm' | 'md' | 'lg' | number;
  isLoading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant,
      size = 'md',
      icon,
      iconSize,
      isLoading = false,
      disabled = false,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Автоматический подбор размера иконки по размеру кнопки, если iconSize не указан
    const resolvedIconSize: 'sm' | 'md' | 'lg' | number = iconSize ?? (
      size === 'sm' ? 18 :
      size === 'md' ? 'sm' :
      size === 'lg' ? 'md' :
      'lg'
    );

    const renderContent = () => {
      if (isLoading) {
        return (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        );
      }
      if (typeof icon === 'string') {
        return <OneIcon name={icon} size={resolvedIconSize} />;
      }
      if (icon) {
        return icon;
      }
      return children;
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...rest}
      >
        {renderContent()}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
