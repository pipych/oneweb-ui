import React, { useState, useEffect, useRef } from 'react';
import {
  SFSymbol,
  BrandLoader,
  ResourceGauge,
  AppLogo,
  BottomSheet,
  PlayerAvatar,
  MobileTabBar,
  DesktopSidebar,
  useDeviceMode,
  ServerStatus,
  TabId,
} from './design-system';

export function App() {
  const { isDesktop, setViewMode } = useDeviceMode();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [activeSubTab, setActiveSubTab] = useState<'properties' | 'gamerules' | 'players'>('properties');

  // Simulated authentic server status
  const [status, setStatus] = useState<ServerStatus>({
    status: 'online',
    uptimeSeconds: 84200,
    cpuPercent: 14,
    ramUsedMB: 3890,
    ramTotalMB: 8192,
    tps: 20.0,
    players: {
      online: 3,
      max: 20,
      list: ['Notch', 'Alex', 'Steve'],
    },
    serverInfo: {
      motd: '§a§lOneHouse §7- Уютный приватный сервер 1.21.1',
      version: 'NeoForge 1.21.1',
      difficulty: 'Hard',
      gamemode: 'Survival',
    },
    lastLogLine: '[Server thread/INFO]: Done (12.4s)! For help, type "help"',
    error: null,
  });

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [startupProgress, setStartupProgress] = useState(15);
  const [startupLogLine, setStartupLogLine] = useState('');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showIpModal, setShowIpModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    type: 'stop' | 'restart';
    title: string;
    description: string;
  }>({
    open: false,
    type: 'stop',
    title: '',
    description: '',
  });

  // Interactive gamerules state
  const [gamerules, setGamerules] = useState<{ [key: string]: boolean }>({
    keepInventory: true,
    mobGriefing: false,
    doDaylightCycle: true,
    doFireTick: false,
    naturalRegeneration: true,
    showDeathMessages: true,
  });

  // Interactive console state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[12:40:01 INFO]: Preparing start region for dimension minecraft:overworld',
    '[12:40:03 INFO]: Time elapsed: 1824 ms',
    '[12:40:04 INFO]: Done (12.4s)! For help, type "help"',
    '[12:45:22 INFO]: Steve logged in with entity id 142 at (-120.5, 64.0, 240.5)',
    '[12:48:10 INFO]: Alex joined the game',
    '[12:55:00 INFO]: Notch joined the game',
  ]);
  const [consoleInput, setConsoleInput] = useState('');

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(text);
    setTimeout(() => setCopiedItem(null), 2000);
    showToast(`${label} скопирован в буфер!`);
  };

  // Start Server handler with simulated real progress
  const handleStart = () => {
    setActionLoading('start');
    setStatus((prev) => ({ ...prev, status: 'starting', tps: 0 }));
    setStartupProgress(20);
    setStartupLogLine('Инициализация NeoForge 1.21.1...');

    setTimeout(() => {
      setStartupProgress(45);
      setStartupLogLine('Загрузка модов и библиотек Create 6.0...');
    }, 1000);

    setTimeout(() => {
      setStartupProgress(75);
      setStartupLogLine('Preparing level minecraft:overworld...');
    }, 2000);

    setTimeout(() => {
      setStartupProgress(100);
      setStartupLogLine('Done (12.4s)! For help, type "help"');
      setStatus((prev) => ({
        ...prev,
        status: 'online',
        tps: 20.0,
        cpuPercent: 18,
        ramUsedMB: 3950,
      }));
      setActionLoading(null);
      showToast('Сервер успешно запущен!');
    }, 3200);
  };

  const handleStopConfirm = () => {
    const isRestart = confirmModal.type === 'restart';
    setConfirmModal((prev) => ({ ...prev, open: false }));
    setActionLoading(isRestart ? 'restart' : 'stop');

    if (isRestart) {
      setStatus((prev) => ({ ...prev, status: 'stopping', tps: 0 }));
      setTimeout(() => {
        handleStart();
      }, 1500);
    } else {
      setStatus((prev) => ({ ...prev, status: 'stopping', tps: 0 }));
      setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          status: 'offline',
          tps: 0,
          cpuPercent: 0,
          ramUsedMB: 0,
          players: { ...prev.players, online: 0, list: [] },
        }));
        setActionLoading(null);
        showToast('Сервер остановлен');
      }, 1800);
    }
  };

  const handleSendConsole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    const cmd = consoleInput.trim();
    setConsoleLogs((prev) => [...prev, `> ${cmd}`, `[Server]: Executed "${cmd}"`]);
    setConsoleInput('');
  };

  const isOnline = status.status === 'online';
  const isPending = status.status === 'starting' || status.status === 'stopping' || actionLoading !== null;
  const ramPercent = Math.min(100, Math.round((status.ramUsedMB / status.ramTotalMB) * 100));

  return (
    <div
      className={`min-h-screen bg-[#090b0e] text-white flex ${
        isDesktop ? 'flex-row' : 'flex-col'
      } selection:bg-[#c0ff00]/30 selection:text-[#c0ff00]`}
    >
      {/* Тост уведомление */}
      {notification && (
        <div
          className={`fixed top-6 left-4 right-4 z-[110] p-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-xl animate-slide-up max-w-md mx-auto ${
            notification.type === 'success'
              ? 'bg-[#14171c]/95 text-[#c0ff00]'
              : 'bg-[#14171c]/95 text-red-400'
          }`}
        >
          <SFSymbol
            name={notification.type === 'success' ? 'checkmark.circle.fill' : 'exclamationmark.triangle.fill'}
            size={18}
          />
          <span>{notification.text}</span>
        </div>
      )}

      {/* Левая навигационная панель (Sidebar) для экранов десктопа */}
      {isDesktop && (
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          status={status}
          onSwitchToMobile={() => setViewMode('mobile')}
        />
      )}

      {/* Основная рабочая область контента */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Мобильная шапка бренда (скрыта на экранах ПК/десктопа) */}
        {!isDesktop && (
          <header className="w-full max-w-md mx-auto px-4 pt-3 pb-1 flex items-center justify-between safe-top">
            <div className="flex items-center gap-2.5">
              <AppLogo className="w-7 h-7 text-[#c0ff00] transition-transform active:scale-90 sf-tap" />
              <span className="font-extrabold text-white text-base tracking-tight">OneHouse</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 text-white/80 active:scale-95 sf-tap transition-all"
              >
                ПК вид
              </button>
            </div>
          </header>
        )}

        {/* Экран контента */}
        <main className="flex-1 w-full overflow-x-hidden">
          <div
            className={`flex flex-col gap-4 ${
              isDesktop
                ? 'pb-8 pt-6 px-4 sm:px-6 max-w-7xl'
                : 'pb-28 pt-2 px-4 max-w-md'
            } mx-auto w-full animate-fade-in`}
          >
            {/* На вкладках Сервер / Настройки отображаем переключатель разделов (Segmented Control) */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div
                className={`bg-[#14171c] p-1 rounded-full flex items-center transition-all ${
                  isDesktop ? 'w-full max-w-sm h-10' : 'w-full max-w-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveSubTab('properties')}
                  className={`flex-1 ${
                    isDesktop ? 'h-full flex items-center justify-center' : 'py-2.5'
                  } rounded-full text-xs font-black transition-all sf-tap ${
                    activeSubTab === 'properties'
                      ? 'bg-[#252c37] text-[#c0ff00] shadow-md'
                      : 'text-[#8e8e93] hover:text-white'
                  }`}
                >
                  Сервер
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('gamerules')}
                  className={`flex-1 ${
                    isDesktop ? 'h-full flex items-center justify-center' : 'py-2.5'
                  } rounded-full text-xs font-black transition-all sf-tap ${
                    activeSubTab === 'gamerules'
                      ? 'bg-[#252c37] text-[#c0ff00] shadow-md'
                      : 'text-[#8e8e93] hover:text-white'
                  }`}
                >
                  Правила игры
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('players')}
                  className={`flex-1 ${
                    isDesktop ? 'h-full flex items-center justify-center' : 'py-2.5'
                  } rounded-full text-xs font-black transition-all sf-tap ${
                    activeSubTab === 'players'
                      ? 'bg-[#252c37] text-[#c0ff00] shadow-md'
                      : 'text-[#8e8e93] hover:text-white'
                  }`}
                >
                  Игроки
                </button>
              </div>

              {isDesktop && (
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className="text-xs font-bold px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 active:scale-95 sf-tap transition-all"
                >
                  Мобильный вид
                </button>
              )}
            </div>

            {/* Вкладка 1: Главный экран сервера (Dashboard) */}
            {activeSubTab === 'properties' && (
              <>
                {/* Сетка виджетов пазлом на десктопе */}
                <div
                  className={
                    isDesktop
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch'
                      : 'flex flex-col gap-4'
                  }
                >
                  {/* Главная Hero Карточка сервера (2 колонки на десктопе) */}
                  <div
                    className={`relative rounded-3xl p-5 glass-panel overflow-hidden shadow-2xl ${
                      isDesktop ? 'col-span-1 md:col-span-2 xl:col-span-2' : ''
                    } flex flex-col justify-between`}
                  >
                    {/* Фоновое неоновое свечение */}
                    <div
                      className={`absolute -right-16 -top-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
                        isOnline
                          ? 'bg-[#c0ff00]/15'
                          : status.status === 'starting'
                          ? 'bg-amber-400/20'
                          : status.status === 'stopping'
                          ? 'bg-orange-500/15'
                          : 'bg-red-500/10'
                      }`}
                    />

                    <div className="flex items-center justify-between gap-3 relative z-10">
                      {/* Адрес сервера слева */}
                      <span className="text-xl font-black text-white font-mono tracking-tight select-all truncate min-w-0">
                        onehouse.pp.ua
                      </span>

                      {/* Блок справа: Кнопка копирования, кнопка ℹ️ и статус сервера */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Кнопка копировать чисто иконкой */}
                        <button
                          onClick={() => handleCopyText('onehouse.pp.ua', 'Адрес onehouse.pp.ua')}
                          className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-90 sf-tap transition-colors duration-200 shrink-0 ${
                            copiedItem === 'onehouse.pp.ua'
                              ? 'bg-[#c0ff00]/25 text-[#c0ff00]'
                              : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'
                          }`}
                          title="Копировать адрес"
                        >
                          <div className="relative w-4 h-4 flex items-center justify-center">
                            <span
                              className={`absolute transition-all duration-300 transform ${
                                copiedItem === 'onehouse.pp.ua'
                                  ? 'opacity-100 scale-100 rotate-0'
                                  : 'opacity-0 scale-50 -rotate-45'
                              }`}
                            >
                              <SFSymbol name="checkmark.circle.fill" size={15} className="text-[#c0ff00]" animated={false} />
                            </span>
                            <span
                              className={`absolute transition-all duration-300 transform ${
                                copiedItem === 'onehouse.pp.ua'
                                  ? 'opacity-0 scale-50 rotate-45'
                                  : 'opacity-100 scale-100 rotate-0'
                              }`}
                            >
                              <SFSymbol name="doc.on.doc.fill" size={14} animated={false} />
                            </span>
                          </div>
                        </button>

                        {/* Круглая кнопка подсказки ℹ️ */}
                        <button
                          onClick={() => setShowIpModal(true)}
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center active:scale-90 sf-tap transition-all shrink-0 text-white/80 hover:text-white"
                          title="Подробные адреса подключения"
                        >
                          <SFSymbol name="info.circle.fill" size={16} animated={false} />
                        </button>

                        {/* Статус сервера: цветной кружок */}
                        <div
                          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0"
                          title={
                            status.status === 'online'
                              ? 'Онлайн'
                              : status.status === 'starting'
                              ? 'Запуск'
                              : status.status === 'stopping'
                              ? 'Остановка'
                              : 'Оффлайн'
                          }
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                              isOnline
                                ? 'bg-[#c0ff00]'
                                : status.status === 'starting'
                                ? 'bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                                : status.status === 'stopping'
                                ? 'bg-orange-500 animate-pulse'
                                : 'bg-red-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Строка консоли / Ошибка / Статус */}
                    {(status.status === 'starting' || status.status === 'stopping' || (!isOnline && status.status === 'offline')) && (
                      <div className="mt-3.5 pt-3 flex items-center justify-between gap-2 text-xs relative z-10">
                        {status.status === 'starting' ? (
                          <div className="flex flex-col gap-1.5 w-full">
                            <div className="relative w-full h-8 rounded-full bg-black/40 overflow-hidden flex items-center px-3.5 shadow-inner">
                              <div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500/40 via-amber-400/50 to-amber-300/60 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${Math.max(10, Math.min(100, startupProgress))}%` }}
                              />
                              <div className="relative z-10 flex items-center justify-between w-full text-[11px] font-mono text-amber-200">
                                <div className="flex items-center gap-2 truncate min-w-0 pr-2">
                                  <BrandLoader size={11} color="#fbbf24" className="shrink-0" />
                                  <span className="truncate font-medium text-amber-100">
                                    {startupLogLine || 'Запуск компонентов Minecraft...'}
                                  </span>
                                </div>
                                <span className="text-[10px] font-black text-amber-300 shrink-0 font-mono pl-1">
                                  {Math.round(startupProgress)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : status.status === 'stopping' ? (
                          <div className="flex items-center gap-2.5 text-orange-300 font-mono text-[11px] truncate w-full bg-orange-500/15 px-3.5 py-2 rounded-full">
                            <BrandLoader size={12} color="#f97316" className="shrink-0" />
                            <span className="truncate flex-1 font-medium">Остановка сервера и сохранение мира...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[#8e8e93] font-mono text-[11px] truncate w-full px-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            <span className="truncate flex-1">Сервер выключен</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Кнопки управления сервером */}
                    <div className="mt-3.5 grid grid-cols-3 gap-2 relative z-10">
                      {status.status === 'starting' ? (
                        <>
                          <button
                            disabled
                            className="h-12 col-span-2 rounded-full bg-amber-400/20 text-amber-300 font-black text-sm flex items-center justify-center gap-2.5 active:scale-95 sf-tap transition-all disabled:opacity-90"
                          >
                            <BrandLoader size={12} color="#fbbf24" />
                            <span>Запуск сервера...</span>
                          </button>
                          <button
                            onClick={() =>
                              setConfirmModal({
                                open: true,
                                type: 'stop',
                                title: 'Прервать запуск сервера?',
                                description: 'Процесс запуска будет остановлен.',
                              })
                            }
                            className="h-12 col-span-1 rounded-full bg-red-500/20 text-red-400 font-black text-sm flex items-center justify-center gap-1.5 active:scale-95 sf-tap transition-all hover:bg-red-500/30"
                          >
                            <SFSymbol name="stop.fill" size={15} animated={false} />
                            <span>Стоп</span>
                          </button>
                        </>
                      ) : status.status === 'stopping' ? (
                        <button
                          disabled
                          className="col-span-3 h-12 rounded-full bg-orange-500/20 text-orange-400 font-black text-sm flex items-center justify-center gap-2.5 active:scale-95 sf-tap transition-all disabled:opacity-90"
                        >
                          <BrandLoader size={12} color="#f97316" />
                          <span>Остановка сервера...</span>
                        </button>
                      ) : !isOnline ? (
                        <button
                          onClick={handleStart}
                          disabled={isPending}
                          className="col-span-3 h-12 rounded-full bg-[#c0ff00] text-[#090b0e] font-black text-sm flex items-center justify-center gap-2.5 active:scale-95 sf-tap transition-all disabled:opacity-50"
                        >
                          {actionLoading === 'start' ? (
                            <>
                              <BrandLoader size={12} color="#090b0e" />
                              <span>Запуск...</span>
                            </>
                          ) : (
                            <>
                              <SFSymbol name="play.fill" size={17} animated={false} />
                              <span>Запустить сервер</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              setConfirmModal({
                                open: true,
                                type: 'restart',
                                title: 'Перезапустить сервер?',
                                description: 'Все подключенные игроки будут временно отключены.',
                              })
                            }
                            disabled={isPending}
                            className="h-12 col-span-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-black text-sm flex items-center justify-center gap-2.5 active:scale-95 sf-tap transition-all disabled:opacity-50"
                          >
                            <SFSymbol name="arrow.clockwise" size={16} animated={false} />
                            <span>Перезапустить</span>
                          </button>

                          <button
                            onClick={() =>
                              setConfirmModal({
                                open: true,
                                type: 'stop',
                                title: 'Остановить сервер?',
                                description: 'Мир будет сохранён, сервер перейдёт в статус Оффлайн.',
                              })
                            }
                            disabled={isPending}
                            className="h-12 col-span-1 rounded-full bg-red-500/20 text-red-400 font-black text-sm flex items-center justify-center gap-1.5 active:scale-95 sf-tap transition-all hover:bg-red-500/30 disabled:opacity-50"
                          >
                            <SFSymbol name="stop.fill" size={15} animated={false} />
                            <span>Стоп</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Метрики производительности (CPU / RAM / TPS) */}
                  <div
                    className={`rounded-3xl p-4 glass-panel flex flex-col justify-between gap-3 ${
                      isDesktop ? 'col-span-1 md:col-span-2 xl:col-span-1' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between pb-0.5">
                      <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                        <SFSymbol name="bolt.fill" size={14} className="text-[#c0ff00]" />
                        Ресурсы
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-0.5 items-center">
                      {/* TPS */}
                      <ResourceGauge
                        value={isOnline ? (status.tps ?? 20.0).toFixed(1) : '—'}
                        label="TPS"
                        percent={isOnline ? Math.min(100, Math.max(0, ((status.tps ?? 20.0) / 20.0) * 100)) : 0}
                        color={!isOnline ? '#8e8e93' : '#c0ff00'}
                        strokeWidth={9}
                        size={94}
                      />

                      {/* RAM */}
                      <ResourceGauge
                        value={`${ramPercent}%`}
                        label="RAM"
                        percent={ramPercent}
                        color={ramPercent > 90 ? '#ef4444' : '#c0ff00'}
                        strokeWidth={9}
                        size={94}
                      />

                      {/* CPU */}
                      <ResourceGauge
                        value={`${status.cpuPercent}%`}
                        label="CPU"
                        percent={status.cpuPercent}
                        color={status.cpuPercent > 90 ? '#ef4444' : '#c0ff00'}
                        strokeWidth={9}
                        size={94}
                      />
                    </div>
                  </div>

                  {/* Список игроков онлайн */}
                  <div
                    className={`rounded-3xl p-4 glass-panel flex flex-col gap-3 ${
                      isDesktop ? 'col-span-1 md:col-span-1 xl:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SFSymbol name="person.2.fill" size={16} className="text-[#c0ff00]" />
                        <span className="text-xs font-black uppercase tracking-wider text-white">
                          Игроки в игре
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-extrabold text-white">
                          {status.players.online}
                        </span>
                      </div>

                      <button
                        onClick={() => setShowBroadcastModal(true)}
                        className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-bold text-[#c0ff00] flex items-center gap-1 active:scale-95 sf-tap transition-all"
                      >
                        <SFSymbol name="arrow.up" size={13} animated={false} />
                        Объявление
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {status.players.list.map((nickname) => (
                        <div
                          key={nickname}
                          className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <PlayerAvatar name={nickname} size={32} />
                            <span className="text-sm font-bold text-white">{nickname}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setStatus((prev) => ({
                                  ...prev,
                                  players: {
                                    ...prev.players,
                                    online: Math.max(0, prev.players.online - 1),
                                    list: prev.players.list.filter((p) => p !== nickname),
                                  },
                                }));
                                showToast(`Игрок ${nickname} кикнут`);
                              }}
                              className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold active:scale-95 sf-tap transition-all"
                            >
                              Кик
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Виджет «Модпак» на десктопе */}
                  {isDesktop && (
                    <div className="flex flex-col justify-between rounded-3xl p-5 glass-panel transition-all shadow-xl col-span-1 md:col-span-1 xl:col-span-1 text-left">
                      <div className="flex items-center justify-between w-full">
                        <div className="w-12 h-12 rounded-2xl bg-[#c0ff00]/10 flex items-center justify-center text-[#c0ff00] shrink-0">
                          <SFSymbol name="deployed_code" size={24} animated={false} />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-bold text-[#c0ff00] flex items-center gap-1">
                          <span>Установлен</span>
                          <SFSymbol name="checkmark" size={12} animated={false} />
                        </span>
                      </div>

                      <div className="flex flex-col items-start text-left mt-4 w-full">
                        <h3 className="text-lg font-black text-white text-left">
                          Модпак NeoForge
                        </h3>
                        <p className="text-xs text-[#8e8e93] mt-0.5 text-left">
                          Create 6.0, Appleskin, BlueMap (48 модов)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Интерактивная консоль на главной */}
                  <div className="col-span-1 md:col-span-2 xl:col-span-3 rounded-3xl p-5 glass-panel flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SFSymbol name="terminal" size={16} className="text-[#c0ff00]" />
                        <span className="text-xs font-black uppercase tracking-wider text-white">
                          Консоль сервера
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8e8e93] font-mono">
                        port 25565
                      </span>
                    </div>

                    {/* Вывод логов */}
                    <div className="bg-black/50 rounded-2xl p-3 font-mono text-xs text-white/80 h-36 overflow-y-auto space-y-1">
                      {consoleLogs.map((log, i) => (
                        <div key={i} className="leading-relaxed">
                          {log.startsWith('>') ? (
                            <span className="text-[#c0ff00] font-bold">{log}</span>
                          ) : (
                            <span className="text-[#8e8e93]">{log}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Ввод команд */}
                    <form onSubmit={handleSendConsole} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={consoleInput}
                        onChange={(e) => setConsoleInput(e.target.value)}
                        placeholder="Введите команду сервера (например: time set day)..."
                        className="flex-1 h-11 px-4 rounded-full bg-white/[0.06] text-white text-xs font-mono border-none outline-none focus:bg-white/[0.09] transition-all"
                      />
                      <button
                        type="submit"
                        className="h-11 px-5 rounded-full bg-[#c0ff00] text-[#090b0e] font-black text-xs active:scale-95 sf-tap transition-all shrink-0"
                      >
                        Отправить
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}

            {/* Вкладка 2: Правила игры (Gamerules) */}
            {activeSubTab === 'gamerules' && (
              <div className="rounded-3xl p-5 glass-panel flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div>
                    <h3 className="text-base font-black text-white">Правила мира (Gamerules)</h3>
                    <p className="text-xs text-[#8e8e93] mt-0.5">
                      Изменения применяются мгновенно без перезагрузки сервера
                    </p>
                  </div>
                </div>

                <div className="flex flex-col divide-y divide-white/5">
                  {Object.entries(gamerules).map(([key, val]) => (
                    <div key={key} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white font-mono">{key}</span>
                        <span className="text-xs text-[#8e8e93]">
                          {key === 'keepInventory'
                            ? 'Сохранение инвентаря после смерти игрока'
                            : key === 'mobGriefing'
                            ? 'Разрушение блоков криперами и мобами'
                            : key === 'doDaylightCycle'
                            ? 'Смена дня и ночи'
                            : key === 'doFireTick'
                            ? 'Распространение огня'
                            : key === 'naturalRegeneration'
                            ? 'Естественная регенерация здоровья'
                            : 'Оповещения о смерти в чате'}
                        </span>
                      </div>

                      <label className="ios-switch shrink-0 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={(e) => {
                            setGamerules((prev) => ({ ...prev, [key]: e.target.checked }));
                            showToast(`Правило ${key} обновлено`);
                          }}
                        />
                        <span className="ios-slider" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Вкладка 3: Игроки */}
            {activeSubTab === 'players' && (
              <div className="rounded-3xl p-5 glass-panel flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-white">Управление игроками</h3>
                    <p className="text-xs text-[#8e8e93]">Онлайн: {status.players.online} / {status.players.max}</p>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt('Никнейм игрока для добавления в белый список:');
                      if (name) {
                        setStatus((prev) => ({
                          ...prev,
                          players: {
                            ...prev.players,
                            online: prev.players.online + 1,
                            list: [...prev.players.list, name],
                          },
                        }));
                        showToast(`Игрок ${name} добавлен`);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#c0ff00] text-[#090b0e] font-black text-xs active:scale-95 sf-tap transition-all"
                  >
                    + Добавить
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {status.players.list.map((nickname) => (
                    <div
                      key={nickname}
                      className="flex items-center justify-between p-3 rounded-2xl bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <PlayerAvatar name={nickname} size={36} />
                        <div>
                          <span className="text-sm font-bold text-white block">{nickname}</span>
                          <span className="text-[11px] text-[#c0ff00] font-medium">Игрок онлайн</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showToast(`${nickname} назначен оператором`)}
                          className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold active:scale-95 sf-tap transition-all"
                        >
                          OP
                        </button>
                        <button
                          onClick={() => {
                            setStatus((prev) => ({
                              ...prev,
                              players: {
                                ...prev.players,
                                online: Math.max(0, prev.players.online - 1),
                                list: prev.players.list.filter((p) => p !== nickname),
                              },
                            }));
                            showToast(`${nickname} кикнут`);
                          }}
                          className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-bold active:scale-95 sf-tap transition-all"
                        >
                          Кик
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Нижний парящий Island Dock (только для мобильных экранов) */}
      {!isDesktop && (
        <MobileTabBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'dashboard') setActiveSubTab('properties');
            if (tab === 'settings') setActiveSubTab('gamerules');
            if (tab === 'players') setActiveSubTab('players');
          }}
        />
      )}

      {/* Модальное окно подтверждения Stop / Restart */}
      <BottomSheet
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
      >
        <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center text-red-400 mx-auto">
          <SFSymbol name="exclamationmark.triangle.fill" size={24} animated={false} />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-black text-white">{confirmModal.title}</h3>
          <p className="text-xs text-[#8e8e93] font-medium mt-1">
            {confirmModal.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            onClick={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
            className="h-12 rounded-full bg-white/10 text-white font-black text-sm active:scale-95 sf-tap transition-all"
          >
            Отмена
          </button>
          <button
            onClick={handleStopConfirm}
            className="h-12 rounded-full bg-red-500 text-white font-black text-sm active:scale-95 sf-tap transition-all"
          >
            Подтвердить
          </button>
        </div>
      </BottomSheet>

      {/* Модальное окно с подробными адресами сервера (ℹ️) */}
      <BottomSheet
        isOpen={showIpModal}
        onClose={() => setShowIpModal(false)}
        title="Подключение к серверу"
      >
        <div className="flex flex-col gap-3">
          <div className="p-3.5 rounded-2xl bg-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#8e8e93] block">Java Edition (основной)</span>
              <span className="text-sm font-black text-white font-mono">onehouse.pp.ua</span>
            </div>
            <button
              onClick={() => handleCopyText('onehouse.pp.ua', 'Java IP')}
              className="px-3 py-1.5 rounded-full bg-[#c0ff00] text-[#090b0e] font-black text-xs active:scale-95 sf-tap transition-all"
            >
              Копировать
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#8e8e93] block">Bedrock Edition (смартфоны)</span>
              <span className="text-sm font-black text-white font-mono">onehouse.pp.ua : 19132</span>
            </div>
            <button
              onClick={() => handleCopyText('onehouse.pp.ua:19132', 'Bedrock IP')}
              className="px-3 py-1.5 rounded-full bg-white/10 text-white font-black text-xs active:scale-95 sf-tap transition-all"
            >
              Копировать
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#8e8e93] block">Прямой IP адрес</span>
              <span className="text-sm font-black text-white font-mono">188.114.96.10:25565</span>
            </div>
            <button
              onClick={() => handleCopyText('188.114.96.10:25565', 'Direct IP')}
              className="px-3 py-1.5 rounded-full bg-white/10 text-white font-black text-xs active:scale-95 sf-tap transition-all"
            >
              Копировать
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* Модальное окно объявления */}
      <BottomSheet
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        title="Отправить объявление игрокам"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            placeholder="Текст сообщения в чат сервера..."
            className="w-full h-12 rounded-full bg-white/[0.06] text-white text-sm font-medium px-4 border-none outline-none focus:bg-white/[0.09]"
          />
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => setShowBroadcastModal(false)}
              className="h-12 rounded-full bg-white/10 text-white font-black text-sm active:scale-95 sf-tap transition-all"
            >
              Отмена
            </button>
            <button
              onClick={() => {
                if (broadcastText.trim()) {
                  showToast(`Объявление отправлено: "${broadcastText}"`);
                  setBroadcastText('');
                  setShowBroadcastModal(false);
                }
              }}
              className="h-12 rounded-full bg-[#c0ff00] text-[#090b0e] font-black text-sm active:scale-95 sf-tap transition-all"
            >
              Отправить
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default App;
