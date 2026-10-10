import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Icon } from '@one/web-ui';

export const TokensPage: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const colorTokens = [
    { name: 'bg-base', cssVar: '--oneweb-bg', hex: '#090b0e', role: 'Основной фон (Canvas)' },
    { name: 'surface', cssVar: '--oneweb-surface', hex: '#14171c', role: 'Карточка / Поверхность' },
    { name: 'surface-elevated', cssVar: '--oneweb-surface-elevated', hex: '#181c23', role: 'Приподнятая поверхность' },
    { name: 'surface-subtle', cssVar: '--oneweb-surface-subtle', hex: '#252c37', role: 'Контрол / Поле ввода' },
    { name: 'surface-glass', cssVar: '--oneweb-surface-glass', hex: 'rgba(20, 23, 28, 0.94)', role: 'Стекло с эффектом блюра' },
    { name: 'accent', cssVar: '--oneweb-accent', hex: '#c0ff00', role: 'Фирменный акцент (One Lime)', isLight: true },
    { name: 'accent-hover', cssVar: '--oneweb-accent-hover', hex: '#aee600', role: 'Ховер акцента', isLight: true },
    { name: 'accent-subtle', cssVar: '--oneweb-accent-subtle', hex: 'rgba(192, 255, 0, 0.15)', role: 'Тинт акцента (15%)' },
    { name: 'text-muted', cssVar: '--oneweb-text-muted', hex: '#8e8e93', role: 'Вторичный текст' },
    { name: 'border-subtle', cssVar: '--oneweb-border-subtle', hex: 'rgba(255, 255, 255, 0.04)', role: 'Тонкая граница' },
    { name: 'border', cssVar: '--oneweb-border', hex: 'rgba(255, 255, 255, 0.10)', role: 'Стандартная граница' },
    { name: 'status-success', cssVar: '--oneweb-status-success', hex: '#1bd96a', role: 'Статус: Успех' },
    { name: 'status-warning', cssVar: '--oneweb-status-warning', hex: '#fbbf24', role: 'Статус: Предупреждение' },
    { name: 'status-danger', cssVar: '--oneweb-status-danger', hex: '#ef4444', role: 'Статус: Ошибка' },
  ];

  const radiusTokens = [
    { name: 'min (12px)', value: '12px (Минимум в системе)', class: 'rounded-xl', usage: 'Тултипы, мелкие меню' },
    { name: 'xl (16px)', value: '16px', class: 'rounded-2xl', usage: 'Выпадающие списки' },
    { name: '2xl (20px)', value: '20px', class: 'rounded-[20px]', usage: 'Модальные меню' },
    { name: 'card (28px)', value: '28px', class: 'rounded-[28px]', usage: 'Карточки, контейнеры, виджеты' },
    { name: 'sheet (32px)', value: '32px', class: 'rounded-[32px]', usage: 'Модальные диалоги, шторки' },
    { name: 'full (Pill)', value: '9999px', class: 'rounded-full', usage: 'Кнопки, Инпуты, Табы, Бейджи, FAB' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Дизайн-токены OneWebUI
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Централизованная спецификация стилей OneHouse. Кликните по значению, чтобы скопировать в буфер.
        </p>
      </div>

      {/* Strict Radius Banner */}
      <div className="p-5 rounded-[28px] bg-oneweb-accent/10 border border-oneweb-border-accent flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-oneweb-accent flex items-center justify-center text-oneweb-text-inverse shrink-0">
          <Icon name="verified" size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Жесткое правило: Никаких острых углов</h3>
          <p className="text-xs text-oneweb-text-secondary leading-relaxed">
            Минимальный радиус в системе составляет <strong>12px</strong> (запрещены <code className="text-oneweb-accent font-mono">rounded-none, rounded-sm, rounded-md</code>).
            Все кнопки, поля ввода, табы и бейджи имеют строгую форму капсулы (<strong>rounded-full</strong>).
            Карточки и контейнеры имеют скругление <strong>28px</strong>, диалоги — <strong>32px</strong>.
          </p>
        </div>
      </div>

      {/* Color Palette */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Палитра цветов</CardTitle>
            <Badge variant="accent">Strict Guarantee</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorTokens.map((token) => (
              <div
                key={token.name}
                onClick={() => copyToClipboard(token.hex, token.name)}
                className="group p-3.5 rounded-2xl bg-oneweb-surface-subtle border border-oneweb-border-subtle hover:border-oneweb-accent/50 cursor-pointer transition-all flex items-center gap-3.5"
              >
                <div
                  className="w-12 h-12 rounded-xl border border-white/10 shrink-0 shadow-inner flex items-center justify-center text-xs font-bold font-mono"
                  style={{
                    backgroundColor: token.hex,
                    color: token.isLight ? '#090b0e' : '#ffffff',
                  }}
                >
                  {copiedKey === token.name ? <Icon name="check" size={20} /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-oneweb-accent transition-colors">
                      {token.name}
                    </span>
                    <span className="font-mono text-[11px] text-oneweb-text-secondary">
                      {token.hex}
                    </span>
                  </div>
                  <p className="text-xs text-oneweb-text-secondary truncate mt-0.5">
                    {token.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Radii Grid */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Радиусы скругления (Border Radius)</CardTitle>
            <Badge variant="accent">Min 12px & Pill</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {radiusTokens.map((r) => (
              <div
                key={r.name}
                className="p-5 bg-oneweb-surface-subtle border border-oneweb-border-subtle rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white">{r.name}</span>
                  <span className="text-[11px] font-mono text-oneweb-accent">{r.class}</span>
                </div>

                <div
                  className={`w-full h-14 bg-oneweb-accent/15 border-2 border-oneweb-accent flex items-center justify-center font-mono text-xs font-bold text-oneweb-accent ${r.class}`}
                >
                  {r.value}
                </div>

                <p className="text-xs text-oneweb-text-secondary">{r.usage}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Типографика: Wix Madefor Display</CardTitle>
            <Badge variant="default">Google Font</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-5 rounded-2xl bg-oneweb-surface-subtle border border-oneweb-border-subtle space-y-3">
            <div className="flex items-baseline justify-between border-b border-oneweb-border-subtle pb-2">
              <span className="text-xs font-mono text-oneweb-text-secondary">font-bold (700)</span>
              <span className="text-2xl font-bold text-white">Шрифт Wix Madefor Display 700</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-oneweb-border-subtle pb-2">
              <span className="text-xs font-mono text-oneweb-text-secondary">font-semibold (600)</span>
              <span className="text-xl font-semibold text-white">Интерфейс экосистемы One 600</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-oneweb-border-subtle pb-2">
              <span className="text-xs font-mono text-oneweb-text-secondary">font-medium (500)</span>
              <span className="text-base font-medium text-white">Кнопки, вкладки и навигация 500</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-mono text-oneweb-text-secondary">font-normal (400)</span>
              <span className="text-sm text-oneweb-text-secondary">Основной текст описаний и параграфов 400</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
