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
} from './design-system';

type MainSection = 'overview' | 'desktop' | 'mobile' | 'components';
type MobileSimTab = 'server' | 'console' | 'players' | 'settings';

function ShowcaseContent() {
  const { addToast } = useToast();

  // Navigation & section state
  const [activeSection, setActiveSection] = useState<MainSection>('overview');
  const [navbarVariant, setNavbarVariant] = useState<'sticky' | 'floating'>('sticky');

  // Mobile simulator state
  const [mobileActiveTab, setMobileActiveTab] = useState<string>('server');
  const [mobileFabCount, setMobileFabCount] = useState<number>(0);

  // Icon & Palette states
  const [iconFill, setIconFill] = useState(true);
  const [selectedIconSize, setSelectedIconSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [iconSearch, setIconSearch] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Button & IconButton states
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [buttonClicks, setButtonClicks] = useState(0);

  // Input states
  const [inputVal, setInputVal] = useState('one_admin');
  const [passVal, setPassVal] = useState('supersecret123');
  const [inputError, setInputError] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputSize, setInputSize] = useState<'md' | 'lg'>('md');

  // Select state
  const [selectedServer, setSelectedServer] = useState('onehouse-main');

  // Global floating mobile navbar visibility toggle for testing on desktop
  const [showGlobalMobileNav, setShowGlobalMobileNav] = useState(false);

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

  const paletteColors = [
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

  const sampleIcons = [
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

  const filteredIcons = sampleIcons.filter(
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

  const mobileNavItems = [
    { id: 'server', label: 'Сервер', icon: 'dns' },
    { id: 'console', label: 'Консоль', icon: 'terminal' },
    { id: 'players', label: 'Игроки', icon: 'group', badge: 12 },
    { id: 'settings', label: 'Настройки', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[#090b0e] text-white font-oneweb-sans pb-32 selection:bg-oneweb-accent-subtle selection:text-oneweb-accent">
      {/* 1. Desktop Navigation Bar */}
      <DesktopNavbar
        variant={navbarVariant}
        title="OneWebUI"
        subtitle="OneHouse Ecosystem Design System"
        badgeText="v1.1.0"
        items={desktopNavItems}
        activeId={activeSection}
        onItemClick={(id) => setActiveSection(id as MainSection)}
        profile={{
          name: 'Alex Root',
          role: 'OneHouse Admin',
          status: 'online',
        }}
        rightSlot={
          <div className="flex items-center gap-2">
            <SimpleTooltip content="Нажмите для вызова тестового уведомления">
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
            </SimpleTooltip>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<OneIcon name="tune" size="sm" />}
                >
                  Опции
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Настройки окружения OneWebUI</DialogTitle>
                  <DialogDescription>
                    Переключение режимов отображения витрины и стилей навигации.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-2">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                    <div>
                      <div className="text-xs font-bold text-white">Плавающий MobileNavbar</div>
                      <div className="text-[11px] text-[#8e8e93]">Показывать нижний мобильный бар внизу окна</div>
                    </div>
                    <Button
                      variant={showGlobalMobileNav ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setShowGlobalMobileNav(!showGlobalMobileNav)}
                    >
                      {showGlobalMobileNav ? 'Вкл' : 'Выкл'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                    <div>
                      <div className="text-xs font-bold text-white">Формат DesktopNavbar</div>
                      <div className="text-[11px] text-[#8e8e93]">Липкий верхний бар или парящая капсула</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNavbarVariant(navbarVariant === 'sticky' ? 'floating' : 'sticky')
                      }
                    >
                      {navbarVariant === 'sticky' ? 'Sticky' : 'Floating'}
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="primary" className="w-full">
                      Применить
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-col gap-10">
        {/* Navigation Selector Pill (Segmented Control) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-oneweb-accent/10 text-oneweb-accent flex items-center justify-center font-bold">
              <OneIcon name="explore" size="md" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">
                Разделы спецификации OneWebUI
              </h2>
              <p className="text-xs text-[#8e8e93] leading-tight">
                Переключайтесь между рекомендациями для десктопа, мобильных экранов и каталогом примитивов
              </p>
            </div>
          </div>

          <Tabs
            value={activeSection}
            onValueChange={(val) => setActiveSection(val as MainSection)}
            className="w-full sm:w-auto"
          >
            <TabsList size="md" className="w-full sm:w-auto">
              <TabsTrigger value="overview" icon="palette">
                Обзор
              </TabsTrigger>
              <TabsTrigger value="desktop" icon="desktop_windows">
                Desktop
              </TabsTrigger>
              <TabsTrigger value="mobile" icon="smartphone">
                Mobile
              </TabsTrigger>
              <TabsTrigger value="components" icon="widgets">
                Компоненты
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* SECTION 1: OVERVIEW & TOKENS */}
        {activeSection === 'overview' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            {/* Hero Section */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" size="md" dot>
                  OneHouse Benchmark
                </Badge>
                <Badge variant="default" size="md">
                  OLED Bento Aesthetics
                </Badge>
                <Badge variant="success" size="md" dot>
                  Pill Action Controls
                </Badge>
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

            {/* Color Tokens Grid */}
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
                  <Badge variant="accent" size="sm" dot>
                    Скопировано: {copiedToken}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {paletteColors.map((color) => (
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

            {/* Typography Grid */}
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
                    <p className="font-oneweb-sans text-lg font-bold text-white">
                      Аа Бб Вв 12345
                    </p>
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

        {/* SECTION 2: DESKTOP GUIDELINES */}
        {activeSection === 'desktop' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            <section className="flex flex-col gap-3">
              <Badge variant="accent" size="sm" dot>
                Desktop Architecture
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Desktop Guidelines — Стандарты для больших экранов
              </h2>
              <p className="text-sm text-[#8e8e93] max-w-3xl leading-relaxed">
                Десктопные интерфейсы OneHouse используют модульную Bento-сетку, скругления 32px, плавающую или липкую навигацию
                и полное отсутствие рассекающих серых разделительных линий.
              </p>
            </section>

            {/* 1. Desktop Navbar Showcase */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle>1. Десктопный навбар (DesktopNavbar)</CardTitle>
                    <CardDescription>
                      Поддержка двух режимов: липкий верхний бар (Sticky) и плавающая капсула (Floating Pill)
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={navbarVariant === 'sticky' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setNavbarVariant('sticky')}
                    >
                      Sticky Header
                    </Button>
                    <Button
                      variant={navbarVariant === 'floating' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setNavbarVariant('floating')}
                    >
                      Floating Pill
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-xs text-[#8e8e93]">
                  Текущий режим верхней панели: <span className="text-oneweb-accent font-bold uppercase">{navbarVariant}</span>.
                  Обратите внимание на плавное размытие фона при скролле и активный элемент в виде капсулы.
                </p>
                <div className="p-4 rounded-[28px] bg-white/[0.02] border border-white/[0.04]">
                  <DesktopNavbar
                    variant="floating"
                    title="OneHouse Cloud"
                    subtitle="Fabric Server Node #1"
                    badgeText="ONLINE"
                    items={[
                      { id: 'dash', label: 'Главная', icon: 'dashboard', active: true },
                      { id: 'players', label: 'Игроки', icon: 'group', badge: '12' },
                      { id: 'files', label: 'Файлы', icon: 'folder' },
                      { id: 'settings', label: 'Настройки', icon: 'settings' },
                    ]}
                    profile={{
                      name: 'Admin Master',
                      role: 'Server Lead',
                      status: 'online',
                    }}
                    rightSlot={
                      <IconButton variant="outline" size="sm" icon="sync" />
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* 2. Bento Grid Demonstration */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <OneIcon name="grid_view" size="md" className="text-oneweb-accent" />
                2. Модульная Bento-сетка (Zero Dividers)
              </h3>
              <p className="text-xs text-[#8e8e93]">
                Все карточки имеют скругление rounded-[32px], отступы p-6 sm:p-7 и внутреннюю группировку через плашки bg-white/[0.03]
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bento Card 1: Server Status */}
                <Card variant="default">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>OneHouse Fabric 1.21</CardTitle>
                      <Badge variant="success" size="sm" dot>Онлайн</Badge>
                    </div>
                    <CardDescription>Основной игровой мир</CardDescription>
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

                {/* Bento Card 2: Quick Actions & IconButtons */}
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
                    <Button variant="secondary" className="w-full">
                      Все скрипты
                    </Button>
                  </CardFooter>
                </Card>

                {/* Bento Card 3: Interactive Glass Bento */}
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
                    <Button variant="outline" className="w-full">
                      Аудит доступа
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: MOBILE GUIDELINES */}
        {activeSection === 'mobile' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            <section className="flex flex-col gap-3">
              <Badge variant="accent" size="sm" dot>
                Mobile Ergonomics
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Mobile Guidelines — Стандарты для мобильных экранов
              </h2>
              <p className="text-sm text-[#8e8e93] max-w-3xl leading-relaxed">
                Мобильная архитектура OneHouse оптимизирована для управления одной рукой: плавающий таб-бар MobileNavbar
                в форме pill, плавающая кнопка действия Mobile Action Button (FAB) в нижнем правом углу над навбаром,
                и полноразмерные шторки Bottom Sheet.
              </p>
            </section>

            {/* Mobile Simulator & FAB Demo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Smartphone Mockup */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div className="text-xs font-semibold text-[#8e8e93] mb-3 flex items-center gap-2">
                  <OneIcon name="phone_iphone" size="sm" className="text-oneweb-accent" />
                  Интерактивный симулятор смартфона OneHouse
                </div>

                {/* Smartphone Device Frame */}
                <div className="w-full max-w-[390px] h-[720px] bg-[#090b0e] rounded-[52px] border-[6px] border-[#252c37] shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col justify-between">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#181c23]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_#10b981]" />
                  </div>

                  {/* Simulator Screen Content */}
                  <div className="flex-1 overflow-y-auto pt-12 pb-24 px-4 flex flex-col gap-4 text-left">
                    {/* Screen Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-oneweb-accent text-black font-black text-xs flex items-center justify-center">
                          1H
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-white">OneHouse Mobile</div>
                          <div className="text-[10px] text-[#8e8e93]">Fabric 1.21 • Онлайн</div>
                        </div>
                      </div>
                      <Badge variant="success" size="sm" dot>
                        14 ms
                      </Badge>
                    </div>

                    {/* Active tab content in simulator */}
                    {mobileActiveTab === 'server' && (
                      <div className="flex flex-col gap-3 animate-fade-in">
                        <div className="p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-2.5">
                          <span className="text-xs font-bold text-white">Состояние сервера</span>
                          <div className="flex justify-between items-center text-xs p-2.5 rounded-2xl bg-white/[0.03]">
                            <span className="text-[#8e8e93]">Игроки онлайн</span>
                            <span className="font-bold text-white">12 / 20</span>
                          </div>
                          <div className="flex justify-between items-center text-xs p-2.5 rounded-2xl bg-white/[0.03]">
                            <span className="text-[#8e8e93]">TPS сервера</span>
                            <span className="font-bold text-emerald-400">20.0</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04] flex flex-col gap-2">
                          <span className="text-xs font-bold text-white">Быстрый ввод</span>
                          <Input placeholder="Отправить сообщение..." leftIcon="chat" />
                        </div>
                      </div>
                    )}

                    {mobileActiveTab === 'console' && (
                      <div className="flex flex-col gap-2 p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04] animate-fade-in">
                        <span className="text-xs font-bold text-white">Консоль сервера</span>
                        <div className="p-3 bg-black/60 rounded-2xl font-oneweb-mono text-[10px] text-oneweb-accent space-y-1">
                          <p>[12:54:10] Server started.</p>
                          <p>[12:55:01] Player Alex joined.</p>
                          <p>[12:58:22] Auto-save complete.</p>
                        </div>
                      </div>
                    )}

                    {mobileActiveTab === 'players' && (
                      <div className="flex flex-col gap-2 p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04] animate-fade-in">
                        <span className="text-xs font-bold text-white">Список игроков (12)</span>
                        {['Alex', 'Steve', 'Kitten_99', 'MinerPro'].map((p) => (
                          <div key={p} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] text-xs">
                            <span className="font-bold text-white">{p}</span>
                            <Badge variant="accent" size="sm">Игрок</Badge>
                          </div>
                        ))}
                      </div>
                    )}

                    {mobileActiveTab === 'settings' && (
                      <div className="flex flex-col gap-3 p-4 rounded-[28px] bg-[#14171c] border border-white/[0.04] animate-fade-in">
                        <span className="text-xs font-bold text-white">Мобильные настройки</span>
                        <Button variant="outline" size="sm" className="w-full">
                          Перезагрузить плагины
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Simulator Floating Action Button (FAB) */}
                  <div className="absolute bottom-20 right-4 z-30">
                    <SimpleTooltip content="Нажмите на FAB!">
                      <MobileActionButton
                        variant="circular"
                        icon="add"
                        isFloating={false}
                        onClick={() => {
                          setMobileFabCount((c) => c + 1);
                          addToast({
                            title: 'FAB нажат!',
                            description: `Вы нажали Mobile Action Button (${mobileFabCount + 1})`,
                            variant: 'accent',
                          });
                        }}
                      />
                    </SimpleTooltip>
                  </div>

                  {/* Simulator MobileNavbar Dock */}
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <MobileNavbar
                      items={mobileNavItems}
                      activeId={mobileActiveTab}
                      onChange={(id) => setMobileActiveTab(id)}
                      isFloating={false}
                    />
                  </div>

                  {/* Home Bar indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-40 pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Mobile Guidelines Documentation */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                {/* 1. Mobile Action Button (FAB) */}
                <Card>
                  <CardHeader>
                    <CardTitle>1. Mobile Action Button (FAB)</CardTitle>
                    <CardDescription>
                      Плавающая кнопка действия над навбаром (fixed bottom-24 right-5 sm:right-7 z-50)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Кнопка действия выполнена в фирменном лайме <code className="text-oneweb-accent">#c0ff00</code> с неоновым свечением
                      <code className="text-white"> shadow-[0_0_24px_rgba(192,255,0,0.45)]</code> и тактильной реакцией при нажатии.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[11px] text-[#8e8e93]">Circular (h-14 w-14)</span>
                        <MobileActionButton
                          variant="circular"
                          icon="add"
                          isFloating={false}
                          onClick={() =>
                            addToast({
                              title: 'Действие создано',
                              description: 'Открыто создание нового объекта',
                              variant: 'success',
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[11px] text-[#8e8e93]">Extended (h-14 px-6)</span>
                        <MobileActionButton
                          variant="extended"
                          icon="add"
                          label="Новый сервер"
                          isFloating={false}
                          onClick={() =>
                            addToast({
                              title: 'Новый сервер',
                              description: 'Запущен мастер конфигурации',
                              variant: 'success',
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Bottom Sheet / Drawer */}
                <Card>
                  <CardHeader>
                    <CardTitle>2. Мобильные шторки (Bottom Sheet)</CardTitle>
                    <CardDescription>
                      Скругление верхних углов rounded-t-[32px] и индикатор свайпа
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Для мобильных форм и фильтров вместо центральных диалогов используются нижние шторки.
                    </p>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="primary" leftIcon={<OneIcon name="vertical_align_top" size="sm" />}>
                          Открыть Bottom Sheet
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent side="bottom">
                        <DrawerHeader>
                          <DrawerTitle>Параметры мобильного клиента</DrawerTitle>
                          <DrawerDescription>
                            Полноценная шторка с поддержкой жестов закрытия.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="py-4 flex flex-col gap-3">
                          <Input label="Команда консоли" placeholder="say Привет из OneHouse" leftIcon="terminal" />
                          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                            <span className="text-xs font-bold text-white">Автоматический рестарт</span>
                            <Badge variant="success" size="sm" dot>Активен</Badge>
                          </div>
                        </div>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="primary" className="w-full">
                              Готово
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </CardContent>
                </Card>

                {/* 3. Global Floating Bar Toggle */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>3. Тестирование на текущем экране</CardTitle>
                    <CardDescription>
                      Включить отображение плавающего MobileNavbar на всю страницу
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Плавающий MobileNavbar</div>
                      <div className="text-[11px] text-[#8e8e93]">Прикрепить рабочий док к нижней части окна</div>
                    </div>
                    <Button
                      variant={showGlobalMobileNav ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setShowGlobalMobileNav(!showGlobalMobileNav)}
                    >
                      {showGlobalMobileNav ? 'Скрыть бар' : 'Показать бар'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: ALL COMPONENTS PLAYGROUND */}
        {activeSection === 'components' && (
          <div className="flex flex-col gap-10 animate-fade-in">
            {/* 1. Button & IconButton */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <OneIcon name="smart_button" size="md" className="text-oneweb-accent" />
                    1. Кнопки (Button & IconButton)
                  </h2>
                  <p className="text-xs text-[#8e8e93]">
                    Все кнопки действий строго rounded-full. Primary — яркий #c0ff00 с черным жирным текстом.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBtnLoading(!btnLoading)}
                  >
                    Loading: {btnLoading ? 'Вкл' : 'Выкл'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBtnDisabled(!btnDisabled)}
                  >
                    Disabled: {btnDisabled ? 'Вкл' : 'Выкл'}
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="flex flex-col gap-6">
                  {/* Action Buttons */}
                  <div>
                    <span className="text-xs font-semibold text-[#8e8e93] block mb-3 uppercase tracking-wider">
                      Варианты стиля Button (Pill rounded-full)
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="primary"
                        isLoading={btnLoading}
                        disabled={btnDisabled}
                        onClick={() => setButtonClicks((c) => c + 1)}
                      >
                        Primary ({buttonClicks})
                      </Button>
                      <Button variant="secondary" isLoading={btnLoading} disabled={btnDisabled}>
                        Secondary
                      </Button>
                      <Button variant="outline" isLoading={btnLoading} disabled={btnDisabled}>
                        Outline
                      </Button>
                      <Button variant="ghost" isLoading={btnLoading} disabled={btnDisabled}>
                        Ghost
                      </Button>
                      <Button variant="danger" isLoading={btnLoading} disabled={btnDisabled}>
                        Danger
                      </Button>
                    </div>
                  </div>

                  {/* Circular IconButtons in 4 sizes */}
                  <div>
                    <span className="text-xs font-semibold text-[#8e8e93] block mb-3 uppercase tracking-wider">
                      Круглые кнопки иконок (IconButton: sm, md, lg, xl)
                    </span>
                    <div className="flex flex-wrap items-center gap-4">
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
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 2. Input Fields in Pill Form */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <OneIcon name="edit_square" size="md" className="text-oneweb-accent" />
                    2. Поля ввода (Input — Pill Form)
                  </h2>
                  <p className="text-xs text-[#8e8e93]">
                    Все текстовые инпуты строго rounded-full (h-12 или h-14), слоты иконок OneIcon, глубокий темный surface
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputSize(inputSize === 'md' ? 'lg' : 'md')}
                  >
                    Размер: {inputSize.toUpperCase()}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setInputError(!inputError)}>
                    Error: {inputError ? 'Вкл' : 'Выкл'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setInputDisabled(!inputDisabled)}>
                    Disabled: {inputDisabled ? 'Вкл' : 'Выкл'}
                  </Button>
                </div>
              </div>

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
                      error={inputError ? 'Пользователь не найден в экосистеме One' : undefined}
                      helperText="Капсульная форма rounded-full с левой иконкой"
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
                      error={inputError ? 'Неверный мастер-пароль' : undefined}
                      helperText="Кнопка глаза справа адаптирована под форму капсулы"
                      onChange={(e) => setPassVal(e.target.value)}
                      leftIcon="lock"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. Tabs / Segmented Control */}
            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <OneIcon name="tab" size="md" className="text-oneweb-accent" />
                  3. Табы и Segmented Control (Tabs)
                </h2>
                <p className="text-xs text-[#8e8e93]">
                  Контейнер rounded-full, активный элемент с объемом и цветом текста #c0ff00, поддержка режимов с иконками и без
                </p>
              </div>

              <Card>
                <CardContent className="flex flex-col gap-6">
                  {/* Mode 1: Text + OneIcon */}
                  <div>
                    <span className="text-xs font-semibold text-[#8e8e93] block mb-3 uppercase tracking-wider">
                      Режим: Текст + Иконка OneIcon
                    </span>
                    <Tabs defaultValue="server" className="w-full">
                      <TabsList size="md">
                        <TabsTrigger value="server" icon="dns">
                          Сервер
                        </TabsTrigger>
                        <TabsTrigger value="mods" icon="extension">
                          Моды
                        </TabsTrigger>
                        <TabsTrigger value="backups" icon="backup">
                          Бэкапы
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="server">
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93]">
                          Активна вкладка: Сервер (Minecraft 1.21 Fabric)
                        </div>
                      </TabsContent>
                      <TabsContent value="mods">
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93]">
                          Активна вкладка: Каталог модов (42 мода установлено)
                        </div>
                      </TabsContent>
                      <TabsContent value="backups">
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93]">
                          Активна вкладка: Резервные копии мира
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Mode 2: Text Only */}
                  <div>
                    <span className="text-xs font-semibold text-[#8e8e93] block mb-3 uppercase tracking-wider">
                      Режим: Только текст (Compact)
                    </span>
                    <Tabs defaultValue="day" className="w-full">
                      <TabsList size="sm">
                        <TabsTrigger value="day">День</TabsTrigger>
                        <TabsTrigger value="week">Неделя</TabsTrigger>
                        <TabsTrigger value="month">Месяц</TabsTrigger>
                        <TabsTrigger value="year">Все время</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 4. Badges */}
            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <OneIcon name="verified" size="md" className="text-oneweb-accent" />
                  4. Бейджи (Badge)
                </h2>
                <p className="text-xs text-[#8e8e93]">
                  Сплошные мягкие плашки-капсулы (rounded-full) без контурных рамок с аккуратным dot-индикатором
                </p>
              </div>

              <Card>
                <CardContent className="flex flex-wrap items-center gap-3">
                  <Badge variant="default" dot>Default</Badge>
                  <Badge variant="accent" dot>Accent Lime</Badge>
                  <Badge variant="success" dot>В сети (Success)</Badge>
                  <Badge variant="warning" dot>Внимание (Warning)</Badge>
                  <Badge variant="danger" dot>Ошибка (Danger)</Badge>
                  <Badge variant="accent" size="sm">NEW</Badge>
                  <Badge variant="default" size="sm">v1.1.0</Badge>
                </CardContent>
              </Card>
            </section>

            {/* 5. Select, Toast & Tooltip */}
            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <OneIcon name="menu" size="md" className="text-oneweb-accent" />
                  5. Select, Toast & Tooltip
                </h2>
                <p className="text-xs text-[#8e8e93]">
                  Выпадающие списки на Radix Select, провайдер тостов и подсказки
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Кастомный Select</CardTitle>
                    <CardDescription>Выбор инстанса сервера</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <Select value={selectedServer} onValueChange={setSelectedServer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите сервер..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Основные сервера</SelectLabel>
                          <SelectItem value="onehouse-main">OneHouse Fabric 1.21 (Основной)</SelectItem>
                          <SelectItem value="onehouse-dev">OneHouse Dev Testbed</SelectItem>
                          <SelectSeparator />
                          <SelectLabel>Служебные</SelectLabel>
                          <SelectItem value="onelaunch-auth">OneLaunch Auth Server</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Тосты и подсказки</CardTitle>
                    <CardDescription>Триггеры всплывающих сообщений</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        addToast({
                          title: 'Успешно!',
                          description: 'Действие выполнено штатно.',
                          variant: 'success',
                        })
                      }
                    >
                      Toast: Success
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        addToast({
                          title: 'Сбой!',
                          description: 'Ошибка синхронизации.',
                          variant: 'danger',
                        })
                      }
                    >
                      Toast: Danger
                    </Button>
                    <SimpleTooltip content="Подсказка в капсульном стиле">
                      <Button variant="outline" size="sm">
                        Hover Tooltip
                      </Button>
                    </SimpleTooltip>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 6. OneIcon Catalog */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <OneIcon name="category" size="md" className="text-oneweb-accent" />
                    6. Каталог OneIcon (Material Symbols Rounded)
                  </h2>
                  <p className="text-xs text-[#8e8e93]">
                    Вариативный шрифт Google Material Symbols с поддержкой fill, размеров sm/md/lg
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={iconFill ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setIconFill(!iconFill)}
                    leftIcon={<OneIcon name="format_paint" size="sm" />}
                  >
                    {iconFill ? 'Заливка' : 'Контур'}
                  </Button>
                  {(['sm', 'md', 'lg'] as const).map((sz) => (
                    <Button
                      key={sz}
                      variant={selectedIconSize === sz ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setSelectedIconSize(sz)}
                    >
                      {sz.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <CardTitle>Интерактивный каталог</CardTitle>
                    <div className="w-full sm:w-64">
                      <Input
                        placeholder="Поиск иконки..."
                        value={iconSearch}
                        onChange={(e) => setIconSearch(e.target.value)}
                        leftIcon="search"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                    {filteredIcons.map((icon) => (
                      <div
                        key={icon.name}
                        className="p-3 bg-white/[0.03] border border-white/[0.04] rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/[0.07] hover:border-white/10 transition-all group"
                      >
                        <OneIcon
                          name={icon.name}
                          size={selectedIconSize}
                          fill={iconFill}
                          className="text-white group-hover:text-oneweb-accent transition-colors"
                        />
                        <span className="text-[11px] text-[#8e8e93] group-hover:text-white font-medium truncate max-w-full text-center">
                          {icon.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        )}
      </main>

      {/* Global Floating Mobile Tab Bar (When enabled or on mobile viewports) */}
      {showGlobalMobileNav && (
        <MobileNavbar
          items={mobileNavItems}
          activeId={mobileActiveTab}
          onChange={(id) => {
            setMobileActiveTab(id);
            addToast({
              title: `Переключено на: ${id}`,
              variant: 'accent',
            });
          }}
          isFloating
        />
      )}
    </div>
  );
}

export function App() {
  return (
    <TooltipProvider>
      <ToastContainerProvider>
        <ShowcaseContent />
      </ToastContainerProvider>
    </TooltipProvider>
  );
}

export default App;
