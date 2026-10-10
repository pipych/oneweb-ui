import React from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { SquareWidgetProps } from './types';
import { WidgetArtwork } from './WidgetArtwork';

/**
 * SquareWidget (Square / Medium / Reference 1)
 * - 1:1 Aspect ratio square tile
 * - Top-left: rounded square shape with #c0ff00 icon
 * - Top-right: discreet shortcut arrow (north_east)
 * - Bottom: bold white title + uppercase muted subtitle
 * - Pinned 3D illustration support with smooth hover illumination
 */
export const SquareWidget = React.forwardRef<HTMLDivElement, SquareWidgetProps>(
  (
    {
      icon,
      title,
      subtitle,
      showArrow,
      topAction,
      iconColor = '#c0ff00',
      shapeBg = 'bg-[#181c23]',
      artworkUrl,
      artworkNode,
      artworkClassName,
      href,
      target,
      colSpan,
      rowSpan,
      bgClassName = 'bg-[#14171c]',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = Boolean(href || onClick);
    const shouldShowArrow = showArrow !== undefined ? showArrow : isInteractive;

    const colSpanClasses = {
      1: 'col-span-1',
      2: 'col-span-1 md:col-span-2',
      3: 'col-span-1 md:col-span-2 xl:col-span-3',
      4: 'col-span-1 md:col-span-2 xl:col-span-4',
    };

    const rowSpanClasses = {
      1: 'row-span-1',
      2: 'row-span-1 md:row-span-2',
    };

    const content = (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          // Container & 1:1 Shape
          'relative aspect-square w-full p-5 md:p-6 rounded-[28px] md:rounded-[32px] overflow-hidden select-none',
          bgClassName,
          'border-none ring-0 outline-none',
          // Flex layout (top elements + mt-auto bottom stack)
          'flex flex-col justify-between',
          // Interactive states
          'group transition-all duration-200',
          isInteractive && 'cursor-pointer sf-tap active:scale-[0.98] hover:bg-[#181c22]',
          colSpan && colSpanClasses[colSpan],
          rowSpan && rowSpanClasses[rowSpan],
          className
        )}
        {...props}
      >
        {/* Optional 3D Artwork in bottom right */}
        <WidgetArtwork
          artworkUrl={artworkUrl}
          artworkNode={artworkNode}
          artworkClassName={cn('w-3/4 h-3/4 max-w-[180px] max-h-[180px]', artworkClassName)}
        />

        {/* Top bar: Icon shape on left, Arrow / action on right */}
        <div className="flex items-start justify-between relative z-10 w-full">
          {/* Icon in rounded shape */}
          <div
            className={cn(
              'w-12 h-12 rounded-[18px] aspect-square flex items-center justify-center shrink-0 border-none transition-transform duration-200 group-hover:scale-105',
              shapeBg
            )}
            style={{ color: iconColor }}
          >
            <Icon name={icon} size={24} fill={true} />
          </div>

          {/* Top-right action / shortcut indicator */}
          {topAction ? (
            <div className="shrink-0">{topAction}</div>
          ) : shouldShowArrow ? (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#8e8e93] group-hover:text-white transition-colors shrink-0">
              <Icon
                name="north_east"
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
          ) : null}
        </div>

        {/* Bottom stack: Title & Subtitle (strictly pinned to bottom) */}
        <div className="mt-auto relative z-10 pt-4 flex flex-col justify-end">
          <h3 className="text-white font-bold text-lg md:text-xl leading-tight tracking-tight group-hover:text-white transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[#8e8e93] text-xs tracking-wider uppercase font-semibold mt-1 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noreferrer noopener' : undefined}
          className="block w-full no-underline"
        >
          {content}
        </a>
      );
    }

    return content;
  }
);

SquareWidget.displayName = 'SquareWidget';
