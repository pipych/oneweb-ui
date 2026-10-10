import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Icon } from '@one/web-ui';
import { type PageId } from '../layouts/Sidebar';

interface OverviewPageProps {
  onNavigate: (page: PageId) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-oneweb-surface to-oneweb-surface-elevated border border-oneweb-border-strong p-8 sm:p-12">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-oneweb-accent/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="accent" dot>Официальная библиотека</Badge>
            <Badge variant="default">Экосистема One</Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            One<span className="text-oneweb-accent">WebUI</span>
          </h1>

          <p className="text-base sm:text-lg text-oneweb-text-secondary leading-relaxed">
            Модульная дизайн-система и библиотека React-компонентов. Строгие правила: 
            форма <strong className="text-white">Pill (rounded-full)</strong> для кнопок и инпутов, 
            скругление <strong className="text-white">28px</strong> для карточек и мобильная кнопка <strong className="text-oneweb-accent">FAB</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Icon name="explore" size={20} />}
              onClick={() => onNavigate('buttons')}
            >
              Смотреть компоненты
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Icon name="touch_app" size={20} />}
              onClick={() => onNavigate('fab')}
            >
              Mobile FAB
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Icon name="palette" size={20} />}
              onClick={() => onNavigate('tokens')}
            >
              Дизайн-токены
            </Button>
          </div>
        </div>
      </div>

      {/* Core Brand Tokens Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Icon name="palette" className="text-oneweb-accent" />
            Базовая палитра OneHouse
          </h2>
          <button
            onClick={() => onNavigate('tokens')}
            className="text-xs text-oneweb-accent hover:underline flex items-center gap-1 cursor-pointer"
          >
            Все токены <Icon name="arrow_forward" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'bg-base', value: '#090b0e', label: 'Холст' },
            { name: 'surface', value: '#14171c', label: 'Карточки' },
            { name: 'surface-elevated', value: '#181c23', label: 'Панели' },
            { name: 'accent (Lime)', value: '#c0ff00', label: 'Акцент', textColor: '#090b0e' },
            { name: 'text-muted', value: '#8e8e93', label: 'Подписи' },
            { name: 'border-subtle', value: 'rgba(255,255,255,0.04)', label: 'Границы' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-oneweb-surface border border-oneweb-border-subtle flex flex-col justify-between h-28"
            >
              <div
                className="w-full h-8 rounded-xl border border-white/10 flex items-center justify-center font-mono text-[11px] font-bold"
                style={{
                  backgroundColor: item.value,
                  color: item.textColor || '#ffffff',
                }}
              >
                {item.value}
              </div>
              <div className="pt-2">
                <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                <p className="text-[11px] text-oneweb-text-secondary">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="default">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-oneweb-accent/15 border border-oneweb-border-accent flex items-center justify-center text-oneweb-accent mb-2">
              <Icon name="straighten" size={24} />
            </div>
            <CardTitle>Strict Pill & 28px Radii</CardTitle>
            <CardDescription>
              Все кнопки и инпуты — строгие капсулы (rounded-full). Карточки — rounded-[28px]. Никаких углов меньше 12px.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="default">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-oneweb-accent/15 border border-oneweb-border-accent flex items-center justify-center text-oneweb-accent mb-2">
              <Icon name="touch_app" size={24} />
            </div>
            <CardTitle>MobileActionBtn (FAB)</CardTitle>
            <CardDescription>
              Мобильная плавающая круглая кнопка, зафиксированная строго над нижним баром (fixed right-4 bottom-24, md:hidden).
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="default">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-oneweb-accent/15 border border-oneweb-border-accent flex items-center justify-center text-oneweb-accent mb-2">
              <Icon name="bolt" size={24} />
            </div>
            <CardTitle>Cloudflare Pages</CardTitle>
            <CardDescription>
              Собрано для домена <code className="text-white font-mono text-xs">webui.onelaunch.pp.ua</code> с нулевым runtime overhead.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Start Code */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Быстрый старт</CardTitle>
          <CardDescription>
            Импорт готовых компонентов в любом проекте экосистемы One
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl bg-black/60 border border-oneweb-border-strong p-4 font-mono text-xs text-oneweb-text-primary overflow-x-auto">
            <pre className="text-oneweb-text-secondary">
              <span className="text-oneweb-accent">import</span> &#123; Button, Input, SearchInput, Card, MobileActionBtn &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
              <span className="text-oneweb-accent">export default function</span> <span className="text-blue-400">MyScreen</span>() &#123;{'\n'}
              {'  '}<span className="text-oneweb-accent">return</span> ({'\n'}
              {'    '}&lt;<span className="text-blue-400">Card</span> variant=<span className="text-emerald-400">"default"</span>&gt;{'\n'}
              {'      '}&lt;<span className="text-blue-400">Input</span> label=<span className="text-emerald-400">"Имя"</span> placeholder=<span className="text-emerald-400">"Введите никнейм..."</span> /&gt;{'\n'}
              {'      '}&lt;<span className="text-blue-400">Button</span> variant=<span className="text-emerald-400">"primary"</span>&gt;Сохранить&lt;/<span className="text-blue-400">Button</span>&gt;{'\n'}
              {'      '}&lt;<span className="text-blue-400">MobileActionBtn</span> icon=<span className="text-emerald-400">"add"</span> /&gt;{'\n'}
              {'    '}&lt;/<span className="text-blue-400">Card</span>&gt;{'\n'}
              {'  '});{'\n'}
              &#125;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
