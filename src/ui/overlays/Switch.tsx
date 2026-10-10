import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../utils/cn';

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-oneweb-full border-2 border-transparent transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oneweb-accent focus-visible:ring-offset-2 focus-visible:ring-offset-oneweb-bg',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-oneweb-accent data-[state=unchecked]:bg-oneweb-surface-subtle border border-oneweb-border-subtle',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-oneweb-full bg-white shadow-md transition-transform',
        'data-[state=checked]:translate-x-5 data-[state=checked]:bg-oneweb-text-inverse data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-oneweb-text-secondary'
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;
