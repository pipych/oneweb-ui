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
  const [serverRunning, setServerRunning] = useState(true);
  const [copied, setCopied] = useState(false);
  const [clickNotice, setClickNotice] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerClickNotice = (name: string) => {
    setClickNotice(`Нажат виджет: ${name}`);
    setTimeout(() => setClickNotice(null), 2500);
  };

  const players = [
    { name: 'Steve_Miner', ping: '18ms', role: 'Админ' },
    { name: 'Alex_Crafter', ping: '24ms', role: 'Игрок' },
    { name: 'OneBuilder', ping: '32ms', role: 'Модератор' },
    { name: 'NetherKnight', ping: '45ms', role: 'Игрок' },
    { name: 'DiamondGuy', ping: '12ms', role: 'Игрок' },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      {/* 1. Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="lime">Bento Grid System</Badge>
          <Badge variant="neutral">3 Typo-sizes (Row / 1:1 / Large)</Badge>
          <Badge variant="warning">3D Artwork Support</Badge>
          <Badge variant="success">Strict No Borders</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Система виджетов (Bento Widgets)
        </h1>
        <p className="mt-2 text-base text-oneweb-text-secondary max-w-3xl leading-relaxed">
          Модульные информационные и интерактивные блоки экосистемы <span className="text-white font-medium">One</span>. 
          Поддерживают три типоразмера, фоновые 3D-иллюстрации с подсветкой при ховере, 
          внутренний скролл и компоновку в адаптивную сетку Bento.
        </p>
      </div>

      {/* Floating feedback alert */}
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
              <strong className="text-white">Шейп слева:</strong> Квадрат <code className="text-white">w-12 h-12 rounded-[16px]</code> с контрастным фоном <code className="text-oneweb-accent">#181c23</code> и иконкой #c0ff00.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Текстовый стек:</strong> Белый жирный заголовок и серый текст описания. Микроанимация клика <code className="text-white">active:scale-[0.98]</code>.
            </p>
          </div>

          {/* Typo 2: Square / 1:1 */}
          <div className="bg-[#14171c] p-5 rounded-[22px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="square" size={20} className="text-amber-400" />
              <span>Square / 1:1 (Квадратный ярлык)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Верх:</strong> Шейп с иконкой <code className="text-white">w-12 h-12</code> слева и неброская стрелка <code className="text-amber-400">north_east</code> справа вверху.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Низ:</strong> Прижат вниз <code className="text-white">mt-auto</code>: крупный заголовок и подзаголовок КАПСОМ. Поддержка фонового 3D-арта.
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
              <strong className="text-white">Контентная зона:</strong> Слот под интерактивный UI (круговые шкалы, списки, кнопки, индикаторы) со скрытым скроллом.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Live Production Bento Grid (OneHouse 1:1) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Интерактивная Bento-панель (OneHouse 1:1)
            </h2>
            <p className="text-xs text-oneweb-text-secondary mt-0.5">
              Живая демонстрация компоновки виджетов трех типоразмеров в единой сетке
            </p>
          </div>
          <Badge variant="lime" size="sm">
            Live Preview
          </Badge>
        </div>

        <BentoGrid cols={3}>
          {/* Row 1, Item 1: Large Widget (Hero Server, 2 cols) */}
          <LargeWidget
            colSpan={2}
            title="Сервер OneHouse"
            icon="dns"
            badge={
              <Badge variant={serverRunning ? 'lime' : 'neutral'} size="sm">
                {serverRunning ? 'Онлайн' : 'Оффлайн'}
              </Badge>
            }
            actions={
              <button
                type="button"
                onClick={() => handleCopy('mc.onehouse.ru')}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-xs font-mono text-[#c0ff00] flex items-center gap-1.5 cursor-pointer"
                title="Копировать адрес"
              >
                <span>{copied ? 'Скопировано!' : 'mc.onehouse.ru'}</span>
                <Icon name={copied ? 'check' : 'content_copy'} size={14} />
              </button>
            }
            artworkUrl="/minecraft-shape-bg.webp"
            artworkClassName="w-48 h-48 opacity-25 group-hover:opacity-60"
            className="min-h-[220px]"
          >
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                  <div className="text-2xl font-black text-white tracking-tight font-mono">
                    130.61.237.232:25565
                  </div>
                  <div className="text-xs text-[#8e8e93] mt-1 flex items-center gap-2">
                    <span>Версия: 1.20.1 NeoForge</span>
                    <span>•</span>
                    <span className="text-[#c0ff00]">Пинг: 16ms</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={serverRunning ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => setServerRunning(!serverRunning)}
                  >
                    <Icon name={serverRunning ? 'restart_alt' : 'play_arrow'} size={16} />
                    <span>{serverRunning ? 'Перезапуск' : 'Запустить'}</span>
                  </Button>
                  {serverRunning && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServerRunning(false)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Icon name="power_settings_new" size={16} />
                      <span>Стоп</span>
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 flex items-center justify-between text-xs">
                <span className="text-[#8e8e93]">Синхронизация мира и модов:</span>
                <span className="font-mono text-[#c0ff00] font-bold">100% Завершено</span>
              </div>
            </div>
          </LargeWidget>

          {/* Row 1, Item 2: Large Widget (Resources / Gauges, 1 col) */}
          <LargeWidget
            colSpan={1}
            title="Ресурсы"
            icon="bolt"
            actions={
              <span className="text-[11px] font-mono text-[#8e8e93]">Uptime 98.9%</span>
            }
            className="min-h-[220px]"
          >
            <div className="grid grid-cols-3 gap-2 pt-2 items-center text-center">
              {/* Gauge 1: TPS */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#c0ff00] flex flex-col items-center justify-center bg-white/5">
                  <span className="text-sm font-black text-white font-mono leading-none">
                    20.0
                  </span>
                  <span className="text-[9px] font-bold text-[#8e8e93] uppercase mt-0.5">
                    TPS
                  </span>
                </div>
                <span className="text-[11px] text-white/70 font-medium mt-2">Стабильно</span>
              </div>

              {/* Gauge 2: RAM */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#c0ff00] flex flex-col items-center justify-center bg-white/5">
                  <span className="text-sm font-black text-white font-mono leading-none">
                    42%
                  </span>
                  <span className="text-[9px] font-bold text-[#8e8e93] uppercase mt-0.5">
                    RAM
                  </span>
                </div>
                <span className="text-[11px] text-white/70 font-medium mt-2">6.8 / 16 GB</span>
              </div>

              {/* Gauge 3: CPU */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex flex-col items-center justify-center bg-white/5">
                  <span className="text-sm font-black text-white font-mono leading-none">
                    18%
                  </span>
                  <span className="text-[9px] font-bold text-[#8e8e93] uppercase mt-0.5">
                    CPU
                  </span>
                </div>
                <span className="text-[11px] text-white/70 font-medium mt-2">4 Cores</span>
              </div>
            </div>
          </LargeWidget>

          {/* Row 2, Item 1: Square Widget (1:1 Aspect Ratio) */}
          <SquareWidget
            icon="deployed_code"
            title="Модпак One"
            subtitle="УПРАВЛЕНИЕ СБОРКОЙ"
            artworkUrl="/minecraft-shape-bg.webp"
            onClick={() => triggerClickNotice('Модпак One')}
            showArrow={true}
          />

          {/* Row 2, Item 2: Square Widget (1:1 Aspect Ratio) */}
          <SquareWidget
            icon="terminal"
            title="Live Консоль"
            subtitle="РЕАЛТАЙМ ЛОГИ И RCON"
            onClick={() => triggerClickNotice('Live Консоль')}
            showArrow={true}
          />

          {/* Row 2, Item 3: Large Widget with Scrollable List (Players) */}
          <LargeWidget
            colSpan={1}
            title="Игроки онлайн"
            icon="group"
            badge={
              <Badge variant="lime" size="sm">
                {players.length}
              </Badge>
            }
            scrollable={true}
            maxScrollHeight="180px"
          >
            <div className="space-y-1.5">
              {players.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center text-xs font-bold text-[#c0ff00]">
                      {p.name[0]}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">{p.name}</div>
                      <div className="text-[10px] text-[#8e8e93]">{p.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#8e8e93] shrink-0">{p.ping}</span>
                </div>
              ))}
            </div>
          </LargeWidget>

          {/* Row 3: Small / Row Horizontal Widgets */}
          <SmallWidget
            icon="folder"
            title="Файловый менеджер"
            description="Просмотр и редактирование конфигураций"
            onClick={() => triggerClickNotice('Файловый менеджер')}
          />

          <SmallWidget
            icon="cloud_sync"
            title="Резервные копии"
            description="Автоматический снапшот мира и БД"
            onClick={() => triggerClickNotice('Резервные копии')}
          />

          <SmallWidget
            icon="tune"
            title="Настройки доступа"
            description="White-list, порты и RCON безопасность"
            onClick={() => triggerClickNotice('Настройки доступа')}
          />
        </BentoGrid>
      </div>

      {/* 4. Code Example Card */}
      <Card variant="default" className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Icon name="code" size={20} className="text-oneweb-accent" />
          <span>Пример использования в React</span>
        </h3>
        <pre className="bg-[#090b0e] p-4 rounded-2xl text-xs font-mono text-[#8e8e93] overflow-x-auto leading-relaxed border-none">
{`import { BentoGrid, SmallWidget, SquareWidget, LargeWidget } from '@one/web-ui';

export function Dashboard() {
  return (
    <BentoGrid cols={3}>
      {/* 1. Большой виджет (2 колонки, иконка в строке БЕЗ шейпа) */}
      <LargeWidget
        colSpan={2}
        title="Сервер Minecraft"
        icon="dns"
        actions={<StatusDot />}
        artworkUrl="/artwork.webp"
      >
        <ServerControls />
      </LargeWidget>

      {/* 2. Квадратный ярлык 1:1 (шейп с иконкой слева, стрелка справа) */}
      <SquareWidget
        icon="deployed_code"
        title="Модпак"
        subtitle="СБОРКА И МОДЫ"
        href="/modpack"
      />

      {/* 3. Горизонтальный компактный ряд (шейп слева, текст по центру) */}
      <SmallWidget
        icon="folder"
        title="Файловый менеджер"
        description="Конфигурации и логи сервера"
        onClick={() => openFileManager()}
      />
    </BentoGrid>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};
