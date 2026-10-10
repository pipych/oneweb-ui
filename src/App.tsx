import React, { useState } from 'react';
import {
  OneIcon,
  Button,
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

function ShowcaseContent() {
  const { addToast } = useToast();

  // 1. Icon & Palette states
  const [iconFill, setIconFill] = useState(true);
  const [selectedIconSize, setSelectedIconSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [iconSearch, setIconSearch] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // 2. Button states
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [buttonClicks, setButtonClicks] = useState(0);

  // 3. Input states
  const [inputVal, setInputVal] = useState('one_admin');
  const [passVal, setPassVal] = useState('supersecret123');
  const [inputError, setInputError] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  // 4. Select state
  const [selectedServer, setSelectedServer] = useState('onehouse-main');

  // Copy helper
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

  const filteredIcons = sampleIcons.filter((i) =>
    i.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
    i.label.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-oneweb-bg text-oneweb-text-primary font-oneweb-sans pb-28 selection:bg-oneweb-accent-subtle selection:text-oneweb-accent">
      {/* 1. Header */}
      <header className="border-b border-white/[0.04] sticky top-0 z-40 bg-[#090b0e]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-oneweb-accent flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(192,255,0,0.4)] select-none">
              1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  OneWebUI
                </span>
                <Badge variant="accent" size="sm">
                  v1.0.0
                </Badge>
              </div>
              <p className="text-[11px] text-[#8e8e93] leading-none">
                Design System for One Ecosystem
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SimpleTooltip content="Нажмите для вызова тестового тоста">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addToast({
                    title: 'Системное событие',
                    description: 'OneWebUI дизайн-система инициализирована.',
                    variant: 'accent',
                  })
                }
                leftIcon={<OneIcon name="notifications" size="sm" />}
              >
                Тест Toast
              </Button>
            </SimpleTooltip>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<OneIcon name="open_in_new" size="sm" />}
                >
                  Открыть Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Настройки OneWebUI</DialogTitle>
                  <DialogDescription>
                    Модальное окно на базе Radix Dialog с поддержкой Escape, анимации и крестика закрытия.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-2">
                  <Input label="Имя профиля" defaultValue="Administrator" leftIcon="person" />
                  <Input label="Пароль доступа" type="password" defaultValue="secret_token" leftIcon="lock" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" size="md">Отмена</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() =>
                        addToast({
                          title: 'Сохранено',
                          description: 'Параметры профиля обновлены',
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
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-col gap-12">
        {/* Hero Section */}
        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent" size="md" dot>
              One Ecosystem
            </Badge>
            <Badge variant="default" size="md">
              10 Radix Core Primitives
            </Badge>
            <Badge variant="success" size="md">
              Zero Arbitrary CSS
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-oneweb-text-primary">
            OneWebUI — Design System for One Ecosystem
          </h1>
          <p className="text-sm sm:text-base text-oneweb-text-secondary max-w-3xl leading-relaxed">
            Полноценная модульная библиотека компонентов, дизайн-токенов и иконок для всех веб-приложений экосистемы One.
            Построена на базе строгого Tailwind-неймспейса <code className="text-oneweb-accent bg-oneweb-surface-subtle px-1.5 py-0.5 rounded-oneweb-sm text-xs">oneweb-*</code>,
            доступных Radix UI примитивов и вариативных шрифтов.
          </p>
        </section>

        {/* 1. Palette & Typography */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="palette" size="md" className="text-oneweb-accent" />
                1. Токены палитры и шрифты
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Нажмите на токен, чтобы скопировать имя CSS-переменной
              </p>
            </div>
            {copiedToken && (
              <Badge variant="success" size="sm">
                Скопировано: {copiedToken}
              </Badge>
            )}
          </div>

          {/* Color Tokens Grid */}
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

          {/* Typography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <Card>
              <CardHeader>
                <CardTitle>Wix Madefor Display</CardTitle>
                <CardDescription>Основной шрифт интерфейса (font-oneweb-sans)</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="font-oneweb-sans text-lg font-bold text-oneweb-text-primary">
                  Аа Бб Вв 12345
                </p>
                <p className="font-oneweb-sans text-xs text-oneweb-text-secondary leading-relaxed">
                  Чистая современная типографика Apple / OLED эстетики.
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
                  MINECRAFT FABRIC 1.21
                </p>
                <p className="font-oneweb-minecraft text-sm text-oneweb-text-secondary">
                  Ready for adventure in OneHouse.
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
                <p className="text-xs text-oneweb-text-secondary">
                  Используется для консолей, хэшей и кодовых блоков.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2. OneIcon Component */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="category" size="md" className="text-oneweb-accent" />
                2. Компонент OneIcon (Material Symbols Rounded)
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Вариативный шрифт Google Material Symbols с поддержкой fill, размеров sm/md/lg и кастомных пикселей
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={iconFill ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setIconFill(!iconFill)}
                leftIcon={<OneIcon name="format_paint" size="sm" />}
              >
                {iconFill ? 'Заливка (Filled)' : 'Контур (Outlined)'}
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

          <Card variant="default">
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

        {/* 3. Button Component */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="smart_button" size="md" className="text-oneweb-accent" />
                3. Кнопки (Button)
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Варианты primary на #c0ff00, secondary, outline, ghost, danger; размеры sm, md, lg; loading & disabled states
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
              <div>
                <span className="text-xs font-semibold text-oneweb-text-secondary block mb-3 uppercase tracking-wider">
                  Варианты стиля (MD)
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

              <div>
                <span className="text-xs font-semibold text-oneweb-text-secondary block mb-3 uppercase tracking-wider">
                  Размеры и иконки
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm" leftIcon={<OneIcon name="bolt" size="sm" />}>
                    Small (sm)
                  </Button>
                  <Button variant="secondary" size="md" leftIcon={<OneIcon name="rocket_launch" size="sm" />}>
                    Medium (md)
                  </Button>
                  <Button variant="outline" size="lg" rightIcon={<OneIcon name="arrow_forward" size="sm" />}>
                    Large (lg)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. Input Component */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="edit_square" size="md" className="text-oneweb-accent" />
                4. Поля ввода (Input)
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Текст, пароль со встроенным переключателем Show/Hide, OneIcon слева/справа, состояния ошибки и блокировки
              </p>
            </div>
            <div className="flex items-center gap-2">
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
                <CardTitle>Текстовое поле</CardTitle>
                <CardDescription>С валидацией ошибки и левой иконкой</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  label="Имя пользователя"
                  placeholder="Введите никнейм..."
                  value={inputVal}
                  disabled={inputDisabled}
                  error={inputError ? 'Пользователь не найден в экосистеме One' : undefined}
                  helperText="Поддерживает OneIcon через проп leftIcon"
                  onChange={(e) => setInputVal(e.target.value)}
                  leftIcon="person"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Поле пароля</CardTitle>
                <CardDescription>Встроенный переключатель видимости</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="password"
                  label="Мастер-пароль"
                  placeholder="••••••••"
                  value={passVal}
                  disabled={inputDisabled}
                  error={inputError ? 'Неверный мастер-пароль' : undefined}
                  helperText="Нажмите на глаз справа для показа пароля"
                  onChange={(e) => setPassVal(e.target.value)}
                  leftIcon="lock"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. Badge Component */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="verified" size="md" className="text-oneweb-accent" />
              5. Бейджи (Badge)
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Варианты: default, accent (#c0ff00), success, warning, danger с опциональным dot-индикатором
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default" dot>Default</Badge>
                <Badge variant="accent" dot>Accent Lime</Badge>
                <Badge variant="success" dot>В сети (Success)</Badge>
                <Badge variant="warning" dot>Внимание (Warning)</Badge>
                <Badge variant="danger" dot>Ошибка (Danger)</Badge>
                <Badge variant="accent" size="sm">NEW</Badge>
                <Badge variant="default" size="sm">v1.0.0</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 6. Card Component */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="layers" size="md" className="text-oneweb-accent" />
              6. Карточки (Card)
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              CardHeader, CardTitle, CardDescription, CardContent, CardFooter; варианты default, elevated, glass
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Сервер OneHouse</CardTitle>
                  <Badge variant="success" size="sm" dot>Онлайн</Badge>
                </div>
                <CardDescription>Minecraft Fabric 1.21</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white/[0.03]">
                  <span className="text-[#8e8e93]">Игроки</span>
                  <span className="font-semibold text-white">12 / 20</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white/[0.03]">
                  <span className="text-[#8e8e93]">Пинг</span>
                  <span className="font-semibold text-emerald-400">14 ms</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm" className="w-full">
                  Управление
                </Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Elevated Card</CardTitle>
                  <Badge variant="accent" size="sm">Elevated</Badge>
                </div>
                <CardDescription>Повышенная тень shadow-oneweb-lg</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-oneweb-text-secondary leading-relaxed">
                  Поверхность для модальных карточек и выпадающих меню.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" className="w-full">
                  Действие
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Glass Panel</CardTitle>
                  <Badge variant="warning" size="sm">Blur</Badge>
                </div>
                <CardDescription>Полупрозрачное стекло backdrop-blur-xl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-oneweb-text-secondary leading-relaxed">
                  Оптимизировано для темной OLED-палитры экосистемы One.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Стекло
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 7. Dialog Component */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="open_in_browser" size="md" className="text-oneweb-accent" />
              7. Модальное окно (Dialog)
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Radix Dialog: затемнение фона, блюр, плавное появление, закрытие по Escape и клику вне окна
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
              <div>
                <h3 className="text-sm font-bold text-oneweb-text-primary">
                  Интерактивное модальное окно
                </h3>
                <p className="text-xs text-oneweb-text-secondary">
                  Полнофункциональный диалог с подтверждением действия
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="primary" leftIcon={<OneIcon name="visibility" size="sm" />}>
                    Открыть модальное окно
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Подтверждение операции</DialogTitle>
                    <DialogDescription>
                      Вы уверены, что хотите применить новые настройки дизайн-системы?
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-xs text-oneweb-text-secondary leading-relaxed">
                    Все компоненты будут немедленно перерисованы с использованием токенов OneWebUI.
                  </p>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="primary"
                        onClick={() =>
                          addToast({
                            title: 'Операция выполнена',
                            description: 'Настройки успешно применены.',
                            variant: 'success',
                          })
                        }
                      >
                        Применить
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>

        {/* 8. Drawer / Sheet Component */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="dock_to_bottom" size="md" className="text-oneweb-accent" />
              8. Шторка (Drawer / Sheet)
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Шторка снизу для мобильных экранов (Bottom Sheet) и панель сбоку для десктопа (Side Drawer)
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
              <div>
                <h3 className="text-sm font-bold text-oneweb-text-primary">
                  Выдвижные шторки и панели
                </h3>
                <p className="text-xs text-oneweb-text-secondary">
                  Выберите ориентацию появления шторки
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Bottom Sheet */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="secondary" leftIcon={<OneIcon name="vertical_align_top" size="sm" />}>
                      Шторка снизу (Bottom)
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent side="bottom">
                    <DrawerHeader>
                      <DrawerTitle>Мобильная шторка (Bottom Sheet)</DrawerTitle>
                      <DrawerDescription>
                        Плавное появление снизу с индикатором свайпа.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="py-4 flex flex-col gap-3">
                      <Input label="Быстрая команда" placeholder="say Привет миру" leftIcon="terminal" />
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                        <span className="text-xs font-semibold text-white">Авторестарт</span>
                        <Badge variant="success" size="sm" dot>Включен</Badge>
                      </div>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="primary" className="w-full">Готово</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                {/* Right Drawer */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="primary" leftIcon={<OneIcon name="dock_to_left" size="sm" />}>
                      Панель сбоку (Right)
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent side="right">
                    <DrawerHeader>
                      <DrawerTitle>Боковая панель (Side Drawer)</DrawerTitle>
                      <DrawerDescription>
                        Десктопная выдвижная панель справа.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="py-4 flex flex-col gap-4">
                      <div className="p-4 bg-white/[0.03] border border-white/[0.04] rounded-2xl flex flex-col gap-2">
                        <span className="text-xs font-bold text-white">Параметры сессии</span>
                        <span className="text-xs text-[#8e8e93]">Пользователь: root</span>
                        <span className="text-xs text-[#8e8e93]">IP: 127.0.0.1</span>
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
        </section>

        {/* 9. Tabs Component */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="tab" size="md" className="text-oneweb-accent" />
              9. Табы (Tabs — Segmented Control)
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              TabsList, TabsTrigger, TabsContent в стиле Segmented Control на базе Radix Tabs
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="overview">
                    <OneIcon name="dashboard" size="sm" className="mr-1.5" />
                    Обзор
                  </TabsTrigger>
                  <TabsTrigger value="components">
                    <OneIcon name="widgets" size="sm" className="mr-1.5" />
                    Компоненты
                  </TabsTrigger>
                  <TabsTrigger value="tokens">
                    <OneIcon name="palette" size="sm" className="mr-1.5" />
                    Токены
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <OneIcon name="settings" size="sm" className="mr-1.5" />
                    Настройки
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="p-5 bg-white/[0.03] border border-white/[0.04] rounded-2xl mt-4 flex flex-col gap-2">
                    <h4 className="text-sm font-bold text-white">Вкладка: Обзор экосистемы</h4>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Экосистема One включает сервер Minecraft OneHouse, лаунчер OneLaunch и дизайн-систему OneWebUI.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="components">
                  <div className="p-5 bg-white/[0.03] border border-white/[0.04] rounded-2xl mt-4 flex flex-col gap-2">
                    <h4 className="text-sm font-bold text-white">Вкладка: 10 компонентов</h4>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Button, Card, Input, Badge, Dialog, Drawer, Tabs, Select, Toast, Tooltip.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tokens">
                  <div className="p-5 bg-white/[0.03] border border-white/[0.04] rounded-2xl mt-4 flex flex-col gap-2">
                    <h4 className="text-sm font-bold text-white">Вкладка: Дизайн-токены</h4>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Все переменные доступны через Tailwind класс oneweb-* или CSS var(--oneweb-*).
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="p-5 bg-white/[0.03] border border-white/[0.04] rounded-2xl mt-4 flex flex-col gap-2">
                    <h4 className="text-sm font-bold text-white">Вкладка: Настройки</h4>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Конфигурация темной OLED-палитры и вариативных шрифтов.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* 10. Select, Toast & Tooltip Components */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="menu" size="md" className="text-oneweb-accent" />
              10. Select, Toast & Tooltip
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Выпадающий список на Radix Select, провайдер тостов и подсказки на наведении
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Select Dropdown */}
            <Card>
              <CardHeader>
                <CardTitle>Кастомный Select</CardTitle>
                <CardDescription>Выбор опции с чекмаркой на Radix UI</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-oneweb-text-secondary">
                  Выберите сервер
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
                      <SelectItem value="cloudflare-r2">Cloudflare R2 Modpack Storage</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <span className="text-xs text-oneweb-text-muted">
                  Выбранный ID: <code className="text-oneweb-accent font-oneweb-mono">{selectedServer}</code>
                </span>
              </CardContent>
            </Card>

            {/* Toast & Tooltip Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Toast & Tooltip</CardTitle>
                <CardDescription>Всплывающие уведомления и подсказки при наведении</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div>
                  <span className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                    Триггеры всплывающих уведомлений (Toast):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        addToast({
                          title: 'Успешно!',
                          description: 'Операция завершена штатно.',
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
                          description: 'Сбой подключения к сервису.',
                          variant: 'danger',
                        })
                      }
                    >
                      Danger
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                    Подсказки при наведении (Tooltip):
                  </span>
                  <div className="flex items-center gap-3">
                    <SimpleTooltip content="Подсказка: Сгенерировать новый ключ">
                      <Button variant="outline" size="sm" leftIcon={<OneIcon name="key" size="sm" />}>
                        Hover Me
                      </Button>
                    </SimpleTooltip>
                    <SimpleTooltip content="Зеленая неоновая подсветка One Lime">
                      <Badge variant="accent" size="md">
                        Hover Badge
                      </Badge>
                    </SimpleTooltip>
                    <SimpleTooltip content="Иконка настроек экосистемы">
                      <div className="w-10 h-10 bg-white/[0.05] border border-white/[0.04] rounded-full cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-center">
                        <OneIcon name="settings" size="sm" />
                      </div>
                    </SimpleTooltip>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
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
