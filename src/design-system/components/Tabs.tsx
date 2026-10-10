import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../utils/cn';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center p-1 bg-oneweb-surface-subtle border border-oneweb-border rounded-oneweb-xl text-oneweb-text-secondary select-none',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-oneweb-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150',
      'outline-none disabled:pointer-events-none disabled:opacity-40',
      'hover:text-oneweb-text-primary',
      'data-[state=active]:bg-oneweb-surface-elevated data-[state=active]:text-oneweb-text-primary data-[state=active]:shadow-oneweb-sm data-[state=active]:border data-[state=active]:border-oneweb-border',
      'focus-visible:ring-2 focus-visible:ring-oneweb-accent',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-3 outline-none focus-visible:ring-2 focus-visible:ring-oneweb-accent animate-fade-in',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
