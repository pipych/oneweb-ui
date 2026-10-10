import React, { useState } from 'react';
import { Input, Card, CardHeader, CardTitle, CardContent, Icon } from '@one/web-ui';

export const InputsPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('Secret123!');
  const [errorInput, setErrorInput] = useState('');

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Поля ввода (Input)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Компонент ввода с поддержкой меток, подсказок, валидации ошибок и скрытия пароля.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Стандартный ввод</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Имя пользователя"
              placeholder="Введите ваш никнейм..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              helperText="Используется для входа в панель One"
              leftIcon={<Icon name="person" size={18} />}
            />

            <Input
              label="Поиск по серверу"
              placeholder="Введите запрос..."
              leftIcon={<Icon name="search" size={18} />}
              rightIcon={<Icon name="keyboard_return" size={18} />}
            />
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Пароль и состояния</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              label="Пароль учетной записи"
              placeholder="Введите пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Кнопка справа автоматически скрывает/показывает символы"
              leftIcon={<Icon name="lock" size={18} />}
            />

            <Input
              label="Поле с ошибкой"
              placeholder="Электронная почта..."
              value={errorInput}
              onChange={(e) => setErrorInput(e.target.value)}
              error="Некорректный формат адреса почты"
              leftIcon={<Icon name="mail" size={18} />}
            />

            <Input
              label="Отключенное поле"
              placeholder="Недоступно для редактирования"
              disabled
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
          <div className="rounded-oneweb-lg bg-black/60 border border-oneweb-border-strong p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
            <pre>
              &lt;<span className="text-blue-400">Input</span>{'\n'}
              {'  '}label=<span className="text-emerald-400">"Пароль"</span>{'\n'}
              {'  '}type=<span className="text-emerald-400">"password"</span>{'\n'}
              {'  '}placeholder=<span className="text-emerald-400">"Введите пароль..."</span>{'\n'}
              {'  '}helperText=<span className="text-emerald-400">"Минимум 8 символов"</span>{'\n'}
              {'  '}leftIcon=&#123;&lt;<span className="text-blue-400">Icon</span> name=<span className="text-emerald-400">"lock"</span> /&gt;&#125;{'\n'}
              /&gt;
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
