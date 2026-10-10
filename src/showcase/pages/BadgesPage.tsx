import React from 'react';
import { Badge, Card, CardHeader, CardTitle, CardContent } from '@one/web-ui';

export const BadgesPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Бейджи и индикаторы (Badge)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Информационные метки для статусов системы, категорий и версионирования.
        </p>
      </div>

      <Card variant="default">
        <CardHeader>
          <CardTitle>Варианты статусов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">Фирменный акцент</Badge>
            <Badge variant="default">По умолчанию</Badge>
            <Badge variant="success">Успех / Активен</Badge>
            <Badge variant="warning">В ожидании</Badge>
            <Badge variant="danger">Критическая ошибка</Badge>
          </div>
        </CardContent>
      </Card>

      <Card variant="default">
        <CardHeader>
          <CardTitle>С пульсирующей точкой (dot)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent" dot>Online (Accent)</Badge>
            <Badge variant="success" dot>В сети</Badge>
            <Badge variant="warning" dot>Синхронизация</Badge>
            <Badge variant="danger" dot>Офлайн</Badge>
            <Badge variant="default" dot>Режим ожидания</Badge>
          </div>
        </CardContent>
      </Card>

      <Card variant="default">
        <CardHeader>
          <CardTitle>Размеры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="accent" size="sm">Размер SM (v1.0.0)</Badge>
            <Badge variant="accent" size="md">Размер MD (v1.0.0)</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
