import React from 'react';
import { cn } from '../utils/cn';
import { OneIcon } from './OneIcon';
import { Badge } from './Badge';

export interface DesktopNavItem {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string | number;
}

export interface DesktopNavbarProps {
  variant?: 'sticky' | 'floating';
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  items?: DesktopNavItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
  rightSlot?: React.ReactNode;
  profile?: {
    name: string;
    role?: string;
    avatarUrl?: string;
    status?: 'online' | 'offline' | 'idle';
  };
  className?: string;
  children?: React.ReactNode;
}

export function DesktopNavbar({
  variant = 'sticky',
  logo,
  title = 'OneWebUI',
  subtitle = 'Ecosystem One',
  badgeText,
  items,
  activeId,
  onItemClick,
  rightSlot,
  profile,
  className,
  children,
}: DesktopNavbarProps) {
  const isFloating = variant === 'floating';

  const defaultLogo = (
    <div className="flex items-center gap-3">
      {logo || (
        <div className="w-9 h-9 rounded-full bg-oneweb-accent flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(192,255,0,0.4)] select-none shrink-0">
          1
        </div>
      )}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-base tracking-tight text-white leading-none">
            {title}
          </span>
          {badgeText && (
            <Badge variant="accent" size="sm">
              {badgeText}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-[11px] text-[#8e8e93] leading-none mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <header
      className={cn(
        'z-40 transition-all duration-200',
        isFloating
          ? 'sticky top-4 max-w-7xl mx-auto px-4 w-full'
          : 'sticky top-0 w-full bg-[#090b0e]/85 backdrop-blur-xl border-b border-white/[0.04]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-4',
          isFloating
            ? 'bg-[#14171c]/90 backdrop-blur-2xl border border-white/[0.06] rounded-full px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
            : 'max-w-7xl mx-auto px-4 sm:px-6 h-16'
        )}
      >
        {/* Бренд */}
        {defaultLogo}

        {/* Навигационные ссылки / Табы */}
        {items && items.length > 0 && (
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.04] rounded-full">
            {items.map((item) => {
              const isActive = activeId !== undefined ? activeId === item.id : item.active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onClick?.();
                    onItemClick?.(item.id);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 outline-none select-none',
                    isActive
                      ? 'bg-[#252c37] text-oneweb-accent shadow-sm'
                      : 'text-[#8e8e93] hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.icon && (
                    <OneIcon
                      name={item.icon}
                      size="sm"
                      className={isActive ? 'text-oneweb-accent' : 'text-[#8e8e93]'}
                    />
                  )}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.2 rounded-full text-white/80">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Дополнительный контент или правая секция */}
        <div className="flex items-center gap-3">
          {children}
          {rightSlot}

          {/* Профиль пользователя */}
          {profile && (
            <div className="flex items-center gap-2.5 pl-2 border-l border-white/[0.06]">
              <div className="relative">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/[0.06] flex items-center justify-center text-xs font-bold text-white">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {profile.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-oneweb-accent ring-2 ring-[#14171c]" />
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">
                  {profile.name}
                </span>
                {profile.role && (
                  <span className="text-[10px] text-[#8e8e93] leading-tight">
                    {profile.role}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
