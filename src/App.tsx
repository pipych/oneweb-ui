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

function FullShowcase() {
  const { addToast } = useToast();

  // Navigation section filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'components' | 'desktop' | 'mobile' | 'tokens'>('all');
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
  const [isFabDrawerOpen, setIsFabDrawerOpen] = useState(false);

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
    { id: 'all', label: 'Все разделы', icon: 'grid_view' },
    { id: 'components', label: 'Компоненты', icon: 'widgets' },
    { id: 'desktop', label: 'Desktop', icon: 'desktop_windows' },
    { id: 'mobile', label: 'Mobile', icon: 'smartphone' },
    { id: 'tokens', label: 'Токены', icon: 'palette' },
  ];

  const mobileDockItems = [
    { id: 'all', label: 'Витрина', icon: 'grid_view' },
    { id: 'components', label: 'Элементы', icon: 'widgets' },
    { id: 'desktop', label: 'ПК гайд', icon: 'desktop_windows' },
    { id: 'mobile', label: 'Мобайл', icon: 'smartphone' },
  ];

  return (
    <div className="min-h-screen bg-[#090b0e] text-white font-oneweb-sans pb-32 w-full max-w-full overflow-x-hidden selection:bg-oneweb-accent-subtle selection:text-oneweb-accent">
      {/* 1. Навбар (Адаптивный под мобильные экраны и десктоп) */}
      <DesktopNavbar
        variant={navbarVariant}
        title="OneWebUI"
        subtitle="OneHouse Ecosystem"
        badgeText="v1.1.0"
        items={desktopNavItems}
        activeId={activeFilter}
        onItemClick={(id) => setActiveFilter(id as any)}
        profile={{
          name: 'Alex Root',
          role: 'OneHouse Admin',
          status: 'online',
        }}
        rightSlot={
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <IconButton
              variant="secondary"
              size="sm"
              icon="notifications"
              onClick={() =>
                addToast({
                  title: 'Системный сигнал',
                  description: 'OneWebUI дизайн-система активна.',
                  variant: 'accent',
                })
              }
            />

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs h-8 sm:h-9 px-3 sm:px-4"
                  leftIcon={<OneIcon name="tune" size="sm" />}
                >
                  Опции
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Настройки витрины OneWebUI</DialogTitle>
                  <DialogDescription>
                    Переключение стиля навбара и параметров темы.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                    <div>
                      <div className="text-xs font-bold text-white">Формат навбара</div>
                      <div className="text-[11px] text-[#8e8e93]">Липкая полоса или парящая капсула</div>
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
                      Готово
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {/* Main Container с защитой от переполнения */}
      <main className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 pt-5 sm:pt-8 flex flex-col gap-8 sm:gap-12 min-w-0">
        {/* Hero Section */}
        <section className="flex flex-col gap-3 sm:gap-4 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent" size="sm" dot>
              OneHouse Benchmark
            </Badge>
            <Badge variant="default" size="sm">
              OLED Bento Aesthetics
            </Badge>
            <Badge variant="success" size="sm" dot>
              100% Mobile Ready
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white break-words">
            OneWebUI — Дизайн-система экосистемы One
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#8e8e93] max-w-3xl leading-relaxed">
            Полноценная модульная библиотека компонентов для веб-приложений экосистемы One (OneHouse, OneLaunch, OneDash).
            Построена на базе глубокой OLED-палитры, карточек Bento со скруглением <code className="text-oneweb-accent bg-white/[0.06] px-1.5 py-0.5 rounded-lg text-xs font-mono">rounded-[32px]</code>,
            капсульных контролов <code className="text-oneweb-accent bg-white/[0.06] px-1.5 py-0.5 rounded-lg text-xs font-mono">rounded-full</code> и адаптивности под любые экраны.
          </p>

          {/* Quick Filter Segmented Control Tabs */}
          <div className="w-full max-w-full overflow-hidden mt-2 p-1.5 sm:p-2 bg-[#14171c] border border-white/[0.04] rounded-full">
            <Tabs
              value={activeFilter}
              onValueChange={(val) => setActiveFilter(val as any)}
              className="w-full"
            >
              <TabsList size="sm" className="w-full flex justify-between overflow-x-auto no-scrollbar">
                <TabsTrigger value="all" className="flex-1 text-[11px] sm:text-xs">Все</TabsTrigger>
                <TabsTrigger value="components" className="flex-1 text-[11px] sm:text-xs">Компоненты</TabsTrigger>
                <TabsTrigger value="desktop" className="flex-1 text-[11px] sm:text-xs">Desktop</TabsTrigger>
                <TabsTrigger value="mobile" className="flex-1 text-[11px] sm:text-xs">Mobile</TabsTrigger>
                <TabsTrigger value="tokens" className="flex-1 text-[11px] sm:text-xs">Токены</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* ================================================================= */}
        {/* СЕКЦИЯ: ТОКЕНЫ И ШРИФТЫ (Показывается при all или tokens)         */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'tokens') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <OneIcon name="palette" size="md" className="text-oneweb-accent shrink-0" />
                  <span>1. Токены палитры и шрифты</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                  Нажмите на карточку токена для копирования CSS-переменной
                </p>
              </div>
              {copiedToken && (
                <Badge variant="accent" size="sm" dot className="self-start sm:self-auto">
                  Скопировано: {copiedToken}
                </Badge>
              )}
            </div>

            {/* Сетка токенов с защитой от переполнения: 2 колонки на мобилках */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 w-full min-w-0">
              {PALETTE_COLORS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleCopy(`var(--${color.name})`)}
                  className="bg-[#14171c] border border-white/[0.04] rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2 text-left hover:border-white/10 hover:bg-[#181c23] transition-all active:scale-95 group focus:outline-none min-w-0 w-full overflow-hidden"
                >
                  <div
                    className="w-full h-9 sm:h-12 rounded-xl border border-white/[0.04] shadow-inner shrink-0"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="min-w-0 w-full">
                    <div className="text-[11px] sm:text-xs font-semibold text-white group-hover:text-oneweb-accent truncate">
                      {color.name}
                    </div>
                    <div className="text-[10px] text-[#8e8e93] truncate">
                      {color.role}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/40 font-oneweb-mono mt-0.5 truncate">
                      {color.value}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Типографика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 min-w-0">
              <Card>
                <CardHeader>
                  <CardTitle>Wix Madefor Display</CardTitle>
                  <CardDescription>Основной интерфейсный шрифт</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p className="font-oneweb-sans text-base sm:text-lg font-bold text-white break-words">
                    Аа Бб Вв 12345
                  </p>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Чистая и контрастная типографика Apple / OLED эстетики.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Minecraft & Pixel Fonts</CardTitle>
                  <CardDescription>Игровой пиксельный стек</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p className="font-oneweb-minecraft text-xl sm:text-2xl text-oneweb-accent tracking-wider break-words">
                    ONEHOUSE FABRIC 1.21
                  </p>
                  <p className="font-oneweb-minecraft text-xs sm:text-sm text-[#8e8e93]">
                    Готов к приключениям.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monospace</CardTitle>
                  <CardDescription>Моноширинный стек консолей</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 min-w-0">
                  <code className="font-oneweb-mono text-xs text-oneweb-accent bg-white/[0.04] p-2.5 sm:p-3 rounded-2xl block border border-white/[0.03] truncate">
                    sha256: 89476ea08498adb1813b
                  </code>
                  <p className="text-xs text-[#8e8e93]">
                    Логирование, хэши и аргументы команд.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: ONEICON КАТАЛОГ (Показывается при all или tokens)        */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'tokens') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <OneIcon name="category" size="md" className="text-oneweb-accent shrink-0" />
                  <span>2. Компонент OneIcon (Material Symbols)</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                  Вариативный шрифт Google Material Symbols с поддержкой fill, размеров sm/md/lg
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant={iconFill ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setIconFill(!iconFill)}
                  leftIcon={<OneIcon name="format_paint" size="sm" />}
                  className="text-xs"
                >
                  {iconFill ? 'Заливка' : 'Контур'}
                </Button>
                {(['sm', 'md', 'lg'] as const).map((sz) => (
                  <Button
                    key={sz}
                    variant={selectedIconSize === sz ? 'primary' : 'secondary'}
                    size="sm"
                    className="text-xs px-2.5"
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
                  <CardTitle>Интерактивный каталог иконок</CardTitle>
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
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 min-w-0">
                  {filteredIcons.map((icon) => (
                    <div
                      key={icon.name}
                      className="p-3 bg-white/[0.03] border border-white/[0.04] rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/[0.07] hover:border-white/10 transition-all group min-w-0"
                    >
                      <OneIcon
                        name={icon.name}
                        size={selectedIconSize}
                        fill={iconFill}
                        className="text-white group-hover:text-oneweb-accent transition-colors"
                      />
                      <span className="text-[10px] sm:text-[11px] text-[#8e8e93] group-hover:text-white font-medium truncate max-w-full text-center">
                        {icon.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: КНОПКИ (Button, IconButton, FAB)                         */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'components') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <OneIcon name="smart_button" size="md" className="text-oneweb-accent shrink-0" />
                  <span>3. Кнопки (Button, IconButton, FAB)</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                  Все action-кнопки строго капсульной формы (rounded-full). Primary — #c0ff00 с черным текстом.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setBtnLoading(!btnLoading)}
                >
                  Loading: {btnLoading ? 'Вкл' : 'Выкл'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setBtnDisabled(!btnDisabled)}
                >
                  Disabled: {btnDisabled ? 'Вкл' : 'Выкл'}
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="flex flex-col gap-6">
                {/* 1. Pill Buttons */}
                <div>
                  <span className="text-[11px] font-bold text-[#8e8e93] block mb-3 uppercase tracking-wider">
                    Стили кнопок (Pill — rounded-full)
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
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

                {/* 2. Pure Circular IconButtons */}
                <div className="pt-4 border-t border-white/[0.04]">
                  <span className="text-[11px] font-bold text-[#8e8e93] block mb-3 uppercase tracking-wider">
                    Круглые кнопки иконок (IconButton: sm 32px, md 40px, lg 48px, xl 56px)
                  </span>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <IconButton size="sm" variant="secondary" icon="refresh" />
                      <span className="text-xs text-[#8e8e93]">sm (32px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton size="md" variant="primary" icon="bolt" />
                      <span className="text-xs text-[#8e8e93]">md (40px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton size="lg" variant="outline" icon="settings" />
                      <span className="text-xs text-[#8e8e93]">lg (48px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton size="xl" variant="danger" icon="power_settings_new" />
                      <span className="text-xs text-[#8e8e93]">xl (56px)</span>
                    </div>
                  </div>
                </div>

                {/* 3. Mobile Action Button (FAB) */}
                <div className="pt-4 border-t border-white/[0.04]">
                  <span className="text-[11px] font-bold text-[#8e8e93] block mb-3 uppercase tracking-wider">
                    Плавающая кнопка действия (Mobile Action Button / FAB)
                  </span>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                      <MobileActionButton
                        variant="circular"
                        icon="add"
                        isFloating={false}
                        onClick={() =>
                          addToast({
                            title: 'FAB нажат!',
                            description: 'Круглая кнопка действия (h-14 w-14)',
                            variant: 'accent',
                          })
                        }
                      />
                      <span className="text-xs text-[#8e8e93]">Circular FAB</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MobileActionButton
                        variant="extended"
                        icon="add"
                        label="Создать сервер"
                        isFloating={false}
                        onClick={() =>
                          addToast({
                            title: 'Создание сервера',
                            description: 'Extended FAB (h-14 px-6)',
                            variant: 'success',
                          })
                        }
                      />
                      <span className="text-xs text-[#8e8e93]">Extended FAB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: ИНПУТЫ (Pill Form Input)                                 */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'components') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <OneIcon name="edit_square" size="md" className="text-oneweb-accent shrink-0" />
                  <span>4. Поля ввода (Input — Pill Form)</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                  Форма капсулы rounded-full (h-12 и h-14), левая/правая иконка, бархатный темный surface
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputSize(inputSize === 'md' ? 'lg' : 'md')}
                >
                  Размер: {inputSize.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputError(!inputError)}
                >
                  Error: {inputError ? 'Вкл' : 'Выкл'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
              <Card>
                <CardHeader>
                  <CardTitle>Текстовое поле (Pill)</CardTitle>
                  <CardDescription>С валидацией ошибки и левой иконкой</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    label="Имя пользователя"
                    placeholder="Введите никнейм..."
                    value={inputVal}
                    disabled={inputDisabled}
                    inputSize={inputSize}
                    error={inputError ? 'Пользователь не найден в экосистеме One' : undefined}
                    helperText="Капсульная форма rounded-full"
                    onChange={(e) => setInputVal(e.target.value)}
                    leftIcon="person"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Поле пароля (Pill)</CardTitle>
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
                    helperText="Иконка глаза адаптирована под форму капсулы"
                    onChange={(e) => setPassVal(e.target.value)}
                    leftIcon="lock"
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: БЕЙДЖИ                                                   */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'components') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="verified" size="md" className="text-oneweb-accent shrink-0" />
                <span>5. Бейджи (Badge)</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                Сплошные мягкие плашки-капсулы (rounded-full) без жестких рамок с аккуратным светодиодом (dot)
              </p>
            </div>

            <Card>
              <CardContent className="flex flex-wrap items-center gap-2.5 sm:gap-3">
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
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: КАРТОЧКИ (Card — Bento Style)                            */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'components' || activeFilter === 'desktop') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="layers" size="md" className="text-oneweb-accent shrink-0" />
                <span>6. Карточки Bento (Card — Zero Dividers)</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                Скругления rounded-[32px], бархатный фон #14171c, едва заметная граница, полное отсутствие внутренних линий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 min-w-0">
              <Card variant="default">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Сервер OneHouse</CardTitle>
                    <Badge variant="success" size="sm" dot>Онлайн</Badge>
                  </div>
                  <CardDescription>Minecraft Fabric 1.21</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white/[0.03]">
                    <span className="text-[#8e8e93]">Игроки</span>
                    <span className="font-bold text-white">12 / 20</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white/[0.03]">
                    <span className="text-[#8e8e93]">Пинг</span>
                    <span className="font-bold text-emerald-400">14 ms</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" className="w-full">
                    Управление нодой
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Elevated Card</CardTitle>
                    <Badge variant="accent" size="sm">Elevated</Badge>
                  </div>
                  <CardDescription>Приподнятая поверхность #181c23</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Используется для контекстных меню, модальных карточек и акцентных плашек в Bento-сетке.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    Параметры
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Glass Panel</CardTitle>
                    <Badge variant="warning" size="sm">OLED Blur</Badge>
                  </div>
                  <CardDescription>Мягкое матовое стекло backdrop-blur-2xl</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Оптимизировано для темного фона экосистемы One. Придает интерфейсу глубину и воздушность.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Стеклянный слой
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: ДИАЛОГИ И ШТОРКИ (Dialog, Drawer / Sheet)                 */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'components') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="open_in_browser" size="md" className="text-oneweb-accent shrink-0" />
                <span>7. Диалоги и Шторки (Dialog & Drawer / Sheet)</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                Radix Dialog для центральных десктопных окон, Drawer для мобильных нижних шторок (Bottom Sheet)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
              {/* Dialog Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Модальное окно (Dialog)</CardTitle>
                  <CardDescription>Центрированное модальное окно с затемнением и анимацией</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Поддерживает закрытие по Escape, клику по оверлею и крестику.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="primary" leftIcon={<OneIcon name="visibility" size="sm" />}>
                        Открыть Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Подтверждение операции</DialogTitle>
                        <DialogDescription>
                          Применение параметров к серверному кластеру OneHouse.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-2">
                        <Input label="Имя профиля" defaultValue="Administrator" leftIcon="person" />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="primary"
                            onClick={() =>
                              addToast({
                                title: 'Сохранено',
                                description: 'Настройки успешно применены',
                                variant: 'success',
                              })
                            }
                          >
                            Сохранить
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Drawer Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Шторка снизу (Bottom Sheet)</CardTitle>
                  <CardDescription>Оптимизировано для управления смартфоном одной рукой</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Выдвигается снизу экрана с закруглением rounded-t-[32px] и свайп-индикатором.
                  </p>
                  <div className="flex items-center gap-2">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="secondary" className="flex-1" leftIcon={<OneIcon name="vertical_align_top" size="sm" />}>
                          Bottom Sheet
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent side="bottom">
                        <DrawerHeader>
                          <DrawerTitle>Мобильная шторка OneWebUI</DrawerTitle>
                          <DrawerDescription>Плавное появление снизу с индикатором свайпа</DrawerDescription>
                        </DrawerHeader>
                        <div className="py-4 flex flex-col gap-3">
                          <Input label="Быстрая команда" placeholder="say Привет миру" leftIcon="terminal" />
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03]">
                            <span className="text-xs font-bold text-white">Авторестарт ноды</span>
                            <Badge variant="success" size="sm" dot>Активен</Badge>
                          </div>
                        </div>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="primary" className="w-full">Готово</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="flex-1" leftIcon={<OneIcon name="dock_to_left" size="sm" />}>
                          Side Drawer
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent side="right">
                        <DrawerHeader>
                          <DrawerTitle>Боковая панель (Right)</DrawerTitle>
                          <DrawerDescription>Десктопная выдвижная панель справа</DrawerDescription>
                        </DrawerHeader>
                        <div className="py-4 flex flex-col gap-3">
                          <div className="p-4 rounded-2xl bg-white/[0.03] text-xs text-[#8e8e93]">
                            Параметры сессии root на 127.0.0.1
                          </div>
                        </div>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="outline" className="w-full">Закрыть</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: ТАБЫ (Tabs / Segmented Control)                           */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'components') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="tab" size="md" className="text-oneweb-accent shrink-0" />
                <span>8. Табы и переключатели (Tabs / Segmented Control)</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                Капсула rounded-full, внутренний 3D-объемный pill с лаймовым текстом #c0ff00, поддержка иконок
              </p>
            </div>

            <Card>
              <CardContent className="flex flex-col gap-6">
                <div>
                  <span className="text-[11px] font-bold text-[#8e8e93] block mb-2.5 uppercase tracking-wider">
                    Режим: Иконка OneIcon + Текст
                  </span>
                  <Tabs defaultValue="server" className="w-full">
                    <TabsList size="md" className="w-full sm:w-auto">
                      <TabsTrigger value="server" icon="dns">Сервер</TabsTrigger>
                      <TabsTrigger value="mods" icon="extension">Модпак</TabsTrigger>
                      <TabsTrigger value="settings" icon="settings">Настройки</TabsTrigger>
                    </TabsList>
                    <TabsContent value="server">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93] leading-relaxed">
                        Вкладка: Сервер (Minecraft Fabric 1.21, 12 игроков онлайн).
                      </div>
                    </TabsContent>
                    <TabsContent value="mods">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93] leading-relaxed">
                        Вкладка: Модпак (Всего 42 мода оптимизации Sodium + Lithium).
                      </div>
                    </TabsContent>
                    <TabsContent value="settings">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] text-xs text-[#8e8e93] leading-relaxed">
                        Вкладка: Системные настройки хоста.
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="pt-4 border-t border-white/[0.04]">
                  <span className="text-[11px] font-bold text-[#8e8e93] block mb-2.5 uppercase tracking-wider">
                    Режим: Только текст (Compact Segmented Control)
                  </span>
                  <Tabs defaultValue="day" className="w-full">
                    <TabsList size="sm" className="w-full sm:w-auto">
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
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: SELECT, TOAST & TOOLTIP                                   */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'components') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="menu" size="md" className="text-oneweb-accent shrink-0" />
                <span>9. Select, Toast & Tooltip</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                Кастомный выпадающий список на Radix Select, провайдер тостов и подсказки на наведении
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
              <Card>
                <CardHeader>
                  <CardTitle>Кастомный Select</CardTitle>
                  <CardDescription>Выбор опции с чекмаркой на базе Radix Select</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-[#8e8e93]">
                    Активный сервер
                  </label>
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
                  <span className="text-xs text-white/40">
                    ID: <code className="text-oneweb-accent font-oneweb-mono">{selectedServer}</code>
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toast & Tooltip</CardTitle>
                  <CardDescription>Всплывающие уведомления и подсказки при наведении</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#8e8e93] block mb-2">
                      Триггеры всплывающих тостов:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          addToast({
                            title: 'Успешно!',
                            description: 'Действие выполнено без ошибок.',
                            variant: 'success',
                          })
                        }
                      >
                        Success
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          addToast({
                            title: 'Внимание!',
                            description: 'Свободно менее 15% диска.',
                            variant: 'warning',
                          })
                        }
                      >
                        Warning
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          addToast({
                            title: 'Ошибка!',
                            description: 'Сбой соединения с сервером.',
                            variant: 'danger',
                          })
                        }
                      >
                        Danger
                      </Button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-[#8e8e93] block mb-2">
                      Подсказки при наведении:
                    </span>
                    <div className="flex items-center gap-3">
                      <SimpleTooltip content="Сгенерировать секретный токен">
                        <Button variant="outline" size="sm" leftIcon={<OneIcon name="key" size="sm" />}>
                          Hover Me
                        </Button>
                      </SimpleTooltip>
                      <SimpleTooltip content="Зеленое неоновое свечение One Lime">
                        <Badge variant="accent" size="md">
                          Hover Badge
                        </Badge>
                      </SimpleTooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* СЕКЦИЯ: ДЕСКТОПНЫЕ И МОБИЛЬНЫЕ ГАЙДЛАЙНЫ                         */}
        {/* ================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'desktop' || activeFilter === 'mobile') && (
          <section className="flex flex-col gap-4 min-w-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <OneIcon name="menu_book" size="md" className="text-oneweb-accent shrink-0" />
                <span>10. Гайдлайны: Desktop vs Mobile Architecture</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#8e8e93]">
                Строгие правила проектирования для десктопных и мобильных веб-интерфейсов экосистемы
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 min-w-0">
              {/* Desktop Guidelines Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <OneIcon name="desktop_windows" size="md" className="text-oneweb-accent" />
                    <CardTitle>Desktop Guidelines</CardTitle>
                  </div>
                  <CardDescription>Стандарты для экранов ПК и планшетов</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs text-[#8e8e93] space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <OneIcon name="check_circle" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                      <span><strong>Bento Grid Layout:</strong> строгий радиус rounded-[32px], отступы p-6 sm:p-7, объединение виджетов без рассекающих линий.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <OneIcon name="check_circle" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                      <span><strong>DesktopNavbar:</strong> верхняя липкая полоса (Sticky) или парящая капсула (Floating Pill) с профилем и онлайн-статусом.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <OneIcon name="check_circle" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                      <span><strong>Zero Dividers:</strong> полный запрет на внутренние hr и border-b/t. Группировка через мягкие блоки bg-white/[0.03].</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Mobile Guidelines Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <OneIcon name="smartphone" size="md" className="text-oneweb-accent" />
                    <CardTitle>Mobile Guidelines</CardTitle>
                  </div>
                  <CardDescription>Эргономика управления одной рукой на смартфонах</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs text-[#8e8e93] space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <OneIcon name="check_circle" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                      <span><strong>MobileNavbar Dock:</strong> плавающий нижний таб-бар rounded-full h-[68px] со скользящей активной капсулой и safe-bottom.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <OneIcon name="check_circle" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                      <span><strong>Mobile Action Button (FAB):</strong> кнопка действия в нижнем правом углу над навбаром со свечением #c0ff00.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <OneIcon name="check_circle" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                      <span><strong>Тач-таргеты 44px+:</strong> кнопки и инпуты формы rounded-full высотой h-12/h-14 для безошибочного тапа пальцем.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <OneIcon name="check_circle" size="sm" className="text-oneweb-accent shrink-0 mt-0.5" />
                      <span><strong>Bottom Sheet:</strong> замена центральных диалогов на нижние выдвижные шторки с жестом смахивания.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      {/* Floating Action Button (FAB) нависает в нижнем правом углу над навбаром */}
      <MobileActionButton
        variant="circular"
        icon="add"
        isFloating={true}
        className="fixed bottom-24 right-4 sm:right-6 z-50 shadow-[0_0_24px_rgba(192,255,0,0.5)]"
        onClick={() => setIsFabDrawerOpen(true)}
      />

      {/* Шторка быстрого действия при клике на FAB */}
      <Drawer open={isFabDrawerOpen} onOpenChange={setIsFabDrawerOpen}>
        <DrawerContent side="bottom">
          <DrawerHeader>
            <DrawerTitle>Быстрое действие OneHouse</DrawerTitle>
            <DrawerDescription>Плавающая кнопка FAB активна над навигацией</DrawerDescription>
          </DrawerHeader>
          <div className="py-3 flex flex-col gap-2.5">
            <Button
              variant="primary"
              className="w-full"
              leftIcon={<OneIcon name="add" size="sm" />}
              onClick={() => {
                setIsFabDrawerOpen(false);
                addToast({ title: 'Сервер создан!', description: 'Новый узел добавлен в сеть', variant: 'success' });
              }}
            >
              Создать новый инстанс
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              leftIcon={<OneIcon name="restart_alt" size="sm" />}
              onClick={() => {
                setIsFabDrawerOpen(false);
                addToast({ title: 'Рестарт запущен', description: 'Системный сигнал отправлен', variant: 'accent' });
              }}
            >
              Перезапустить сервер
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Отмена</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Плавающий MobileNavbar внизу экрана (автоматически на смартфонах) */}
      <div className="md:hidden">
        <MobileNavbar
          items={mobileDockItems}
          activeId={activeFilter}
          onChange={(id) => setActiveFilter(id as any)}
          isFloating={true}
        />
      </div>
    </div>
  );
}

export function App() {
  return (
    <TooltipProvider>
      <ToastContainerProvider>
        <FullShowcase />
      </ToastContainerProvider>
    </TooltipProvider>
  );
}

export default App;
