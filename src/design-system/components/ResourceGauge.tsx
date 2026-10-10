import React from 'react';

interface ResourceGaugeProps {
  value: string | number;
  label: string;
  sublabel?: string;
  percent: number;
  color?: string;
  trackColor?: string;
  strokeWidth?: number;
  size?: number;
}

export function ResourceGauge({
  value,
  label,
  sublabel,
  percent,
  color = '#c0ff00',
  trackColor = '#1c2128',
  strokeWidth = 9,
  size = 94,
}: ResourceGaugeProps) {
  const cx = size / 2;
  const cy = size / 2;
  // Radius: leaves half strokeWidth on each side plus a small margin for rounded caps
  const r = (size - strokeWidth - 6) / 2;
  const C = 2 * Math.PI * r;

  // 260 degree arc with a 100 degree gap at the bottom
  const arcAngle = 260;
  const totalArcLength = C * (arcAngle / 360);

  // Clamped progress (0 to 100)
  const clampedPercent = Math.max(0, Math.min(100, isNaN(percent) ? 0 : percent));
  const currentArcLength = (clampedPercent / 100) * totalArcLength;

  // Arc starts at 140deg (bottom-left) and sweeps 260deg clockwise to 400deg (bottom-right)
  const startAngle = 140;

  return (
    <div className="flex flex-col items-center justify-start gap-1 flex-1 min-w-0 select-none">
      {/* Circle Gauge Container */}
      <div className="relative w-full max-w-[94px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          {/* Background Track (Incomplete circle with bottom gap, rounded caps) */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${totalArcLength} ${C}`}
            transform={`rotate(${startAngle} ${cx} ${cy})`}
          />

          {/* Active Progress Arc (Thick brand color line with rounded caps) */}
          {clampedPercent > 0 && (
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${currentArcLength} ${C}`}
              transform={`rotate(${startAngle} ${cx} ${cy})`}
              className="transition-all duration-700 ease-out"
            />
          )}
        </svg>

        {/* Center text: Value (top) and Label (bottom) - centered vertically */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1.5 pointer-events-none text-center px-1">
          <span className="text-[17px] font-black text-white font-mono leading-none tracking-tight">
            {value}
          </span>
          <span className="text-[10px] font-extrabold text-[#8e8e93] uppercase tracking-wider mt-1.5">
            {label}
          </span>
        </div>
      </div>

      {/* Sublabel under the gauge (only if provided) */}
      {sublabel && (
        <span className="text-[11px] font-medium text-white/50 text-center truncate w-full px-0.5 mt-1">
          {sublabel}
        </span>
      )}
    </div>
  );
}
