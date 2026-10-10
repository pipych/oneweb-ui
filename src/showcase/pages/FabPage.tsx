import React, { useState } from 'react';
import { MobileActionBtn, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Icon, Button } from '@one/web-ui';

export const FabPage: React.FC = () => {
  const [variant, setVariant] = useState<'primary' | 'surface'>('primary');
  const [icon, setIcon] = useState('add');
  const [clickCount, setClickCount] = useState(0);

  const availableIcons = ['add', 'edit', 'bolt', 'tune', 'send', 'star'];

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">Mobile Only</Badge>
          <Badge variant="neutral">rounded-full (Circle)</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Плавающая кнопка действия (MobileActionBtn / FAB)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Специализированный мобильный компонент первичного действия. Строго скрыт на десктопе (<code className="text-oneweb-accent font-mono text-xs">md:hidden</code>),
          зафиксирован в правом нижнем углу (<code className="text-white font-mono text-xs">fixed right-4 bottom-24</code>) НАД нижним навигационным баром.
        </p>
      </div>

      {/* Real Live FAB on mobile (will appear on mobile screens) */}
      <MobileActionBtn
        icon={icon}
        variant={variant}
        onClick={() => setClickCount((prev) => prev + 1)}
      />

      {/* Controls & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings & Spec */}
        <div className="lg:col-span-6 space-y-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Параметры компонента</CardTitle>
              <CardDescription>
                Выберите вариант стилизации и иконку для интерактивного теста
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Variant Selector */}
              <div>
                <label className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                  Вариант фона (variant)
                </label>
                <div className="flex gap-3">
                  <Button
                    variant={variant === 'primary' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setVariant('primary')}
                  >
                    primary (One Lime #c0ff00)
                  </Button>
                  <Button
                    variant={variant === 'surface' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setVariant('surface')}
                  >
                    surface (#181c23)
                  </Button>
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <label className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                  Иконка действия (icon)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableIcons.map((i) => (
                    <button
                      key={i}
                      onClick={() => setIcon(i)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                        icon === i
                          ? 'bg-oneweb-accent text-oneweb-text-inverse border-oneweb-accent'
                          : 'bg-oneweb-surface-subtle text-white border-oneweb-border-subtle hover:bg-oneweb-surface-elevated'
                      }`}
                    >
                      <Icon name={i} size={20} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Click Counter Feedback */}
              <div className="p-4 rounded-2xl bg-oneweb-surface-subtle flex items-center justify-between">
                <span className="text-xs text-oneweb-text-secondary">Счетчик нажатий:</span>
                <span className="text-sm font-bold text-oneweb-accent">{clickCount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Strict Rules Checklist */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Строгие требования дизайн-системы</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-xs text-oneweb-text-secondary">
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" size={16} className="text-oneweb-accent mt-0.5" />
                  <span>
                    <strong className="text-white">Видимость:</strong> ТОЛЬКО на мобильных устройствах (<code className="text-oneweb-accent font-mono">md:hidden</code>).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" size={16} className="text-oneweb-accent mt-0.5" />
                  <span>
                    <strong className="text-white">Позиция:</strong> строго <code className="text-white font-mono">fixed right-4 bottom-24</code> — выше плавающего бара.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" size={16} className="text-oneweb-accent mt-0.5" />
                  <span>
                    <strong className="text-white">Форма:</strong> идеальный круг <code className="text-white font-mono">rounded-full w-14 h-14 aspect-square</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" size={16} className="text-oneweb-accent mt-0.5" />
                  <span>
                    <strong className="text-white">Контент:</strong> ТОЛЬКО иконка размером 28px, никакого текста.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Phone Simulator */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <p className="text-xs font-semibold text-oneweb-text-secondary mb-3 uppercase tracking-wider">
            Симуляция мобильного экрана (360×620)
          </p>

          <div className="relative w-[340px] h-[580px] rounded-[36px] bg-[#090b0e] border-4 border-[#252c37] shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Phone Top Notch Bar */}
            <div className="h-7 w-full flex items-center justify-between px-6 pt-1 text-[11px] text-white/50 border-b border-white/[0.04]">
              <span>09:41</span>
              <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
              <div className="flex items-center gap-1">
                <Icon name="signal_cellular_alt" size={14} />
                <Icon name="battery_full" size={14} />
              </div>
            </div>

            {/* Mock Screen Content */}
            <div className="flex-1 p-4 space-y-3 overflow-hidden">
              <div className="flex items-center justify-between pb-2">
                <span className="font-bold text-white text-base">OneHouse</span>
                <Badge variant="lime" size="sm">Online</Badge>
              </div>

              <div className="p-3.5 rounded-[24px] bg-[#14171c] border border-white/[0.04] space-y-1.5">
                <p className="text-xs font-semibold text-white">Статус сервера</p>
                <p className="text-[11px] text-[#8e8e93]">Игроков онлайн: 42 / 100</p>
              </div>

              <div className="p-3.5 rounded-[24px] bg-[#14171c] border border-white/[0.04] space-y-1.5">
                <p className="text-xs font-semibold text-white">Быстрый запуск</p>
                <p className="text-[11px] text-[#8e8e93]">Синхронизация завершена</p>
              </div>
            </div>

            {/* Mobile Action Button rendered inside phone mockup */}
            <div className="absolute right-4 bottom-20 z-20">
              <button
                type="button"
                onClick={() => setClickCount((prev) => prev + 1)}
                className={`w-14 h-14 rounded-full aspect-square flex items-center justify-center border border-white/[0.04] transition-all active:scale-95 cursor-pointer ${
                  variant === 'primary'
                    ? 'bg-oneweb-accent text-oneweb-text-inverse shadow-oneweb-accent-glow hover:bg-oneweb-accent-hover'
                    : 'bg-oneweb-surface-elevated text-oneweb-accent shadow-oneweb-lg hover:bg-oneweb-surface-subtle'
                }`}
                title="Нажмите на FAB"
              >
                <Icon name={icon} size={28} fill={true} />
              </button>
            </div>

            {/* Mock Bottom Floating Mobile Navbar */}
            <div className="h-14 mx-3 mb-3 rounded-full bg-[#14171c]/95 border border-white/[0.08] backdrop-blur-md flex items-center justify-around px-4 z-10">
              <button className="text-oneweb-accent flex flex-col items-center">
                <Icon name="home" size={20} />
              </button>
              <button className="text-[#8e8e93] hover:text-white flex flex-col items-center">
                <Icon name="sports_esports" size={20} />
              </button>
              <button className="text-[#8e8e93] hover:text-white flex flex-col items-center">
                <Icon name="dns" size={20} />
              </button>
              <button className="text-[#8e8e93] hover:text-white flex flex-col items-center">
                <Icon name="settings" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Код подключения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl bg-black/60 p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
            <pre>
              <span className="text-oneweb-accent">import</span> &#123; MobileActionBtn &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
              <span className="text-gray-500">// Автоматически скрыт на десктопе, закреплен НАД мобильным навбаром</span>{'\n'}
              &lt;<span className="text-blue-400">MobileActionBtn</span>{'\n'}
              {'  '}icon=<span className="text-emerald-400">"add"</span>{'\n'}
              {'  '}variant=<span className="text-emerald-400">"{variant}"</span>{'\n'}
              {'  '}onClick=&#123;() =&gt; console.log(<span className="text-emerald-400">'FAB clicked'</span>)&#125;{'\n'}
              /&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
