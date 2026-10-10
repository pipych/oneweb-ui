import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-all duration-200 animate-fade-in',
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = 'DrawerOverlay';

const drawerVariants = cva(
  'fixed z-50 bg-oneweb-surface-elevated border-oneweb-border shadow-oneweb-sheet flex flex-col outline-none transition-all duration-300',
  {
    variants: {
      side: {
        bottom:
          'inset-x-0 bottom-0 max-h-[85vh] border-t rounded-t-oneweb-sheet p-6 animate-slide-up',
        top:
          'inset-x-0 top-0 max-h-[85vh] border-b rounded-b-oneweb-sheet p-6 animate-slide-down',
        right:
          'inset-y-0 right-0 h-full w-full sm:max-w-md border-l p-6 animate-slide-left',
        left:
          'inset-y-0 left-0 h-full w-full sm:max-w-md border-r p-6 animate-slide-right',
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  }
);

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
  showDragHandle?: boolean;
}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ side = 'bottom', showDragHandle = true, className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(drawerVariants({ side }), className)}
      {...props}
    >
      {side === 'bottom' && showDragHandle && (
        <div className="w-12 h-1.5 rounded-oneweb-full bg-oneweb-border-strong mx-auto mb-3 cursor-grab" />
      )}
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-oneweb-md p-1 text-oneweb-text-secondary hover:text-oneweb-text-primary hover:bg-oneweb-surface-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-oneweb-accent">
        <OneIcon name="close" size="sm" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1.5 text-left pb-3 border-b border-oneweb-border/60', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col sm:flex-row sm:justify-end gap-2 pt-3 mt-auto border-t border-oneweb-border/60', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-bold text-oneweb-text-primary tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-xs text-oneweb-text-secondary leading-relaxed', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'DrawerDescription';

// Export Sheet aliases for standard UI ergonomics
export const Sheet = Drawer;
export const SheetTrigger = DrawerTrigger;
export const SheetContent = DrawerContent;
export const SheetHeader = DrawerHeader;
export const SheetFooter = DrawerFooter;
export const SheetTitle = DrawerTitle;
export const SheetDescription = DrawerDescription;
export const SheetClose = DrawerClose;
