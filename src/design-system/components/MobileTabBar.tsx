import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { SFSymbol } from './SFSymbol';
import { TabId } from '../types';

export interface TabItem {
  id: TabId;
  label: string;
  icon: string;
}

export interface MobileTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  className?: string;
}

const TABS: TabItem[] = [
  { id: 'dashboard', label: 'Сервер', icon: 'house.fill' },
  { id: 'console', label: 'Консоль', icon: 'terminal' },
  { id: 'settings', label: 'Настройки', icon: 'slider.horizontal.3' },
  { id: 'files', label: 'Файлы', icon: 'folder.fill' },
];

export function MobileTabBar({
  activeTab,
  onTabChange,
  className = '',
}: MobileTabBarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [pillRect, setPillRect] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const updatePill = useCallback(() => {
    const activeEl = tabRefs.current[activeTab];
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
  }, [activeTab]);

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

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none safe-bottom px-3 pb-3 ${className}`}>
      {/* Главный плавающий пилл (Dock) */}
      <nav
        className="pointer-events-auto bg-[#14171c]/95 backdrop-blur-2xl p-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative flex items-center h-[68px] transition-all duration-300 w-full max-w-[420px]"
      >
        <div ref={navRef} className="relative flex items-center w-full h-full">
          {/* Скользящая активная капсула */}
          <div
            className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 ${
              pillRect.ready ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate3d(${pillRect.left}px, 0, 0)`,
              width: `${pillRect.width}px`,
            }}
          >
            <div className="w-full h-full rounded-full bg-[#252c37]" />
          </div>

          {/* Кнопки вкладок */}
          <div className="flex items-center justify-between w-full h-full min-w-0">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative z-10 flex-1 h-full flex flex-col items-center justify-center rounded-full transition-all duration-200 sf-tap ${
                    isActive ? 'text-[#c0ff00] font-bold' : 'text-[#8e8e93] hover:text-white'
                  }`}
                >
                  <SFSymbol
                    name={tab.icon}
                    size={22}
                    className={`transition-all duration-300 ${
                      isActive ? 'sf-glow-green' : 'text-[#8e8e93]'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold tracking-tight mt-1 whitespace-nowrap transition-colors duration-200 ${
                      isActive ? 'text-[#c0ff00]' : 'text-[#8e8e93]'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
