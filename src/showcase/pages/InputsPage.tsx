import React, { useState } from 'react';
import {
  Input,
  SearchInput,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@one/web-ui';

export const InputsPage: React.FC = () => {
  const [baseInput, setBaseInput] = useState('');
  const [cardInput, setCardInput] = useState('Текст внутри карточки');
  const [searchWithClose, setSearchWithClose] = useState('one-storage-bucket-01');
  const [searchWithArrow, setSearchWithArrow] = useState('onehouse-deploy');
  const [searchWithSearchIcon, setSearchWithSearchIcon] = useState('cluster-node-eu');
  const [password, setPassword] = useState('SuperSecretPass!');
  const [errorInput, setErrorInput] = useState('admin@invalid-domain');

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">Strict Pill (rounded-full)</Badge>
          <Badge variant="neutral">Contrasting Underlays</Badge>
          <Badge variant="neutral">Round Icon Actions (w-8 h-8)</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Поля ввода (Input & SearchInput)
        </h1>
        <p className="text-oneweb-text-secondary text-sm sm:text-base">
          Полноразмерные поля ввода на контрастной сплошной подложке.
          Строго без обводок (<code className="text-oneweb-accent font-mono text-xs">border-none ring-0 focus:ring-0</code>),
          с круглыми экшен-кнопками справа (<code className="text-white font-mono text-xs">w-8 h-8</code>) и жестким <code className="text-white font-mono text-xs">pr-12</code>,
          гарантирующим отсутствие наложения текста на действия.
        </p>
      </div>

      {/* Grid of Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Поверхности и контрастные подложки */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>1. Контраст подложки (Canvas vs Card/Modal)</CardTitle>
            <CardDescription>
              Фон инпута никогда не сливается с родительской поверхностью
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Поле на базовом фоне #090b0e (подложка #14171c) */}
            <div className="p-4 rounded-[24px] bg-[#090b0e] space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#8e8e93] px-1">
                На базовом фоне (#090b0e) → Подложка #14171c
              </span>
              <Input
                surface="base"
                placeholder="Инпут на базовом полотне..."
                value={baseInput}
                onChange={(e) => setBaseInput(e.target.value)}
                icon="terminal"
                helperText="surface='base' (фон #14171c)"
              />
            </div>

            {/* Поле внутри карточки #14171c (подложка #181c23) */}
            <div className="p-4 rounded-[24px] bg-[#14171c] space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#8e8e93] px-1">
                Внутри карточки/модалки (#14171c) → Подложка #181c23
              </span>
              <Input
                surface="card"
                placeholder="Инпут внутри карточки или диалога..."
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                icon="layers"
                helperText="surface='card' (фон #181c23, не сливается с карточкой)"
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Круглые экшен-кнопки справа */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>2. Круглые экшены (w-8 h-8)</CardTitle>
            <CardDescription>
              Любое действие справа — строго круглая иконка по центру с отступом pr-12
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Очистка ввода: close */}
            <Input
              label="Очистка ввода (иконка 'close')"
              placeholder="Введите значение..."
              value={searchWithClose}
              onChange={(e) => setSearchWithClose(e.target.value)}
              icon="search"
              clearable
              onClear={() => setSearchWithClose('')}
              helperText="Круглый крестик сброса с hover:bg-white/10"
            />

            {/* Отправка: arrow_forward */}
            <Input
              label="Отправка данных (иконка 'arrow_forward')"
              placeholder="Команда или поисковый запрос..."
              value={searchWithArrow}
              onChange={(e) => setSearchWithArrow(e.target.value)}
              icon="send"
              rightActionIcon="arrow_forward"
              onRightAction={() => alert(`Отправка: ${searchWithArrow}`)}
              helperText="Круглая кнопка отправки с OneIcon name='arrow_forward'"
            />

            {/* Поиск: search */}
            <Input
              label="Действие поиска (иконка 'search')"
              placeholder="Поиск по базе сервисов..."
              value={searchWithSearchIcon}
              onChange={(e) => setSearchWithSearchIcon(e.target.value)}
              rightActionIcon="search"
              onRightAction={() => alert(`Поиск: ${searchWithSearchIcon}`)}
              helperText="Круглая кнопка лупы в правом слоте"
            />

            {/* Пароль с переключением видимости */}
            <Input
              type="password"
              label="Поле пароля (Password)"
              placeholder="Введите пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="lock"
              helperText="Круглая кнопка переключения видимости (visibility / visibility_off)"
            />
          </CardContent>
        </Card>

        {/* 3. SearchInput & Ошибки */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>3. SearchInput и очистка</CardTitle>
            <CardDescription>
              Специализированное поле с автоматической круглой кнопкой сброса
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchInput
              placeholder="Быстрый поиск компонентов..."
              value={searchWithClose}
              onChange={(e) => setSearchWithClose(e.target.value)}
              onClear={() => setSearchWithClose('')}
            />

            <Input
              label="Поле с ошибкой валидации"
              placeholder="Электронная почта..."
              value={errorInput}
              onChange={(e) => setErrorInput(e.target.value)}
              error="Некорректный адрес электронной почты"
              icon="mail"
            />
          </CardContent>
        </Card>

        {/* 4. Спецификация кода */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>4. Пример кода</CardTitle>
            <CardDescription>
              Универсальный синтаксис OneWebUI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl bg-black/60 p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
              <pre>
                <span className="text-oneweb-accent">import</span> &#123; Input &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
                <span className="text-gray-500">// Внутри карточки с круглой отправкой</span>{'\n'}
                &lt;<span className="text-blue-400">Input</span>{'\n'}
                {'  '}surface=<span className="text-emerald-400">"card"</span>{'\n'}
                {'  '}icon=<span className="text-emerald-400">"search"</span>{'\n'}
                {'  '}rightActionIcon=<span className="text-emerald-400">"arrow_forward"</span>{'\n'}
                {'  '}onRightAction=&#123;() =&gt; handleSend()&#125;{'\n'}
                /&gt;{'\n\n'}
                <span className="text-gray-500">// С круглой кнопкой очистки</span>{'\n'}
                &lt;<span className="text-blue-400">Input</span> clearable onClear=&#123;() =&gt; setVal(<span className="text-emerald-400">''</span>)&#125; /&gt;
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
