import React, { useState } from 'react';
import {
  Card,
  Badge,
  Button,
  Icon,
  DesktopNavbar,
  MobileNavbar,
  MobileActionBtn,
  NavItem,
} from '@one/web-ui';

export const NavigationPage: React.FC = () => {
  // Mobile tab counts demo state
  const [mobileTabCount, setMobileTabCount] = useState<3 | 4 | 5 | 7>(4);
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [showExtraAction, setShowExtraAction] = useState(true);

  // Desktop demo state
  const [desktopVariant, setDesktopVariant] = useState<'floating' | 'full'>('floating');
  const [activeDesktopTab, setActiveDesktopTab] = useState('home');
  const [desktopTabMode, setDesktopTabMode] = useState<'standard' | 'many'>('standard');

  // Pool of tabs for testing
  const allTabs: NavItem[] = [
    { id: 'home', label: 'Главная', icon: 'home' },
    { id: 'media', label: 'Медиа', icon: 'newspaper', badge: 3 },
    { id: 'summary', label: 'Свод', icon: 'description' },
    { id: 'players', label: 'Игроки', icon: 'group' },
    { id: 'archive', label: 'Архив', icon: 'inventory_2' },
    { id: 'analytics', label: 'Статистика', icon: 'analytics' },
    { id: 'settings', label: 'Настройки', icon: 'tune' },
  ];

  const currentMobileItems = allTabs.slice(0, mobileTabCount);
  const currentDesktopItems = desktopTabMode === 'standard' ? allTabs.slice(0, 4) : allTabs;

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="lime">OneHouse 1:1</Badge>
          <Badge variant="neutral">Sliding Pill Indicator</Badge>
          <Badge variant="warning">Max 5 Tabs (Mobile)</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Система навигации (Navbar & TabBar)
        </h1>
        <p className="mt-2 text-base text-oneweb-text-secondary max-w-3xl leading-relaxed">
          Универсальные навигационные компоненты, перенесенные напрямую из продакшн-кода <span className="text-white font-medium">OneHouse</span>. 
          Включают анимированный скользящий индикатор переключения вкладок, акцентную неоновую подсветку <span className="text-oneweb-accent font-semibold">#c0ff00</span>, 
          премиальный стеклянный фон и аппаратное ускорение анимаций.
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
              Стандарты интерфейса экосистемы OneHouse
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Desktop Rule */}
          <div className="bg-[#14171c] p-5 rounded-[20px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="laptop_mac" size={20} className="text-oneweb-accent" />
              <span>DesktopNavbar (Десктоп)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Неограниченное число вкладок:</strong> Контейнер навигации поддерживает горизонтальный скролл без уродливой полосы прокрутки (<code className="text-oneweb-accent">no-scrollbar</code>).
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Защита разметки:</strong> Слоты логотипа слева и профиля/кнопок справа защищены правилом <code className="text-white">shrink-0</code> — вкладки ни при каких обстоятельствах не могут их вытеснить или сплющить.
            </p>
          </div>

          {/* Mobile Rule */}
          <div className="bg-[#14171c] p-5 rounded-[20px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="smartphone" size={20} className="text-amber-400" />
              <span>MobileNavbar (Мобильные устройства)</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-amber-400">СТРОГИЙ ЛИМИТ: максимум 5 вкладок.</strong> Ограничение продиктовано анатомией пальца при одноручном управлении. В коде встроен <code className="text-amber-400">console.warn</code> и автоматический срез <code className="text-white">slice(0, 5)</code>.
            </p>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              <strong className="text-white">Клиренс для FAB:</strong> Навбар расположен на <code className="text-white">bottom-4</code> высотой 70px. Плавающая кнопка <code className="text-oneweb-accent">MobileActionBtn</code> зафиксирована на <code className="text-white">bottom-24</code> строго над навбаром с гарантированным зазором.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Interactive MobileNavbar Demo */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Интерактивная витрина: MobileNavbar
            </h2>
            <p className="text-xs text-oneweb-text-secondary mt-0.5">
              Проверьте адаптивное равномерное распределение при разном числе вкладок
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
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              showExtraAction
                ? 'bg-oneweb-accent/15 text-oneweb-accent'
                : 'bg-[#181c23] text-oneweb-text-secondary'
            }`}
          >
            {showExtraAction ? '✓ Кнопка «Скачать» включена' : '+ Добавить кнопку «Скачать»'}
          </button>
        </div>

        {/* Phone Frame Simulator */}
        <div className="relative mx-auto max-w-sm sm:max-w-md bg-[#090b0e] rounded-[36px] p-4 pt-10 pb-8 border border-white/10 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
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
                  {allTabs.find((t) => t.id === activeMobileTab)?.label || activeMobileTab}
                </Badge>
              </div>
              <p className="text-xs text-oneweb-text-secondary leading-relaxed">
                Нажмите на любую вкладку ниже — индикатор скользит с точным физическим таймингом cubic-bezier OneHouse.
              </p>
            </div>

            {mobileTabCount === 7 && (
              <div className="bg-amber-500/10 p-3 rounded-2xl text-[11px] text-amber-400 flex items-start gap-2">
                <Icon name="warning" size={16} className="shrink-0 mt-0.5" />
                <span>
                  Защита сработала: передано 7 элементов, но отображаются строго первые 5 для сохранения удобства пальца.
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

      {/* 4. DesktopNavbar Showcase */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Интерактивная витрина: DesktopNavbar
            </h2>
            <p className="text-xs text-oneweb-text-secondary mt-0.5">
              Полноразмерная навигационная панель с поддержкой горизонтальной прокрутки
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setDesktopVariant('floating')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                desktopVariant === 'floating'
                  ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                  : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
              }`}
            >
              Плавающая капсула (Floating)
            </button>
            <button
              onClick={() => setDesktopVariant('full')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                desktopVariant === 'full'
                  ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                  : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
              }`}
            >
              Во всю ширину (Full Bar)
            </button>
            <button
              onClick={() =>
                setDesktopTabMode(desktopTabMode === 'standard' ? 'many' : 'standard')
              }
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#181c23] text-oneweb-text-secondary hover:text-white"
            >
              {desktopTabMode === 'standard'
                ? '+ Проверить 7+ вкладок (Скролл)'
                : '✓ Стандартные 4 вкладки'}
            </button>
          </div>
        </div>

        {/* Live Desktop Instance inside preview container */}
        <div className="bg-[#090b0e] p-6 rounded-[28px] border border-white/5 space-y-4 overflow-hidden">
          <DesktopNavbar
            items={currentDesktopItems}
            activeId={activeDesktopTab}
            onChange={setActiveDesktopTab}
            variant={desktopVariant}
            isStatic={true}
            logo={
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-oneweb-accent/15 flex items-center justify-center text-oneweb-accent">
                  <Icon name="widgets" size={18} />
                </div>
                <span className="text-sm font-bold text-white">
                  One<span className="text-oneweb-accent">House</span>
                </span>
              </div>
            }
            actions={
              <div className="flex items-center gap-2">
                <Badge variant="lime" size="sm">
                  v0.1.0
                </Badge>
                <div className="w-8 h-8 rounded-full bg-[#181c23] flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors">
                  <Icon name="account_circle" size={20} />
                </div>
              </div>
            }
          />

          <div className="p-4 bg-[#14171c] rounded-2xl text-xs text-oneweb-text-secondary flex items-center justify-between">
            <span>
              Текущая активная вкладка десктопа: <strong className="text-white">{activeDesktopTab}</strong>
            </span>
            <span className="text-[11px] text-[#8e8e93]">
              Попробуйте уменьшить окно или переключить на 7+ вкладок: логотип и профиль не сжимаются.
            </span>
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
{`import { Navbar, NavItem } from '@one/web-ui';

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: 'home' },
  { id: 'media', label: 'Медиа', icon: 'newspaper', badge: 2 },
  { id: 'svod', label: 'Свод', icon: 'description' },
  { id: 'players', label: 'Игроки', icon: 'group' },
];

export function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    // Автоматически отображает DesktopNavbar на md: и плавающий MobileNavbar на смартфонах
    <Navbar
      items={navItems}
      activeId={activeTab}
      onChange={setActiveTab}
      logo={<Logo />}
      actions={<UserMenu />}
      desktopVariant="floating"
    />
  );
}`}
        </pre>
      </Card>
    </div>
  );
};
