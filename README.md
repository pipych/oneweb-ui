# OneWebUI 🎨

> Официальная дизайн-система и библиотека интерфейсных компонентов для экосистемы **One**.

[![Deploy with Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-f38020?logo=cloudflare)](https://webui.onelaunch.pp.ua)
[![License: MIT](https://img.shields.io/badge/License-MIT-c0ff00.svg)](LICENSE)

Витрина компонентов и документация: [webui.onelaunch.pp.ua](https://webui.onelaunch.pp.ua)

---

## ⚡ Стек технологий

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** с жесткой палитрой токенов OneHouse
- **Radix UI** (доступные примитивы: Dialog, Dropdown, Tabs, Switch, Tooltip)
- **clsx** & **tailwind-merge** (`cn` утилита)
- **Wix Madefor Display** (основной шрифт)
- **Material Symbols Rounded** (вариация `FILL: 1`)

---

## 📁 Структура проекта

```
src/
├── ui/                  # Библиотека OneWebUI (экспорт компонентов)
│   ├── tokens/          # Цвета, радиусы, типографика
│   ├── components/      # Атомы и молекулы (Button, Card, Input, Badge, Icon)
│   ├── overlays/        # Модалки, меню, вкладки (Radix UI)
│   ├── utils/           # cn утилита (clsx + tailwind-merge)
│   └── index.ts         # Центральный экспорт UI-кита (@one/web-ui)
└── showcase/            # Сайт-витрина (webui.onelaunch.pp.ua)
    ├── pages/           # Страницы документации компонентов
    ├── layouts/         # Десктопный и мобильный шелл витрины
    └── App.tsx          # Точка входа витрины
```

---

## 🎨 Базовые токены OneHouse

| Название | Значение | Назначение |
|---|---|---|
| `bg-base` | `#090b0e` | Основной фон (Canvas) |
| `surface` | `#14171c` | Карточки / Поверхности |
| `surface-elevated` | `#181c23` | Приподнятые панели |
| `surface-subtle` | `#252c37` | Поля ввода и контролы |
| `accent` | `#c0ff00` | Фирменный акцент (One Lime) |
| `text-muted` | `#8e8e93` | Вторичный текст |
| `border-subtle` | `rgba(255, 255, 255, 0.04)` | Тонкие разделители |

---

## 🚀 Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера витрины
npm run dev

# Проверка типов и сборка для Cloudflare Pages
npm run build

# Локальный предпросмотр собранного бандла
npm run preview
```

---

## 📦 Импорт компонентов

```tsx
import { Button, Card, Input, Badge, Dialog } from '@one/web-ui';

export function Example() {
  return (
    <Card variant="default">
      <Button variant="primary" size="md">
        Сохранить
      </Button>
    </Card>
  );
}
```
