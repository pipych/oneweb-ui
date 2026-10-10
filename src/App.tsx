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
  Badge,
  Input,
} from './design-system';

export function App() {
  const [iconFill, setIconFill] = useState(true);
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [searchTerm, setSearchTerm] = useState('');

  const sampleIcons = [
    { name: 'home', label: 'Home' },
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
    { name: 'search', label: 'Search' },
    { name: 'refresh', label: 'Refresh' },
  ];

  const filteredIcons = sampleIcons.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-oneweb-bg text-oneweb-text-primary p-6 sm:p-10 font-oneweb-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-oneweb-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-oneweb-xl bg-oneweb-accent text-oneweb-text-inverse font-black flex items-center justify-center text-lg shadow-oneweb-accent-glow">
              1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-oneweb-text-primary">
                  OneWebUI
                </h1>
                <Badge variant="accent" size="sm">
                  v1.0.0
                </Badge>
              </div>
              <p className="text-xs text-oneweb-text-secondary">
                Official Design System for One Ecosystem
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={iconFill ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setIconFill(!iconFill)}
              leftIcon={<OneIcon name="format_paint" size="sm" />}
            >
              Fill: {iconFill ? 'Заливка (Filled)' : 'Контур (Outlined)'}
            </Button>
          </div>
        </header>

        {/* OneIcon Showcase Section */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-oneweb-text-primary flex items-center gap-2">
                <OneIcon name="category" size="md" className="text-oneweb-accent" />
                Компонент OneIcon (Material Symbols Rounded)
              </h2>
              <p className="text-xs text-oneweb-text-secondary">
                Вариативный шрифт Google Material Symbols с поддержкой fill, размеров sm/md/lg и кастомных пикселей
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(['sm', 'md', 'lg'] as const).map((sz) => (
                <Button
                  key={sz}
                  variant={selectedSize === sz ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedSize(sz)}
                >
                  Размер {sz.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <Card variant="default">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Каталог системных иконок</CardTitle>
                <div className="w-64">
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

        {/* Design System Primitives */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-oneweb-text-primary flex items-center gap-2">
            <OneIcon name="widgets" size="md" className="text-oneweb-accent" />
            Интеграция с примитивами OneWebUI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Кнопки с OneIcon</CardTitle>
                  <Badge variant="success" size="sm">
                    Ready
                  </Badge>
                </div>
                <CardDescription>Поддержка leftIcon и rightIcon</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                <Button
                  variant="primary"
                  leftIcon={<OneIcon name="rocket_launch" size="sm" />}
                >
                  Запуск сервера
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<OneIcon name="sync" size="sm" />}
                >
                  Синхронизация
                </Button>
                <Button
                  variant="danger"
                  leftIcon={<OneIcon name="delete" size="sm" />}
                >
                  Удалить слот
                </Button>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Статусные бейджи</CardTitle>
                  <Badge variant="accent" size="sm">
                    One Lime
                  </Badge>
                </div>
                <CardDescription>С пульсирующим dot-индикатором</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="default" dot>Ожидание</Badge>
                <Badge variant="accent" dot>Акцент</Badge>
                <Badge variant="success" dot>В сети</Badge>
                <Badge variant="warning" dot>Внимание</Badge>
                <Badge variant="danger" dot>Ошибка</Badge>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Поля ввода</CardTitle>
                  <Badge variant="default" size="sm">
                    Input
                  </Badge>
                </div>
                <CardDescription>С иконками поиска и пароля</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Input
                  label="API Токен"
                  placeholder="Введите ключ..."
                  leftIcon={<OneIcon name="key" size="sm" />}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
