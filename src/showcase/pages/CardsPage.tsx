import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardCornerIcon,
  BentoCard,
  Button,
  Badge,
  Icon,
  type CornerIconPosition,
  type CornerIconVariant,
  type CornerIconColor,
  type CornerIconSize,
} from '@one/web-ui';

export const CardsPage: React.FC = () => {
  // Interactive Playground State
  const [interactivePosition, setInteractivePosition] = useState<CornerIconPosition>('top-right');
  const [interactiveVariant, setInteractiveVariant] = useState<CornerIconVariant>('contrast');
  const [interactiveColor, setInteractiveColor] = useState<CornerIconColor>('accent');
  const [interactiveSize, setInteractiveSize] = useState<CornerIconSize>('md');
  const [interactiveCardVariant, setInteractiveCardVariant] = useState<'default' | 'elevated' | 'glass'>('default');
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* 1. Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="lime">rounded-[28px]</Badge>
          <Badge variant="neutral">Square Shape (aspect-square)</Badge>
          <Badge variant="warning">Concentric Radii</Badge>
          <Badge variant="success">Strict Contrast (No Blend)</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Карточки & Bento (Card / BentoCard)
        </h1>
        <p className="mt-2 text-base text-oneweb-text-secondary max-w-3xl leading-relaxed">
          Контейнеры содержимого с фиксированным скруглением <span className="text-white font-medium">rounded-[28px]</span> и 
          спецификацией угловых иконок в контрастных фоновых шейпах. Сплошные элементы строго без обводок, 
          а угловые подложки сохраняют идеальную концентричность с углом карточки.
        </p>
      </div>

      {/* 2. Strict Design Rules Checklist */}
      <Card variant="glass" className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-oneweb-accent/10 flex items-center justify-center text-oneweb-accent">
            <Icon name="verified" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Спецификация угловых иконок и фоновых шейпов
            </h2>
            <p className="text-xs text-oneweb-text-secondary">
              Стандарты концентричности и контраста карточек OneWebUI
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Rule 1: Shape & Square */}
          <div className="bg-[#14171c] p-5 rounded-[22px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="crop_square" size={20} className="text-oneweb-accent" />
              <span>Форма: Строгий квадрат</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              Угловая иконка обязательно помещается в фоновую подложку (шейп) с соотношением <code className="text-white">aspect-square</code> и фиксированным размером: <code className="text-white">w-11 h-11</code> (44px) или <code className="text-white">w-12 h-12</code> (48px).
            </p>
          </div>

          {/* Rule 2: Concentric Radii */}
          <div className="bg-[#14171c] p-5 rounded-[22px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="rounded_corner" size={20} className="text-amber-400" />
              <span>Концентрическое скругление</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              Радиус шейпа гармонирует с <code className="text-white">rounded-[28px]</code> карточки. Для внешнего угла используется увеличенный радиус (<code className="text-amber-400">rounded-tr-[24px]</code> или <code className="text-amber-400">rounded-tl-[24px]</code>) для сохранения плавного зазора.
            </p>
          </div>

          {/* Rule 3: Strict Contrast & No Borders */}
          <div className="bg-[#14171c] p-5 rounded-[22px] space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Icon name="contrast" size={20} className="text-emerald-400" />
              <span>Контраст & No Borders</span>
            </div>
            <p className="text-xs text-oneweb-text-secondary leading-relaxed">
              Цвет шейпа <strong className="text-emerald-400">никогда не сливается</strong> с карточкой. На карточке <code className="text-white">#14171c</code> шейп имеет <code className="text-white">#181c23</code> или <code className="text-white">#090b0e</code>. Обводки строго запрещены.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Bento Grid with Corner Icons (Real Production Showcase) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Bento-сетка: Карточки с угловыми шейпами (OneHouse 1:1)
          </h2>
          <p className="text-xs text-oneweb-text-secondary mt-0.5">
            Примеры использования угловых иконок в позициях top-right и top-left с контрастными подложками
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Default Surface (#14171c) with Elevated Shape (#181c23) at top-right */}
          <Card
            variant="default"
            icon="monitoring"
            iconPosition="top-right"
            iconVariant="contrast"
            iconColor="accent"
            className="p-6 flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="lime" size="sm">
                  Активно
                </Badge>
                <span className="text-xs text-[#8e8e93]">Сервер #1</span>
              </div>
              <CardTitle className="pr-12">Мониторинг ресурсов</CardTitle>
              <CardDescription className="pr-12">
                Фон карточки #14171c, контрастный шейп #181c23 в правом верхнем углу
              </CardDescription>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-4">
              <span className="text-xs font-mono text-[#8e8e93]">Загрузка ЦП: 18%</span>
              <span className="text-xs font-bold text-oneweb-accent">В норме</span>
            </div>
          </Card>

          {/* Card 2: Elevated Surface (#181c23) with Surface Shape (#14171c) at top-left */}
          <Card
            variant="elevated"
            icon="security"
            iconPosition="top-left"
            iconVariant="surface"
            iconColor="white"
            className="p-6 flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end">
                <Badge variant="neutral" size="sm">
                  Защита
                </Badge>
              </div>
              <div className="pl-14">
                <CardTitle>Система безопасности</CardTitle>
                <CardDescription>
                  Шейп расположен в левом верхнем углу (top-left) со скруглением rounded-tl-[24px]
                </CardDescription>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-4">
              <span className="text-xs text-[#8e8e93]">Синхронизация</span>
              <Button variant="secondary" size="sm">
                Проверить
              </Button>
            </div>
          </Card>

          {/* Card 3: Glass Card with Dock Shape (#252c37) at top-right */}
          <Card
            variant="glass"
            icon="bolt"
            iconPosition="top-right"
            iconVariant="dock"
            iconColor="accent"
            className="p-6 flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-2">
              <Badge variant="lime" size="sm">
                Турбо
              </Badge>
              <CardTitle className="pr-12">Мгновенный деплой</CardTitle>
              <CardDescription className="pr-12">
                Стеклянная карточка с подложкой #252c37 и акцентной иконкой #c0ff00
              </CardDescription>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-4">
              <span className="text-xs text-[#8e8e93]">Версия 0.1.0</span>
              <Button variant="primary" size="sm">
                Запустить
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* 4. Interactive Bento Tile Playground */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Интерактивный конфигуратор угловой подложки
          </h2>
          <p className="text-xs text-oneweb-text-secondary mt-0.5">
            Проверьте концентричность скругления и контрастность шейпа при смене настроек
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-6 bg-[#14171c] p-6 rounded-[28px] space-y-5">
            {/* Position */}
            <div>
              <label className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                Позиция шейпа (iconPosition)
              </label>
              <div className="flex gap-2">
                {(['top-right', 'top-left'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setInteractivePosition(pos)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all sf-tap active:scale-95 ${
                      interactivePosition === pos
                        ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                        : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
                    }`}
                  >
                    {pos === 'top-right' ? 'Справа (top-right)' : 'Слева (top-left)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Variant */}
            <div>
              <label className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                Цвет подложки (iconVariant)
              </label>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['contrast', 'Контраст (Auto)'],
                    ['elevated', 'Elevated (#181c23)'],
                    ['dark', 'Dark Canvas (#090b0e)'],
                    ['dock', 'Dock (#252c37)'],
                    ['accent', 'Lime Soft (15%)'],
                    ['accent-solid', 'Solid #c0ff00'],
                  ] as const
                ).map(([v, label]) => (
                  <button
                    key={v}
                    onClick={() => setInteractiveVariant(v)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all sf-tap active:scale-95 ${
                      interactiveVariant === v
                        ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                        : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Color */}
            <div>
              <label className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                Цвет иконки внутри (iconColor)
              </label>
              <div className="flex gap-2">
                {(['accent', 'white', 'muted'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setInteractiveColor(c)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all sf-tap active:scale-95 ${
                      interactiveColor === c
                        ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                        : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
                    }`}
                  >
                    {c === 'accent' ? 'Акцентный (#c0ff00)' : c === 'white' ? 'Белый (#ffffff)' : 'Серый (#8e8e93)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                Размер шейпа (iconShapeSize)
              </label>
              <div className="flex gap-2">
                {(
                  [
                    ['sm', 'sm (40px)'],
                    ['md', 'md (48px - Стандарт)'],
                    ['lg', 'lg (56px)'],
                  ] as const
                ).map(([s, label]) => (
                  <button
                    key={s}
                    onClick={() => setInteractiveSize(s)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all sf-tap active:scale-95 ${
                      interactiveSize === s
                        ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                        : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Background Variant */}
            <div>
              <label className="text-xs font-semibold text-oneweb-text-secondary block mb-2">
                Фон самой карточки (variant)
              </label>
              <div className="flex gap-2">
                {(['default', 'elevated', 'glass'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setInteractiveCardVariant(v)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all sf-tap active:scale-95 ${
                      interactiveCardVariant === v
                        ? 'bg-oneweb-accent text-oneweb-text-inverse font-bold'
                        : 'bg-[#181c23] text-oneweb-text-secondary hover:text-white'
                    }`}
                  >
                    {v === 'default' ? 'default (#14171c)' : v === 'elevated' ? 'elevated (#181c23)' : 'glass (стекло)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-[#090b0e] rounded-[32px] border border-white/5 min-h-[380px]">
            <BentoCard
              variant={interactiveCardVariant}
              icon="token"
              iconPosition={interactivePosition}
              iconVariant={interactiveVariant}
              iconColor={interactiveColor}
              iconShapeSize={interactiveSize}
              onIconClick={() => setClickCount((prev) => prev + 1)}
              badge={<Badge variant="lime" size="sm">Интерактивный Bento</Badge>}
              title="Инспектируемый компонент"
              description="Кликните по угловому шейпу — он поддерживает тактильный отклик active:scale-95 и onClick."
              className="w-full max-w-md shadow-2xl"
              footer={
                <div className="flex items-center justify-between text-xs text-[#8e8e93]">
                  <span>Кликов по иконке: <strong className="text-white">{clickCount}</strong></span>
                  <span className="font-mono text-[11px] text-oneweb-accent">
                    {interactivePosition} • {interactiveSize}
                  </span>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* 5. Code Example */}
      <Card variant="default" className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Icon name="code" size={20} className="text-oneweb-accent" />
          <span>Пример использования в React</span>
        </h3>
        <pre className="bg-[#090b0e] p-4 rounded-2xl text-xs font-mono text-[#8e8e93] overflow-x-auto leading-relaxed border-none">
{`import { Card, CardTitle, CardDescription, BentoCard } from '@one/web-ui';

// 1. Через декларативные пропсы Card:
<Card
  variant="default"               // Фон #14171c
  icon="rocket_launch"            // Имя иконки Material Symbols
  iconPosition="top-right"        // 'top-right' | 'top-left'
  iconVariant="contrast"          // Контрастный шейп #181c23 (без обводки)
  iconColor="accent"              // Цвет иконки #c0ff00
  iconShapeSize="md"              // w-12 h-12 (48px)
  className="p-6"
>
  <CardTitle className="pr-12">Заголовок карточки</CardTitle>
  <CardDescription className="pr-12">Описание контента</CardDescription>
</Card>

// 2. Готовый компонент Bento-плитки BentoCard:
<BentoCard
  variant="elevated"
  icon="analytics"
  iconPosition="top-left"
  badge={<Badge variant="lime">Live</Badge>}
  title="Статистика"
  description="Концентрическое скругление угла"
  footer={<Button size="sm">Подробнее</Button>}
/>`}
        </pre>
      </Card>
    </div>
  );
};
