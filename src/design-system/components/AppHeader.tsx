import React, { useState } from 'react';
import { SFSymbol } from './SFSymbol';
import { ServerStatus } from '../types';

interface AppHeaderProps {
  status: ServerStatus | null;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function AppHeader({ status, onRefresh, isRefreshing = false }: AppHeaderProps) {
  const [copied, setCopied] = useState(false);

  const getStatusColor = () => {
    switch (status?.status) {
      case 'online':
        return {
          bg: 'bg-[#c0ff00]/15',
          border: 'border-[#c0ff00]/30',
          dot: 'bg-[#c0ff00]',
          text: 'text-[#c0ff00]',
          label: 'ОНЛАЙН',
        };
      case 'starting':
      case 'stopping':
        return {
          bg: 'bg-amber-500/15',
          border: 'border-amber-500/30',
          dot: 'bg-amber-400 animate-ping',
          text: 'text-amber-400',
          label: status.status === 'starting' ? 'ЗАПУСК' : 'ОСТАНОВКА',
        };
      case 'offline':
      default:
        return {
          bg: 'bg-red-500/15',
          border: 'border-red-500/30',
          dot: 'bg-red-500',
          text: 'text-red-400',
          label: 'ОФФЛАЙН',
        };
    }
  };

  const statusStyle = getStatusColor();

  const handleCopyIp = () => {
    navigator.clipboard?.writeText('mc.onehouse.ru');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090b0e]/85 backdrop-blur-xl border-b border-white/5 safe-top px-4 pb-3">
      <div className="flex items-center justify-between pt-1">
        {/* Бренд и статус */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#14171c] border border-white/10 flex items-center justify-center shadow-inner">
            <span className="text-[#c0ff00] font-black text-sm">1H</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-white leading-none">
                OneHouse
              </h1>
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {statusStyle.label}
              </div>
            </div>

            <p className="text-[11px] text-[#8e8e93] font-medium mt-0.5">
              {status?.serverInfo.version || 'Minecraft Server'}
            </p>
          </div>
        </div>

        {/* Кнопка обновления */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className={`w-9 h-9 rounded-full bg-[#14171c] border border-white/10 flex items-center justify-center text-white/80 active:scale-90 sf-tap transition-all ${
              isRefreshing ? 'animate-sf-rotate' : ''
            }`}
            title="Обновить данные"
          >
            <SFSymbol name="arrow.clockwise" size={17} animated={false} />
          </button>
        </div>
      </div>
    </header>
  );
}
