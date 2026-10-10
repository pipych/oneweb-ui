import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';

export const Tabs = TabsPrimitive.Root;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  size?: 'sm' | 'md' | 'lg';
}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size = 'md', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center bg-[#14171c] border border-white/[0.04] rounded-full text-[#8e8e93] select-none gap-1',
      size === 'sm' && 'p-1',
      size === 'md' && 'p-1.5',
      size === 'lg' && 'p-2',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: string | React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, icon, size = 'md', children, ...props }, ref) => {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return (
        <OneIcon
          name={icon}
          size={size === 'sm' ? 16 : size === 'lg' ? 20 : 'sm'}
          className="shrink-0 transition-colors"
        />
      );
    }
    return icon;
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-all duration-200',
        'outline-none disabled:pointer-events-none disabled:opacity-30 border-none select-none gap-2',
        'text-[#8e8e93] hover:text-white',
        // Активный объемный пилл с лаймовым текстом
        'data-[state=active]:bg-[#252c37] data-[state=active]:text-oneweb-accent data-[state=active]:shadow-[0_2px_12px_rgba(0,0,0,0.6)] data-[state=active]:font-bold',
        'focus-visible:ring-2 focus-visible:ring-oneweb-accent',
        size === 'sm' && 'h-8 px-3 text-xs',
        size === 'md' && 'h-9 px-4 text-xs',
        size === 'lg' && 'h-11 px-5 text-sm',
        className
      )}
      {...props}
    >
      {renderIcon()}
      {children && <span>{children}</span>}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 outline-none focus-visible:ring-2 focus-visible:ring-oneweb-accent animate-fade-in',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
