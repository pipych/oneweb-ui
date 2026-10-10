import React, { useState } from 'react';
import { Input, SearchInput, Card, CardHeader, CardTitle, CardContent, Icon, Badge } from '@one/web-ui';

export const InputsPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [password, setPassword] = useState('SuperSecretPass!');
  const [errorInput, setErrorInput] = useState('admin@invalid');

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="accent">Strict Pill (rounded-full)</Badge>
          <Badge variant="default">No sharp corners</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Поля ввода (Input & SearchInput)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Все поля ввода и поиска строго имеют форму капсулы (<strong>rounded-full</strong>). Прямоугольные инпуты запрещены.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Стандартные поля (Input)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Имя пользователя"
              placeholder="Введите ваш никнейм..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              helperText="Используется для входа в панель OneHouse"
              leftIcon={<Icon name="person" size={18} />}
            />

            <Input
              type="password"
              label="Пароль учетной записи"
              placeholder="Введите пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Встроенная кнопка показать/скрыть пароль"
              leftIcon={<Icon name="lock" size={18} />}
            />
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Поиск и валидация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-oneweb-text-secondary select-none px-1">
                Поле поиска (SearchInput)
              </label>
              <SearchInput
                placeholder="Поиск серверов, миров, игроков..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
              />
            </div>

            <Input
              label="Поле с ошибкой валидации"
              placeholder="Электронная почта..."
              value={errorInput}
              onChange={(e) => setErrorInput(e.target.value)}
              error="Некорректный адрес электронной почты"
              leftIcon={<Icon name="mail" size={18} />}
            />

            <Input
              label="Отключенное поле (disabled)"
              placeholder="Недоступно для ввода"
              disabled
              value="Системный идентификатор"
              leftIcon={<Icon name="block" size={18} />}
            />
          </CardContent>
        </Card>
      </div>

      {/* Code snippet */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Спецификация импорта</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-black/60 border border-oneweb-border-strong p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
            <pre>
              <span className="text-oneweb-accent">import</span> &#123; Input, SearchInput &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
              <span className="text-gray-500">// Все поля автоматически rounded-full</span>{'\n'}
              &lt;<span className="text-blue-400">Input</span> label=<span className="text-emerald-400">"Никнейм"</span> placeholder=<span className="text-emerald-400">"Steve"</span> /&gt;{'\n'}
              &lt;<span className="text-blue-400">SearchInput</span> placeholder=<span className="text-emerald-400">"Быстрый поиск..."</span> onClear=&#123;clearFn&#125; /&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
