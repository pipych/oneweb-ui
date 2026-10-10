import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Input,
  Badge,
  SegmentedTabs,
  BottomSheet,
  MobileTabBar,
  AppHeader,
  AppLogo,
  SFSymbol,
  BrandLoader,
  ResourceGauge,
  PlayerAvatar,
  TabId,
} from './design-system';

type CatalogSection = 'all' | 'buttons' | 'cards' | 'inputs' | 'tabs' | 'navigation';

export function App() {
  const [activeCatalogTab, setActiveCatalogTab] = useState<CatalogSection>('all');
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Buttons demo state
  const [btnLoading, setBtnLoading] = useState(false);
  const [copiedPill, setCopiedPill] = useState(false);

  // Cards & Gauges demo state
  const [tpsVal, setTpsVal] = useState(20.0);
  const [ramVal, setRamVal] = useState(58);
  const [cpuVal, setCpuVal] = useState(19);

  // Inputs demo state
  const [textVal, setTextVal] = useState('onehouse.pp.ua:25565');
  const [passVal, setPassVal] = useState('SecretToken_2026');
  const [hasInputErr, setHasInputErr] = useState(false);
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(true);

  // Tabs demo state
  const [demoTabId, setDemoTabId] = useState('server');
  const [demoPillTabId, setDemoPillTabId] = useState('tab1');

  // Navigation demo state
  const [navTabId, setNavTabId] = useState<TabId>('dashboard');
  const [isHeaderRefreshing, setIsHeaderRefreshing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 2800);
  };

  const handleCopyDemo = () => {
    navigator.clipboard?.writeText('onehouse.pp.ua');
    setCopiedPill(true);
    showToast('onehouse.pp.ua скопирован в буфер');
    setTimeout(() => setCopiedPill(false), 2000);
  };

  const handleHeaderRefresh = () => {
    setIsHeaderRefreshing(true);
    showToast('Данные сервера обновлены');
    setTimeout(() => setIsHeaderRefreshing(false), 800);
  };

  const sections = [
    { id: 'all', label: 'Все компоненты' },
    { id: 'buttons', label: 'Кнопки' },
    { id: 'cards', label: 'Карточки' },
    { id: 'inputs', label: 'Поля ввода' },
    { id: 'tabs', label: 'Табы' },
    { id: 'navigation', label: 'Навигация' },
  ];

  const shouldShow = (section: CatalogSection) => {
    return activeCatalogTab === 'all' || activeCatalogTab === section;
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-white selection:bg-[#c0ff00]/30 selection:text-[#c0ff00] pb-32">
      {/* Тост уведомление */}
      {notification && (
        <div
          className={`fixed top-6 left-4 right-4 z-[110] p-3.5 rounded-2xl text-sm font-semibold flex items-center gap-2.5 shadow-2xl backdrop-blur-xl animate-slide-up max-w-md mx-auto ${
            notification.type === 'success'
              ? 'bg-[#14171c]/95 text-[#c0ff00]'
              : 'bg-[#14171c]/95 text-red-400'
          }`}
        >
          <SFSymbol
            name={notification.type === 'success' ? 'checkmark.circle.fill' : 'exclamationmark.triangle.fill'}
            size={18}
          />
          <span>{notification.text}</span>
        </div>
      )}

      {/* Каталог Хедер */}
      <header className="sticky top-0 z-40 w-full bg-[#090b0e]/90 backdrop-blur-2xl safe-top px-4 py-3.5 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#14171c] flex items-center justify-center shrink-0 shadow-inner">
              <AppLogo className="w-6 h-6 text-[#c0ff00]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
                  OneWebUI
                </h1>
                <Badge variant="accent" size="sm" dot>
                  v1.0.0
                </Badge>
              </div>
              <p className="text-[11px] text-[#8e8e93] font-medium mt-0.5">
                Каталог компонентов экосистемы One (OneHouse reference)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-[#8e8e93] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c0ff00]" />
              OLED Dark Mode
            </span>
          </div>
        </div>

        {/* Быстрая фильтрация по секциям */}
        <div className="max-w-6xl mx-auto mt-3 overflow-x-auto no-scrollbar">
          <div className="bg-[#14171c] p-1 rounded-full inline-flex items-center gap-1">
            {sections.map((sec) => {
              const isActive = activeCatalogTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveCatalogTab(sec.id as CatalogSection)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all sf-tap whitespace-nowrap ${
                    isActive
                      ? 'bg-[#252c37] text-[#c0ff00] shadow-md'
                      : 'text-[#8e8e93] hover:text-white'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Основной контент каталога */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex flex-col gap-10">

        {/* 1. СЕКЦИЯ: КНОПКИ */}
        {shouldShow('buttons') && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#c0ff00]/10 flex items-center justify-center text-[#c0ff00]">
                  <SFSymbol name="play.fill" size={16} />
                </div>
                <div>
                  <h2 className="text-base font-black text-white uppercase tracking-wider">
                    Кнопки (Buttons & Controls)
                  </h2>
                  <p className="text-xs text-[#8e8e93]">
                    Капсульные кнопки rounded-full, тактильный отклик .sf-tap, фирменные состояния
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Primary Action Button */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      Primary Action
                    </span>
                    <Badge variant="accent" size="sm">
                      #c0ff00
                    </Badge>
                  </div>
                  <p className="text-xs text-[#8e8e93]">
                    Главная action-кнопка запуска сервиса (pill rounded-full, черная типографика, scale-95)
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    leftIcon={<SFSymbol name="play.fill" size={17} />}
                    onClick={() => showToast('Нажата кнопка «Запустить сервер»')}
                  >
                    Запустить сервер
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    isLoading={btnLoading}
                    className="w-full"
                    onClick={() => {
                      setBtnLoading(true);
                      setTimeout(() => setBtnLoading(false), 2000);
                    }}
                  >
                    {btnLoading ? 'Запуск...' : 'Тест Loading состояния'}
                  </Button>
                </div>
              </div>

              {/* Secondary & Danger Buttons */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      Secondary & Danger
                    </span>
                    <Badge variant="subtle" size="sm">
                      Glass Pill
                    </Badge>
                  </div>
                  <p className="text-xs text-[#8e8e93]">
                    Вторичные и критические операции: мягкий полупрозрачный фон, красная предупреждающая плашка
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="secondary"
                    size="md"
                    className="col-span-2"
                    leftIcon={<SFSymbol name="arrow.clockwise" size={16} />}
                    onClick={() => showToast('Сервер перезапускается...')}
                  >
                    Перезапустить
                  </Button>

                  <Button
                    variant="danger"
                    size="md"
                    className="col-span-1"
                    leftIcon={<SFSymbol name="stop.fill" size={15} />}
                    onClick={() => showToast('Сервер остановлен', 'error')}
                  >
                    Стоп
                  </Button>
                </div>
              </div>

              {/* Process States (Warning & Orange) */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      Process & Progress
                    </span>
                    <Badge variant="warning" size="sm">
                      BrandLoader
                    </Badge>
                  </div>
                  <p className="text-xs text-[#8e8e93]">
                    Состояния в процессе выполнения: встроенный волновой SVG-индикатор без внешних спиннеров
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="warning"
                    size="md"
                    disabled
                    className="w-full"
                    leftIcon={<BrandLoader size={12} color="#fbbf24" />}
                  >
                    Запуск компонентов...
                  </Button>

                  <Button
                    variant="orange"
                    size="md"
                    disabled
                    className="w-full"
                    leftIcon={<BrandLoader size={12} color="#f97316" />}
                  >
                    Остановка сервера...
                  </Button>
                </div>
              </div>

              {/* Icon Buttons & Copy Buttons */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col justify-between gap-4 md:col-span-2 lg:col-span-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      IconButtons & Pill Actions
                    </span>
                    <Badge variant="default" size="sm">
                      w-9 h-9
                    </Badge>
                  </div>
                  <p className="text-xs text-[#8e8e93]">
                    Круглые кнопки действий (копирование со сменяемой иконкой, справка ℹ️, быстрые теги «Объявление», «Кик»)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Кнопка копировать со сменяемой иконкой */}
                  <button
                    onClick={handleCopyDemo}
                    className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 sf-tap transition-colors duration-200 shrink-0 ${
                      copiedPill
                        ? 'bg-[#c0ff00]/25 text-[#c0ff00]'
                        : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'
                    }`}
                    title="Копировать адрес"
                  >
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <span
                        className={`absolute transition-all duration-300 transform ${
                          copiedPill ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'
                        }`}
                      >
                        <SFSymbol name="checkmark.circle.fill" size={16} className="text-[#c0ff00]" />
                      </span>
                      <span
                        className={`absolute transition-all duration-300 transform ${
                          copiedPill ? 'opacity-0 scale-50 rotate-45' : 'opacity-100 scale-100 rotate-0'
                        }`}
                      >
                        <SFSymbol name="doc.on.doc.fill" size={15} />
                      </span>
                    </div>
                  </button>

                  {/* Информационная кнопка ℹ️ */}
                  <button
                    onClick={() => setIsSheetOpen(true)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center active:scale-90 sf-tap transition-all shrink-0 text-white/80 hover:text-white"
                    title="Открыть модальное окно"
                  >
                    <SFSymbol name="info.circle.fill" size={17} />
                  </button>

                  {/* Кнопка обновления */}
                  <button
                    onClick={handleHeaderRefresh}
                    className={`w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center active:scale-90 sf-tap transition-all shrink-0 text-white/80 hover:text-white ${
                      isHeaderRefreshing ? 'animate-sf-rotate' : ''
                    }`}
                    title="Обновить"
                  >
                    <SFSymbol name="arrow.clockwise" size={17} />
                  </button>

                  <div className="h-6 w-px bg-white/10 mx-1" />

                  {/* Pill Action: Объявление */}
                  <button
                    onClick={() => showToast('Объявление отправлено')}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 text-xs font-bold text-[#c0ff00] flex items-center gap-1.5 active:scale-95 sf-tap hover:bg-[#c0ff00]/15 transition-all"
                  >
                    <SFSymbol name="arrow.up" size={13} />
                    <span>Объявление</span>
                  </button>

                  {/* Pill Action: Kick */}
                  <button
                    onClick={() => showToast('Действие Кик', 'error')}
                    className="px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold active:scale-95 sf-tap hover:bg-red-500/20 transition-all"
                  >
                    Кик
                  </button>

                  {/* Pill Action: Operator */}
                  <button
                    onClick={() => showToast('Роль оператора выдана')}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold active:scale-95 sf-tap hover:bg-white/15 transition-all"
                  >
                    OP
                  </button>

                  {/* Pill Action: Add */}
                  <button
                    onClick={() => showToast('Добавить игрока')}
                    className="px-3.5 py-1.5 rounded-full bg-[#c0ff00] text-[#090b0e] text-xs font-black active:scale-95 sf-tap transition-all"
                  >
                    + Добавить
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. СЕКЦИЯ: КАРТОЧКИ */}
        {shouldShow('cards') && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c0ff00]/10 flex items-center justify-center text-[#c0ff00]">
                <SFSymbol name="house.fill" size={16} />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider">
                  Карточки (Bento & Glass Cards)
                </h2>
                <p className="text-xs text-[#8e8e93]">
                  Скругление rounded-3xl / rounded-[28px], velvet glass surface, неоновые свечения, без серых рамок
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Hero Status Card */}
              <div className="rounded-3xl p-5 glass-panel overflow-hidden shadow-2xl relative flex flex-col justify-between md:col-span-2">
                {/* Фоновое неоновое свечение */}
                <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full blur-3xl pointer-events-none bg-[#c0ff00]/15" />

                <div className="flex items-center justify-between gap-3 relative z-10">
                  <span className="text-xl font-black text-white font-mono tracking-tight select-all truncate">
                    onehouse.pp.ua
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyDemo}
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 sf-tap text-white/80"
                    >
                      <SFSymbol name="doc.on.doc.fill" size={14} />
                    </button>
                    <button
                      onClick={() => setIsSheetOpen(true)}
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 sf-tap text-white/80"
                    >
                      <SFSymbol name="info.circle.fill" size={16} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c0ff00]" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 relative z-10">
                  <span className="text-xs text-[#8e8e93] font-medium">
                    Пример главной карточки сервера с неоновым источником света в правом углу
                  </span>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <Button variant="secondary" size="md" className="col-span-2" leftIcon={<SFSymbol name="arrow.clockwise" size={15} />}>
                      Перезапустить
                    </Button>
                    <Button variant="danger" size="md" className="col-span-1" leftIcon={<SFSymbol name="stop.fill" size={14} />}>
                      Стоп
                    </Button>
                  </div>
                </div>
              </div>

              {/* Resource Gauges Card */}
              <div className="rounded-3xl p-4 glass-panel flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between pb-0.5">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <SFSymbol name="bolt.fill" size={14} className="text-[#c0ff00]" />
                    Ресурсы
                  </span>
                  <span className="text-[10px] text-[#8e8e93] font-mono">ResourceGauge</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-0.5 items-center">
                  <ResourceGauge
                    value={tpsVal.toFixed(1)}
                    label="TPS"
                    percent={(tpsVal / 20.0) * 100}
                    color="#c0ff00"
                    strokeWidth={9}
                    size={90}
                  />
                  <ResourceGauge
                    value={`${ramVal}%`}
                    label="RAM"
                    percent={ramVal}
                    color={ramVal > 90 ? '#ef4444' : '#c0ff00'}
                    strokeWidth={9}
                    size={90}
                  />
                  <ResourceGauge
                    value={`${cpuVal}%`}
                    label="CPU"
                    percent={cpuVal}
                    color="#c0ff00"
                    strokeWidth={9}
                    size={90}
                  />
                </div>

                {/* Интерактивные ползунки для проверки шкал */}
                <div className="flex items-center justify-between gap-1 pt-2 border-t border-white/5">
                  <button
                    onClick={() => { setTpsVal(20.0); setRamVal(45); setCpuVal(15); }}
                    className="text-[10px] font-bold text-[#8e8e93] hover:text-[#c0ff00] px-2 py-1 rounded-full bg-white/5"
                  >
                    Норма
                  </button>
                  <button
                    onClick={() => { setTpsVal(14.2); setRamVal(78); setCpuVal(62); }}
                    className="text-[10px] font-bold text-[#8e8e93] hover:text-amber-400 px-2 py-1 rounded-full bg-white/5"
                  >
                    Нагрузка
                  </button>
                  <button
                    onClick={() => { setTpsVal(8.5); setRamVal(95); setCpuVal(98); }}
                    className="text-[10px] font-bold text-[#8e8e93] hover:text-red-400 px-2 py-1 rounded-full bg-white/5"
                  >
                    Пик
                  </button>
                </div>
              </div>

              {/* Online Players Card */}
              <div className="rounded-3xl p-4 glass-panel flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SFSymbol name="person.2.fill" size={16} className="text-[#c0ff00]" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      Игроки в игре
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-extrabold text-white">
                      3
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    { name: 'Alex', status: 'Строит ферму' },
                    { name: 'Steve', status: 'В шахте' },
                    { name: 'Notch', status: 'Создатель' },
                  ].map((player) => (
                    <div key={player.name} className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <PlayerAvatar name={player.name} size={32} />
                        <div>
                          <span className="text-sm font-bold text-white block leading-none">{player.name}</span>
                          <span className="text-[10px] text-[#8e8e93]">{player.status}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#c0ff00]">online</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Bento Card */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col justify-between gap-4 md:col-span-2">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#c0ff00]/10 flex items-center justify-center text-[#c0ff00] shrink-0">
                    <SFSymbol name="deployed_code" size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-bold text-[#c0ff00] flex items-center gap-1">
                    <span>Установлен</span>
                    <SFSymbol name="checkmark" size={12} />
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Модпак NeoForge 1.21.1</h3>
                  <p className="text-xs text-[#8e8e93] mt-1 leading-relaxed">
                    Поддержка кастомных датапаков, шейдеров и синхронизации с BlueMap в реальном времени
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. СЕКЦИЯ: ПОЛЯ ВВОДА */}
        {shouldShow('inputs') && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c0ff00]/10 flex items-center justify-center text-[#c0ff00]">
                <SFSymbol name="terminal" size={16} />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider">
                  Поля ввода (Inputs & Switches)
                </h2>
                <p className="text-xs text-[#8e8e93]">
                  Pill-инпуты rounded-full без рамок, слоты под иконки слева/справа, нативные iOS-свитчеры
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Текстовые поля и пароли */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col gap-4">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Pill Inputs
                </span>

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#8e8e93] mb-1.5 block">
                      Адрес сервера (Java / Bedrock)
                    </label>
                    <Input
                      value={textVal}
                      onChange={(e) => setTextVal(e.target.value)}
                      leftIcon="globe"
                      placeholder="Введите хост или адрес..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#8e8e93] mb-1.5 block">
                      Пароль доступа / RCON Token
                    </label>
                    <Input
                      isPassword
                      value={passVal}
                      onChange={(e) => setPassVal(e.target.value)}
                      leftIcon="lock.fill"
                      placeholder="Введите пароль..."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#8e8e93]">Поле с валидацией</label>
                      <button
                        onClick={() => setHasInputErr(!hasInputErr)}
                        className="text-[10px] text-[#c0ff00] font-bold"
                      >
                        Переключить ошибку
                      </button>
                    </div>
                    <Input
                      defaultValue="invalid_port_99999"
                      leftIcon="exclamationmark.triangle.fill"
                      error={hasInputErr ? 'Неверный диапазон портов (1024-65535)' : undefined}
                    />
                  </div>
                </div>
              </div>

              {/* iOS Switches & Toggles */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col justify-between gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    iOS-Style Switches (.ios-switch)
                  </span>
                  <p className="text-xs text-[#8e8e93] mt-1">
                    Фирменные тумблеры с акцентным цветом #c0ff00 и плавной анимацией
                  </p>
                </div>

                <div className="flex flex-col divide-y divide-white/5">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white block">Сохранение инвентаря</span>
                      <span className="text-xs text-[#8e8e93]">keepInventory</span>
                    </div>
                    <label className="ios-switch shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={switch1}
                        onChange={(e) => setSwitch1(e.target.checked)}
                      />
                      <span className="ios-slider" />
                    </label>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white block">Разрушение криперами</span>
                      <span className="text-xs text-[#8e8e93]">mobGriefing</span>
                    </div>
                    <label className="ios-switch shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={switch2}
                        onChange={(e) => setSwitch2(e.target.checked)}
                      />
                      <span className="ios-slider" />
                    </label>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white block">Смена дня и ночи</span>
                      <span className="text-xs text-[#8e8e93]">doDaylightCycle</span>
                    </div>
                    <label className="ios-switch shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={switch3}
                        onChange={(e) => setSwitch3(e.target.checked)}
                      />
                      <span className="ios-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. СЕКЦИЯ: ТАБЫ */}
        {shouldShow('tabs') && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c0ff00]/10 flex items-center justify-center text-[#c0ff00]">
                <SFSymbol name="slider.horizontal.3" size={16} />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider">
                  Табы (Segmented Controls)
                </h2>
                <p className="text-xs text-[#8e8e93]">
                  Точные переключатели OneHouse: bg-[#14171c], внутренний pill bg-[#252c37], лаймовый активный текст #c0ff00
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 3-позиционный таб из OneHouse */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    3-Tab Segmented Control
                  </span>
                  <p className="text-xs text-[#8e8e93] mt-0.5">
                    Оригинальный блок из референса «Сервер / Правила игры / Игроки»
                  </p>
                </div>

                <SegmentedTabs
                  tabs={[
                    { id: 'server', label: 'Сервер' },
                    { id: 'gamerules', label: 'Правила игры' },
                    { id: 'players', label: 'Игроки' },
                  ]}
                  activeId={demoTabId}
                  onChange={(id) => setDemoTabId(id)}
                />

                <div className="p-4 rounded-2xl bg-white/5 text-xs text-[#8e8e93]">
                  Активная вкладка: <strong className="text-[#c0ff00] uppercase font-mono">{demoTabId}</strong>
                </div>
              </div>

              {/* 2-позиционный переключатель */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    2-Tab Toggle Switcher
                  </span>
                  <p className="text-xs text-[#8e8e93] mt-0.5">
                    Используется для переключения режимов (Java / Bedrock, Онлайн / Оффлайн)
                  </p>
                </div>

                <SegmentedTabs
                  tabs={[
                    { id: 'tab1', label: 'Java Edition' },
                    { id: 'tab2', label: 'Bedrock Edition' },
                  ]}
                  activeId={demoPillTabId}
                  onChange={(id) => setDemoPillTabId(id)}
                />

                <div className="p-4 rounded-2xl bg-white/5 text-xs text-[#8e8e93]">
                  Выбран протокол: <strong className="text-[#c0ff00] uppercase font-mono">{demoPillTabId}</strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. СЕКЦИЯ: НАВИГАЦИЯ */}
        {shouldShow('navigation') && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c0ff00]/10 flex items-center justify-center text-[#c0ff00]">
                <SFSymbol name="map.fill" size={16} />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider">
                  Навигация (MobileTabBar & AppHeader & Sheets)
                </h2>
                <p className="text-xs text-[#8e8e93]">
                  Плавающий Island Dock с плавной скользящей капсулой, шапка сервиса и нижние шторки
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* AppHeader Preview */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Шапка сервиса (AppHeader)
                  </span>
                  <p className="text-xs text-[#8e8e93] mt-0.5">
                    Статус сервера (ОНЛАЙН / ЗАПУСК / ОФФЛАЙН), версия и кнопка обновления
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#090b0e]">
                  <AppHeader
                    status={{
                      status: 'online',
                      uptimeSeconds: 84000,
                      cpuPercent: 12,
                      ramUsedMB: 4000,
                      ramTotalMB: 8192,
                      players: { online: 3, max: 20, list: [] },
                      serverInfo: {
                        motd: 'OneHouse',
                        version: '1.21.1 NeoForge',
                        difficulty: 'Hard',
                        gamemode: 'Survival',
                      },
                    }}
                    onRefresh={handleHeaderRefresh}
                    isRefreshing={isHeaderRefreshing}
                  />
                </div>
              </div>

              {/* BottomSheet Modal Trigger */}
              <div className="rounded-3xl p-5 glass-panel flex flex-col justify-between gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Нижняя шторка (BottomSheet)
                  </span>
                  <p className="text-xs text-[#8e8e93] mt-0.5">
                    Модальное окно со скруглением rounded-t-[32px] и поддержкой жеста смахивания вниз
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="md"
                  className="w-full"
                  leftIcon={<SFSymbol name="info.circle.fill" size={17} />}
                  onClick={() => setIsSheetOpen(true)}
                >
                  Открыть BottomSheet
                </Button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Нижний плавающий MobileTabBar (Island Dock) */}
      <MobileTabBar
        activeTab={navTabId}
        onTabChange={(tab) => {
          setNavTabId(tab);
          showToast(`Вкладка переключена: ${tab}`);
        }}
      />

      {/* Интерактивное модальное окно BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Демонстрация BottomSheet"
      >
        <div className="flex flex-col gap-3">
          <p className="text-xs text-[#8e8e93]">
            Это точный компонент шторки OneHouse. Потяните ручку сверху вниз на сенсорном экране, чтобы закрыть окно с физическим жестом смахивания.
          </p>

          <div className="p-3.5 rounded-2xl bg-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#8e8e93] block">Адрес OneHouse</span>
              <span className="text-sm font-black text-white font-mono">onehouse.pp.ua</span>
            </div>
            <button
              onClick={() => {
                handleCopyDemo();
                setIsSheetOpen(false);
              }}
              className="px-3 py-1.5 rounded-full bg-[#c0ff00] text-[#090b0e] font-black text-xs active:scale-95 sf-tap"
            >
              Копировать
            </button>
          </div>

          <button
            onClick={() => setIsSheetOpen(false)}
            className="h-12 w-full rounded-full bg-white/10 text-white font-black text-sm active:scale-95 sf-tap mt-1"
          >
            Закрыть
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}

export default App;
