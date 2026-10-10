import { useState, useEffect } from 'react';

export type ViewMode = 'auto' | 'desktop' | 'mobile';

const STORAGE_KEY = 'onehouse_view_mode';

/**
 * Определение, является ли клиент настольным компьютером (ПК / Mac / Linux / Telegram Desktop / Браузер на ПК)
 */
export function isDesktopDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Проверка через Telegram WebApp platform (если запущено внутри Telegram)
  const tg = (window as any).Telegram?.WebApp;
  const tgPlatform = typeof tg?.platform === 'string' ? tg.platform.toLowerCase() : '';

  if (tgPlatform) {
    // Нативные настольные клиенты Telegram и веб-версии на ПК
    if (['tdesktop', 'macos', 'web', 'weba', 'webk'].includes(tgPlatform)) {
      return true;
    }
    // Мобильные приложения Telegram
    if (['android', 'ios'].includes(tgPlatform)) {
      return false;
    }
  }

  // 2. Проверка User-Agent браузера
  const ua = navigator.userAgent || '';
  const platform = (navigator as any).userAgentData?.platform || navigator.platform || '';

  // Смартфоны и мобильные устройства
  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  if (isMobileUA) {
    return false;
  }

  // iPad / планшеты
  const isIPad = /iPad/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua));
  if (isIPad) {
    return window.innerWidth >= 640;
  }

  // Настольные операционные системы: Windows, Mac, Linux
  const isDesktopOS =
    /Win|Mac|Linux/i.test(platform) ||
    /Windows NT|Macintosh|X11|Linux/i.test(ua);

  if (isDesktopOS && !/Android/i.test(ua)) {
    return true;
  }

  // 3. Fallback: по разрешению экрана (от 640px)
  return window.innerWidth >= 640;
}

/**
 * Получение текущего эффективного режима с учетом пользовательского переключателя
 */
export function getEffectiveIsDesktop(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
    if (saved === 'desktop') return true;
    if (saved === 'mobile') return false;
  } catch (e) {
    // ignore
  }

  return isDesktopDevice();
}

/**
 * Хук для отслеживания и переключения режима отображения
 */
export function useDeviceMode() {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => getEffectiveIsDesktop());
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as ViewMode) || 'auto';
    } catch {
      return 'auto';
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setIsDesktop(getEffectiveIsDesktop());
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const setViewMode = (mode: ViewMode) => {
    try {
      if (mode === 'auto') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, mode);
      }
    } catch (e) {
      // ignore
    }
    setViewModeState(mode);
    setIsDesktop(getEffectiveIsDesktop());
  };

  return { isDesktop, viewMode, setViewMode };
}
