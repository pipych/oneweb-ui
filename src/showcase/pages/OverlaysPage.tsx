import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Switch,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Icon,
} from '@one/web-ui';

export const OverlaysPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);

  return (
    <TooltipProvider>
      <div className="space-y-10 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Оверлеи и Radix UI примитивы
          </h1>
          <p className="text-oneweb-text-secondary text-sm sm:text-base">
            Доступные интерактивные компоненты с фокусом, клавиатурной навигацией и поддержкой ARIA.
          </p>
        </div>

        {/* Dialog & Dropdown Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dialog Modal */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Диалоговое окно (Dialog)</CardTitle>
              <CardDescription>
                Модальное окно с затемнением бэкдропа и плавной анимацией
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="primary" leftIcon={<Icon name="open_in_new" size={18} />}>
                    Открыть диалог
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div>
                      <DialogTitle>Подтверждение действия</DialogTitle>
                      <DialogDescription className="mt-1">
                        Вы собираетесь применить новые настройки дизайн-системы для проекта.
                      </DialogDescription>
                    </div>
                    <DialogClose onClose={() => setDialogOpen(false)} />
                  </DialogHeader>

                  <div className="py-2 text-sm text-oneweb-text-secondary">
                    Все компоненты автоматически обновят свои токены стилей в соответствии со спецификацией OneHouse.
                  </div>

                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button variant="primary" onClick={() => setDialogOpen(false)}>
                      Применить
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Dropdown Menu */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Выпадающее меню (Dropdown)</CardTitle>
              <CardDescription>
                Всплывающее меню с пунктами, разделителями и иконками
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" rightIcon={<Icon name="expand_more" size={18} />}>
                    Опции пользователя
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="person" size={16} className="mr-2" /> Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="settings" size={16} className="mr-2" /> Настройки
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="palette" size={16} className="mr-2" /> Дизайн-токены
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem danger>
                    <Icon name="logout" size={16} className="mr-2" /> Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </div>

        {/* Tabs & Switch Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tabs */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Вкладки (Tabs)</CardTitle>
              <CardDescription>
                Переключение секций и контента без перезагрузки
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="account">Аккаунт</TabsTrigger>
                  <TabsTrigger value="password">Пароль</TabsTrigger>
                  <TabsTrigger value="billing">Сервер</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="p-4 bg-oneweb-surface-subtle rounded-2xl text-xs text-oneweb-text-secondary">
                  Контент вкладки учетной записи пользователя OneHouse.
                </TabsContent>
                <TabsContent value="password" className="p-4 bg-oneweb-surface-subtle rounded-2xl text-xs text-oneweb-text-secondary">
                  Настройки безопасности и двухфакторной аутентификации.
                </TabsContent>
                <TabsContent value="billing" className="p-4 bg-oneweb-surface-subtle rounded-2xl text-xs text-oneweb-text-secondary">
                  Параметры инстанса и деплоя Cloudflare Pages.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Switch & Tooltips */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Переключатель & Тултип</CardTitle>
              <CardDescription>
                Микро-контролы взаимодействия
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-oneweb-surface-subtle">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Турбо-режим рендеринга</span>
                  <span className="text-xs text-oneweb-text-secondary">Оптимизация для мобильных устройств</span>
                </div>
                <Switch checked={switchState} onCheckedChange={setSwitchState} />
              </div>

              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" leftIcon={<Icon name="help" size={16} />}>
                      Наведи на меня
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Подсказка OneWebUI на базе Radix Tooltip
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="sm" leftIcon={<Icon name="info" size={16} />}>
                      Информация
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Токены соответствуют палитре #c0ff00 и #090b0e
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};
