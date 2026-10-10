import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge, Icon } from '@one/web-ui';

export const CardsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Карточки (Card)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Контейнеры содержимого с фиксированными радиусами скругления 16px и разной степенью возвышения (elevation).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Default Card */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="default">default</Badge>
              <Icon name="check_circle" className="text-oneweb-text-secondary" />
            </div>
            <CardTitle>Стандартная карточка</CardTitle>
            <CardDescription>
              Фон #14171c, тонкая граница 10% белого.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Используется для основных списков, параметров конфигурации и блоков панелей управления.
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-oneweb-text-secondary">Статус: Активен</span>
            <Button variant="secondary" size="sm">Детали</Button>
          </CardFooter>
        </Card>

        {/* Elevated Card */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="accent">elevated</Badge>
              <Icon name="star" className="text-oneweb-accent" />
            </div>
            <CardTitle>Приподнятая панель</CardTitle>
            <CardDescription>
              Фон #181c23, усиленная граница и тень.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Выделяет важные ключевые показатели (метрики, графики, активные сессии).
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-oneweb-text-secondary">Приоритет: Высокий</span>
            <Button variant="primary" size="sm">Действие</Button>
          </CardFooter>
        </Card>

        {/* Glass Card */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="success">glass</Badge>
              <Icon name="auto_awesome" className="text-emerald-400" />
            </div>
            <CardTitle>Стеклянная карточка</CardTitle>
            <CardDescription>
              Полупрозрачность с фильтром backdrop-blur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Отлично подходит для оверлеев поверх бэкграунда, карт или трехмерных сцен.
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-oneweb-text-secondary">Эффект стекла</span>
            <Button variant="outline" size="sm">Подробнее</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
