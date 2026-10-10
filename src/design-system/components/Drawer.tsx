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
      'fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-all duration-200 animate-fade-in',
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = 'DrawerOverlay';

const drawerVariants = cva(
  'fixed z-50 bg-[#14171c] border-white/[0.06] shadow-2xl flex flex-col outline-none transition-all duration-300',
  {
    variants: {
      side: {
        bottom:
          'inset-x-0 bottom-0 max-h-[85vh] border-t rounded-t-[32px] p-7 animate-slide-up gap-5',
        top:
          'inset-x-0 top-0 max-h-[85vh] border-b rounded-b-[32px] p-7 animate-slide-down gap-5',
        right:
          'inset-y-0 right-0 h-full w-full sm:max-w-md border-l rounded-l-[32px] p-7 animate-slide-left gap-5',
        left:
          'inset-y-0 left-0 h-full w-full sm:max-w-md border-r rounded-r-[32px] p-7 animate-slide-right gap-5',
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
        <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto -mt-2 mb-2 cursor-grab" />
      )}
      {children}
      <DialogPrimitive.Close className="absolute right-5 top-5 rounded-full p-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors focus:outline-none">
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
    className={cn('flex flex-col gap-1.5 text-left border-none p-0', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 mt-auto border-none', className)}
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
    className={cn('text-xl font-bold text-white tracking-tight', className)}
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
    className={cn('text-xs text-[#8e8e93] leading-relaxed', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'DrawerDescription';

export const Sheet = Drawer;
export const SheetTrigger = DrawerTrigger;
export const SheetContent = DrawerContent;
export const SheetHeader = DrawerHeader;
export const SheetFooter = DrawerFooter;
export const SheetTitle = DrawerTitle;
export const SheetDescription = DrawerDescription;
export const SheetClose = DrawerClose;
