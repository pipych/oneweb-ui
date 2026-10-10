import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Modal,
  ActionMenu,
  Input,
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
  // Modal with cancel action (cross hidden on desktop, drawer on mobile)
  const [modalWithCancel, setModalWithCancel] = useState(false);

  // Modal without cancel action (cross shown on desktop, drawer on mobile)
  const [modalWithoutCancel, setModalWithoutCancel] = useState(false);

  // Dialog & Tabs states
  const [switchState, setSwitchState] = useState(true);
  const [activeTab, setActiveTab] = useState('server');
  const [modalInputVal, setModalInputVal] = useState('');

  // Dropdown action items
  const menuItems = [
    {
      id: 'profile',
      label: 'Профиль пользователя',
      icon: 'person',
      onClick: () => alert('Выбран Профиль'),
    },
    {
      id: 'settings',
      label: 'Настройки инстанса',
      icon: 'settings',
      onClick: () => alert('Выбраны Настройки'),
    },
    {
      id: 'logs',
      label: 'Журнал событий',
      icon: 'receipt_long',
      badge: 'Live',
      onClick: () => alert('Выбран Журнал'),
    },
    {
      separator: true,
      label: '',
    },
    {
      id: 'delete',
      label: 'Остановить ноду',
      icon: 'power_settings_new',
      danger: true,
      onClick: () => alert('Остановка ноды...'),
    },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-10 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="lime">Adaptive Desktop / Mobile</Badge>
            <Badge variant="neutral">Bottom Sheet / Drawer</Badge>
            <Badge variant="neutral">ActionMenu</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Оверлеи (Modal & ActionMenu)
          </h1>
          <p className="text-oneweb-text-secondary text-sm sm:text-base">
            Адаптивная оверлей-система на базе Radix UI и Framer Motion со строгим разделением для Desktop и Mobile.
            На десктопе — центрированные модальные окна и контекстные меню; на мобильных устройствах — плавные шторки (Bottom Sheet) с жестовым свайпом вниз и безопасным клиренсом над плавающим навбаром.
          </p>
        </div>

        {/* 1. Modal & Drawer Showcases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Modal с кнопкой отмены (без крестика на десктопе) */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>1. Модалка с кнопкой отмены</CardTitle>
              <CardDescription>
                Desktop: крестик строго скрыт (есть кнопка отмены в футере). Mobile: шторка со свайпом вниз.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="primary"
                leftIcon={<OneIcon name="check_circle" size={18} />}
                onClick={() => setModalWithCancel(true)}
              >
                Открыть с кнопкой отмены
              </Button>
              <p className="text-xs text-[#8e8e93]">
                Правило дизайн-системы: если в футере есть действия закрытия/отмены, крестик в правом верхнем углу не дублируется.
              </p>
            </CardContent>
          </Card>

          {/* Modal без кнопок отмены (с крестиком на десктопе) */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>2. Модалка без кнопок отмены</CardTitle>
              <CardDescription>
                Desktop: крестик отображается в углу (top-6 right-6). Mobile: шторка без крестика со свайпом вниз.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="secondary"
                leftIcon={<OneIcon name="info" size={18} />}
                onClick={() => setModalWithoutCancel(true)}
              >
                Открыть без кнопок отмены
              </Button>
              <p className="text-xs text-[#8e8e93]">
                На десктопе появляется круглая кнопка закрытия с иконкой <code className="text-white">close</code>. На мобилке крестика нет никогда.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 2. ActionMenu (Три точки: Дропдаун vs Шторка) */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>3. Меню «три точки» (ActionMenu)</CardTitle>
                <CardDescription>
                  Desktop: классический выпадающий список у триггера. Mobile: мобильная шторка под палец.
                </CardDescription>
              </div>
              <ActionMenu items={menuItems} title="Параметры инстанса" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-[24px] bg-[#090b0e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Кастомный триггер для ActionMenu</h4>
                <p className="text-xs text-[#8e8e93] mt-0.5">
                  Нажмите на кнопку справа, чтобы открыть меню опций
                </p>
              </div>
              <ActionMenu
                items={menuItems}
                title="Опции сервиса"
                trigger={
                  <Button variant="outline" rightIcon={<OneIcon name="more_horiz" size={18} />}>
                    Управление
                  </Button>
                }
              />
            </div>
            <p className="text-xs text-[#8e8e93]">
              На экранах смартфонов дропдаунов не существует в принципе: меню автоматически трансформируется в крупный Bottom Sheet со свайпом вниз.
            </p>
          </CardContent>
        </Card>

        {/* 3. Interactive Tabs Section */}
        <Card variant="default">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>4. Переключатель вкладок (Tabs по референсу)</CardTitle>
                <CardDescription>
                  Капсульный контейнер #14171c, скользящая активная плашка #1c222b, счетчики и слот действия
                </CardDescription>
              </div>
              <Badge variant="lime">Активна: {activeTab === 'server' ? 'Сервер' : 'Клиент'}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 sm:p-6 rounded-[24px] bg-[#090b0e] flex flex-col items-start gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList
                  rightAction={
                    <button
                      type="button"
                      onClick={() => alert('Поиск активирован')}
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

                <TabsContent value="server" className="mt-4">
                  <div className="p-5 rounded-[22px] bg-[#14171c] text-left space-y-2">
                    <h4 className="text-white font-bold text-sm">Серверная инфраструктура</h4>
                    <p className="text-xs text-[#8e8e93]">19 активных нод и вычислительных кластеров.</p>
                  </div>
                </TabsContent>

                <TabsContent value="client" className="mt-4">
                  <div className="p-5 rounded-[22px] bg-[#14171c] text-left space-y-2">
                    <h4 className="text-white font-bold text-sm">Клиентские приложения</h4>
                    <p className="text-xs text-[#8e8e93]">20 активных сессий пользователей OneID.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* 4. Switch & Tooltips */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>5. Переключатель & Тултип</CardTitle>
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

        {/* MODAL 1: С кнопкой отмены (hasCancelAction = true) */}
        <Modal
          open={modalWithCancel}
          onClose={() => setModalWithCancel(false)}
          title="Подтверждение изменений"
          description="Вы собираетесь обновить параметры развертывания экосистемы OneHouse."
          hasCancelAction={true}
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalWithCancel(false)}>
                Отмена
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert('Параметры успешно сохранены');
                  setModalWithCancel(false);
                }}
              >
                Сохранить
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-[#8e8e93]">
              На десктопе в правом верхнем углу крестик <strong className="text-white">отсутствует</strong>, так как в футере предусмотрена кнопка «Отмена».
            </p>
            {/* Input inside modal: using contrasting surface="modal" (#181c23) */}
            <Input
              surface="modal"
              label="Имя конфигурации"
              placeholder="Введите имя ноды..."
              value={modalInputVal}
              onChange={(e) => setModalInputVal(e.target.value)}
              icon="tune"
              clearable
              onClear={() => setModalInputVal('')}
              helperText="Подложка #181c23 не сливается с модальным окном #14171c"
            />
          </div>
        </Modal>

        {/* MODAL 2: Без кнопки отмены (hasCancelAction = false) */}
        <Modal
          open={modalWithoutCancel}
          onClose={() => setModalWithoutCancel(false)}
          title="Справка дизайн-системы"
          description="Правила построения интерфейсов OneWebUI"
          hasCancelAction={false}
          footer={
            <Button variant="primary" onClick={() => setModalWithoutCancel(false)} className="w-full sm:w-auto">
              Понятно
            </Button>
          }
        >
          <div className="space-y-3 text-xs leading-relaxed text-[#8e8e93]">
            <p>
              В этом окне <strong className="text-white">нет кнопки отмены</strong> в футере, поэтому на десктопе автоматически отображается кнопка-крестик в правом верхнем углу.
            </p>
            <p>
              На мобильном устройстве это окно открывается как Bottom Sheet и закрывается жестом смахивания вниз.
            </p>
          </div>
        </Modal>
      </div>
    </TooltipProvider>
  );
};
