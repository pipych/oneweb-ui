# OneWebUI: Правила проектирования и сборки интерфейсов

Данный документ устанавливает обязательные инженерные стандарты и архитектурные правила верстки для всех веб-приложений экосистемы **One**.

---

## 1. Главные принципы

1. **Токенизация на 100% (Strict Token Guarantee)**:
   - Все цвета, отступы, скругления, тени и шрифты задаются **исключительно** через дизайн-токены OneWebUI.
   - Любое использование «магических» значений нарушает консистентность экосистемы One.

2. **Правило скруглений (Никаких острых углов)**:
   - ❌ **ЗАПРЕЩЕНО**: использовать радиусы меньше 12px (`rounded-none`, `rounded-sm`, `rounded`, `rounded-md`).
   - ✅ **Минимальный радиус** в дизайн-системе — **12px** (`rounded-xl` / `rounded-oneweb-min`).
   - ✅ **Карточки, модалки и контейнеры**: строго `rounded-[28px]` или `rounded-[32px]`.
   - ✅ **Табы, бейджи, кнопки, инпуты**: строго `rounded-full` (Pill).

3. **Форма Pill (Капсула) без исключений**:
   - Все кнопки (`Button`, `IconButton`).
   - Все поля ввода и поиска (`Input`, `SearchInput`).
   - Применяй строго класс `rounded-full`. Прямоугольных инпутов или кнопок с небольшим скруглением быть не должно.

4. **Строгий запрет на Arbitrary CSS и Hex-значения**:
   - ❌ **ЗАПРЕЩЕНО**: писать в разметке произвольные hex-цвета, например: `bg-[#090b0e]`, `text-[#c0ff00]`, `border-[#14171c]`.
   - ✅ **РАЗРЕШЕНО**: использовать утилитарные классы Tailwind с префиксом `oneweb-` либо переменные `var(--oneweb-*)`.

5. **Обязательный импорт компонентов из `@one/web-ui`**:
   - Базовые элементы интерфейса импортируются из библиотеки:
   ```tsx
   import { Button, IconButton, Card, Input, SearchInput, Badge, Dialog, MobileActionBtn } from '@one/web-ui';
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

| Значение | CSS-переменная | Класс Tailwind | Назначение |
|---|---|---|---|
| **12px (Минимум)** | `--oneweb-radius-min` | `rounded-xl` / `rounded-oneweb-min` | Тултипы, мелкие меню |
| **16px** | `--oneweb-radius-xl` | `rounded-2xl` / `rounded-oneweb-xl` | Выпадающие панели |
| **20px** | `--oneweb-radius-2xl` | `rounded-oneweb-2xl` | Модальные меню |
| **28px** | `--oneweb-radius-3xl` | `rounded-[28px]` / `rounded-oneweb-card` | **Карточки и контейнеры** |
| **32px** | `--oneweb-radius-sheet` | `rounded-[32px]` / `rounded-oneweb-sheet` | **Диалоги и нижние шторки** |
| **9999px (Pill)** | `--oneweb-radius-full` | `rounded-full` | **Кнопки, Инпуты, Табы, Бейджи, FAB** |

---

### Тени и свечения (`boxShadow`)

| Назначение | Класс Tailwind | Описание |
|---|---|---|
| Тонкая тень | `shadow-oneweb-sm` | Карточки в списке |
| Средняя тень | `shadow-oneweb-md` | Стандартные панели |
| Высокая тень | `shadow-oneweb-lg` | Выпадающие меню, поповеры |
| Неоновый лайм | `shadow-oneweb-accent-glow` | Фирменное свечение `0 0 16px rgba(192, 255, 0, 0.35)` |
| Модальное окно | `shadow-oneweb-modal` | Диалоги `0 12px 40px rgba(0,0,0,0.8)` |
| Нижняя шторка | `shadow-oneweb-sheet` | Bottom sheets `0 -12px 48px rgba(0,0,0,0.85)` |

---

## 3. Базовые примитивы библиотеки `@one/web-ui`

### `Button` & `IconButton`
```tsx
import { Button, IconButton, Icon } from '@one/web-ui';

// Кнопки всегда имеют форму Pill (rounded-full)
<Button variant="primary" size="md">Кнопка</Button>
<Button variant="secondary" size="sm">Действие</Button>
<Button variant="outline" size="md">Контур</Button>

// Круглая иконочная кнопка (rounded-full aspect-square)
<IconButton variant="primary" size="md">
  <Icon name="add" size={20} />
</IconButton>
```

### `Input` & `SearchInput`
```tsx
import { Input, SearchInput } from '@one/web-ui';

// Поля всегда имеют форму Pill (rounded-full)
<Input label="Имя" placeholder="Введите..." />
<Input type="password" label="Пароль" />

// Поле поиска с иконкой
<SearchInput placeholder="Быстрый поиск..." value={query} onChange={e => setQuery(e.target.value)} onClear={() => setQuery('')} />
```

### `MobileActionBtn` (FAB)
```tsx
import { MobileActionBtn } from '@one/web-ui';

// Отображается ТОЛЬКО на мобильных устройствах (md:hidden)
// Зафиксирован строго справа внизу НАД нижним баром (fixed right-4 bottom-24)
<MobileActionBtn icon="add" variant="primary" onClick={() => handleCreate()} />
<MobileActionBtn icon="tune" variant="surface" onClick={() => handleFilter()} />
```

### `Card`
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@one/web-ui';

// Карточки всегда имеют скругление 28px (rounded-[28px])
<Card variant="default">
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
  </CardHeader>
  <CardContent>
    Контент карточки
  </CardContent>
</Card>
```

---

## 4. Чеклист перед коммитом
- [ ] Отсутствуют радиусы меньше 12px (`rounded-none`, `rounded-sm`, `rounded-md`).
- [ ] Все кнопки (`Button`, `IconButton`) и инпуты (`Input`, `SearchInput`) имеют класс `rounded-full`.
- [ ] Карточки имеют скругление 28px (`rounded-[28px]`), диалоги — 32px (`rounded-[32px]`).
- [ ] `MobileActionBtn` скрыт на десктопе (`md:hidden`) и зафиксирован внизу справа.
- [ ] Сборка `npm run build` проходит без ошибок.
