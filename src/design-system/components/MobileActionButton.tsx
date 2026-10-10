import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';

export interface MobileActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'circular' | 'extended';
  icon?: string | React.ReactNode;
  label?: string;
  isFloating?: boolean;
}

export const MobileActionButton = forwardRef<HTMLButtonElement, MobileActionButtonProps>(
  (
    {
      variant = 'circular',
      icon = 'add',
      label = 'Создать',
      isFloating = true,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isExtended = variant === 'extended';

    const renderIcon = () => {
      if (typeof icon === 'string') {
        return <OneIcon name={icon} size="md" className="font-bold" />;
      }
      return icon;
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center font-bold select-none text-black bg-oneweb-accent hover:bg-oneweb-accent-hover transition-all duration-200 active:scale-90',
          'shadow-[0_0_24px_rgba(192,255,0,0.45)] hover:shadow-[0_0_32px_rgba(192,255,0,0.6)]',
          'focus-visible:ring-4 focus-visible:ring-oneweb-accent/50 outline-none',
          isFloating && 'fixed bottom-24 right-5 sm:right-7 z-50',
          isExtended ? 'h-14 px-6 rounded-full gap-2.5 text-sm' : 'h-14 w-14 rounded-full aspect-square',
          className
        )}
        {...rest}
      >
        {renderIcon()}
        {isExtended && (
          <span className="tracking-tight whitespace-nowrap">{children || label}</span>
        )}
      </button>
    );
  }
);

MobileActionButton.displayName = 'MobileActionButton';

// Алиас для краткости
export const FAB = MobileActionButton;
