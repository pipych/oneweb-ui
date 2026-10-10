import React, { useState } from 'react';
import {
  BentoGrid,
  SmallWidget,
  SquareWidget,
  LargeWidget,
  Badge,
  Button,
  Icon,
  Card,
} from '@one/web-ui';

export const WidgetsPage: React.FC = () => {
  // Interactive state for showcase
  const [isPlaying, setIsPlaying] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);
  const [clickNotice, setClickNotice] = useState<string | null>(null);

  const triggerClickNotice = (name: string) => {
    setClickNotice(`Открыт сервис: ${name}`);
    setTimeout(() => setClickNotice(null), 2500);
  };

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  const activeDevices = [
    {
      name: 'MacBook Pro 16″ (M3 Max)',
      app: 'OneWeb Desktop • Chrome',
      ip: '185.190.142.2 • Киев',
      isCurrent: true,
      icon: 'laptop_mac',
    },
    {
      name: 'iPhone 16 Pro',
      app: 'OneMobile App • iOS 18',
      ip: '178.62.204.18 • Варшава',
      isCurrent: false,
      icon: 'smartphone',
    },
    {
      name: 'Windows Workstation',
      app: 'OneWeb Console • Edge',
      ip: '91.240.85.11 • Прага',
      isCurrent: false,
      icon: 'desktop_windows',
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      {/* 1. Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="lime">Bento Grid System</Badge>
          <Badge variant="neutral">3 Typo-sizes (Row / 1:1 / Large)</Badge>
          <Badge variant="warning">Universal One Ecosystem</Badge>
          <Badge variant="success">Strict No Borders</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Система виджетов (Bento Widgets)
        </h1>
        <p className="mt-2 text-base text-oneweb-text-secondary max-w-3xl leading-relaxed">
          Модульные информационные и интерактивные блоки для дашбордов и панелей сервисов экосистемы{' '}
          <span className="text-white font-medium">One</span>. Включают три стандартизированных типоразмера, 
          компактные квадратные ярлыки с фиксацией текста в левом нижнем углу и большие виджеты с инлайн-заголовками без шейпов.
        </p>
      </div>

      {/* Floating toast alert */}
      {clickNotice && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-full bg-[#181c23] border border-white/10 text-[#c0ff00] text-xs font-bold shadow-2xl flex items-center gap-2 animate-slide-up">
          <Icon name="check_circle" size={16} />
          <span>{clickNotice}</span>
        </div>
      )}

      {/* 2. Key Architecture Guidelines Card */}
      <Card variant="glass" className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-oneweb-accent/10 flex items-center justify-center text-oneweb-accent">
            <Icon name="grid_view" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Спецификация трех типоразмеров виджетов
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Стандарты компоновки элементов, шейпов и заголовков
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Typo 1: Small / Row */}
          <div className="bg-[#14171c] p-5 rounded-[22px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="view_headline" size={20} className="text-oneweb-accent" />
              <span>Small / Row (Горизонтальный)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Шейп слева:</strong> Квадрат <code className="text-white">w-12 h-12 rounded-[16px]</code> с фоном <code className="text-oneweb-accent">#181c23</code> и иконкой #c0ff00.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Текстовый стек:</strong> Белый жирный заголовок и серый текст описания. Микроанимация клика <code className="text-white">active:scale-[0.98]</code>.
            </p>
          </div>

          {/* Typo 2: Square / 1:1 */}
          <div className="bg-[#14171c] p-5 rounded-[22px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="crop_square" size={20} className="text-amber-400" />
              <span>Square / 1:1 (Компактный ярлык)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Шейп иконки:</strong> Компактный <code className="text-white">w-9 h-9</code> / <code className="text-white">w-10 h-10 rounded-[14px]</code> с фоном <code className="text-amber-400">#181c23</code>, стрелка перехода <code className="text-white">text-white/30</code>.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Левый нижний угол:</strong> Текст строго привязан к левому краю (<code className="text-white">mt-auto text-left</code>): плотный заголовок и капс-подзаголовок.
            </p>
          </div>

          {/* Typo 3: Large / Bento Card */}
          <div className="bg-[#14171c] p-5 rounded-[22px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="dashboard" size={20} className="text-emerald-400" />
              <span>Large / Bento Card (Большой)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-emerald-400">СТРОГО БЕЗ ШЕЙПА В ШАПКЕ:</strong> Иконка размещается строго в строке с текстом заголовка, без какого-либо контейнера.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Контентная зона:</strong> Слот под интерактивный UI (плееры, индикаторы хранилища, списки сессий, кнопки) со скрытым скроллом.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Section: Large Interactive Widgets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              1. Большие интерактивные виджеты (Large / Bento Card)
            </h2>
            <p className="text-xs text-oneweb-text-secondary mt-0.5">
              Иконка в шапке идет строго в тексте без шейпа; интерактивные элементы управления в форме pill
            </p>
          </div>
          <Badge variant="lime" size="sm">
            Interactive
          </Badge>
        </div>

        <BentoGrid cols={3}>
          {/* Widget 1: OneTrack Media Player (2 cols) */}
          <LargeWidget
            colSpan={2}
            title="СЕЙЧАС ИГРАЕТ"
            icon="graphic_eq"
            badge={
              <Badge variant="lime" size="sm">
                LIVE
              </Badge>
            }
            actions={
              <div className="flex items-center gap-1.5 text-xs text-[#8e8e93]">
                <span className="w-2 h-2 rounded-full bg-[#c0ff00] animate-pulse" />
                <span className="font-mono text-[11px] text-white">OneTrack FM</span>
              </div>
            }
            className="min-h-[220px]"
          >
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Album / Track Art Cover */}
                  <div className="w-14 h-14 rounded-2xl bg-[#181c23] flex items-center justify-center shrink-0 shadow-inner text-[#c0ff00]">
                    <Icon name="music_note" size={28} />
                  </div>

                  <div className="truncate min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-white truncate leading-tight">
                      Midnight Neon Pulse
                    </h4>
                    <p className="text-xs text-[#8e8e93] mt-0.5 truncate font-medium">
                      One Sound Lab • Cyber Ambient Wave
                    </p>
                  </div>
                </div>

                {/* Player Controls (strict pill shapes) */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-10 px-4 rounded-full bg-[#c0ff00] hover:bg-[#b0f000] text-[#090b0e] font-black text-xs flex items-center gap-1.5 active:scale-95 sf-tap transition-all shadow-md"
                  >
                    <Icon name={isPlaying ? 'pause' : 'play_arrow'} size={18} fill={true} />
                    <span>{isPlaying ? 'Пауза' : 'Слушать'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerClickNotice('Следующий трек')}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 text-white flex items-center justify-center sf-tap transition-all"
                    title="Следующий трек"
                  >
                    <Icon name="skip_next" size={20} />
                  </button>
                </div>
              </div>

              {/* Track Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#c0ff00]/60 to-[#c0ff00] rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? '62%' : '45%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8e8e93]">
                  <span>02:18</span>
                  <span className="text-[#c0ff00]">FLAC 24-bit • 48 kHz</span>
                  <span>03:42</span>
                </div>
              </div>
            </div>
          </LargeWidget>

          {/* Widget 2: Data Storage / Disk Space (1 col) */}
          <LargeWidget
            colSpan={1}
            title="ДИСКОВОЕ ПРОСТРАНСТВО"
            icon="pie_chart"
            actions={
              <button
                type="button"
                onClick={handleClearCache}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all active:scale-95 sf-tap ${
                  cacheCleared
                    ? 'bg-[#c0ff00]/20 text-[#c0ff00]'
                    : 'bg-white/5 hover:bg-white/10 text-[#8e8e93] hover:text-white'
                }`}
              >
                {cacheCleared ? 'Очищено!' : 'Очистить кэш'}
              </button>
            }
            className="min-h-[220px]"
          >
            <div className="space-y-3 pt-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-white font-mono tracking-tight">
                    64.2
                  </span>
                  <span className="text-xs text-[#8e8e93] ml-1">/ 100 GB</span>
                </div>
                <span className="text-xs font-bold text-[#c0ff00]">64% Занято</span>
              </div>

              {/* Segmented Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-black/40 overflow-hidden flex gap-0.5 p-0.5">
                <div className="h-full bg-[#c0ff00] rounded-l-full" style={{ width: '42%' }} title="Медиа (42 GB)" />
                <div className="h-full bg-blue-400" style={{ width: '14%' }} title="Документы (14 GB)" />
                <div className="h-full bg-purple-400 rounded-r-full" style={{ width: '8%' }} title="Бэкапы (8 GB)" />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-[#8e8e93]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c0ff00]" />
                  <span className="truncate">Медиа</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="truncate">Документы</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="truncate">Бэкапы</span>
                </div>
              </div>
            </div>
          </LargeWidget>

          {/* Widget 3: Active Sessions List (3 cols or 1 col on Bento) */}
          <LargeWidget
            colSpan={3}
            title="АКТИВНЫЕ УСТРОЙСТВА"
            icon="devices"
            badge={
              <Badge variant="lime" size="sm">
                3 сессии
              </Badge>
            }
            actions={
              <Button
                variant="outline"
                size="sm"
                onClick={() => triggerClickNotice('Сессии завершены')}
                className="text-xs"
              >
                Завершить другие
              </Button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {activeDevices.map((d) => (
                <div
                  key={d.name}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#181c23] flex items-center justify-center text-[#c0ff00] shrink-0">
                      <Icon name={d.icon} size={22} />
                    </div>
                    <div className="truncate min-w-0">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                        <span>{d.name}</span>
                        {d.isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c0ff00]" title="Текущее устройство" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#8e8e93] truncate mt-0.5">{d.app}</div>
                      <div className="text-[10px] text-[#8e8e93] font-mono truncate">{d.ip}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#8e8e93] shrink-0">
                    {d.isCurrent ? 'Текущее' : 'Активно'}
                  </span>
                </div>
              ))}
            </div>
          </LargeWidget>
        </BentoGrid>
      </div>

      {/* 4. Section: Compact Square Shortcut Widgets (1:1) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            2. Квадратные виджеты-ярлыки (Square / 1:1)
          </h2>
          <p className="text-xs text-oneweb-text-secondary mt-0.5">
            Компактные квадратные плитки с шейпом иконки слева сверху, стрелкой перехода справа и текстом, строго привязанным к левому нижнему углу
          </p>
        </div>

        {/* 4-column compact grid for shortcut widgets */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Tile 1: OneCloud */}
          <SquareWidget
            icon="cloud"
            title="Хранилище"
            subtitle="ОБЛАЧНЫЙ ДИСК"
            onClick={() => triggerClickNotice('Хранилище / OneCloud')}
            showArrow={true}
          />

          {/* Tile 2: OneMetrics */}
          <SquareWidget
            icon="insights"
            title="Аналитика"
            subtitle="СТАТИСТИКА"
            onClick={() => triggerClickNotice('Аналитика / OneMetrics')}
            showArrow={true}
          />

          {/* Tile 3: OneID */}
          <SquareWidget
            icon="shield_lock"
            title="Безопасность"
            subtitle="КЛЮЧИ ДОСТУПА"
            onClick={() => triggerClickNotice('Безопасность / OneID')}
            showArrow={true}
          />

          {/* Tile 4: OnePay */}
          <SquareWidget
            icon="account_balance_wallet"
            title="Биллинг"
            subtitle="ТРАНЗАКЦИИ"
            onClick={() => triggerClickNotice('Биллинг / OnePay')}
            showArrow={true}
          />
        </div>
      </div>

      {/* 5. Section: Small / Row Horizontal Widgets */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            3. Маленькие горизонтальные виджеты (Small / Row)
          </h2>
          <p className="text-xs text-oneweb-text-secondary mt-0.5">
            Компактные строчные виджеты: скругленный квадрат слева, вертикальный текстовый стек и микроанимация клика
          </p>
        </div>

        <BentoGrid cols={3}>
          <SmallWidget
            icon="person"
            title="Аккаунт"
            description="Управление профилем и сессиями"
            onClick={() => triggerClickNotice('Аккаунт')}
          />

          <SmallWidget
            icon="notifications"
            title="Уведомления"
            description="Центр событий и оповещений"
            trailing={
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#c0ff00] text-[#090b0e]">
                +3
              </span>
            }
            onClick={() => triggerClickNotice('Уведомления')}
          />

          <SmallWidget
            icon="extension"
            title="Интеграции"
            description="Подключенные вебхуки и API"
            trailing={
              <span className="text-[11px] font-bold text-[#c0ff00] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c0ff00]" />
                <span>Активно</span>
              </span>
            }
            onClick={() => triggerClickNotice('Интеграции')}
          />
        </BentoGrid>
      </div>

      {/* 6. Code Example Card */}
      <Card variant="default" className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Icon name="code" size={20} className="text-oneweb-accent" />
          <span>Пример использования в React</span>
        </h3>
        <pre className="bg-[#090b0e] p-4 rounded-2xl text-xs font-mono text-[#8e8e93] overflow-x-auto leading-relaxed border-none">
{`import { BentoGrid, LargeWidget, SquareWidget, SmallWidget } from '@one/web-ui';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 1. Большие виджеты: шапка без шейпа, открытый контент */}
      <BentoGrid cols={3}>
        <LargeWidget
          colSpan={2}
          title="СЕЙЧАС ИГРАЕТ"
          icon="graphic_eq"
          badge={<Badge variant="lime">LIVE</Badge>}
        >
          <AudioPlayerControls />
        </LargeWidget>

        <LargeWidget colSpan={1} title="ДИСКОВОЕ ПРОСТРАНСТВО" icon="pie_chart">
          <StorageUsageBar />
        </LargeWidget>
      </BentoGrid>

      {/* 2. Компактные квадратные ярлыки (текст строго в левом нижнем углу) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SquareWidget icon="cloud" title="Хранилище" subtitle="ОБЛАЧНЫЙ ДИСК" href="/cloud" />
        <SquareWidget icon="insights" title="Аналитика" subtitle="СТАТИСТИКА" href="/metrics" />
        <SquareWidget icon="shield_lock" title="Безопасность" subtitle="КЛЮЧИ ДОСТУПА" href="/id" />
        <SquareWidget icon="account_balance_wallet" title="Биллинг" subtitle="ТРАНЗАКЦИИ" href="/pay" />
      </div>

      {/* 3. Маленькие горизонтальные строки */}
      <BentoGrid cols={3}>
        <SmallWidget icon="person" title="Аккаунт" description="Управление профилем" href="/account" />
        <SmallWidget icon="notifications" title="Уведомления" description="Центр событий" href="/notifications" />
        <SmallWidget icon="extension" title="Интеграции" description="Подключенные вебхуки" href="/integrations" />
      </BentoGrid>
    </div>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};
