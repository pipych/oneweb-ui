import { useState, useEffect } from 'react';

export type ViewMode = 'auto' | 'desktop' | 'mobile';

const STORAGE_KEY = 'oneweb_view_mode';

/**
 * Проверка, является ли устройство настольным компьютером (ПК / Mac / большой экран)
 */
export function isDesktopDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Проверка Telegram WebApp platform
  const tg = (window as any).Telegram?.WebApp;
  const tgPlatform = typeof tg?.platform === 'string' ? tg.platform.toLowerCase() : '';
  if (tgPlatform) {
    if (['tdesktop', 'macos', 'web', 'weba', 'webk'].includes(tgPlatform)) {
      return true;
    }
    if (['android', 'ios'].includes(tgPlatform)) {
      return false;
    }
  }

  // 2. Проверка User-Agent
  const ua = navigator.userAgent || '';
  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  if (isMobileUA) {
    return false;
  }

  // 3. Проверка ширины вьюпорта (порог md = 768px)
  return window.innerWidth >= 768;
}

/**
 * Получение эффективного режима с учетом пользовательского выбора
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
 * Хук для отслеживания и переключения режима адаптивности (Desktop vs Mobile)
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
    setViewModeState(mode);
    try {
      if (mode === 'auto') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, mode);
      }
    } catch (e) {
      // ignore
    }
    setIsDesktop(mode === 'auto' ? isDesktopDevice() : mode === 'desktop');
  };

  return {
    isDesktop,
    isMobile: !isDesktop,
    viewMode,
    setViewMode,
  };
}
