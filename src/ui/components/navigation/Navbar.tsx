import React from 'react';
import { cn } from '../../utils/cn';
import { NavbarProps } from './types';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

/**
 * Adaptive Navbar for OneWebUI
 * - Automatically renders DesktopNavbar on desktop screens (md:)
 * - Automatically renders MobileNavbar (floating bottom capsule) on mobile screens (<md)
 * - Adheres strictly to OneHouse aesthetic, animations, and tab limits.
 */
export const Navbar: React.FC<NavbarProps> = ({
  items,
  activeId,
  onChange,
  logo,
  actions,
  desktopVariant = 'floating',
  className,
  desktopClassName,
  mobileClassName,
  isStatic = false,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {/* Desktop view: top navigation */}
      <div className={cn('hidden md:block w-full', desktopClassName)}>
        <DesktopNavbar
          items={items}
          activeId={activeId}
          onChange={onChange}
          logo={logo}
          actions={actions}
          variant={desktopVariant}
          isStatic={isStatic}
        />
      </div>

      {/* Mobile view: floating bottom tabbar */}
      <div className={cn('md:hidden', mobileClassName)}>
        <MobileNavbar
          items={items}
          activeId={activeId}
          onChange={onChange}
          isStatic={isStatic}
        />
      </div>
    </div>
  );
};
