import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'subtle' | 'hero';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'glass', className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl p-5 glass-panel overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-200 border-none',
          variant === 'hero' && 'relative',
          variant === 'subtle' && 'glass-panel-subtle p-4',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between gap-3 relative z-10 p-0 border-none', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className, children, ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5', className)}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-0 flex-1 text-sm text-[#8e8e93] border-none relative z-10', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-0 border-none relative z-10 flex items-center justify-between', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';
