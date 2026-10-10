import React from 'react';
import { Icon } from '@one/web-ui';
import { cn } from '@one/web-ui';

export type PageId = 'overview' | 'tokens' | 'buttons' | 'inputs' | 'cards' | 'overlays' | 'badges';

interface SidebarProps {
  activePage: PageId;
  onSelectPage: (id: PageId) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: string;
  badge?: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Начало работы',
    items: [
      { id: 'overview', label: 'Обзор & Гайд', icon: 'auto_stories' },
      { id: 'tokens', label: 'Дизайн-токены', icon: 'palette' },
    ],
  },
  {
    title: 'Компоненты',
    items: [
      { id: 'buttons', label: 'Button', icon: 'smart_button' },
      { id: 'inputs', label: 'Input', icon: 'edit_square' },
      { id: 'cards', label: 'Card', icon: 'dashboard' },
      { id: 'badges', label: 'Badge', icon: 'label' },
    ],
  },
  {
    title: 'Radix UI Примитивы',
    items: [
      { id: 'overlays', label: 'Overlays & Tabs', icon: 'layers', badge: 'Radix' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  isOpenMobile,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-45 w-64 border-r border-oneweb-border-subtle bg-oneweb-bg pt-16 transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:pt-0',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-4 py-6">
          <nav className="space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <p className="px-3 text-[11px] font-semibold tracking-wider text-oneweb-text-secondary uppercase">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectPage(item.id);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-oneweb-lg transition-colors cursor-pointer text-left',
                          isActive
                            ? 'bg-oneweb-accent/15 text-oneweb-accent font-semibold border border-oneweb-border-accent'
                            : 'text-oneweb-text-secondary hover:text-white hover:bg-oneweb-surface-subtle'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            name={item.icon}
                            size={18}
                            className={isActive ? 'text-oneweb-accent' : 'text-oneweb-text-secondary'}
                          />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-oneweb-surface-elevated text-oneweb-text-secondary border border-oneweb-border-subtle">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="pt-6 border-t border-oneweb-border-subtle text-xs text-oneweb-text-secondary">
            <div className="flex items-center justify-between mb-2">
              <span>Домен</span>
              <span className="text-white font-mono text-[11px]">webui.onelaunch.pp.ua</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Экосистема</span>
              <span className="text-oneweb-accent font-medium">One House</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
