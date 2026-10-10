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
  OneIcon,
  Badge,
} from '@one/web-ui';

export const OverlaysPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [activeTab, setActiveTab] = useState('server');
  const [searchAlert, setSearchAlert] = useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-10 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="lime">Sliding Capsule (300ms)</Badge>
            <Badge variant="neutral">One Lime (#c0ff00)</Badge>
            <Badge variant="neutral">Action Slot</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Вкладки (Tabs) и Radix UI Оверлеи
          </h1>
          <p className="text-oneweb-text-secondary text-sm sm:text-base">
            Фирменный переключатель вкладок по референсу экосистемы One: капсульная форма,
            плавное перемещение активной плашки, счетчики и слот дополнительного действия.
          </p>
        </div>

        {/* 1. Interactive Tabs Section (Reference Implementation) */}
        <Card variant="default">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>Переключатель вкладок (Tabs по референсу)</CardTitle>
                <CardDescription>
                  Капсульный контейнер #14171c, скользящая активная плашка #1c222b, счетчики и кнопка «Поиск»
                </CardDescription>
              </div>
              <Badge variant="lime">Активна: {activeTab === 'server' ? 'Сервер' : 'Клиент'}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 sm:p-6 rounded-[24px] bg-[#090b0e] flex flex-col items-start gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Reference Tabs Layout */}
                <TabsList
                  rightAction={
                    <button
                      type="button"
                      onClick={() => setSearchAlert(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#8e8e93] hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer select-none sf-tap"
                    >
                      <OneIcon name="search" size={16} />
                      <span>Поиск</span>
                    </button>
                  }
                >
                  <TabsTrigger value="server" icon="dns" count={19}>
                    Сервер
                  </TabsTrigger>
                  <TabsTrigger value="client" icon="computer" count={20}>
                    Клиент
                  </TabsTrigger>
                </TabsList>

                {/* Tab Contents */}
                <TabsContent value="server" className="mt-4">
                  <div className="p-5 rounded-[22px] bg-[#14171c] border-none text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[12px] bg-[#1c222b] flex items-center justify-center text-[#c0ff00]">
                          <OneIcon name="dns" size={18} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">Серверная инфраструктура</h4>
                          <p className="text-[#8e8e93] text-xs">19 активных нод и кластеров OneHouse</p>
                        </div>
                      </div>
                      <Badge variant="lime">19 Онлайн</Badge>
                    </div>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Управление вычислительными ресурсами, контейнерами Docker, логами сборки и сетевыми портами.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="client" className="mt-4">
                  <div className="p-5 rounded-[22px] bg-[#14171c] border-none text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[12px] bg-[#1c222b] flex items-center justify-center text-[#c0ff00]">
                          <OneIcon name="computer" size={18} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">Клиентские приложения</h4>
                          <p className="text-[#8e8e93] text-xs">20 подключенных клиентов и сессий</p>
                        </div>
                      </div>
                      <Badge variant="neutral">20 Сессий</Badge>
                    </div>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      Клиентские рабочие места, веб-интерфейсы, сессии авторизации OneID и мобильные клиенты.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {searchAlert && (
                <div className="w-full p-3 rounded-full bg-[#1c222b] text-xs text-white flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2 px-2">
                    <OneIcon name="search" size={16} className="text-[#c0ff00]" />
                    <span>Поисковая строка или шорткат активирован из слота действия Tabs.</span>
                  </div>
                  <button
                    onClick={() => setSearchAlert(false)}
                    className="text-[#8e8e93] hover:text-white px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
                  >
                    Закрыть
                  </button>
                </div>
              )}
            </div>

            {/* Code Specification */}
            <div className="rounded-2xl bg-black/60 p-4 font-mono text-xs text-oneweb-text-secondary overflow-x-auto">
              <pre>
                <span className="text-oneweb-accent">import</span> &#123; Tabs, TabsList, TabsTrigger, TabsContent, OneIcon &#125; <span className="text-oneweb-accent">from</span> <span className="text-emerald-400">'@one/web-ui'</span>;{'\n\n'}
                &lt;<span className="text-blue-400">Tabs</span> defaultValue=<span className="text-emerald-400">"server"</span>&gt;{'\n'}
                {'  '}&lt;<span className="text-blue-400">TabsList</span>{'\n'}
                {'    '}rightAction=&#123;&lt;<span className="text-blue-400">button</span>&gt;&lt;<span className="text-blue-400">OneIcon</span> name=<span className="text-emerald-400">"search"</span> /&gt; Поиск&lt;/<span className="text-blue-400">button</span>&gt;&#125;{'\n'}
                {'  '}&gt;{'\n'}
                {'    '}&lt;<span className="text-blue-400">TabsTrigger</span> value=<span className="text-emerald-400">"server"</span> icon=<span className="text-emerald-400">"dns"</span> count=&#123;<span className="text-amber-400">19</span>&#125;&gt;Сервер&lt;/<span className="text-blue-400">TabsTrigger</span>&gt;{'\n'}
                {'    '}&lt;<span className="text-blue-400">TabsTrigger</span> value=<span className="text-emerald-400">"client"</span> icon=<span className="text-emerald-400">"computer"</span> count=&#123;<span className="text-amber-400">20</span>&#125;&gt;Клиент&lt;/<span className="text-blue-400">TabsTrigger</span>&gt;{'\n'}
                {'  '}&lt;/<span className="text-blue-400">TabsList</span>&gt;{'\n\n'}
                {'  '}&lt;<span className="text-blue-400">TabsContent</span> value=<span className="text-emerald-400">"server"</span>&gt;...&lt;/<span className="text-blue-400">TabsContent</span>&gt;{'\n'}
                {'  '}&lt;<span className="text-blue-400">TabsContent</span> value=<span className="text-emerald-400">"client"</span>&gt;...&lt;/<span className="text-blue-400">TabsContent</span>&gt;{'\n'}
                &lt;/<span className="text-blue-400">Tabs</span>&gt;
              </pre>
            </div>
          </CardContent>
        </Card>

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

        {/* Switch & Tooltips */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Переключатель & Тултип</CardTitle>
            <CardDescription>Микро-контролы взаимодействия</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#14171c]">
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
    </TooltipProvider>
  );
};
