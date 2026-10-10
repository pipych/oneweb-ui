import React from 'react';
import { cn } from '../utils/cn';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  fill?: boolean;
  size?: number | string;
  className?: string;
}

/**
 * Material Symbols Rounded Icon Component
 * Default fill variation is 1 as per One design system specification.
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ name, fill = true, size = 20, className, style, ...props }, ref) => {
    const customStyle: React.CSSProperties = {
      fontSize: typeof size === 'number' ? `${size}px` : size,
      width: typeof size === 'number' ? `${size}px` : size,
      height: typeof size === 'number' ? `${size}px` : size,
      fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      ...style,
    };

    return (
      <span
        ref={ref}
        className={cn('material-symbols-rounded select-none leading-none inline-flex items-center justify-center shrink-0', className)}
        style={customStyle}
        aria-hidden="true"
        {...props}
      >
        {name}
      </span>
    );
  }
);

Icon.displayName = 'Icon';
