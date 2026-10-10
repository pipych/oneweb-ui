import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
}

const cardVariants = {
  default: 'bg-[#14171c] border border-white/[0.04]',
  elevated: 'bg-[#181c23] border border-white/[0.06]',
  glass: 'bg-[#14171c]/80 border border-white/[0.04] backdrop-blur-2xl',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[32px] p-6 sm:p-7 flex flex-col gap-5 transition-all duration-200 overflow-hidden',
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
        className={cn('flex flex-col gap-1.5 p-0 border-none', className)}
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
        className={cn('text-lg font-bold text-white tracking-tight', className)}
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
        className={cn('text-xs text-[#8e8e93] leading-relaxed', className)}
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
        className={cn('p-0 flex-1 text-sm text-[#8e8e93] border-none', className)}
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
          'p-0 pt-2 flex items-center justify-between gap-3 mt-auto border-none',
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
