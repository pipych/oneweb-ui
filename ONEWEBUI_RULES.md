# OneWebUI: Строгие правила верстки и архитектуры интерфейсов

> **Для всех AI-агентов, LLM и разработчиков экосистемы One**: данный регламент является законом при создании, модификации или рефакторинге веб-интерфейсов. Любое отклонение считается багом спецификации.

---

## 1. Абсолютные запреты (Zero-Tolerance Rules)

1. ❌ **ЗАПРЕТ на произвольные hex-цвета (Arbitrary Hex Colors)**:
   - **Запрещено**: `bg-[#090b0e]`, `text-[#c0ff00]`, `border-[#14171c]`, `bg-[#181c23]`, `text-[#8e8e93]`, `bg-[rgba(20,23,28,0.94)]`.
   - **Разрешено**: только семантические классы Tailwind `bg-oneweb-*`, `text-oneweb-*`, `border-oneweb-*` или CSS-переменные `var(--oneweb-*)`.

2. ❌ **ЗАПРЕТ на произвольные скругления (Arbitrary Radii)**:
   - **Запрещено**: `rounded-[16px]`, `rounded-[32px]`, `rounded-[20px]`.
   - **Разрешено**: только классы дизайн-системы `rounded-oneweb-sm`, `rounded-oneweb-md`, `rounded-oneweb-lg`, `rounded-oneweb-xl`, `rounded-oneweb-2xl`, `rounded-oneweb-sheet`, `rounded-oneweb-full`.

3. ❌ **ЗАПРЕТ на создание велосипедов для базовых примитивов**:
   - **Запрещено**: писать собственные `<button>`, `<input>`, модалки `<div role="dialog">`, самодельные табы или выпадающие списки.
   - **Обязательно**: импортировать готовые протестированные примитивы из `@one/web-ui`.

4. ❌ **ЗАПРЕТ на инлайн-стили цветов**:
   - **Запрещено**: `style={{ backgroundColor: '#c0ff00' }}` или `style={{ color: '#ffffff' }}`.

---

## 2. Обязательный импорт из `@one/web-ui`

Все компоненты интерфейса импортируются из единой точки входа:

```tsx
import {
  OneIcon,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Sheet, // Алиас для Drawer
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  Toast,
  useToast,
  Tooltip,
  SimpleTooltip,
} from '@one/web-ui';
```

---

## 3. Справочник валидных классов Tailwind (`oneweb-*`)

### Цвета (Colors)

| Токен | Назначение | Класс фона | Класс текста | Класс границы |
|---|---|---|---|---|
| `oneweb-bg` | Главный фон холста (Canvas, #090b0e) | `bg-oneweb-bg` | `text-oneweb-bg` | `border-oneweb-bg` |
| `oneweb-bg-subtle` | Глубокий контрастный фон (#050709) | `bg-oneweb-bg-subtle` | `text-oneweb-bg-subtle` | `border-oneweb-bg-subtle` |
| `oneweb-surface` | Базовая карточка / поверхность (#14171c) | `bg-oneweb-surface` | `text-oneweb-surface` | `border-oneweb-surface` |
| `oneweb-surface-elevated` | Приподнятая модалка / меню (#181c23) | `bg-oneweb-surface-elevated` | `text-oneweb-surface-elevated` | `border-oneweb-surface-elevated` |
| `oneweb-surface-subtle` | Фон инпутов / элементов (#252c37) | `bg-oneweb-surface-subtle` | `text-oneweb-surface-subtle` | `border-oneweb-surface-subtle` |
| `oneweb-surface-glass` | Стекло с размытием (Backdrop Blur) | `bg-oneweb-surface-glass` | - | - |
| `oneweb-accent` | Фирменный лайм экосистемы One (#c0ff00) | `bg-oneweb-accent` | `text-oneweb-accent` | `border-oneweb-accent` |
| `oneweb-accent-hover` | Ховер лайма (#aee600) | `hover:bg-oneweb-accent-hover` | - | - |
| `oneweb-accent-subtle` | Полупрозрачный тинт лайма (15%) | `bg-oneweb-accent-subtle` | - | `border-oneweb-border-accent` |
| `oneweb-border` | Стандартная граница (rgba 10%) | - | - | `border-oneweb-border` |
| `oneweb-border-subtle` | Тонкая разделительная линия (rgba 5%) | - | - | `border-oneweb-border-subtle` |
| `oneweb-border-strong` | Усиленная граница (rgba 15%) | - | - | `border-oneweb-border-strong` |
| `oneweb-text-primary` | Высококонтрастный текст (#ffffff) | - | `text-oneweb-text-primary` | - |
| `oneweb-text-secondary` | Вторичный текст (#8e8e93) | - | `text-oneweb-text-secondary` | - |
| `oneweb-text-muted` | Приглушенный текст / плейсхолдеры | - | `text-oneweb-text-muted` | - |
| `oneweb-text-inverse` | Темный текст на лаймовом фоне (#090b0e) | - | `text-oneweb-text-inverse` | - |
| `oneweb-status-success` | Статус Успех (#1bd96a) | `bg-oneweb-status-success` | `text-oneweb-status-success` | `border-oneweb-status-success` |
| `oneweb-status-warning` | Статус Предупреждение (#fbbf24) | `bg-oneweb-status-warning` | `text-oneweb-status-warning` | `border-oneweb-status-warning` |
| `oneweb-status-danger` | Статус Ошибка / Danger (#ef4444) | `bg-oneweb-status-danger` | `text-oneweb-status-danger` | `border-oneweb-status-danger` |

---

### Скругления (Border Radii)

- `rounded-oneweb-none`: 0px
- `rounded-oneweb-sm`: 4px (метки, микроэлементы)
- `rounded-oneweb-md`: 8px (небольшие кнопки)
- `rounded-oneweb-lg`: 12px (стандартные контролы)
- `rounded-oneweb-xl`: 16px (инпуты, карточки)
- `rounded-oneweb-2xl`: 20px (большие карточки)
- `rounded-oneweb-3xl`: 24px (панели)
- `rounded-oneweb-sheet`: 32px (шторки снизу и диалоги)
- `rounded-oneweb-full`: 9999px (бейджи, таблетки, круглые аватары)

---

### Тени и свечения (Shadows & Glows)

- `shadow-oneweb-sm`: карточки списка
- `shadow-oneweb-md`: стандартные блоки
- `shadow-oneweb-lg`: выпадающие меню
- `shadow-oneweb-accent-glow`: фирменное неоновое свечение One Lime (`0 0 6px #c0ff00`)
- `shadow-oneweb-modal`: центрированные диалоги (`0 12px 40px rgba(0,0,0,0.80)`)
- `shadow-oneweb-sheet`: нижние шторки (`0 -12px 48px rgba(0,0,0,0.85)`)

---

### Шрифты (Typography)

- `font-oneweb-sans`: основной шрифт `Wix Madefor Display`
- `font-oneweb-minecraft`: аутентичный пиксельный шрифт `Silkscreen` / `VT323`
- `font-oneweb-mono`: моноширинный стек для логов и хэшей

---

## 4. Правила работы с OneIcon (Material Symbols Rounded)

Иконки создаются исключительно через компонент `OneIcon`:

```tsx
// Стандартная иконка с заливкой (fill=true по умолчанию):
<OneIcon name="settings" size="md" />

// Контурная иконка:
<OneIcon name="settings" size="md" fill={false} />

// Акцентный цвет и кастомный размер в пикселях:
<OneIcon name="bolt" size={20} className="text-oneweb-accent" />
```

---

## 5. Чеклист перед отправкой кода (AI Gatekeeper)

1. [ ] В файле нет ни одного `[#...].`
2. [ ] Все используемые кнопки, инпуты, карточки, диалоги, табы, селекты, тосты и подсказки импортированы из `@one/web-ui`.
3. [ ] Команда `npm run build` проходит без единой ошибки TypeScript и Vite.
4. [ ] Новые стили проверены в темной теме OLED (#090b0e).
