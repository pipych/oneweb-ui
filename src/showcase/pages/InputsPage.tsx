import React, { useState } from 'react';
import { Input, SearchInput, Card, CardHeader, CardTitle, CardDescription, CardContent, Icon, Badge } from '@one/web-ui';

export const InputsPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('Minecraft 1.21.1');
  const [password, setPassword] = useState('SuperSecretPass!');
  const [errorInput, setErrorInput] = useState('steve@invalid');

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">Strict Pill (rounded-full)</Badge>
          <Badge variant="neutral">No Borders (border-none)</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Поля ввода (Input & SearchInput)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Полноразмерные поля ввода на сплошной поверхности <code className="text-white font-mono text-xs">#14171c</code>.
          Строго без обводок (<code className="text-oneweb-accent font-mono text-xs">border-none ring-0 focus:ring-0</code>),
          с идеальным вертикальным центрированием 20px иконок и автоматическими отступами <code className="text-white font-mono text-xs">pl-11 / pr-11</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Standard Inputs */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Текстовые поля (Input)</CardTitle>
            <CardDescription>
              Сплошной фон #14171c, высота h-12, идеальное выравнивание иконок
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Input
              label="Имя пользователя"
              placeholder="Введите никнейм..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              helperText="Используется для авторизации на сервере"
              leftIcon={<Icon name="person" />}
            />

            <Input
              type="password"
              label="Пароль учетной записи"
              placeholder="Введите пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Иконка скрытия/показа отцентрована строго по вертикали (right-4)"
              leftIcon={<Icon name="lock" />}
            />

            <Input
              label="Поле без иконки"
              placeholder="Простой текстовый ввод с отступами px-5..."
            />
          </CardContent>
        </Card>

        {/* Right Column: SearchInput & Validation */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Поиск и состояния (SearchInput)</CardTitle>
            <CardDescription>
              Встроенная иконка лупы (20px, #8e8e93) и кнопка мгновенной очистки
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#8e8e93] select-none px-2 block">
                Специализированный SearchInput
              </label>
              <SearchInput
                placeholder="Поиск по мирам, модам и плагинам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
              />
              <p className="text-xs text-[#8e8e93] px-2">
                Текущий запрос: <span className="text-white font-mono">{searchQuery || '(пусто)'}</span>
              </p>
            </div>

            <Input
              label="Поле с ошибкой валидации"
              placeholder="Электронная почта..."
              value={errorInput}
              onChange={(e) => setErrorInput(e.target.value)}
              error="Некорректный адрес электронной почты"
              leftIcon={<Icon name="mail" />}
            />

            <Input
              label="Отключенное поле (disabled)"
              placeholder="Недоступно для редактирования"
              disabled
              value="SYS-NODE-ONLINE-01"
              leftIcon={<Icon name="block" />}
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
              <span className="text-oneweb-accent">import</span> &#123; Input, SearchInput, Icon &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
              <span className="text-gray-500">// Инпут с иконкой и без обводок</span>{'\n'}
              &lt;<span className="text-blue-400">Input</span>{'\n'}
              {'  '}label=<span className="text-emerald-400">"Никнейм"</span>{'\n'}
              {'  '}placeholder=<span className="text-emerald-400">"Steve"</span>{'\n'}
              {'  '}leftIcon=&#123;&lt;<span className="text-blue-400">Icon</span> name=<span className="text-emerald-400">"person"</span> /&gt;&#125;{'\n'}
              /&gt;{'\n\n'}
              <span className="text-gray-500">// Поле поиска с кнопкой очистки</span>{'\n'}
              &lt;<span className="text-blue-400">SearchInput</span>{'\n'}
              {'  '}placeholder=<span className="text-emerald-400">"Быстрый поиск..."</span>{'\n'}
              {'  '}value=&#123;query&#125;{'\n'}
              {'  '}onChange=&#123;(e) =&gt; setQuery(e.target.value)&#125;{'\n'}
              {'  '}onClear=&#123;() =&gt; setQuery(<span className="text-emerald-400">''</span>)&#125;{'\n'}
              /&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
