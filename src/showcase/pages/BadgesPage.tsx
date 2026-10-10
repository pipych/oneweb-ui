import React, { useState } from 'react';
import { Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Icon, Switch } from '@one/web-ui';

export const BadgesPage: React.FC = () => {
  const [showDot, setShowDot] = useState(true);

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">Strict No Borders</Badge>
          <Badge variant="neutral">Active Color Tint</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Бейджи (Badge)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Информационные метки статусов системы в строгом стиле OneWebUI: без обводок, с полупрозрачным фоном (10-15%),
          индикаторной точкой <code className="text-white font-mono text-xs">w-1.5 h-1.5</code> и текстом в тон активного цвета.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-oneweb-surface">
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch checked={showDot} onCheckedChange={setShowDot} />
          <span className="text-sm font-medium text-white">Индикаторная точка (dot)</span>
        </label>
      </div>

      {/* Main 4 Variants Grid */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Четыре базовых варианта (Variants)</CardTitle>
          <CardDescription>
            Строго без обводок (`border-none`), полупрозрачный фон и однотонный цвет текста и точки
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Lime Variant */}
            <div className="p-4 rounded-2xl bg-[#090b0e] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">lime (акцент)</span>
                <span className="text-[11px] font-mono text-[#c0ff00]">#c0ff00</span>
              </div>
              <div className="py-2">
                <Badge variant="lime" dot={showDot}>
                  One Lime Активен
                </Badge>
              </div>
              <p className="text-[11px] text-[#8e8e93]">bg-[#c0ff00]/10, dot & text #c0ff00</p>
            </div>

            {/* Neutral Variant */}
            <div className="p-4 rounded-2xl bg-[#090b0e] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">neutral (нейтральный)</span>
                <span className="text-[11px] font-mono text-[#8e8e93]">#8e8e93</span>
              </div>
              <div className="py-2">
                <Badge variant="neutral" dot={showDot}>
                  v1.2.0 Релиз
                </Badge>
              </div>
              <p className="text-[11px] text-[#8e8e93]">bg-white/5, dot & text #8e8e93</p>
            </div>

            {/* Warning Variant */}
            <div className="p-4 rounded-2xl bg-[#090b0e] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">warning (внимание)</span>
                <span className="text-[11px] font-mono text-amber-500">amber-500</span>
              </div>
              <div className="py-2">
                <Badge variant="warning" dot={showDot}>
                  Перезапуск ноды
                </Badge>
              </div>
              <p className="text-[11px] text-[#8e8e93]">bg-amber-500/10, dot & text amber-500</p>
            </div>

            {/* Danger Variant */}
            <div className="p-4 rounded-2xl bg-[#090b0e] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">danger (ошибка)</span>
                <span className="text-[11px] font-mono text-red-500">red-500</span>
              </div>
              <div className="py-2">
                <Badge variant="danger" dot={showDot}>
                  Сервер офлайн
                </Badge>
              </div>
              <p className="text-[11px] text-[#8e8e93]">bg-red-500/10, dot & text red-500</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Use Cases */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Использование в интерфейсе</CardTitle>
          <CardDescription>
            Статусы сервисов, бейджи версий и категории
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="lime">Cloudflare Pages</Badge>
            <Badge variant="lime">В сети: 128 игроков</Badge>
            <Badge variant="neutral">OneHouse v0.1.0</Badge>
            <Badge variant="warning">Синхронизация данных</Badge>
            <Badge variant="danger">Сбой соединения</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Code Snippet */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Пример подключения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl bg-black/60 p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
            <pre>
              <span className="text-oneweb-accent">import</span> &#123; Badge &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
              <span className="text-gray-500">// Без обводок, точка в цвет текста</span>{'\n'}
              &lt;<span className="text-blue-400">Badge</span> variant=<span className="text-emerald-400">"lime"</span>&gt;Активен&lt;/<span className="text-blue-400">Badge</span>&gt;{'\n'}
              &lt;<span className="text-blue-400">Badge</span> variant=<span className="text-emerald-400">"neutral"</span>&gt;v1.0.0&lt;/<span className="text-blue-400">Badge</span>&gt;{'\n'}
              &lt;<span className="text-blue-400">Badge</span> variant=<span className="text-emerald-400">"warning"</span>&gt;Синхронизация&lt;/<span className="text-blue-400">Badge</span>&gt;{'\n'}
              &lt;<span className="text-blue-400">Badge</span> variant=<span className="text-emerald-400">"danger"</span>&gt;Ошибка&lt;/<span className="text-blue-400">Badge</span>&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
