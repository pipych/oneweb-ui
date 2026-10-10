import React, { useState } from 'react';
import {
  Input,
  SearchInput,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Icon,
  OneIcon,
  Badge,
} from '@one/web-ui';

export const InputsPage: React.FC = () => {
  const [basicText, setBasicText] = useState('');
  const [searchWithIcon, setSearchWithIcon] = useState('');
  const [searchWithAction, setSearchWithAction] = useState('one-server-prod-01');
  const [fullSearch, setFullSearch] = useState('cloud backups');
  const [password, setPassword] = useState('SuperSecretPass!');
  const [errorInput, setErrorInput] = useState('admin@invalid-domain');

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">Strict Pill (rounded-full)</Badge>
          <Badge variant="neutral">No Borders (border-none)</Badge>
          <Badge variant="neutral">Fixed pl-11 Offset</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Поля ввода (Input & SearchInput)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Полноразмерные поля ввода на сплошной поверхности <code className="text-white font-mono text-xs">#14171c</code>.
          Строго без обводок (<code className="text-oneweb-accent font-mono text-xs">border-none ring-0 focus:ring-0</code>),
          с идеальным вертикальным центрированием 20px иконок и гарантированным отсутствием наложения текста на иконки и экшены.
        </p>
      </div>

      {/* Grid of Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Required Core Variants */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Базовые варианты Input</CardTitle>
            <CardDescription>
              Сплошной фон #14171c, высота h-11 / h-12, строгая форма капсулы
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* 1. Базовый инпут */}
            <Input
              label="1. Базовый инпут"
              placeholder="Простой текстовый ввод без иконок..."
              value={basicText}
              onChange={(e) => setBasicText(e.target.value)}
              helperText="Стандартные отступы pl-4 / pr-4"
            />

            {/* 2. С поисковой иконкой слева */}
            <Input
              label="2. С поисковой иконкой слева"
              placeholder="Поиск по экосистеме..."
              value={searchWithIcon}
              onChange={(e) => setSearchWithIcon(e.target.value)}
              icon="search"
              helperText="Жесткий отступ pl-11, текст никогда не наезжает на иконку"
            />

            {/* 3. С экшеном справа */}
            <Input
              label="3. С экшеном справа"
              placeholder="Введите ID сервиса..."
              value={searchWithAction}
              onChange={(e) => setSearchWithAction(e.target.value)}
              helperText="Слот rightAction с кнопкой быстрого действия"
              rightAction={
                <Button
                  size="sm"
                  variant="primary"
                  className="h-8 px-3 text-xs"
                  onClick={() => alert(`Запрос: ${searchWithAction}`)}
                >
                  Найти
                </Button>
              }
            />

            {/* 4. С иконкой слева И экшеном справа */}
            <Input
              label="4. Иконка слева + экшен справа"
              placeholder="Поиск серверов и нод..."
              value={fullSearch}
              onChange={(e) => setFullSearch(e.target.value)}
              icon="dns"
              rightAction={
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 px-3 text-xs"
                  onClick={() => setFullSearch('')}
                >
                  Сброс
                </Button>
              }
            />
          </CardContent>
        </Card>

        {/* Right Column: SearchInput, Password & States */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>SearchInput и состояния</CardTitle>
            <CardDescription>
              Встроенная иконка лупы, мгновенная очистка и валидация
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* SearchInput */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8e8e93] select-none px-3 block">
                Специализированный SearchInput
              </label>
              <SearchInput
                placeholder="Быстрый поиск компонентов..."
                value={searchWithIcon}
                onChange={(e) => setSearchWithIcon(e.target.value)}
                onClear={() => setSearchWithIcon('')}
              />
              <p className="text-xs text-[#8e8e93] px-3">
                Автоматическая кнопка сброса при наличии текста
              </p>
            </div>

            {/* Password with toggle */}
            <Input
              type="password"
              label="Поле пароля (Password)"
              placeholder="Введите секретный пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="lock"
              helperText="Интерактивное переключение видимости в правом слоте"
            />

            {/* Error Validation */}
            <Input
              label="Поле с ошибкой валидации"
              placeholder="Электронная почта..."
              value={errorInput}
              onChange={(e) => setErrorInput(e.target.value)}
              error="Некорректный адрес электронной почты"
              icon="mail"
            />

            {/* Disabled */}
            <Input
              label="Отключенное состояние (disabled)"
              placeholder="Недоступно для редактирования"
              disabled
              value="ONE-NODE-REGION-EU-01"
              icon="block"
            />
          </CardContent>
        </Card>
      </div>

      {/* Code Specification */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Код подключения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl bg-black/60 p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
            <pre>
              <span className="text-oneweb-accent">import</span> &#123; Input, SearchInput, Button, OneIcon &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
              <span className="text-gray-500">// 1. Базовый инпут</span>{'\n'}
              &lt;<span className="text-blue-400">Input</span> placeholder=<span className="text-emerald-400">"Имя пользователя..."</span> /&gt;{'\n\n'}
              <span className="text-gray-500">// 2. Инпут с поисковой иконкой слева (автоматический pl-11)</span>{'\n'}
              &lt;<span className="text-blue-400">Input</span> icon=<span className="text-emerald-400">"search"</span> placeholder=<span className="text-emerald-400">"Поиск..."</span> /&gt;{'\n\n'}
              <span className="text-gray-500">// 3. Инпут с экшеном справа</span>{'\n'}
              &lt;<span className="text-blue-400">Input</span>{'\n'}
              {'  '}placeholder=<span className="text-emerald-400">"ID сервиса..."</span>{'\n'}
              {'  '}rightAction=&#123;&lt;<span className="text-blue-400">Button</span> size=<span className="text-emerald-400">"sm"</span>&gt;Найти&lt;/<span className="text-blue-400">Button</span>&gt;&#125;{'\n'}
              /&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
