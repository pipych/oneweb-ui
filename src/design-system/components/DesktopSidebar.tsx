import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { AppLogo } from './AppLogo';
import { SFSymbol, MaterialSymbol } from './SFSymbol';
import { TabId, ServerStatus } from '../types';

export interface DesktopSidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  status: ServerStatus | null;
  onSwitchToMobile?: () => void;
  onPlusClick?: () => void;
}

interface SidebarItem {
  id: TabId;
  label: string;
  icon: string;
}

const DESKTOP_TABS: SidebarItem[] = [
  { id: 'dashboard', label: 'Главная', icon: 'house.fill' },
  { id: 'settings', label: 'Настройки', icon: 'slider.horizontal.3' },
  { id: 'players', label: 'Игроки', icon: 'person.2.fill' },
  { id: 'files', label: 'Файлы', icon: 'folder.fill' },
  { id: 'modpack', label: 'Модпак', icon: 'deployed_code' },
  { id: 'world', label: 'Мир', icon: 'globe' },
];

export function DesktopSidebar({
  activeTab,
  onTabChange,
  status,
  onSwitchToMobile,
  onPlusClick,
}: DesktopSidebarProps) {
  // По умолчанию меню развернуто, чтобы все вкладки сразу были видны слева
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('onedash_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleExpand = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('onedash_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [pillRect, setPillRect] = useState<{ top: number; height: number; ready: boolean }>({
    top: 0,
    height: 0,
    ready: false,
  });

  const updatePill = useCallback(() => {
    const activeEl = tabRefs.current[activeTab];
    const navEl = navRef.current;
    if (activeEl && navEl) {
      const navBox = navEl.getBoundingClientRect();
      const activeBox = activeEl.getBoundingClientRect();
      setPillRect({
        top: activeBox.top - navBox.top,
        height: activeBox.height,
        ready: true,
      });
    } else {
      setPillRect((prev) => ({ ...prev, ready: false }));
    }
  }, [activeTab]);

  useLayoutEffect(() => {
    updatePill();
  }, [updatePill, isCollapsed]);

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
    <aside className="sticky top-0 h-screen shrink-0 p-3 sm:p-4 flex flex-col justify-start select-none z-40">
      {/* 1. Блок над навбаром: Логотип и белое название OneDash (без плюсика) */}
      <div
        className={`flex items-center ${
          isCollapsed ? 'justify-center w-[68px]' : 'justify-start w-[220px] pl-[18px] pr-3'
        } h-10 mb-3 transition-all duration-300`}
        style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Логотип без шейпов на фоне */}
          <AppLogo className="w-6 h-6 text-[#c0ff00] shrink-0" />

          {/* Белое название OneDash */}
          {!isCollapsed && (
            <span className="text-base font-black tracking-tight text-white whitespace-nowrap animate-fade-in">
              OneDash
            </span>
          )}
        </div>
      </div>

      {/* 2. Плавающий вертикальный пилл навбара — ТОЧНАЯ КОПИЯ мобильного дока MobileTabBar, только вертикальный */}
      <nav
        className={`bg-[#14171c]/95 backdrop-blur-2xl p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/5 relative flex flex-col items-stretch transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isCollapsed ? 'w-[68px] rounded-[34px]' : 'w-[220px] rounded-[28px]'
        }`}
      >
        {/* Кнопка сворачивания в самом верху навбара с left_panel_close и подписью Свернуть */}
        <button
          type="button"
          onClick={toggleExpand}
          style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
          className={`h-9 w-full rounded-full flex items-center ${
            isCollapsed ? 'justify-center px-0' : '!justify-start justify-start pl-3 pr-2'
          } text-[#8e8e93] hover:text-white hover:bg-white/5 transition-all sf-tap group mb-1.5`}
          title={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <MaterialSymbol
              name={isCollapsed ? 'left_panel_open' : 'left_panel_close'}
              filled={true}
              size={20}
              className="text-[#8e8e93] group-hover:text-white transition-colors"
            />
          </div>
          {!isCollapsed && (
            <span className="text-xs font-semibold tracking-tight ml-3 whitespace-nowrap text-left text-[#8e8e93] group-hover:text-white transition-colors">
              Свернуть
            </span>
          )}
          {isCollapsed && (
            <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#171b22]/95 backdrop-blur-xl border border-white/10 text-white text-xs font-bold shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 whitespace-nowrap z-50">
              <span className="text-[#8e8e93]">Развернуть</span>
            </div>
          )}
        </button>

        {/* Область вкладок со скользящей активной капсулой (как в MobileTabBar) */}
        <div ref={navRef} className="relative flex flex-col gap-1 w-full min-w-0">
          {/* Скользящая активная капсула: точно такая же, как в MobileTabBar */}
          <div
            className={`absolute left-0 right-0 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 ${
              pillRect.ready ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate3d(0, ${pillRect.top}px, 0)`,
              height: `${pillRect.height}px`,
            }}
          >
            <div className="w-full h-full rounded-full bg-[#252c37]" />
          </div>

          {/* Вкладки: иконка и текст выровнены строго по левой стороне */}
          {DESKTOP_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                onClick={() => onTabChange(tab.id)}
                style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
                className={`relative z-10 h-[50px] w-full rounded-full flex items-center ${
                  isCollapsed ? 'justify-center px-0' : '!justify-start justify-start pl-3'
                } transition-all duration-200 sf-tap group ${
                  isActive ? 'text-[#c0ff00] font-bold' : 'text-[#8e8e93] hover:text-white'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <SFSymbol
                    name={tab.icon}
                    size={22}
                    className={`transition-all duration-300 ${
                      isActive ? 'sf-glow-green text-[#c0ff00]' : 'text-[#8e8e93] group-hover:text-white'
                    }`}
                  />
                </div>

                {!isCollapsed && (
                  <span
                    className={`text-sm font-bold tracking-tight ml-3 whitespace-nowrap text-left transition-colors duration-200 ${
                      isActive ? 'text-[#c0ff00]' : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </span>
                )}

                {/* Всплывающая подсказка в свернутом виде */}
                {isCollapsed && (
                  <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#171b22]/95 backdrop-blur-xl border border-white/10 text-white text-xs font-bold shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 whitespace-nowrap z-50">
                    <span className={isActive ? 'text-[#c0ff00]' : 'text-white'}>
                      {tab.label}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
