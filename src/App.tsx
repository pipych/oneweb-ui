import React, { useState } from 'react';
import {
  OneIcon,
  Button,
  IconButton,
  MobileActionButton,
  DesktopNavbar,
  MobileNavbar,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  ToastContainerProvider,
  useToast,
  TooltipProvider,
  SimpleTooltip,
  useDeviceMode,
} from './design-system';

// Color token definition
const PALETTE_COLORS = [
  { name: 'oneweb-bg', value: '#090b0e', role: 'Default Canvas' },
  { name: 'oneweb-bg-subtle', value: '#050709', role: 'Deep Contrast' },
  { name: 'oneweb-surface', value: '#14171c', role: 'Card Base' },
  { name: 'oneweb-surface-elevated', value: '#181c23', role: 'Elevated Modal' },
  { name: 'oneweb-surface-subtle', value: '#252c37', role: 'Control Fill' },
  { name: 'oneweb-accent', value: '#c0ff00', role: 'One Lime' },
  { name: 'oneweb-accent-hover', value: '#aee600', role: 'Hover Lime' },
  { name: 'oneweb-text-primary', value: '#ffffff', role: 'High Emphasis' },
  { name: 'oneweb-text-secondary', value: '#8e8e93', role: 'Medium Emphasis' },
  { name: 'oneweb-border', value: 'rgba(255, 255, 255, 0.10)', role: 'Default Border' },
  { name: 'oneweb-status-success', value: '#1bd96a', role: 'Success' },
  { name: 'oneweb-status-warning', value: '#fbbf24', role: 'Warning' },
  { name: 'oneweb-status-danger', value: '#ef4444', role: 'Danger / Error' },
];

const SAMPLE_ICONS = [
  { name: 'home', label: 'Home' },
  { name: 'dashboard', label: 'Dashboard' },
  { name: 'settings', label: 'Settings' },
  { name: 'terminal', label: 'Console' },
  { name: 'dns', label: 'Server' },
  { name: 'folder', label: 'Files' },
  { name: 'group', label: 'Players' },
  { name: 'extension', label: 'Mods' },
  { name: 'public', label: 'World' },
  { name: 'check_circle', label: 'Success' },
  { name: 'warning', label: 'Warning' },
  { name: 'error', label: 'Error' },
  { name: 'bolt', label: 'Lightning' },
  { name: 'lock', label: 'Security' },
  { name: 'rocket_launch', label: 'Launch' },
  { name: 'notifications', label: 'Notifications' },
];

// ============================================================================
// 1. МОБИЛЬНАЯ ВЕРСИЯ САЙТА (MobileShowcaseView)
// Полная адаптация под смартфоны: нативный таб-бар, FAB, Bottom Sheet, 0 overflow
// ============================================================================
function MobileShowcaseView({ onSwitchToDesktop }: { onSwitchToDesktop: () => void }) {
  const { addToast } = useToast();
  const [mobileTab, setMobileTab] = useState<'overview' | 'components' | 'tokens' | 'guidelines'>('overview');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Component demo states
  const [inputVal, setInputVal] = useState('one_player');
  const [passVal, setPassVal] = useState('secret123');
  const [inputError, setInputError] = useState(false);
  const [selectedServer, setSelectedServer] = useState('onehouse-main');
  const [btnLoading, setBtnLoading] = useState(false);

  const mobileNavItems = [
    { id: 'overview', label: 'Сервер', icon: 'dns' },
    { id: 'components', label: 'Компоненты', icon: 'widgets' },
    { id: 'tokens', label: 'Токены', icon: 'palette' },
    { id: 'guidelines', label: 'Гайд', icon: 'menu_book' },
  ];

  return (
    <div className="min-h-screen bg-[#090b0e] text-white flex flex-col w-full max-w-full overflow-x-hidden safe-top">
      {/* Мобильная шапка приложения */}
      <header className="sticky top-0 z-40 w-full bg-[#090b0e]/90 backdrop-blur-xl border-b border-white/[0.04] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-oneweb-accent text-black font-black text-sm flex items-center justify-center shadow-[0_0_12px_rgba(192,255,0,0.4)] shrink-0">
              1H
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white truncate">OneHouse</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">14ms</span>
              </div>
              <p className="text-[10px] text-[#8e8e93] leading-none mt-0.5 truncate">
                Mobile WebUI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={onSwitchToDesktop}
              className="text-xs h-8 px-3 gap-1 bg-white/5 hover:bg-white/10"
            >
              <OneIcon name="desktop_windows" size="sm" />
              <span>ПК вид</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Основной мобильный контент */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-28 flex flex-col gap-5">
        {/* ВКЛАДКА 1: ОБЗОР СЕРВЕРА */}
        {mobileTab === 'overview' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Banner Card */}
            <div className="p-5 rounded-[28px] bg-gradient-to-b from-[#181c23] to-[#14171c] border border-white/[0.06] flex flex-col gap-3 shadow-lg">
              <div className="flex items-center justify-between">
                <Badge variant="accent" size="sm" dot>
                  Minecraft Fabric 1.21
                </Badge>
                <Badge variant="success" size="sm">
                  Онлайн
                </Badge>
              </div>

              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  OneHouse Cloud Node
                </h1>
                <p className="text-xs text-[#8e8e93] mt-1 leading-relaxed">
                  Сервер активен. Оптимизированный мобильный интерфейс дизайн-системы OneWebUI.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  leftIcon={<OneIcon name="terminal" size="sm" />}
                  onClick={() =>
                    addToast({
                      title: 'Консоль сервера',
                      description: 'Сессия подключена (12 игроков)',
                      variant: 'success',
                    })
                  }
                >
                  Консоль
                </Button>
                <Drawer>
                  <DrawerTrigger asChild>
                    <IconButton variant="secondary" size="md" icon="tune" />
                  </DrawerTrigger>
                  <DrawerContent side="bottom">
                    <DrawerHeader>
                      <DrawerTitle>Параметры ноды</DrawerTitle>
                      <DrawerDescription>Управление сервером в мобильном режиме</DrawerDescription>
                    </DrawerHeader>
                    <div className="py-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03]">
                        <span className="text-xs font-bold text-white">Авторестарт при сбоях</span>
                        <Badge variant="success" size="sm" dot>Вкл</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03]">
                        <span className="text-xs font-bold text-white">Сжатие пакетов</span>
                        <Badge variant="accent" size="sm">Zstd</Badge>
                      </div>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="primary" className="w-full">Закрыть</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {/* Metrics Bento Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[24px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-1">
                <span className="text-[11px] text-[#8e8e93] font-medium">Игроки</span>
                <span className="text-lg font-black text-white">12 / 20</span>
                <span className="text-[10px] text-emerald-400 font-bold">Пик: 18</span>
              </div>
              <div className="p-4 rounded-[24px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-1">
                <span className="text-[11px] text-[#8e8e93] font-medium">ОЗУ</span>
                <span className="text-lg font-black text-oneweb-accent">4.2 ГБ</span>
                <span className="text-[10px] text-[#8e8e93]">из 8.0 ГБ</span>
              </div>
            </div>

            {/* Quick Command Card */}
            <div className="p-5 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-3">
              <span className="text-xs font-bold text-white">Быстрая команда</span>
              <Input
                placeholder="say Привет всем игрокам..."
                leftIcon="terminal"
                rightIcon="send"
              />
            </div>
          </div>
        )}

        {/* ВКЛАДКА 2: КОМПОНЕНТЫ ДЛЯ МОБИЛКИ */}
        {mobileTab === 'components' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            {/* 1. Pill Buttons */}
            <div className="p-5 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">1. Кнопки действия (Pill)</h3>
                <p className="text-[11px] text-[#8e8e93]">Строго rounded-full с адаптацией под ширину экрана</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  isLoading={btnLoading}
                  onClick={() => {
                    setBtnLoading(true);
                    setTimeout(() => setBtnLoading(false), 1200);
                  }}
                >
                  Primary Action Button
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" size="md">Secondary</Button>
                  <Button variant="outline" size="md">Outline</Button>
                </div>
                <Button variant="danger" size="md" className="w-full">Danger Action</Button>
              </div>

              {/* IconButtons row */}
              <div className="pt-2 border-t border-white/[0.04]">
                <span className="text-[11px] text-[#8e8e93] block mb-2 font-medium">Круглые кнопки (IconButton):</span>
                <div className="flex items-center justify-between">
                  <IconButton size="sm" variant="secondary" icon="refresh" />
                  <IconButton size="md" variant="primary" icon="bolt" />
                  <IconButton size="lg" variant="outline" icon="settings" />
                  <IconButton size="xl" variant="danger" icon="power_settings_new" />
                </div>
              </div>
            </div>

            {/* 2. Pill Inputs */}
            <div className="p-5 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">2. Поля ввода (rounded-full)</h3>
                <p className="text-[11px] text-[#8e8e93]">Эргономичная высота h-12/h-14 под большой палец</p>
              </div>
              <div className="flex flex-col gap-3">
                <Input
                  label="Имя игрока"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  leftIcon="person"
                  error={inputError ? 'Никнейм занят' : undefined}
                />
                <Input
                  type="password"
                  label="Пароль"
                  value={passVal}
                  onChange={(e) => setPassVal(e.target.value)}
                  leftIcon="lock"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputError(!inputError)}
                >
                  Ошибка инпута: {inputError ? 'Вкл' : 'Выкл'}
                </Button>
              </div>
            </div>

            {/* 3. Segmented Control Tabs */}
            <div className="p-5 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-3">
              <h3 className="text-sm font-bold text-white">3. Мобильные табы (Tabs)</h3>
              <Tabs defaultValue="day" className="w-full">
                <TabsList size="md" className="w-full">
                  <TabsTrigger value="day" className="flex-1" icon="today">День</TabsTrigger>
                  <TabsTrigger value="week" className="flex-1" icon="date_range">Неделя</TabsTrigger>
                  <TabsTrigger value="month" className="flex-1" icon="calendar_month">Месяц</TabsTrigger>
                </TabsList>
                <TabsContent value="day">
                  <div className="p-3 text-xs text-[#8e8e93] bg-white/[0.02] rounded-xl text-center">
                    Статистика за текущие 24 часа
                  </div>
                </TabsContent>
                <TabsContent value="week">
                  <div className="p-3 text-xs text-[#8e8e93] bg-white/[0.02] rounded-xl text-center">
                    Статистика за последние 7 дней
                  </div>
                </TabsContent>
                <TabsContent value="month">
                  <div className="p-3 text-xs text-[#8e8e93] bg-white/[0.02] rounded-xl text-center">
                    Статистика за последние 30 дней
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* 4. Badges */}
            <div className="p-5 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-3">
              <h3 className="text-sm font-bold text-white">4. Мягкие бейджи (Badge)</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="accent" dot>Лайм</Badge>
                <Badge variant="success" dot>В сети</Badge>
                <Badge variant="warning" dot>Внимание</Badge>
                <Badge variant="danger" dot>Сбой</Badge>
                <Badge variant="default" size="sm">v1.1.0</Badge>
              </div>
            </div>

            {/* 5. Select & Modals */}
            <div className="p-5 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-3">
              <h3 className="text-sm font-bold text-white">5. Выпадающий список (Select)</h3>
              <Select value={selectedServer} onValueChange={setSelectedServer}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сервер..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onehouse-main">OneHouse Fabric 1.21</SelectItem>
                  <SelectItem value="onehouse-dev">OneHouse Dev Testbed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* ВКЛАДКА 3: ТОКЕНЫ НА МОБИЛЬНОМ */}
        {mobileTab === 'tokens' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04]">
              <h3 className="text-sm font-bold text-white">Палитра токенов</h3>
              <p className="text-[11px] text-[#8e8e93]">Тапните для копирования CSS-переменной</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {PALETTE_COLORS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(`var(--${color.name})`);
                    addToast({
                      title: 'Скопировано',
                      description: `var(--${color.name})`,
                      variant: 'success',
                    });
                  }}
                  className="p-3 rounded-2xl bg-[#14171c] border border-white/[0.04] flex flex-col gap-2 text-left active:scale-95 transition-transform"
                >
                  <div
                    className="w-full h-8 rounded-xl border border-white/[0.04]"
                    style={{ backgroundColor: color.value }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white truncate">{color.name}</div>
                    <div className="text-[10px] text-[#8e8e93] truncate">{color.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ВКЛАДКА 4: МОБИЛЬНЫЙ ГАЙД */}
        {mobileTab === 'guidelines' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="p-5 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-3">
              <Badge variant="accent" size="sm" dot>Mobile UX Rules</Badge>
              <h3 className="text-base font-extrabold text-white">Стандарты для экранов смартфонов</h3>
              <ul className="text-xs text-[#8e8e93] space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <OneIcon name="check" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                  <span><strong>MobileNavbar Dock:</strong> плавающий нижний таб-бар h-[68px] с размытием фона и безопасным отступом pb-28.</span>
                </li>
                <li className="flex items-start gap-2">
                  <OneIcon name="check" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                  <span><strong>Плавающий FAB:</strong> увеличенная кнопка действия (h-14 w-14) над навбаром справа со свечением #c0ff00.</span>
                </li>
                <li className="flex items-start gap-2">
                  <OneIcon name="check" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                  <span><strong>Форма капсулы:</strong> инпуты и кнопки строго rounded-full для легкого нажатия пальцем (44px+).</span>
                </li>
                <li className="flex items-start gap-2">
                  <OneIcon name="check" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                  <span><strong>Шторки Bottom Sheet:</strong> замена центральных диалогов на нижние выдвижные панели.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) на мобилке */}
      <MobileActionButton
        variant="circular"
        icon="add"
        isFloating={true}
        className="fixed bottom-24 right-4 z-50 shadow-[0_0_24px_rgba(192,255,0,0.5)]"
        onClick={() => setIsQuickActionOpen(true)}
      />

      {/* Quick Action Drawer при нажатии на FAB */}
      <Drawer open={isQuickActionOpen} onOpenChange={setIsQuickActionOpen}>
        <DrawerContent side="bottom">
          <DrawerHeader>
            <DrawerTitle>Быстрое мобильное действие</DrawerTitle>
            <DrawerDescription>Вызов плавающего FAB из правого нижнего угла</DrawerDescription>
          </DrawerHeader>
          <div className="py-3 flex flex-col gap-2.5">
            <Button
              variant="primary"
              className="w-full"
              leftIcon={<OneIcon name="add" size="sm" />}
              onClick={() => {
                setIsQuickActionOpen(false);
                addToast({ title: 'Сервер создан!', variant: 'success' });
              }}
            >
              Создать новый инстанс
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              leftIcon={<OneIcon name="terminal" size="sm" />}
              onClick={() => {
                setIsQuickActionOpen(false);
                addToast({ title: 'Отправлен сигнал ping', variant: 'accent' });
              }}
            >
              Пинг всех нод
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Отмена</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Плавающий нижний MobileNavbar */}
      <MobileNavbar
        items={mobileNavItems}
        activeId={mobileTab}
        onChange={(id) => setMobileTab(id as any)}
        isFloating={true}
      />
    </div>
  );
}

// ============================================================================
// 2. ДЕСКТОПНАЯ ВЕРСИЯ САЙТА (DesktopShowcaseView)
// Полноэкранная Bento-сетка, плавающий DesktopNavbar, мультиколоночный каталог
// ============================================================================
function DesktopShowcaseView({ onSwitchToMobile }: { onSwitchToMobile: () => void }) {
  const { addToast } = useToast();
  const [activeSection, setActiveSection] = useState<'overview' | 'desktop' | 'mobile' | 'components'>('overview');
  const [navbarVariant, setNavbarVariant] = useState<'sticky' | 'floating'>('sticky');

  // Interactive states
  const [iconFill, setIconFill] = useState(true);
  const [selectedIconSize, setSelectedIconSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [iconSearch, setIconSearch] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [buttonClicks, setButtonClicks] = useState(0);
  const [inputVal, setInputVal] = useState('one_admin');
  const [passVal, setPassVal] = useState('supersecret123');
  const [inputError, setInputError] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputSize, setInputSize] = useState<'md' | 'lg'>('md');
  const [selectedServer, setSelectedServer] = useState('onehouse-main');

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(text);
    addToast({
      title: 'Скопировано в буфер!',
      description: text,
      variant: 'success',
    });
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredIcons = SAMPLE_ICONS.filter(
    (i) =>
      i.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
      i.label.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const desktopNavItems = [
    { id: 'overview', label: 'Обзор & Токены', icon: 'palette' },
    { id: 'desktop', label: 'Desktop Guidelines', icon: 'desktop_windows' },
    { id: 'mobile', label: 'Mobile Guidelines', icon: 'smartphone' },
    { id: 'components', label: 'Компоненты', icon: 'widgets' },
  ];

  return (
    <div className="min-h-screen bg-[#090b0e] text-white font-oneweb-sans pb-32 selection:bg-oneweb-accent-subtle selection:text-oneweb-accent">
      {/* Верхний десктопный бар */}
      <DesktopNavbar
        variant={navbarVariant}
        title="OneWebUI"
        subtitle="Ecosystem One Design System"
        badgeText="v1.1.0"
        items={desktopNavItems}
        activeId={activeSection}
        onItemClick={(id) => setActiveSection(id as any)}
        profile={{
          name: 'Alex Root',
          role: 'OneHouse Admin',
          status: 'online',
        }}
        rightSlot={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToMobile}
              leftIcon={<OneIcon name="smartphone" size="sm" />}
              className="text-xs border-white/10 hover:bg-white/5"
            >
              Мобильный вид
            </Button>
            <IconButton
              variant="secondary"
              size="sm"
              icon="notifications"
              onClick={() =>
                addToast({
                  title: 'Системный сигнал',
                  description: 'OneWebUI: активен референс OneHouse.',
                  variant: 'accent',
                })
              }
            />
          </div>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-col gap-10">
        {/* Navigation Selector Pill (Segmented Control) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-oneweb-accent/10 text-oneweb-accent flex items-center justify-center font-bold shrink-0">
              <OneIcon name="explore" size="md" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">
                Разделы спецификации OneWebUI
              </h2>
              <p className="text-xs text-[#8e8e93] leading-tight">
                Стандарты для десктопа, мобильных экранов и каталог базовых примитивов
              </p>
            </div>
          </div>

          <Tabs
            value={activeSection}
            onValueChange={(val) => setActiveSection(val as any)}
            className="w-full sm:w-auto"
          >
            <TabsList size="md" className="w-full sm:w-auto">
              <TabsTrigger value="overview" icon="palette">Обзор</TabsTrigger>
              <TabsTrigger value="desktop" icon="desktop_windows">Desktop</TabsTrigger>
              <TabsTrigger value="mobile" icon="smartphone">Mobile</TabsTrigger>
              <TabsTrigger value="components" icon="widgets">Компоненты</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* СЕКЦИЯ 1: ОБЗОР И ТОКЕНЫ */}
        {activeSection === 'overview' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" size="md" dot>OneHouse Benchmark</Badge>
                <Badge variant="default" size="md">OLED Bento Aesthetics</Badge>
                <Badge variant="success" size="md" dot>Pill Action Controls</Badge>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                OneWebUI — Дизайн-система экосистемы One
              </h1>
              <p className="text-sm sm:text-base text-[#8e8e93] max-w-3xl leading-relaxed">
                Эталонная веб-дизайн-система по референсу интерфейсов OneHouse. Построена на базе чистой OLED-палитры,
                bento-карточек со скруглением <code className="text-oneweb-accent bg-white/[0.06] px-2 py-0.5 rounded-lg text-xs font-mono">rounded-[32px]</code>,
                полного запрета внутренних разделителей и эргономичных капсульных элементов управления.
              </p>
            </section>

            {/* Палитра */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <OneIcon name="palette" size="md" className="text-oneweb-accent" />
                    Палитра токенов OneWebUI
                  </h2>
                  <p className="text-xs text-[#8e8e93]">
                    Кликните на плитку для копирования токена в буфер обмена
                  </p>
                </div>
                {copiedToken && (
                  <Badge variant="accent" size="sm" dot>Скопировано: {copiedToken}</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {PALETTE_COLORS.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleCopy(`var(--${color.name})`)}
                    className="bg-[#14171c] border border-white/[0.04] rounded-2xl p-3 flex flex-col gap-2.5 text-left hover:border-white/10 hover:bg-[#181c23] transition-all active:scale-95 group focus:outline-none"
                  >
                    <div
                      className="w-full h-12 rounded-xl border border-white/[0.04] shadow-inner"
                      style={{ backgroundColor: color.value }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-oneweb-accent truncate">
                        {color.name}
                      </div>
                      <div className="text-[11px] text-[#8e8e93] truncate">
                        {color.role}
                      </div>
                      <div className="text-[10px] text-white/40 font-oneweb-mono mt-0.5">
                        {color.value}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Типографика */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="text_fields" size="md" className="text-oneweb-accent" />
                Типографика
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Wix Madefor Display</CardTitle>
                    <CardDescription>Основной шрифт интерфейса (font-oneweb-sans)</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-oneweb-sans text-lg font-bold text-white">Аа Бб Вв 12345</p>
                    <p className="font-oneweb-sans text-xs text-[#8e8e93] leading-relaxed">
                      Современный гротеск с превосходной читаемостью на экранах OLED.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Minecraft & Pixel Fonts</CardTitle>
                    <CardDescription>Пиксельный шрифт (font-oneweb-minecraft)</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-oneweb-minecraft text-2xl text-oneweb-accent tracking-wider">
                      ONEHOUSE FABRIC 1.21
                    </p>
                    <p className="font-oneweb-minecraft text-sm text-[#8e8e93]">
                      Сервер готов к подключениям.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monospace</CardTitle>
                    <CardDescription>Моноширинный стек (font-oneweb-mono)</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <code className="font-oneweb-mono text-xs text-oneweb-accent bg-white/[0.04] p-3 rounded-2xl block border border-white/[0.03]">
                      sha256: 89476ea08498adb1813b
                    </code>
                    <p className="text-xs text-[#8e8e93]">
                      Для консолей, хэшей и кодовых сниппетов.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* СЕКЦИЯ 2: DESKTOP GUIDELINES */}
        {activeSection === 'desktop' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            <section className="flex flex-col gap-3">
              <Badge variant="accent" size="sm" dot>Desktop Architecture</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Desktop Guidelines — Стандарты для больших экранов
              </h2>
              <p className="text-sm text-[#8e8e93] max-w-3xl leading-relaxed">
                Десктопные интерфейсы OneHouse используют модульную Bento-сетку, скругления 32px, плавающую или липкую навигацию
                и полное отсутствие рассекающих серых разделительных линий.
              </p>
            </section>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>OneHouse Fabric 1.21</CardTitle>
                    <Badge variant="success" size="sm" dot>Онлайн</Badge>
                  </div>
                  <CardDescription>Основной игровой узел</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white/[0.03]">
                    <span className="text-[#8e8e93]">Игроки в сети</span>
                    <span className="font-bold text-white">12 / 20</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white/[0.03]">
                    <span className="text-[#8e8e93]">Пинг</span>
                    <span className="font-bold text-emerald-400">14 ms</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white/[0.03]">
                    <span className="text-[#8e8e93]">ОЗУ сервера</span>
                    <span className="font-bold text-oneweb-accent">4.2 / 8.0 ГБ</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" className="w-full" leftIcon={<OneIcon name="play_arrow" size="sm" />}>
                    Открыть консоль
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Быстрые действия (Desktop)</CardTitle>
                  <CardDescription>Управление процессами сервера</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#8e8e93]">Перезапуск демона:</span>
                    <IconButton variant="secondary" size="md" icon="restart_alt" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#8e8e93]">Создать бэкап мира:</span>
                    <IconButton variant="primary" size="md" icon="backup" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#8e8e93]">Остановка инстанса:</span>
                    <IconButton variant="danger" size="md" icon="power_settings_new" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">Все скрипты</Button>
                </CardFooter>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Glass Panel</CardTitle>
                    <Badge variant="accent" size="sm">OLED Blur</Badge>
                  </div>
                  <CardDescription>Мягкое матовое стекло backdrop-blur-2xl</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Применяется для всплывающих информационных панелей и модальных окон в десктопном режиме.
                  </p>
                  <div className="p-3 rounded-2xl bg-white/[0.04] flex items-center gap-3">
                    <OneIcon name="shield" size="md" className="text-oneweb-accent" />
                    <div className="text-xs">
                      <div className="font-bold text-white">Защита включена</div>
                      <div className="text-[11px] text-[#8e8e93]">Cloudflare Tunnel + SSL</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Аудит доступа</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* СЕКЦИЯ 3: MOBILE GUIDELINES */}
        {activeSection === 'mobile' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            <section className="flex flex-col gap-3">
              <Badge variant="accent" size="sm" dot>Mobile Ergonomics</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Mobile Guidelines — Стандарты для мобильных экранов
              </h2>
              <p className="text-sm text-[#8e8e93] max-w-3xl leading-relaxed">
                Вы можете нажать кнопку ниже, чтобы переключить весь интерфейс в мобильный режим, или протестировать
                компоненты мобильной архитектуры прямо здесь.
              </p>
              <div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={onSwitchToMobile}
                  leftIcon={<OneIcon name="smartphone" size="sm" />}
                >
                  Перейти в полноэкранную мобильную версию
                </Button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>1. Mobile Action Button (FAB)</CardTitle>
                  <CardDescription>
                    Плавающая кнопка действия над навбаром (fixed bottom-24 right-5 z-50)
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-xs text-[#8e8e93]">
                    Кнопка действия выполнена в фирменном лайме #c0ff00 с неоновым свечением.
                  </p>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <MobileActionButton
                      variant="circular"
                      icon="add"
                      isFloating={false}
                      onClick={() => addToast({ title: 'FAB нажат!', variant: 'accent' })}
                    />
                    <MobileActionButton
                      variant="extended"
                      icon="add"
                      label="Новый сервер"
                      isFloating={false}
                      onClick={() => addToast({ title: 'Новый сервер создан', variant: 'success' })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Мобильные шторки (Bottom Sheet)</CardTitle>
                  <CardDescription>Замена центральных модалок на нижние свайп-панели</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-xs text-[#8e8e93]">
                    Скругление верхних углов rounded-t-[32px] и плавный жест смахивания.
                  </p>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="primary">Открыть Bottom Sheet</Button>
                    </DrawerTrigger>
                    <DrawerContent side="bottom">
                      <DrawerHeader>
                        <DrawerTitle>Тестовая шторка</DrawerTitle>
                        <DrawerDescription>Мобильная выдвижная панель</DrawerDescription>
                      </DrawerHeader>
                      <div className="py-4">
                        <Input label="Быстрый параметр" placeholder="Значение..." />
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="primary" className="w-full">Готово</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* СЕКЦИЯ 4: КОМПОНЕНТЫ */}
        {activeSection === 'components' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            {/* Кнопки */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <OneIcon name="smart_button" size="md" className="text-oneweb-accent" />
                    Кнопки (Button & IconButton)
                  </h2>
                  <p className="text-xs text-[#8e8e93]">
                    Все кнопки строго rounded-full. Primary — яркий #c0ff00 с черным жирным текстом.
                  </p>
                </div>
              </div>

              <Card>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="primary"
                      isLoading={btnLoading}
                      disabled={btnDisabled}
                      onClick={() => setButtonClicks((c) => c + 1)}
                    >
                      Primary ({buttonClicks})
                    </Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <IconButton size="sm" variant="secondary" icon="refresh" />
                      <span className="text-xs text-[#8e8e93]">sm (h-8 w-8)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton size="md" variant="primary" icon="bolt" />
                      <span className="text-xs text-[#8e8e93]">md (h-10 w-10)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton size="lg" variant="outline" icon="settings" />
                      <span className="text-xs text-[#8e8e93]">lg (h-12 w-12)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton size="xl" variant="danger" icon="delete" />
                      <span className="text-xs text-[#8e8e93]">xl (h-14 w-14)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Инпуты */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="edit_square" size="md" className="text-oneweb-accent" />
                Поля ввода (Input — Pill Form)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Текстовый инпут (Pill)</CardTitle>
                    <CardDescription>С левой иконкой и валидацией</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      label="Имя пользователя"
                      placeholder="Введите никнейм..."
                      value={inputVal}
                      disabled={inputDisabled}
                      inputSize={inputSize}
                      error={inputError ? 'Пользователь не найден' : undefined}
                      onChange={(e) => setInputVal(e.target.value)}
                      leftIcon="person"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Инпут пароля (Pill)</CardTitle>
                    <CardDescription>Встроенный переключатель видимости</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="password"
                      label="Мастер-пароль"
                      placeholder="••••••••"
                      value={passVal}
                      disabled={inputDisabled}
                      inputSize={inputSize}
                      onChange={(e) => setPassVal(e.target.value)}
                      leftIcon="lock"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Табы */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="tab" size="md" className="text-oneweb-accent" />
                Табы и Segmented Control (Tabs)
              </h2>

              <Card>
                <CardContent>
                  <Tabs defaultValue="server" className="w-full">
                    <TabsList size="md">
                      <TabsTrigger value="server" icon="dns">Сервер</TabsTrigger>
                      <TabsTrigger value="mods" icon="extension">Моды</TabsTrigger>
                      <TabsTrigger value="backups" icon="backup">Бэкапы</TabsTrigger>
                    </TabsList>
                    <TabsContent value="server">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93]">
                        Активна вкладка: Сервер (Minecraft 1.21 Fabric)
                      </div>
                    </TabsContent>
                    <TabsContent value="mods">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93]">
                        Активна вкладка: Каталог модов (42 мода)
                      </div>
                    </TabsContent>
                    <TabsContent value="backups">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93]">
                        Активна вкладка: Резервные копии мира
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT: ROUTING BETWEEN MOBILE & DESKTOP SHOWCASE
// ============================================================================
export function App() {
  const { isDesktop, setViewMode } = useDeviceMode();

  return (
    <TooltipProvider>
      <ToastContainerProvider>
        {isDesktop ? (
          <DesktopShowcaseView onSwitchToMobile={() => setViewMode('mobile')} />
        ) : (
          <MobileShowcaseView onSwitchToDesktop={() => setViewMode('desktop')} />
        )}
      </ToastContainerProvider>
    </TooltipProvider>
  );
}

export default App;
