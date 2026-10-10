import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../utils/cn';

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
      'bg-[#14171c] p-1 rounded-full flex items-center transition-all w-full max-w-md border-none select-none',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode;
}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, icon, children, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex-1 py-2.5 rounded-full text-xs font-black transition-all sf-tap flex items-center justify-center gap-1.5 border-none outline-none select-none',
        'text-[#8e8e93] hover:text-white',
        'data-[state=active]:bg-[#252c37] data-[state=active]:text-[#c0ff00] data-[state=active]:shadow-md',
        className
      )}
      {...props}
    >
      {icon}
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
    className={cn('mt-4 outline-none animate-fade-in border-none', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

/**
 * High-level OneHouse Segmented Tabs component copied 1-in-1 from SettingsView.tsx
 */
export interface SegmentedTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  isDesktop?: boolean;
}

export function SegmentedTabs({
  tabs,
  activeId,
  onChange,
  className = '',
  isDesktop = false,
}: SegmentedTabsProps) {
  return (
    <div
      className={cn(
        'bg-[#14171c] p-1 rounded-full flex items-center transition-all',
        isDesktop ? 'w-full max-w-sm h-10' : 'w-full max-w-md',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex-1 rounded-full text-xs font-black transition-all sf-tap flex items-center justify-center gap-1.5',
              isDesktop ? 'h-full' : 'py-2.5',
              isActive
                ? 'bg-[#252c37] text-[#c0ff00] shadow-md'
                : 'text-[#8e8e93] hover:text-white'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
