import React, { useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { DesktopNavbarProps } from './types';

/**
 * DesktopNavbar - Top navigation bar for desktop interfaces.
 * - Unlimited tab count support with horizontal scroll (no-scrollbar)
 * - Protected layout: Logo and Actions slots never shrink or get compressed
 * - Sliding indicator capsule or smooth pill transitions
 * - Supports floating capsule ('floating') or full-width ('full') styles
 */
export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  items,
  activeId,
  onChange,
  logo,
  actions,
  variant = 'floating',
  className,
  isStatic = false,
}) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [pillRect, setPillRect] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const updatePill = useCallback(() => {
    const activeEl = tabRefs.current[activeId];
    const containerEl = tabsContainerRef.current;
    if (activeEl && containerEl) {
      const containerBox = containerEl.getBoundingClientRect();
      const activeBox = activeEl.getBoundingClientRect();
      setPillRect({
        left: activeBox.left - containerBox.left + containerEl.scrollLeft,
        width: activeBox.width,
        ready: true,
      });
    } else {
      setPillRect((prev) => ({ ...prev, ready: false }));
    }
  }, [activeId, items]);

  useLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  useEffect(() => {
    updatePill();
    const containerEl = tabsContainerRef.current;
    if (!containerEl) return;

    const ro = new ResizeObserver(() => {
      updatePill();
    });
    ro.observe(containerEl);

    const handleScroll = () => updatePill();
    containerEl.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePill);

    return () => {
      ro.disconnect();
      containerEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePill);
    };
  }, [updatePill]);

  const navContent = (
    <div className="flex items-center justify-between w-full h-full gap-4">
      {/* 1. Left slot: Brand / Logo (strictly unshrinkable) */}
      {logo && (
        <div className="shrink-0 flex items-center select-none">
          {logo}
        </div>
      )}

      {/* 2. Middle slot: Unlimited tabs list with horizontal scroll without scrollbars */}
      <div
        ref={tabsContainerRef}
        className="relative flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 min-w-0 justify-center h-full py-1.5 px-2 select-none"
      >
        {/* Animated Sliding Pill Indicator */}
        <div
          className={cn(
            'absolute top-2 bottom-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0',
            pillRect.ready ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            transform: `translate3d(${pillRect.left}px, 0, 0)`,
            width: `${pillRect.width}px`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[#252c37]" />
        </div>

        {/* Tab Buttons */}
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              onClick={() => onChange(item.id)}
              disabled={item.disabled}
              className={cn(
                'relative z-10 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-200 shrink-0 sf-tap leading-none',
                isActive
                  ? 'text-[#c0ff00]'
                  : 'text-[#8e8e93] hover:text-white hover:bg-white/5',
                item.disabled && 'opacity-35 cursor-not-allowed pointer-events-none'
              )}
              aria-label={item.label}
              aria-selected={isActive}
              role="tab"
            >
              <Icon
                name={item.icon}
                size={18}
                className={cn(
                  'transition-all duration-200',
                  isActive ? 'text-[#c0ff00] sf-glow-green' : 'text-[#8e8e93]'
                )}
              />
              <span className="whitespace-nowrap">{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={cn(
                    'min-w-[18px] h-[18px] px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center leading-none transition-colors',
                    isActive
                      ? 'bg-[#c0ff00] text-[#090b0e]'
                      : 'bg-white/10 text-[#8e8e93]'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Right slot: Actions / Profile (strictly unshrinkable) */}
      {actions && (
        <div className="shrink-0 flex items-center gap-3 select-none">
          {actions}
        </div>
      )}
    </div>
  );

  if (variant === 'floating') {
    return (
      <header
        className={cn(
          isStatic
            ? 'w-full'
            : 'sticky top-4 z-40 w-full px-4 sm:px-8 flex justify-center transition-all duration-300',
          className
        )}
      >
        <div className="w-full max-w-6xl bg-[#14171c]/90 backdrop-blur-2xl border border-white/[0.04] rounded-full shadow-2xl px-4 py-2 h-16 flex items-center transition-all">
          {navContent}
        </div>
      </header>
    );
  }

  // Full-width bar style
  return (
    <header
      className={cn(
        isStatic
          ? 'w-full'
          : 'sticky top-0 z-40 w-full transition-all duration-300',
        'bg-[#14171c]/90 backdrop-blur-2xl border-b border-white/[0.04] shadow-md',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center">
        {navContent}
      </div>
    </header>
  );
};
