# OneWebUI

Дизайн-система и библиотека компонентов для веб-приложений экосистемы **One**.

## Стек технологий
- **Фреймворк**: React 18 + TypeScript + Vite
- **Стилизация**: Tailwind CSS (неймспейс `oneweb-*`)
- **Иконки**: Google Material Symbols Rounded (`OneIcon`)
- **Типографика**: Wix Madefor Display
- **Headless**: Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-select`, `@radix-ui/react-tooltip`, `@radix-ui/react-toast`)
- **Утилиты**: `clsx`, `tailwind-merge`, `class-variance-authority`

---

## Архитектура токенов
Все токены объявлены в `src/design-system/tokens/oneweb-tokens.json` и экспортируются в `src/index.css` в виде CSS-переменных:
- `--oneweb-bg`: `#090b0e`
- `--oneweb-surface`: `#14171c`
- `--oneweb-surface-elevated`: `#181c23`
- `--oneweb-surface-subtle`: `#252c37`
- `--oneweb-accent`: `#c0ff00` (One Lime)
- `--oneweb-accent-hover`: `#aee600`
- `--oneweb-border`: `rgba(255, 255, 255, 0.1)`
- `--oneweb-text-primary`: `#ffffff`
- `--oneweb-text-secondary`: `#8e8e93`

---

## Компонент OneIcon
```tsx
import { OneIcon } from '@one/web-ui';

// Поддерживает Material Symbols Rounded
<OneIcon name="settings" size="md" fill={true} />
<OneIcon name="check_circle" size="lg" className="text-oneweb-accent" />
```

---

## Запуск и сборка
```bash
# Установка зависимостей
npm install

# Режим разработки
npm run dev

# Продакшн сборка
npm run build
```
