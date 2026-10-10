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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from './design-system';

export function App() {
  // Icon Showcase state
  const [iconFill, setIconFill] = useState(true);
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [searchTerm, setSearchTerm] = useState('');

  // Button state
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Input state
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [hasInputError, setHasInputError] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const paletteColors = [
    { name: 'oneweb-bg', value: '#090b0e', role: 'Default Canvas' },
    { name: 'oneweb-bg-subtle', value: '#050709', role: 'Deep Contrast' },
    { name: 'oneweb-surface', value: '#14171c', role: 'Card Base' },
    { name: 'oneweb-surface-elevated', value: '#181c23', role: 'Elevated Modal' },
    { name: 'oneweb-surface-subtle', value: '#252c37', role: 'Control Fill' },
    { name: 'oneweb-accent', value: '#c0ff00', role: 'Brand Accent Lime' },
    { name: 'oneweb-accent-hover', value: '#aee600', role: 'Accent Hover' },
    { name: 'oneweb-text-primary', value: '#ffffff', role: 'High Emphasis' },
    { name: 'oneweb-text-secondary', value: '#8e8e93', role: 'Medium Emphasis' },
    { name: 'oneweb-border', value: 'rgba(255, 255, 255, 0.10)', role: 'Default Border' },
    { name: 'oneweb-status-success', value: '#1bd96a', role: 'Success' },
    { name: 'oneweb-status-warning', value: '#fbbf24', role: 'Warning' },
    { name: 'oneweb-status-danger', value: '#ef4444', role: 'Danger / Error' },
  ];

  const radii = [
    { name: 'rounded-oneweb-sm', val: '4px' },
    { name: 'rounded-oneweb-md', val: '8px' },
    { name: 'rounded-oneweb-lg', val: '12px' },
    { name: 'rounded-oneweb-xl', val: '16px' },
    { name: 'rounded-oneweb-2xl', val: '20px' },
    { name: 'rounded-oneweb-3xl', val: '24px' },
    { name: 'rounded-oneweb-sheet', val: '32px' },
    { name: 'rounded-oneweb-full', val: '9999px' },
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
    { name: 'info', label: 'Info' },
    { name: 'bolt', label: 'Lightning' },
    { name: 'lock', label: 'Security' },
    { name: 'rocket_launch', label: 'Launch' },
  ];

  const filteredIcons = sampleIcons.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-oneweb-bg text-oneweb-text-primary font-oneweb-sans pb-24 selection:bg-oneweb-accent-subtle selection:text-oneweb-accent">
      {/* Sticky Header */}
      <header className="border-b border-oneweb-border sticky top-0 z-40 bg-oneweb-bg/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-oneweb-lg bg-oneweb-accent flex items-center justify-center font-bold text-oneweb-text-inverse text-base shadow-oneweb-accent-glow">
              1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-oneweb-text-primary">
                  OneWebUI
                </span>
                <Badge variant="accent" size="sm">
                  v1.0.0
                </Badge>
              </div>
              <p className="text-[11px] text-oneweb-text-secondary leading-none">
                Design System & Component Library (One Ecosystem)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              leftIcon={<OneIcon name="open_in_new" size="sm" />}
            >
              Открыть Dialog
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-col gap-12">
        {/* Hero Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="md" dot>
              One Ecosystem
            </Badge>
            <Badge variant="default" size="md">
              Strict Tokens Guarantee
            </Badge>
            <Badge variant="success" size="md">
              Material Symbols Rounded
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-oneweb-text-primary">
            Дизайн-система <span className="text-oneweb-accent">OneWebUI</span>
          </h1>
          <p className="text-sm sm:text-base text-oneweb-text-secondary max-w-3xl leading-relaxed">
            Автономная библиотека компонентов и дизайн-токенов для веб-приложений экосистемы One.
            Построена на базе Tailwind CSS (<code className="text-oneweb-accent bg-oneweb-surface-subtle px-1.5 py-0.5 rounded-oneweb-sm text-xs">oneweb-*</code>),
            CSS-переменных (<code className="text-oneweb-accent bg-oneweb-surface-subtle px-1.5 py-0.5 rounded-oneweb-sm text-xs">--oneweb-*</code>),
            иконках Material Symbols Rounded (<code className="text-oneweb-accent bg-oneweb-surface-subtle px-1.5 py-0.5 rounded-oneweb-sm text-xs">&lt;OneIcon /&gt;</code>) и шрифте Wix Madefor Display.
          </p>
        </section>

        {/* 1. Palette & Design Tokens */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="palette" size="md" className="text-oneweb-accent" />
                1. Токены и Палитра цветов
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Нажмите на карточку цвета, чтобы скопировать токен var(--oneweb-*)
              </p>
            </div>
            {copiedToken && (
              <Badge variant="success" size="sm">
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
                className="bg-oneweb-surface border border-oneweb-border rounded-oneweb-xl p-3 flex flex-col gap-2.5 text-left hover:border-oneweb-border-strong hover:bg-oneweb-surface-elevated transition-all active:scale-95 group focus:outline-none"
              >
                <div
                  className="w-full h-12 rounded-oneweb-lg border border-oneweb-border/40 shadow-inner"
                  style={{ backgroundColor: color.value }}
                />
                <div>
                  <div className="text-xs font-semibold text-oneweb-text-primary group-hover:text-oneweb-accent truncate">
                    {color.name}
                  </div>
                  <div className="text-[11px] text-oneweb-text-secondary truncate">
                    {color.role}
                  </div>
                  <div className="text-[10px] text-oneweb-text-muted font-oneweb-mono mt-0.5">
                    {color.value}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Radii & Shadows Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Радиусы скругления (Border Radii)</CardTitle>
                <CardDescription>
                  Токены от rounded-oneweb-sm (4px) до rounded-oneweb-full (9999px)
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2.5">
                {radii.map((r) => (
                  <div
                    key={r.name}
                    className={`bg-oneweb-surface-subtle border border-oneweb-border px-3 py-2 text-xs flex items-center justify-between gap-3 ${r.name}`}
                  >
                    <span className="font-medium text-oneweb-text-primary">{r.name}</span>
                    <span className="text-[11px] text-oneweb-accent font-oneweb-mono">{r.val}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardTitle>Тени и Свечения (Shadows & Glows)</CardTitle>
                <CardDescription>
                  Эффекты глубины и фирменное свечение One Lime Glow
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <div className="bg-oneweb-surface-subtle p-3 rounded-oneweb-xl shadow-oneweb-sm border border-oneweb-border text-center">
                  <span className="text-xs font-medium">shadow-oneweb-sm</span>
                </div>
                <div className="bg-oneweb-surface-subtle p-3 rounded-oneweb-xl shadow-oneweb-md border border-oneweb-border text-center">
                  <span className="text-xs font-medium">shadow-oneweb-md</span>
                </div>
                <div className="bg-oneweb-surface-subtle p-3 rounded-oneweb-xl shadow-oneweb-lg border border-oneweb-border text-center">
                  <span className="text-xs font-medium">shadow-oneweb-lg</span>
                </div>
                <div className="bg-oneweb-surface-subtle p-3 rounded-oneweb-xl shadow-oneweb-accent-glow border border-oneweb-border-accent text-center text-oneweb-accent font-semibold">
                  <span className="text-xs">accent-glow</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2. OneIcon Component Showcase */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="category" size="md" className="text-oneweb-accent" />
                2. Компонент OneIcon (Material Symbols Rounded)
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Переключайте заливку (fill), размер (size) и используйте живой поиск
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
                  variant={selectedSize === sz ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <Card variant="default">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle>Каталог системных иконок</CardTitle>
                <div className="w-full sm:w-64">
                  <Input
                    placeholder="Поиск иконки..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<OneIcon name="search" size="sm" />}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                {filteredIcons.map((icon) => (
                  <div
                    key={icon.name}
                    className="p-3 bg-oneweb-surface-subtle border border-oneweb-border rounded-oneweb-xl flex flex-col items-center justify-center gap-2 hover:border-oneweb-border-accent hover:bg-oneweb-surface-elevated transition-all group"
                  >
                    <OneIcon
                      name={icon.name}
                      size={selectedSize}
                      fill={iconFill}
                      className="text-oneweb-text-primary group-hover:text-oneweb-accent transition-colors"
                    />
                    <span className="text-[11px] text-oneweb-text-secondary group-hover:text-oneweb-text-primary font-medium truncate max-w-full text-center">
                      {icon.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-oneweb-text-muted">
                Рендерит &lt;span className="material-symbols-rounded"&gt;
              </span>
              <Badge variant="accent" size="sm" dot>
                Material Symbols Active
              </Badge>
            </CardFooter>
          </Card>
        </section>

        {/* 3. Button Component Showcase */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="smart_button" size="md" className="text-oneweb-accent" />
                3. Кнопки (Button)
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Все варианты (primary, secondary, outline, ghost, danger) и размеры (sm, md, lg)
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
                  Варианты отображения (MD)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                    onClick={() => setClickCount((c) => c + 1)}
                  >
                    Primary ({clickCount})
                  </Button>
                  <Button
                    variant="secondary"
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                  >
                    Secondary
                  </Button>
                  <Button
                    variant="outline"
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                  >
                    Outline
                  </Button>
                  <Button
                    variant="ghost"
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                  >
                    Ghost
                  </Button>
                  <Button
                    variant="danger"
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                  >
                    Danger
                  </Button>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-oneweb-text-secondary block mb-3 uppercase tracking-wider">
                  Кнопки с OneIcon
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    leftIcon={<OneIcon name="rocket_launch" size="sm" />}
                  >
                    Запуск сервиса
                  </Button>
                  <Button
                    variant="secondary"
                    rightIcon={<OneIcon name="arrow_forward" size="sm" />}
                  >
                    Далее
                  </Button>
                  <Button
                    variant="danger"
                    leftIcon={<OneIcon name="delete" size="sm" />}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. Input Component Showcase */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="edit_square" size="md" className="text-oneweb-accent" />
                4. Поля ввода (Input)
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Текст, пароль со встроенным Show/Hide, валидация ошибок и блокировка
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHasInputError(!hasInputError)}
              >
                Error: {hasInputError ? 'Вкл' : 'Выкл'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsInputDisabled(!isInputDisabled)}
              >
                Disabled: {isInputDisabled ? 'Вкл' : 'Выкл'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Текстовое поле</CardTitle>
                <CardDescription>Инпут со встроенной валидацией и иконкой</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  label="Имя пользователя"
                  placeholder="Введите никнейм..."
                  value={inputValue}
                  disabled={isInputDisabled}
                  error={hasInputError ? 'Поле обязательно для заполнения' : undefined}
                  helperText="Используется для авторизации в экосистеме One"
                  onChange={(e) => setInputValue(e.target.value)}
                  leftIcon={<OneIcon name="person" size="sm" />}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Поле пароля</CardTitle>
                <CardDescription>Интерактивная кнопка показа/скрытия пароля</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="password"
                  label="Мастер-пароль"
                  placeholder="••••••••"
                  value={passwordValue}
                  disabled={isInputDisabled}
                  error={hasInputError ? 'Пароль должен содержать от 8 символов' : undefined}
                  helperText="Нажмите 'Show' / 'Hide' справа от поля"
                  onChange={(e) => setPasswordValue(e.target.value)}
                  leftIcon={<OneIcon name="lock" size="sm" />}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. Badge Showcase */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="verified" size="md" className="text-oneweb-accent" />
              5. Бейджи (Badge)
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Статусные метки: default, accent, success, warning, danger
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default" dot>Default</Badge>
                <Badge variant="accent" dot>One Lime</Badge>
                <Badge variant="success" dot>В сети</Badge>
                <Badge variant="warning" dot>Внимание</Badge>
                <Badge variant="danger" dot>Ошибка</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 6. Card Showcase */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-oneweb-text-primary flex items-center gap-2">
              <OneIcon name="layers" size="md" className="text-oneweb-accent" />
              6. Карточки (Card)
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Варианты default, elevated, glass
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
                <div className="flex justify-between text-xs py-1 border-b border-oneweb-border/40">
                  <span className="text-oneweb-text-secondary">Игроки</span>
                  <span className="font-semibold text-oneweb-text-primary">8 / 20</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-oneweb-text-secondary">Пинг</span>
                  <span className="font-semibold text-oneweb-status-success">18 ms</span>
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
                  <CardTitle>Облачное хранилище</CardTitle>
                  <Badge variant="accent" size="sm">R2</Badge>
                </div>
                <CardDescription>Синхронизация ассетов</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-oneweb-text-secondary leading-relaxed">
                  Все файлы проверены и готовы к деплою в Cloudflare Pages.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" className="w-full">
                  Обновить
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Glass Panel</CardTitle>
                  <Badge variant="warning" size="sm">Blur</Badge>
                </div>
                <CardDescription>Backdrop blur эффект</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="text-xs text-oneweb-text-secondary leading-relaxed">
                  Оптимизирован для темной OLED-палитры экосистемы One.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsDialogOpen(true)}
                  leftIcon={<OneIcon name="open_in_new" size="sm" />}
                >
                  Открыть Dialog
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Interactive Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <OneIcon name="verified" size="md" className="text-oneweb-accent" />
              <DialogTitle>Настройки OneWebUI</DialogTitle>
            </div>
            <DialogClose onClose={() => setIsDialogOpen(false)} />
          </div>
          <DialogDescription>
            Модальное окно на базе токенов OneWebUI с поддержкой клавиши ESC.
          </DialogDescription>
        </DialogHeader>

        <DialogContent className="flex flex-col gap-4">
          <Input
            label="Название проекта"
            defaultValue="OneWebUI Design System"
            leftIcon={<OneIcon name="title" size="sm" />}
          />
          <Input
            label="Ключ авторизации"
            type="password"
            defaultValue="secret-key-12345"
            leftIcon={<OneIcon name="key" size="sm" />}
          />
        </DialogContent>

        <DialogFooter>
          <Button variant="outline" size="md" onClick={() => setIsDialogOpen(false)}>
            Отмена
          </Button>
          <Button variant="primary" size="md" onClick={() => setIsDialogOpen(false)}>
            Сохранить
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default App;
