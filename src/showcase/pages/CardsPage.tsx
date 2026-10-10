import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge, Icon } from '@one/web-ui';

export const CardsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">rounded-[28px]</Badge>
          <Badge variant="neutral">Solid = No Borders</Badge>
          <Badge variant="warning">Glass = Subtle Border Edge</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Карточки (Card)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Контейнеры содержимого со строгим радиусом скругления 28px (<strong>rounded-[28px]</strong>). 
          Сплошные карточки не имеют обводок, а стеклянная карточка использует тонкую световую грань <code className="text-white font-mono text-xs">border-white/[0.04]</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Default Solid Card */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="neutral">default (solid)</Badge>
              <Icon name="check_circle" className="text-[#8e8e93]" />
            </div>
            <CardTitle>Стандартная карточка</CardTitle>
            <CardDescription>
              Сплошная поверхность #14171c, строго без обводки
            </CardDescription>
          </CardHeader>
          <CardContent>
            Используется для основных списков, параметров конфигурации и блоков панелей управления.
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-[#8e8e93]">Статус: Готов</span>
            <Button variant="secondary" size="sm">Детали</Button>
          </CardFooter>
        </Card>

        {/* Elevated Solid Card */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="lime">elevated (solid)</Badge>
              <Icon name="star" className="text-oneweb-accent" />
            </div>
            <CardTitle>Приподнятая панель</CardTitle>
            <CardDescription>
              Поверхность #181c23 без обводки с мягкой тенью
            </CardDescription>
          </CardHeader>
          <CardContent>
            Выделяет важные ключевые показатели (метрики, графики, активные сессии).
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-[#8e8e93]">Приоритет: Высокий</span>
            <Button variant="primary" size="sm">Действие</Button>
          </CardFooter>
        </Card>

        {/* Glass Card */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="lime">glass (световая грань)</Badge>
              <Icon name="auto_awesome" className="text-[#c0ff00]" />
            </div>
            <CardTitle>Стеклянная карточка</CardTitle>
            <CardDescription>
              Единственное исключение: грань border-white/[0.04]
            </CardDescription>
          </CardHeader>
          <CardContent>
            Полупрозрачный фон с фильтром backdrop-blur. Разрешена тонкая световая грань для эффекта объема стекла.
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-[#8e8e93]">Glassmorphism</span>
            <Button variant="outline" size="sm">Подробнее</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
