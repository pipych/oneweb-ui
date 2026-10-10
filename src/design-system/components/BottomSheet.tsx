import React, { useState, useEffect, useRef } from 'react';
import { SFSymbol } from './SFSymbol';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  icon?: string;
  iconColor?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  icon,
  iconColor = 'text-[#8e8e93]',
  children,
  maxWidth = 'max-w-md',
}: BottomSheetProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsExiting(false);
      setDragY(0);
    } else if (shouldRender && !isExiting) {
      handleStartExit();
    }
  }, [isOpen]);

  const handleStartExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      setIsExiting(false);
      setDragY(0);
      onClose();
    }, 250);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      setDragY(delta);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 65) {
      setDragY(380);
      handleStartExit();
    } else {
      setDragY(0);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md ${
        isExiting ? 'animate-backdrop-out' : 'animate-backdrop-in'
      }`}
      onClick={handleStartExit}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: dragY > 0 ? `translate3d(0, ${dragY}px, 0)` : undefined,
          transition: isDragging ? 'none' : dragY > 0 ? 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
        }}
        className={`w-full ${maxWidth} rounded-t-[32px] sm:rounded-3xl p-6 bg-[#14171c]/98 shadow-[0_-12px_48px_rgba(0,0,0,0.85)] flex flex-col gap-4 pb-8 safe-bottom select-none ${
          isExiting ? 'animate-sheet-out' : 'animate-sheet-in'
        }`}
      >
        {/* Ручка для смахивания вниз */}
        <div className="w-12 h-1.5 rounded-full bg-white/25 hover:bg-white/40 transition-colors mx-auto mb-1 cursor-grab active:cursor-grabbing" />

        {/* Заголовок без кнопки закрытия */}
        {title && (
          <div className="flex items-center pb-2">
            <div className="text-base font-black text-white flex items-center gap-2">
              {icon && <SFSymbol name={icon} size={18} className={iconColor} animated={false} />}
              <span>{title}</span>
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
