import React, { useState } from 'react';

export interface PlayerAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function PlayerAvatar({
  name,
  size = 36,
  className = '',
}: PlayerAvatarProps) {
  const [imgErr, setImgErr] = useState(false);
  const cleanName = name?.trim() || '';
  const avatarUrl = `/api/players/avatar/${encodeURIComponent(cleanName)}?size=${Math.max(32, size * 2)}`;

  if (imgErr || !cleanName) {
    return (
      <div
        style={{
          width: size,
          height: size,
          imageRendering: 'pixelated',
        }}
        className={`rounded-none bg-[#1d222a] flex items-center justify-center font-minecraft text-xs text-[#c0ff00] font-bold shrink-0 select-none shadow-sm border border-white/10 ${className}`}
      >
        {cleanName.slice(0, 2).toUpperCase() || '??'}
      </div>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={cleanName}
      onError={() => setImgErr(true)}
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
      }}
      className={`rounded-none bg-black/40 object-cover shrink-0 select-none shadow-sm border border-black/30 ${className}`}
      loading="lazy"
    />
  );
}
