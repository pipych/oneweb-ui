import React, { useState } from 'react';
import {
  Card,
  Badge,
  Icon,
  DesktopNavbar,
  MobileNavbar,
  MobileActionBtn,
  AppLogo,
  NavItem,
} from '@one/web-ui';

// Pool of tabs for testing (module level to avoid re-creation on render)
const ALL_TABS: NavItem[] = [
  { id: 'home', label: 'Главная', icon: 'home' },
  { id: 'media', label: 'Медиа', icon: 'newspaper', badge: 3 },
  { id: 'summary', label: 'Свод', icon: 'description' },
  { id: 'players', label: 'Игроки', icon: 'group' },
  { id: 'archive', label: 'Архив', icon: 'inventory_2' },
  { id: 'analytics', label: 'Статистика', icon: 'analytics' },
  { id: 'settings', label: 'Настройки', icon: 'tune' },
];

export const NavigationPage: React.FC = () => {
  // Mobile tab counts demo state
  const [mobileTabCount, setMobileTabCount] = useState<3 | 4 | 5 | 7>(4);
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [showExtraAction, setShowExtraAction] = useState(true);

  // Desktop demo state (OneDash 1:1)
  const [activeDesktopTab, setActiveDesktopTab] = useState('home');
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [desktopTabMode, setDesktopTabMode] = useState<'standard' | 'all'>('standard');

  const currentMobileItems = React.useMemo(
    () => ALL_TABS.slice(0, mobileTabCount),
    [mobileTabCount]
  );

  const currentDesktopItems = React.useMemo(
    () => (desktopTabMode === 'standard' ? ALL_TABS.slice(0, 5) : ALL_TABS),
    [desktopTabMode]
  );

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="lime">OneDash 1:1 Desktop</Badge>
          <Badge variant="neutral">OneHouse Mobile TabBar</Badge>
          <Badge variant="success">No Glow (Flat #c0ff00)</Badge>
          <Badge variant="warning">Tactile Micro-animations</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Система навигации (Desktop & Mobile)
        </h1>
        <p className="mt-2 text-base text-oneweb-text-secondary max-w-3xl leading-relaxed">
          Навигационные компоненты дизайн-системы OneWebUI. Десктопный навбар перенесен 1 в 1 из реальной архитектуры{' '}
          <span className="text-white font-medium">OneDash</span> (вертикальный плавающий док с кнопкой сворачивания до 68px, подсказками и скользящим индикатором). 
          Мобильный навбар основан на <span className="text-white font-medium">OneHouse</span> с жестким лимитом в 5 вкладок.
        </p>
      </div>

      {/* 2. Key Architecture Guidelines Card */}
      <Card variant="glass" className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-oneweb-accent/10 flex items-center justify-center text-oneweb-accent">
            <Icon name="verified" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Жесткие правила архитектуры навигации
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Стандарты интерфейса экосистемы One (OneDash & OneHouse)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Desktop Rule */}
          <div className="bg-[#14171c] p-5 rounded-[20px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="dock" size={20} className="text-oneweb-accent" />
              <span>DesktopNavbar (OneDash 1:1)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Вертикальный плавающий док:</strong> Раскрывается на <code className="text-white">220px</code> с текстовыми лейблами и сворачивается в иконочный док <code className="text-white">68px</code> со всплывающими подсказками (tooltips).
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Скользящий индикатор:</strong> Плавное вертикальное перемещение пилла <code className="text-white">bg-[#252c37]</code> с кривой <code className="text-oneweb-accent">cubic-bezier(0.25, 1, 0.5, 1)</code>.
            </p>
          </div>

          {/* Micro-animations & No Glow Rule */}
          <div className="bg-[#14171c] p-5 rounded-[20px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="touch_app" size={20} className="text-emerald-400" />
              <span>Микроанимации & No Glow</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-emerald-400">Тактильный клик:</strong> Нажатие на таб дает пружинящий отклик кнопки <code className="text-white">active:scale-95</code> и самой иконки <code className="text-emerald-400">active:scale-90</code>.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Строгий отказ от свечения:</strong> Все тени <code className="text-amber-400">drop-shadow</code>, зеленые размытия и неоновые фильтры полностью удалены. Активный цвет — чистый плоский <code className="text-oneweb-accent">#c0ff00</code>.
            </p>
          </div>

          {/* Mobile Rule */}
          <div className="bg-[#14171c] p-5 rounded-[20px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="smartphone" size={20} className="text-amber-400" />
              <span>MobileNavbar (OneHouse)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-amber-400">СТРОГИЙ ЛИМИТ: максимум 5 вкладок.</strong> При превышении библиотека автоматически обрезает массив до первых 5 элементов для сохранения эргономики большого пальца.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Клиренс для FAB:</strong> Навбар расположен на <code className="text-white">bottom-4</code>. Кнопка <code className="text-oneweb-accent">MobileActionBtn</code> фиксируется на <code className="text-white">bottom-24</code> с гарантированным зазором.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Interactive DesktopNavbar Showcase (OneDash 1:1) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Интерактивная витрина: DesktopNavbar (OneDash 1:1)
              </h2>
              <Badge variant="lime" size="sm">Real Code</Badge>
            </div>
            <p className="text-xs text-oneweb-text-secondary mt-0.5">
              Точная копия сайдбар-дока OneDash с плавающим вертикальным пиллом и микроанимациями
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#181c23] hover:bg-white/10 text-white transition-all flex items-center gap-1.5 sf-tap active:scale-95"
            >
              <Icon name={isDesktopCollapsed ? 'left_panel_open' : 'left_panel_close'} size={16} />
              <span>{isDesktopCollapsed ? 'Развернуть (220px)' : 'Свернуть (68px)'}</span>
            </button>
            <button
              onClick={() =>
                setDesktopTabMode(desktopTabMode === 'standard' ? 'all' : 'standard')
              }
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#181c23] text-oneweb-text-secondary hover:text-white transition-all sf-tap active:scale-95"
            >
              {desktopTabMode === 'standard' ? '+ Добавить еще 2 вкладки' : '✓ Стандартные 5 вкладок'}
            </button>
          </div>
        </div>

        {/* Desktop Application Window Simulator */}
        <div className="bg-[#090b0e] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden min-h-[520px] flex flex-col">
          {/* Top Window Bar */}
          <div className="h-10 px-4 bg-[#14171c]/80 border-b border-white/5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-semibold text-[#8e8e93]">
                OneDash Desktop — Panel Preview
              </span>
            </div>
            <div className="text-[11px] text-[#8e8e93] font-mono">
              w-{isDesktopCollapsed ? '68px (Dock)' : '220px (Expanded)'}
            </div>
          </div>

          {/* Window Body: Sidebar + Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Desktop Navbar container (static placement for preview) */}
            <div className="p-3 shrink-0">
              <DesktopNavbar
                items={currentDesktopItems}
                activeId={activeDesktopTab}
                onChange={setActiveDesktopTab}
                isCollapsed={isDesktopCollapsed}
                onToggleCollapse={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
                isStatic={true}
                logo={<AppLogo className="w-6 h-6 text-[#c0ff00] shrink-0" />}
                title="OneDash"
              />
            </div>

            {/* Main Content Area Preview */}
            <div className="flex-1 p-6 sm:p-8 bg-[#0c0e12] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#8e8e93] font-bold">
                    Текущий раздел
                  </div>
                  <h3 className="text-2xl font-black text-white capitalize mt-0.5 flex items-center gap-2">
                    <span>{ALL_TABS.find((t) => t.id === activeDesktopTab)?.label || activeDesktopTab}</span>
                    <span className="w-2 h-2 rounded-full bg-[#c0ff00]" />
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="lime" size="sm">
                    No Glow
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    Active: #{activeDesktopTab}
                  </Badge>
                </div>
              </div>

              {/* Interactive Inspection Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#14171c] p-5 rounded-[22px] space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Icon name="animation" size={18} className="text-[#c0ff00]" />
                    <span>Проверка микроанимаций клика</span>
                  </div>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Кликните по любой иконке в левом навбаре. Заметьте легкий пружинящий эффект сжатия кнопки (<code className="text-white">active:scale-95</code>) и самой иконки (<code className="text-[#c0ff00]">active:scale-90</code>).
                  </p>
                </div>

                <div className="bg-[#14171c] p-5 rounded-[22px] space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Icon name="visibility" size={18} className="text-[#c0ff00]" />
                    <span>Проверка Tooltip в свернутом виде</span>
                  </div>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Нажмите кнопку «Свернуть» вверху сайдбара и наведите курсор на любую иконку — справа появится плавающая плашка с названием раздела.
                  </p>
                </div>
              </div>

              <div className="bg-[#14171c] p-5 rounded-[22px] text-xs text-[#8e8e93] space-y-2">
                <div className="font-bold text-white">Технические классы OneDash 1:1:</div>
                <div className="font-mono text-[11px] text-[#c0ff00] break-all">
                  bg-[#14171c]/95 backdrop-blur-2xl rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive MobileNavbar Demo */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Интерактивная витрина: MobileNavbar (OneHouse)
              </h2>
              <Badge variant="warning" size="sm">Max 5 Tabs</Badge>
            </div>
            <p className="text-xs text-oneweb-text-secondary mt-0.5">
              Мобильная плавающая капсула с тактильным откликом и лимитом в 5 элементов
            </p>
          </div>

          {/* Tab count selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-oneweb-text-secondary font-medium mr-1">
              Количество вкладок:
            </span>
            {([3, 4, 5, 7] as const).map((cnt) => (
              <button
                key={cnt}
                onClick={() => setMobileTabCount(cnt)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all sf-tap active:scale-95 ${
                  mobileTabCount === cnt
                    ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                    : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
                }`}
              >
                {cnt === 7 ? '7 (Тест переполнения)' : `${cnt} вкладки`}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExtraAction(!showExtraAction)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors sf-tap active:scale-95 ${
              showExtraAction
                ? 'bg-oneweb-accent/15 text-oneweb-accent'
                : 'bg-[#181c23] text-oneweb-text-secondary'
            }`}
          >
            {showExtraAction ? '✓ Доп. действие (Скачать) включено' : '+ Добавить доп. действие'}
          </button>
        </div>

        {/* Phone Frame Simulator */}
        <div className="relative mx-auto max-w-sm sm:max-w-md bg-[#090b0e] rounded-[36px] p-4 pt-10 pb-8 border border-white/10 shadow-2xl overflow-hidden min-h-[440px] flex flex-col justify-between">
          {/* Top Speaker / Dynamic Island decorative bar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full border border-white/5 flex items-center justify-end px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-900/60" />
          </div>

          {/* Screen Content Preview */}
          <div className="space-y-4 px-2 select-none">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">9:41</span>
              <div className="flex items-center gap-1.5 text-xs text-white">
                <Icon name="signal_cellular_alt" size={14} />
                <Icon name="wifi" size={14} />
                <Icon name="battery_full" size={14} />
              </div>
            </div>

            <div className="bg-[#14171c] p-4 rounded-[20px] space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-oneweb-text-secondary">Активная вкладка</span>
                <Badge variant="lime" size="sm">
                  {ALL_TABS.find((t) => t.id === activeMobileTab)?.label || activeMobileTab}
                </Badge>
              </div>
              <p className="text-xs text-oneweb-text-secondary leading-relaxed">
                Нажмите на любую вкладку ниже — иконка дает тактильный отклик <code className="text-white">active:scale-90</code>, а индикатор плавно скользит. Свечение (glow) отключено.
              </p>
            </div>

            {mobileTabCount === 7 && (
              <div className="bg-amber-500/10 p-3 rounded-2xl text-[11px] text-amber-400 flex items-start gap-2">
                <Icon name="warning" size={16} className="shrink-0 mt-0.5" />
                <span>
                  Защита эргономики: передано 7 элементов, но отображаются строго первые 5.
                </span>
              </div>
            )}
          </div>

          {/* Simulated FAB and Navbar within Mobile Frame */}
          <div className="relative mt-12 pt-6">
            {/* FAB simulator positioned strictly above navbar */}
            <div className="flex justify-end pr-2 mb-3">
              <MobileActionBtn
                icon="add"
                variant="primary"
                forceVisible={true}
                className="relative right-0 bottom-0 shadow-lg scale-90"
                aria-label="Быстрое действие"
              />
            </div>

            {/* Static instance of MobileNavbar inside the preview phone frame */}
            <MobileNavbar
              items={currentMobileItems}
              activeId={activeMobileTab}
              onChange={setActiveMobileTab}
              isStatic={true}
              extraAction={
                showExtraAction
                  ? {
                      id: 'download',
                      label: 'Скачать',
                      icon: 'download',
                      onClick: () => setActiveMobileTab('download'),
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>

      {/* 5. Code Example Card */}
      <Card variant="default" className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Icon name="code" size={20} className="text-oneweb-accent" />
          <span>Пример использования в React</span>
        </h3>
        <pre className="bg-[#090b0e] p-4 rounded-2xl text-xs font-mono text-[#8e8e93] overflow-x-auto leading-relaxed border-none">
{`import { DesktopNavbar, MobileNavbar, NavItem, AppLogo } from '@one/web-ui';

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: 'home' },
  { id: 'media', label: 'Медиа', icon: 'newspaper', badge: 3 },
  { id: 'summary', label: 'Свод', icon: 'description' },
  { id: 'players', label: 'Игроки', icon: 'group' },
];

export function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#090b0e] flex flex-col md:flex-row">
      {/* Десктопный сайдбар-док OneDash 1:1 */}
      <DesktopNavbar
        items={navItems}
        activeId={activeTab}
        onChange={setActiveTab}
        title="OneDash"
        logo={<AppLogo className="w-6 h-6 text-[#c0ff00]" />}
        className="hidden md:flex"
      />

      <main className="flex-1 p-6">
        {/* Контент приложения */}
      </main>

      {/* Мобильная плавающая капсула OneHouse (строго до 5 вкладок) */}
      <MobileNavbar
        items={navItems}
        activeId={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};
