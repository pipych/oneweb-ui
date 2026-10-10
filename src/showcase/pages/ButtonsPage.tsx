import React, { useState } from 'react';
import { Button, IconButton, Card, CardHeader, CardTitle, CardContent, Icon, Switch, Badge } from '@one/web-ui';

export const ButtonsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">Strict Pill (rounded-full)</Badge>
          <Badge variant="neutral">No Borders (border-none)</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Кнопки (Button & IconButton)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Интерактивные элементы действия в строгой форме капсулы (<strong>rounded-full</strong>) без исключений и без обводок.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-oneweb-surface">
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch checked={loading} onCheckedChange={setLoading} />
          <span className="text-sm font-medium text-white">Режим загрузки (isLoading)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
          <span className="text-sm font-medium text-white">Отключено (disabled)</span>
        </label>
      </div>

      {/* Button Variants Showcase */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Текстовые кнопки (Button — rounded-full)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="bolt" size={18} />}
            >
              Primary (One Lime)
            </Button>

            <Button
              variant="secondary"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="tune" size={18} />}
            >
              Secondary
            </Button>

            <Button
              variant="outline"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="crop_square" size={18} />}
            >
              Outline
            </Button>

            <Button
              variant="ghost"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="visibility" size={18} />}
            >
              Ghost
            </Button>

            <Button
              variant="danger"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="delete" size={18} />}
            >
              Danger
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Circular IconButtons Showcase */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Круглые иконочные кнопки (IconButton — rounded-full)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <IconButton
              variant="primary"
              size="lg"
              isLoading={loading}
              disabled={disabled}
              aria-label="Запуск"
            >
              <Icon name="bolt" size={24} />
            </IconButton>

            <IconButton
              variant="surface"
              size="lg"
              isLoading={loading}
              disabled={disabled}
              aria-label="Настройки"
            >
              <Icon name="tune" size={24} />
            </IconButton>

            <IconButton
              variant="secondary"
              size="md"
              isLoading={loading}
              disabled={disabled}
              aria-label="Добавить"
            >
              <Icon name="add" size={20} />
            </IconButton>

            <IconButton
              variant="outline"
              size="md"
              isLoading={loading}
              disabled={disabled}
              aria-label="Поиск"
            >
              <Icon name="search" size={20} />
            </IconButton>

            <IconButton
              variant="ghost"
              size="sm"
              isLoading={loading}
              disabled={disabled}
              aria-label="Избранное"
            >
              <Icon name="star" size={18} />
            </IconButton>

            <IconButton
              variant="danger"
              size="sm"
              isLoading={loading}
              disabled={disabled}
              aria-label="Удалить"
            >
              <Icon name="delete" size={18} />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      {/* Sizes Showcase */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Размеры (Sizes)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <Button
              variant="primary"
              size="sm"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="add" size={16} />}
            >
              Размер SM (32px)
            </Button>

            <Button
              variant="primary"
              size="md"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="add" size={18} />}
            >
              Размер MD (40px)
            </Button>

            <Button
              variant="primary"
              size="lg"
              isLoading={loading}
              disabled={disabled}
              leftIcon={<Icon name="add" size={20} />}
            >
              Размер LG (48px)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage code */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Пример использования</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl bg-black/60 p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
            <pre>
              <span className="text-oneweb-accent">import</span> &#123; Button, IconButton, Icon &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
              <span className="text-gray-500">// Кнопка Pill</span>{'\n'}
              &lt;<span className="text-blue-400">Button</span> variant=<span className="text-emerald-400">"primary"</span> size=<span className="text-emerald-400">"md"</span>&gt;Сохранить&lt;/<span className="text-blue-400">Button</span>&gt;{'\n\n'}
              <span className="text-gray-500">// Круглая кнопка</span>{'\n'}
              &lt;<span className="text-blue-400">IconButton</span> variant=<span className="text-emerald-400">"surface"</span> size=<span className="text-emerald-400">"lg"</span>&gt;{'\n'}
              {'  '}&lt;<span className="text-blue-400">Icon</span> name=<span className="text-emerald-400">"tune"</span> size=&#123;24&#125; /&gt;{'\n'}
              &lt;/<span className="text-blue-400">IconButton</span>&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
