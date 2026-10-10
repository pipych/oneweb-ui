import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
}

const cardVariants = {
  default: 'bg-oneweb-surface border border-oneweb-border shadow-oneweb-md',
  elevated: 'bg-oneweb-surface-elevated border border-oneweb-border shadow-oneweb-lg',
  glass: 'bg-oneweb-surface-glass border border-oneweb-border backdrop-blur-xl shadow-oneweb-lg',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-oneweb-2xl transition-all duration-200 overflow-hidden flex flex-col',
          cardVariants[variant],
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
        className={cn('p-5 border-b border-oneweb-border flex flex-col gap-1.5', className)}
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
        className={cn('text-lg font-bold text-oneweb-text-primary tracking-tight', className)}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-xs text-oneweb-text-secondary leading-relaxed', className)}
        {...rest}
      >
        {children}
      </p>
    );
  }
);
CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-5 flex-1 text-sm text-oneweb-text-secondary', className)}
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
        className={cn(
          'p-5 pt-3 border-t border-oneweb-border/60 flex items-center justify-between gap-3 mt-auto',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';
