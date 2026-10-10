import React, { useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';

export interface MobileNavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | number;
}

export interface MobileNavbarProps {
  items: MobileNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  isFloating?: boolean;
  className?: string;
}

export function MobileNavbar({
  items,
  activeId,
  onChange,
  isFloating = true,
  className,
}: MobileNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [pillRect, setPillRect] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const updatePill = useCallback(() => {
    const activeEl = tabRefs.current[activeId];
    const navEl = navRef.current;
    if (activeEl && navEl) {
      const navBox = navEl.getBoundingClientRect();
      const activeBox = activeEl.getBoundingClientRect();
      setPillRect({
        left: activeBox.left - navBox.left,
        width: activeBox.width,
        ready: true,
      });
    } else {
      setPillRect((prev) => ({ ...prev, ready: false }));
    }
  }, [activeId]);

  useLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  useEffect(() => {
    updatePill();
    const navEl = navRef.current;
    if (!navEl) return;
    const ro = new ResizeObserver(() => {
      updatePill();
    });
    ro.observe(navEl);
    window.addEventListener('resize', updatePill);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updatePill);
    };
  }, [updatePill]);

  const navContent = (
    <nav
      className={cn(
        'pointer-events-auto bg-[#14171c]/95 backdrop-blur-2xl p-1.5 rounded-full border border-white/[0.06]',
        'shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative flex items-center h-[68px] transition-all duration-300 w-full max-w-[420px]',
        className
      )}
    >
      <div ref={navRef} className="relative flex items-center w-full h-full">
        {/* Скользящая активная капсула */}
        <div
          className={cn(
            'absolute top-0 bottom-0 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0',
            pillRect.ready ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            transform: `translate3d(${pillRect.left}px, 0, 0)`,
            width: `${pillRect.width}px`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[#252c37] border border-white/[0.04]" />
        </div>

        {/* Кнопки вкладок */}
        <div className="flex items-center justify-between w-full h-full min-w-0 relative z-10">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => onChange(item.id)}
                className={cn(
                  'relative flex-1 h-full flex flex-col items-center justify-center rounded-full transition-all duration-200 outline-none select-none active:scale-95 px-1',
                  isActive ? 'text-oneweb-accent font-bold' : 'text-[#8e8e93] hover:text-white'
                )}
              >
                <div className="relative flex items-center justify-center">
                  <OneIcon
                    name={item.icon}
                    size="md"
                    className={cn(
                      'transition-all duration-300',
                      isActive ? 'drop-shadow-[0_0_8px_rgba(192,255,0,0.6)]' : 'text-[#8e8e93]'
                    )}
                  />
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-2 bg-oneweb-accent text-black text-[9px] font-black px-1.5 min-w-[14px] h-[14px] rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] tracking-tight mt-1 whitespace-nowrap transition-colors duration-200 leading-none',
                    isActive ? 'font-bold text-oneweb-accent' : 'font-medium text-[#8e8e93]'
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );

  if (!isFloating) {
    return navContent;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none px-4 pb-4">
      {navContent}
    </div>
  );
}
