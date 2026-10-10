# OneWebUI: Правила проектирования и сборки интерфейсов

Данный документ устанавливает обязательные инженерные стандарты и архитектурные правила верстки для всех веб-приложений экосистемы **One**.

---

## 1. Главные принципы

1. **Токенизация на 100% (Strict Token Guarantee)**:
   - Все цвета, отступы, скругления, тени и шрифты задаются **исключительно** через дизайн-токены OneWebUI.
   - Любое использование «магических» значений нарушает консистентность экосистемы One.

2. **Строгий запрет на Arbitrary CSS и Hex-значения**:
   - ❌ **ЗАПРЕЩЕНО**: писать в разметке произвольные hex-цвета, например: `bg-[#090b0e]`, `text-[#c0ff00]`, `border-[#14171c]`, `bg-[rgba(20,23,28,0.94)]`.
   - ❌ **ЗАПРЕЩЕНО**: писать произвольные радиусы, например: `rounded-[16px]`, `rounded-[32px]`.
   - ❌ **ЗАПРЕЩЕНО**: писать инлайн-стили с хардкодными цветами `style={{ backgroundColor: '#c0ff00' }}`.
   - ✅ **РАЗРЕШЕНО**: использовать утилитарные классы Tailwind с префиксом `oneweb-` либо переменные `var(--oneweb-*)`.

3. **Обязательный импорт компонентов из `@one/web-ui`**:
   - Базовые интерактивные элементы интерфейса (кнопки, инпуты, карточки, бейджи, модалки) **не создаются с нуля**, а импортируются из библиотеки:
   ```tsx
   import { Button, Card, Input, Badge, Dialog } from '@one/web-ui';
   ```

---

## 2. Справочник токенов и классов Tailwind

### Палитра цветов (`color`)

| Назначение | CSS-переменная | Класс Tailwind (Background) | Класс Tailwind (Text) | Класс Tailwind (Border) |
|---|---|---|---|---|
| Основной фон (Canvas) | `--oneweb-bg` | `bg-oneweb-bg` | `text-oneweb-bg` | `border-oneweb-bg` |
| Глубокий фон (Contrast) | `--oneweb-bg-subtle` | `bg-oneweb-bg-subtle` | `text-oneweb-bg-subtle` | `border-oneweb-bg-subtle` |
| Карточка / Поверхность | `--oneweb-surface` | `bg-oneweb-surface` | `text-oneweb-surface` | `border-oneweb-surface` |
| Приподнятая поверхность | `--oneweb-surface-elevated` | `bg-oneweb-surface-elevated` | `text-oneweb-surface-elevated` | `border-oneweb-surface-elevated` |
| Суб-поверхность / Контрол | `--oneweb-surface-subtle` | `bg-oneweb-surface-subtle` | `text-oneweb-surface-subtle` | `border-oneweb-surface-subtle` |
| Стекло (Backdrop Blur) | `--oneweb-surface-glass` | `bg-oneweb-surface-glass` | - | - |
| Фирменный акцент (One Lime) | `--oneweb-accent` | `bg-oneweb-accent` | `text-oneweb-accent` | `border-oneweb-accent` |
| Акцент ховер | `--oneweb-accent-hover` | `hover:bg-oneweb-accent-hover` | - | - |
| Тинт акцента (15%) | `--oneweb-accent-subtle` | `bg-oneweb-accent-subtle` | - | `border-oneweb-border-accent` |
| Стандартная граница | `--oneweb-border` | - | - | `border-oneweb-border` |
| Тонкая граница | `--oneweb-border-subtle` | - | - | `border-oneweb-border-subtle` |
| Усиленная граница | `--oneweb-border-strong` | - | - | `border-oneweb-border-strong` |
| Основной текст (White) | `--oneweb-text-primary` | - | `text-oneweb-text-primary` | - |
| Вторичный текст (SF Gray) | `--oneweb-text-secondary` | - | `text-oneweb-text-secondary` | - |
| Приглушенный текст | `--oneweb-text-muted` | - | `text-oneweb-text-muted` | - |
| Инверсный текст | `--oneweb-text-inverse` | - | `text-oneweb-text-inverse` | - |
| Статус: Успех | `--oneweb-status-success` | `bg-oneweb-status-success` | `text-oneweb-status-success` | `border-oneweb-status-success` |
| Статус: Предупреждение | `--oneweb-status-warning` | `bg-oneweb-status-warning` | `text-oneweb-status-warning` | `border-oneweb-status-warning` |
| Статус: Ошибка / Danger | `--oneweb-status-danger` | `bg-oneweb-status-danger` | `text-oneweb-status-danger` | `border-oneweb-status-danger` |

---

### Скругления углов (`borderRadius`)

| Значение | CSS-переменная | Класс Tailwind |
|---|---|---|
| 0px | `--oneweb-radius-none` | `rounded-oneweb-none` |
| 4px | `--oneweb-radius-sm` | `rounded-oneweb-sm` |
| 8px | `--oneweb-radius-md` | `rounded-oneweb-md` |
| 12px | `--oneweb-radius-lg` | `rounded-oneweb-lg` |
| 16px (Инпуты / карточки) | `--oneweb-radius-xl` | `rounded-oneweb-xl` |
| 20px | `--oneweb-radius-2xl` | `rounded-oneweb-2xl` |
| 24px | `--oneweb-radius-3xl` | `rounded-oneweb-3xl` |
| 32px (Bottom Sheets, Модалки) | `--oneweb-radius-sheet` | `rounded-oneweb-sheet` |
| 9999px (Pills, Аватары) | `--oneweb-radius-full` | `rounded-oneweb-full` |

---

### Тени и свечения (`boxShadow`)

| Назначение | Класс Tailwind | Описание |
|---|---|---|
| Тонкая тень | `shadow-oneweb-sm` | Карточки в списке |
| Средняя тень | `shadow-oneweb-md` | Стандартные панели |
| Высокая тень | `shadow-oneweb-lg` | Выпадающие меню, поповеры |
| Неоновый лайм | `shadow-oneweb-accent-glow` | Фирменное свечение `0 0 6px #c0ff00` |
| Модальное окно | `shadow-oneweb-modal` | Диалоги `0 12px 40px rgba(0,0,0,0.8)` |
| Нижняя шторка | `shadow-oneweb-sheet` | Bottom sheets `0 -12px 48px rgba(0,0,0,0.85)` |

---

### Типографика (`fontFamily`)

- `font-oneweb-sans` — основной стек (`'Wix Madefor Display', -apple-system, sans-serif`)
- `font-oneweb-mono` — моноширинный стек для логов, кода и хэшей
- `font-oneweb-minecraft` — пиксельный стек для компонентов игрового профиля

---

## 3. Базовые примитивы библиотеки `@one/web-ui`

### `Button`
```tsx
import { Button } from '@one/web-ui';

<Button variant="primary" size="md">Кнопка</Button>
<Button variant="secondary" size="sm">Действие</Button>
<Button variant="outline" size="md">Контур</Button>
<Button variant="ghost" size="sm">Без фона</Button>
<Button variant="danger" size="md">Удалить</Button>
```
*Поддерживает:* `isLoading`, `leftIcon`, `rightIcon`, `disabled`.

### `Card`
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@one/web-ui';

<Card variant="default"> {/* 'default' | 'elevated' | 'glass' */}
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
    <CardDescription>Пояснение к блоку</CardDescription>
  </CardHeader>
  <CardContent>
    Контент карточки
  </CardContent>
  <CardFooter>
    Футер с действиями
  </CardFooter>
</Card>
```

### `Input`
```tsx
import { Input } from '@one/web-ui';

<Input
  label="Имя пользователя"
  placeholder="Введите..."
  error="Обязательное поле" // Подсветка ошибки в стиле OneWebUI
  helperText="Подсказка под инпутом"
  disabled={false}
/>

<Input
  type="password" // Имеет встроенную кнопку переключения видимости Show/Hide
  label="Пароль"
/>
```

### `Badge`
```tsx
import { Badge } from '@one/web-ui';

<Badge variant="accent" dot>Акцент</Badge>
<Badge variant="success" dot>В сети</Badge>
<Badge variant="warning">В ожидании</Badge>
<Badge variant="danger">Ошибка</Badge>
<Badge variant="default" size="sm">v1.0.0</Badge>
```

### `Dialog`
```tsx
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from '@one/web-ui';

<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <DialogHeader>
    <DialogTitle>Название окна</DialogTitle>
    <DialogClose onClose={() => setIsOpen(false)} />
  </DialogHeader>
  <DialogContent>
    Тело диалога
  </DialogContent>
  <DialogFooter>
    Кнопки действий
  </DialogFooter>
</Dialog>
```

---

## 4. Чеклист перед коммитом
- [ ] Отсутствуют произвольные цвета `[#...]` в добавленном/измененном коде.
- [ ] Компоненты UI импортируются из `@one/web-ui`.
- [ ] Сборка `npm run build` проходит без ошибок TypeScript и Vite.
