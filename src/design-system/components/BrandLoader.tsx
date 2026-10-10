import React from 'react';

export interface BrandLoaderProps {
  /** Height in pixels. Width scales proportionally (3:1). Default: 12 */
  size?: number | string;
  /** Brand color. Defaults to signature neon green #c0ff00 */
  color?: string;
  className?: string;
}

/**
 * BrandLoader - Minimal, crisp, miniature SVG wave loader without glow.
 * Signature neon green (#c0ff00) 3-dot smooth wave bounce.
 */
export function BrandLoader({
  size = 12,
  color = '#c0ff00',
  className = '',
}: BrandLoaderProps) {
  const numericSize = typeof size === 'number' ? size : parseInt(size, 10) || 12;
  const width = Math.round(numericSize * 3);
  const height = numericSize;

  return (
    <svg
      viewBox="0 0 36 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none align-middle ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      role="status"
      aria-label="Загрузка"
    >
      {/* Точка 1 (Левая) */}
      <circle cx="6" cy="6" r="2.2" fill={color} opacity="0.35">
        <animate
          attributeName="cy"
          values="6;3.2;6"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
        <animate
          attributeName="r"
          values="2.2;3.2;2.2"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
        <animate
          attributeName="opacity"
          values="0.35;1;0.35"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
      </circle>

      {/* Точка 2 (Центральная) */}
      <circle cx="18" cy="6" r="2.2" fill={color} opacity="0.35">
        <animate
          attributeName="cy"
          values="6;3.2;6"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.15s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
        <animate
          attributeName="r"
          values="2.2;3.2;2.2"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.15s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
        <animate
          attributeName="opacity"
          values="0.35;1;0.35"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.15s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
      </circle>

      {/* Точка 3 (Правая) */}
      <circle cx="30" cy="6" r="2.2" fill={color} opacity="0.35">
        <animate
          attributeName="cy"
          values="6;3.2;6"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.3s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
        <animate
          attributeName="r"
          values="2.2;3.2;2.2"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.3s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
        <animate
          attributeName="opacity"
          values="0.35;1;0.35"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.3s"
          keyTimes="0;0.45;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          calcMode="spline"
        />
      </circle>
    </svg>
  );
}
