import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { OneIcon } from '../components/Icon';
import { useIsMobile } from '../utils/useIsMobile';

export interface ActionMenuItem {
  id?: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  badge?: string | number;
  separator?: boolean;
  isActive?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  trigger?: React.ReactNode;
  icon?: string;
  title?: string;
  description?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

/**
 * ActionMenu - Adaptive dropdown / action sheet component
 * - Desktop: Classic floating dropdown anchored to trigger with rounded-[20px] bg-[#181c23]
 * - Mobile: Dropdowns do NOT exist. Automatically transforms into a native-feeling Bottom Sheet
 *   with large touch-friendly rows (min-h-[52px], py-3.5 px-4), swipe-down gesture, and clearance above MobileNavbar.
 */
export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  trigger,
  icon = 'more_vert',
  title = 'Действия',
  description,
  align = 'end',
  sideOffset = 6,
  className,
  selectedId,
  onSelect,
}) => {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Default Three-dots round icon button trigger
  const defaultTrigger = (
    <button
      type="button"
      className="w-9 h-9 rounded-full aspect-square flex items-center justify-center text-[#8e8e93] hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none cursor-pointer sf-tap"
      aria-label="Открыть меню действий"
    >
      <OneIcon name={icon} size={20} />
    </button>
  );

  const activeTrigger = trigger || defaultTrigger;

  if (isMobile) {
    return (
      <>
        {/* Mobile Trigger wraps with click to open bottom sheet */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setMobileOpen(true);
          }}
          className="inline-flex cursor-pointer"
        >
          {activeTrigger}
        </div>

        {/* Mobile Bottom Sheet Overlay */}
        {typeof document !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {mobileOpen && (
                <div className="fixed inset-0 z-50 flex items-end">
                  {/* Backdrop */}
                  <motion.div
                    key="action-menu-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    aria-hidden="true"
                  />

                  {/* Bottom Sheet Drawer */}
                  <motion.div
                    key="action-menu-sheet"
                    drag="y"
                    dragConstraints={{ top: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.y > 60 || info.velocity.y > 250) {
                        setMobileOpen(false);
                      }
                    }}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                    className={cn(
                      'fixed inset-x-0 bottom-0 z-50 flex flex-col bg-[#14171c] rounded-t-[32px] rounded-b-none border-none shadow-[0_-12px_48px_rgba(0,0,0,0.85)] max-h-[85vh] select-none',
                      className
                    )}
                    role="dialog"
                    aria-modal="true"
                  >
                    {/* Swipe Handle */}
                    <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mt-3 mb-2 shrink-0 touch-none cursor-grab active:cursor-grabbing" />

                    {/* Header info */}
                    {(title || description) && (
                      <div className="px-6 pt-2 pb-2 text-left">
                        {title && (
                          <h4 className="text-base font-bold text-white tracking-tight">
                            {title}
                          </h4>
                        )}
                        {description && (
                          <p className="text-xs text-[#8e8e93] mt-0.5">{description}</p>
                        )}
                      </div>
                    )}

                    {/* Mobile Touch Rows with clearance above MobileNavbar */}
                    <div className="p-4 pt-1 space-y-2 pb-28 overflow-y-auto no-scrollbar">
                      {items.map((item, idx) => {
                        if (item.separator) {
                          return <div key={`sep-${idx}`} className="my-2 h-px bg-white/5" />;
                        }

                        const isItemActive =
                          item.isActive || (selectedId !== undefined && item.id === selectedId);

                        return (
                          <button
                            key={item.id || `item-${idx}`}
                            type="button"
                            disabled={item.disabled}
                            onClick={() => {
                              setMobileOpen(false);
                              if (item.id && onSelect) {
                                onSelect(item.id);
                              }
                              item.onClick?.();
                            }}
                            className={cn(
                              'w-full min-h-[52px] py-3.5 px-4 rounded-2xl bg-[#181c23] active:bg-white/5 active:scale-[0.98] transition-colors flex items-center justify-between text-left cursor-pointer border-none outline-none',
                              item.disabled && 'opacity-40 pointer-events-none'
                            )}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {item.icon && (
                                <div
                                  className={cn(
                                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                                    item.danger
                                      ? 'bg-red-500/15 text-red-400'
                                      : isItemActive
                                      ? 'bg-[#c0ff00]/15 text-[#c0ff00]'
                                      : 'bg-[#1c222b] text-[#8e8e93]'
                                  )}
                                >
                                  <OneIcon name={item.icon} size={24} />
                                </div>
                              )}
                              <span
                                className={cn(
                                  'text-base font-semibold truncate',
                                  item.danger
                                    ? 'text-red-400'
                                    : isItemActive
                                    ? 'text-[#c0ff00]'
                                    : 'text-white'
                                )}
                              >
                                {item.label}
                              </span>
                            </div>

                            {isItemActive ? (
                              <OneIcon
                                name="check"
                                size={24}
                                className="text-[#c0ff00] shrink-0"
                              />
                            ) : item.badge !== undefined ? (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/5 text-[#8e8e93]">
                                {item.badge}
                              </span>
                            ) : (
                              <OneIcon
                                name="chevron_right"
                                size={20}
                                className="text-white/20 shrink-0"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </>
    );
  }

  // DESKTOP: Radix UI Dropdown Menu
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{activeTrigger}</DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 min-w-[200px] overflow-hidden rounded-[20px]',
            'bg-[#181c23] p-1.5 text-white shadow-[0_16px_48px_rgba(0,0,0,0.85)] border-none select-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            className
          )}
        >
          {items.map((item, idx) => {
            if (item.separator) {
              return (
                <DropdownMenuPrimitive.Separator
                  key={`sep-${idx}`}
                  className="my-1 h-px bg-white/5"
                />
              );
            }

            const isItemActive =
              item.isActive || (selectedId !== undefined && item.id === selectedId);

            return (
              <DropdownMenuPrimitive.Item
                key={item.id || `item-${idx}`}
                disabled={item.disabled}
                onClick={() => {
                  if (item.id && onSelect) {
                    onSelect(item.id);
                  }
                  item.onClick?.();
                }}
                className={cn(
                  'relative flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium outline-none transition-colors cursor-pointer select-none',
                  item.danger
                    ? 'text-red-400 hover:bg-red-500/10 focus:bg-red-500/10'
                    : isItemActive
                    ? 'text-[#c0ff00] bg-[#1c222b]'
                    : 'text-[#8e8e93] hover:text-white hover:bg-[#1c222b] focus:text-white focus:bg-[#1c222b]',
                  item.disabled && 'pointer-events-none opacity-40'
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {item.icon && (
                    <OneIcon
                      name={item.icon}
                      size={18}
                      className={
                        item.danger
                          ? 'text-red-400'
                          : isItemActive
                          ? 'text-[#c0ff00]'
                          : 'text-[#8e8e93]'
                      }
                    />
                  )}
                  <span className={cn('truncate', isItemActive && 'font-semibold text-white')}>
                    {item.label}
                  </span>
                </div>

                {isItemActive ? (
                  <OneIcon name="check" size={18} className="text-[#c0ff00] shrink-0" />
                ) : item.badge !== undefined ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/5 text-[#8e8e93]">
                    {item.badge}
                  </span>
                ) : null}
              </DropdownMenuPrimitive.Item>
            );
          })}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  badge?: string | number;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  title?: string;
  description?: string;
  className?: string;
  triggerClassName?: string;
}

/**
 * Select - Adaptive selector component
 * - Mobile: opens Bottom Sheet with touch-friendly 52px rows and #c0ff00 checkmarks
 * - Desktop: opens compact Radix dropdown menu anchored to pill trigger
 */
export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Выберите...',
  title = 'Выбор',
  description,
  className,
  triggerClassName,
}) => {
  const currentOption = options.find((opt) => opt.value === value);

  return (
    <ActionMenu
      title={title}
      description={description}
      selectedId={value}
      onSelect={onChange}
      className={className}
      items={options.map((opt) => ({
        id: opt.value,
        label: opt.label,
        icon: opt.icon,
        badge: opt.badge,
        isActive: opt.value === value,
        onClick: () => onChange(opt.value),
      }))}
      trigger={
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#14171c] hover:bg-[#181c23] active:scale-98 text-white font-medium text-sm transition-all border border-white/5 cursor-pointer select-none',
            triggerClassName
          )}
        >
          {currentOption?.icon && (
            <OneIcon name={currentOption.icon} size={18} className="text-[#8e8e93]" />
          )}
          <span>{currentOption ? currentOption.label : placeholder}</span>
          <OneIcon name="expand_more" size={18} className="text-[#8e8e93] ml-1" />
        </button>
      }
    />
  );
};
