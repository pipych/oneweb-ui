import React, { useState } from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent, Icon, Switch } from '@one/web-ui';

export const ButtonsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Кнопки (Button)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Интерактивный элемент действия со всеми фирменными вариантами OneWebUI.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center gap-6 p-4 rounded-oneweb-xl bg-oneweb-surface border border-oneweb-border-subtle">
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch checked={loading} onCheckedChange={setLoading} />
          <span className="text-sm font-medium text-white">Режим загрузки (isLoading)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
          <span className="text-sm font-medium text-white">Отключено (disabled)</span>
        </label>
      </div>

      {/* Variants Showcase */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Варианты (Variants)</CardTitle>
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
          <div className="rounded-oneweb-lg bg-black/60 border border-oneweb-border-strong p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
            <pre>
              &lt;<span className="text-blue-400">Button</span> variant=<span className="text-emerald-400">"primary"</span> size=<span className="text-emerald-400">"md"</span> leftIcon=&#123;&lt;<span className="text-blue-400">Icon</span> name=<span className="text-emerald-400">"bolt"</span> /&gt;&#125;&gt;{'\n'}
              {'  '}Сохранить настройки{'\n'}
              &lt;/<span className="text-blue-400">Button</span>&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
