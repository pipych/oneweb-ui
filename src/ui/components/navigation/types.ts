import React from 'react';

/**
 * Universal Navigation Item definition across OneWebUI
 */
export interface NavItem {
  id: string;
  label: string;
  /** Name of the Material Symbols Rounded icon */
  icon: string;
  /** Optional link URL (if used as anchor) */
  href?: string;
  /** Optional badge value (counter or text) */
  badge?: number | string;
  /** Optional disabled state */
  disabled?: boolean;
}

/**
 * Props for MobileNavbar component
 */
export interface MobileNavbarProps {
  /** Navigation items (strictly up to 5 items) */
  items: NavItem[];
  /** ID of current active item */
  activeId: string;
  /** Callback fired when a tab is selected */
  onChange: (id: string) => void;
  /** Custom container class */
  className?: string;
  /** Whether the navbar should be statically placed instead of fixed bottom (useful for previews/cards) */
  isStatic?: boolean;
  /** Custom max width class (default 'max-w-md') */
  maxWidthClass?: string;
  /** Optional extra action slot separated by divider (like in OneHouse) */
  extraAction?: {
    id: string;
    label: string;
    icon: string;
    badge?: number | string;
    onClick?: () => void;
  };
}

/**
 * Props for DesktopNavbar component
 */
export interface DesktopNavbarProps {
  /** Navigation items (unlimited, scrollable with no-scrollbar) */
  items: NavItem[];
  /** ID of current active item */
  activeId: string;
  /** Callback fired when a tab is selected */
  onChange: (id: string) => void;
  /** Left slot: Logo / Brand element */
  logo?: React.ReactNode;
  /** Right slot: Actions, buttons or User profile */
  actions?: React.ReactNode;
  /** Presentation style: 'floating' (capsule) or 'full' (full-width sticky bar) */
  variant?: 'floating' | 'full';
  /** Additional container class */
  className?: string;
  /** Whether the navbar should be statically placed instead of sticky/fixed (useful for previews) */
  isStatic?: boolean;
}

/**
 * Props for adaptive Navbar (renders DesktopNavbar on md: and MobileNavbar on mobile)
 */
export interface NavbarProps {
  items: NavItem[];
  activeId: string;
  onChange: (id: string) => void;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  desktopVariant?: 'floating' | 'full';
  className?: string;
  desktopClassName?: string;
  mobileClassName?: string;
  isStatic?: boolean;
}
