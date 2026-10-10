# OneWebUI: Архитектурный регламент и правила верстки

> **Для всех AI-агентов, LLM и разработчиков экосистемы One**: данный документ определяет строгие правила проектирования пользовательских интерфейсов для десктопных и мобильных веб-приложений One (OneHouse, OneLaunch, OneDash). Любое отклонение считается ошибкой спецификации.

---

## 1. Desktop Guidelines (Десктопные интерфейсы)

Десктопные приложения экосистемы строятся по принципу **Bento Grid** с мягким бархатным OLED-фоном и парящими контролами.

### 1.1. Навигация (DesktopNavbar)
- **Форм-фактор**: Верхняя панель фиксированная (`sticky top-0`) либо плавающая капсула (`sticky top-4`, `rounded-full`).
- **Стилизация**:
  - Фон: `bg-[#090b0e]/85` или `bg-[#14171c]/90` с мощным размытием `backdrop-blur-xl`.
  - Граница: едва заметная дымка `border-b border-white/[0.04]` (или `border border-white/[0.06]` для капсулы).
  - Ссылки навигации: плашки-капсулы `rounded-full`. Активный пункт получает фон `#252c37` и акцентный лаймовый текст `#c0ff00`.
  - Профиль пользователя: аватар с индикатором сетевого статуса (`online` — One Lime точка).

### 1.2. Архитектура сетки (Bento Grid Layout)
- **Скругление карточек**: строго `rounded-[28px]` или `rounded-[32px]`.
- **Внутренние отступы**: `p-6` или `p-7` (`p-6 sm:p-7`).
- **Поверхность**: бархатный темный surface `#14171c` (для elevated модалок `#181c23`).
- **Внешняя граница**: `border border-white/[0.04]`.
- **ЗАПРЕТ на разделители**: Внутри карточек категорически запрещены полосы `border-t`, `border-b`, `<hr />`. Группировка информации осуществляется отступами и плашками `bg-white/[0.03] rounded-2xl`.

---

## 2. Mobile Guidelines (Мобильные интерфейсы)

Мобильные экраны ориентированы на эргономику управления одной рукой («зона большого пальца») и эстетику плавающего дока.

### 2.1. Нижний таб-бар (MobileNavbar)
- **Форм-фактор**: Плавающий внизу экрана Dock в форме капсулы `rounded-full` (`h-[68px]`, `max-w-[420px]`).
- **Позиционирование**: `fixed bottom-0 left-0 right-0 z-50 pointer-events-none px-4 pb-4`, контейнер с `pointer-events-auto`.
- **Стилизация**:
  - Фон: глубокий `bg-[#14171c]/95 backdrop-blur-2xl` с тенью `shadow-[0_12px_40px_rgba(0,0,0,0.8)]`.
  - Внешняя граница: `border border-white/[0.06]`.
  - Скользящая активная капсула: плавный внутренний pill (`bg-[#252c37]` или `bg-white/[0.08]`) с кубической интерполяцией `cubic-bezier(0.25, 1, 0.5, 1)`.
  - Активная иконка и текст: цвет `#c0ff00` с неоновым свечением `drop-shadow-[0_0_8px_rgba(192,255,0,0.6)]`.
  - Неактивные вкладки: приглушенный цвет `#8e8e93`.

### 2.2. Плавающая кнопка действия (Mobile Action Button / FAB)
- **Позиционирование**: строго `fixed bottom-24 right-5 sm:right-7 z-50` — нависает прямо над MobileNavbar.
- **Форма**:
  - Круглая (`circular`): `h-14 w-14 rounded-full aspect-square`.
  - Расширенная (`extended`): `h-14 px-6 rounded-full gap-2.5 text-sm`.
- **Стили**: цвет `#c0ff00`, черный контрастный символ/текст, фирменное свечение `shadow-[0_0_24px_rgba(192,255,0,0.45)]`, анимация нажатия `active:scale-90`.

### 2.3. Нижние шторки (Bottom Sheet / Drawer)
- Полноэкранные или частичные модальные шторки снизу экрана.
- Скругление верхних углов: `rounded-t-[32px]`.
- Верхний индикатор свайпа (handle): полоска `w-12 h-1.5 rounded-full bg-white/20 mx-auto my-2`.

---

## 3. Спецификация компонентов

### 3.1. Кнопки (Button, IconButton, FAB)
- **Все action-кнопки**: строго `rounded-full` (капсульная форма).
- **Primary Button**: фон `#c0ff00` (`bg-oneweb-accent`), жирный черный текст (`text-black font-bold`), обводка отсутствует (`border-none`), hover `#aee600`.
- **Secondary Button**: мягкая подложка `bg-white/5`, текст белого цвета, hover `bg-white/10`.
- **IconButton (Круглые кнопки иконок)**:
  - Форма: идеальный круг `rounded-full aspect-square`.
  - Размеры:
    * `sm`: `h-8 w-8` (иконка 18px)
    * `md`: `h-10 w-10` (иконка 20px / sm)
    * `lg`: `h-12 w-12` (иконка 24px / md)
    * `xl`: `h-14 w-14` (иконка 28px / lg)

### 3.2. Поля ввода (Input)
- **Форма**: капсула `rounded-full`.
- **Размеры**:
  * `md`: высота `h-12`, шрифт 14px.
  * `lg`: высота `h-14`, шрифт 16px.
- **Слоты под иконки**: `leftIcon` и `rightIcon` для Material Symbols Rounded (`OneIcon`).
- **Поверхность**: глубокий мягкий surface `bg-[#14171c]`, граница `border-white/[0.04]`.
- **Фокус**: неоновое кольцо `focus:border-oneweb-accent/50 focus:bg-[#181c23]`.

### 3.3. Табы и Segmented Control (Tabs)
- **Контейнер (`TabsList`)**: сплошная капсула `rounded-full` с темным фоном `bg-[#14171c]` и границей `border-white/[0.04]`.
- **Элементы (`TabsTrigger`)**:
  - Активный элемент: внутренний объемный pill `rounded-full bg-[#252c37]` с текстом `#c0ff00 font-bold`.
  - Неактивные элементы: `text-[#8e8e93] hover:text-white`, никаких рамок.
  - Поддерживает режимы: только текст, либо текст с `OneIcon`.

### 3.4. Бейджи (Badge)
- Сплошные капсулы `rounded-full`.
- Запрещены рамки (outline).
- Фон: низкая прозрачность (`bg-white/5`, `bg-[#c0ff00]/10`, `bg-emerald-500/10`).
- Точка (`dot`): аккуратный круглый светодиод состояния.

---

## 4. Абсолютные запреты (Zero-Tolerance Rules)

1. ❌ **ЗАПРЕТ на прямоугольные кнопки**: Все кнопки `Button`, `IconButton`, `FAB` должны быть `rounded-full`.
2. ❌ **ЗАПРЕТ на квадратные инпуты**: Все текстовые поля ввода должны быть `rounded-full`.
3. ❌ **ЗАПРЕТ на внутренние разделители внутри карточек**: Никаких `border-t`, `border-b`, `<hr />` внутри Bento-блоков.
4. ❌ **ЗАПРЕТ на произвольные неоновые цвета**: Единственный акцентный лайм экосистемы — `#c0ff00` (`--oneweb-accent`).

---

## 5. Импорт компонентов из `@one/web-ui`

```tsx
import {
  DesktopNavbar,
  MobileNavbar,
  MobileActionButton, // или FAB
  Button,
  IconButton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  Dialog,
  Drawer,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  Toast,
  useToast,
  Tooltip,
  SimpleTooltip,
  OneIcon,
} from '@one/web-ui';
```
