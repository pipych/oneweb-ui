import React, { forwardRef } from 'react';

export type OneIconSize = 'sm' | 'md' | 'lg' | number;

export interface OneIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Name of the icon from Google Material Symbols Rounded */
  name: string;
  /** Predefined size ('sm'=18px, 'md'=24px, 'lg'=32px) or numeric size in pixels */
  size?: OneIconSize;
  /** Whether icon is filled. Defaults to true */
  fill?: boolean;
  /** Optional additional class names */
  className?: string;
}

const sizeMap: Record<'sm' | 'md' | 'lg', number> = {
  sm: 18,
  md: 24,
  lg: 32,
};

export const OneIcon = forwardRef<HTMLSpanElement, OneIconProps>(
  (
    {
      name,
      size = 'md',
      fill = true,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const pixelSize = typeof size === 'number' ? size : sizeMap[size];
    const fillValue = fill ? 1 : 0;

    const combinedStyle: React.CSSProperties = {
      fontSize: `${pixelSize}px`,
      width: `${pixelSize}px`,
      height: `${pixelSize}px`,
      fontVariationSettings: `'FILL' ${fillValue}, 'wght' 400, 'GRAD' 0, 'opsz' ${Math.min(Math.max(pixelSize, 20), 48)}`,
      ...style,
    };

    return (
      <span
        ref={ref}
        className={`material-symbols-rounded select-none leading-none inline-flex items-center justify-center ${className}`}
        style={combinedStyle}
        aria-hidden="true"
        {...rest}
      >
        {name}
      </span>
    );
  }
);

OneIcon.displayName = 'OneIcon';

export default OneIcon;
