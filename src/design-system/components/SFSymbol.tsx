import React, { useState } from 'react';

/**
 * Mapping table from Apple SF Symbol names & legacy icons to Google Material Symbols (Rounded & Filled).
 * Reference: https://fonts.google.com/icons?icon.style=Rounded
 */
export const MATERIAL_SYMBOLS_MAP: Record<string, string> = {
  // Navigation & Core Views
  'house': 'home',
  'house.fill': 'home',
  'home': 'home',
  'desktopcomputer': 'desktop_windows',
  'desktop': 'desktop_windows',
  'terminal': 'terminal',
  'terminal.fill': 'terminal',
  'slider.horizontal.3': 'tune',
  'slider': 'tune',
  'tune': 'tune',
  'gear': 'settings',
  'gear.fill': 'settings',
  'gear-alt-fill': 'settings',
  'settings': 'settings',
  'folder': 'folder',
  'folder.fill': 'folder',
  'folder.badge.plus': 'create_new_folder',
  'create_new_folder': 'create_new_folder',
  'map': 'map',
  'map.fill': 'map',
  'globe': 'globe',
  'globe.fill': 'globe',
  'public': 'public',
  'server.rack': 'dns',
  'dns': 'dns',
  'sidebar.left': 'menu_open',
  'sidebar.right': 'menu',
  'menu_open': 'menu_open',
  'left_panel_close': 'left_panel_close',
  'left_panel_open': 'left_panel_open',

  // Actions & Controls
  'play.fill': 'play_arrow',
  'play': 'play_arrow',
  'play_arrow': 'play_arrow',
  'stop.fill': 'stop',
  'stop': 'stop',
  'stop.circle': 'stop_circle',
  'stop.circle.fill': 'stop_circle',
  'square.fill': 'stop',
  'arrow.clockwise': 'refresh',
  'arrow.clockwise.circle.fill': 'refresh',
  'refresh': 'refresh',
  'arrow.counterclockwise': 'replay',
  'arrow.counterclockwise.circle.fill': 'replay',
  'replay': 'replay',
  'arrow.triangle.2.circlepath': 'sync',
  'arrow.triangle.2.circlepath.circle.fill': 'sync',
  'sync': 'sync',
  'update': 'update',
  'system_update': 'update',
  'system_update_alt': 'update',
  'arrow.up': 'arrow_upward',
  'arrow.up.fill': 'arrow_upward',
  'arrow_upward': 'arrow_upward',
  'arrow.up.circle': 'arrow_circle_up',
  'arrow.up.circle.fill': 'arrow_circle_up',
  'arrow.down': 'arrow_downward',
  'arrow.down.fill': 'arrow_downward',
  'arrow_downward': 'arrow_downward',
  'arrow.down.circle': 'arrow_circle_down',
  'arrow.down.circle.fill': 'arrow_circle_down',
  'arrow_circle_down': 'arrow_circle_down',
  'arrow.up.right': 'open_in_new',
  'arrow.turn.down.right': 'subdirectory_arrow_right',
  'square.and.arrow.down.fill': 'download',
  'download': 'download',
  'download_2': 'download_2',
  'file_download': 'download',
  'paperplane': 'send',
  'paperplane.fill': 'send',
  'send': 'send',

  // Files, Documents & Storage
  'doc': 'description',
  'doc.fill': 'description',
  'description': 'description',
  'doc.text': 'article',
  'doc.text.fill': 'article',
  'article': 'article',
  'doc.badge.gearshape': 'settings_suggest',
  'settings_suggest': 'settings_suggest',
  'doc.on.doc': 'content_copy',
  'doc.on.doc.fill': 'content_copy',
  'content_copy': 'content_copy',
  'copy': 'content_copy',
  'archivebox': 'inventory_2',
  'archivebox.fill': 'inventory_2',
  'inventory_2': 'inventory_2',
  'archive': 'inventory_2',
  'cloud.upload': 'cloud_upload',
  'cloud.upload.fill': 'cloud_upload',
  'cloud_upload': 'cloud_upload',
  'upload': 'upload',
  'file_upload': 'upload',
  'floppy.disk': 'save',
  'save': 'save',
  'trash': 'delete',
  'trash.fill': 'delete',
  'delete': 'delete',
  'pencil': 'edit',
  'pencil.circle.fill': 'edit',
  'edit': 'edit',
  'photo.badge.plus': 'add_photo_alternate',
  'add_photo_alternate': 'add_photo_alternate',

  // Minecraft, Mods & Code
  'cube.box.fill': 'view_in_ar',
  'cube.box': 'view_in_ar',
  'cube': 'view_in_ar',
  'view_in_ar': 'view_in_ar',
  'deployed_code': 'deployed_code',
  'extension': 'extension',
  'curlybraces': 'code',
  'code': 'code',
  'wand.and.stars': 'auto_fix_high',
  'auto_fix_high': 'auto_fix_high',
  'text.wrap': 'wrap_text',
  'wrap_text': 'wrap_text',

  // Metrics & Status
  'bolt.fill': 'bolt',
  'bolt': 'bolt',
  'flame.fill': 'local_fire_department',
  'flame': 'local_fire_department',
  'local_fire_department': 'local_fire_department',
  'waveform.path.ecg': 'ecg_heart',
  'ecg_heart': 'ecg_heart',
  'person': 'person',
  'person.fill': 'person',
  'person.2': 'group',
  'person.2.fill': 'group',
  'group': 'group',
  'shield': 'shield',
  'shield.fill': 'shield',
  'lock': 'lock',
  'lock.fill': 'lock',
  'lock_fill': 'lock',
  'lock.open': 'lock_open',
  'lock.open.fill': 'lock_open',
  'key': 'key',
  'key.fill': 'key',
  'info': 'info',
  'info.circle': 'info',
  'info.circle.fill': 'info',
  'exclamationmark.triangle.fill': 'warning',
  'exclamationmark.triangle': 'warning',
  'warning': 'warning',

  // Dialogs, Search & UI elements
  'chevron.left': 'chevron_left',
  'chevron_left': 'chevron_left',
  'chevron.right': 'chevron_right',
  'chevron_right': 'chevron_right',
  'chevron.down': 'expand_more',
  'chevron_down': 'expand_more',
  'expand_more': 'expand_more',
  'chevron.up': 'expand_less',
  'chevron_up': 'expand_less',
  'expand_less': 'expand_less',
  'plus': 'add',
  'add': 'add',
  'plus.circle.fill': 'add_circle',
  'add_circle': 'add_circle',
  'minus': 'remove',
  'remove': 'remove',
  'minus.circle.fill': 'remove_circle',
  'remove_circle': 'remove_circle',
  'checkmark': 'check',
  'check': 'check',
  'checkmark.circle.fill': 'check_circle',
  'check_circle': 'check_circle',
  'xmark': 'close',
  'close': 'close',
  'xmark.circle': 'cancel',
  'xmark.circle.fill': 'cancel',
  'cancel': 'cancel',
  'search': 'search',
  'magnifyingglass': 'search',
  'line.3.horizontal.decrease': 'filter_list',
  'line.3.horizontal.decrease.circle': 'filter_list',
  'filter': 'filter_list',
  'filter_list': 'filter_list',
  'ellipsis': 'more_horiz',
  'ellipsis.circle': 'more_horiz',
  'more_horiz': 'more_horiz',
  'more_vert': 'more_vert',
};

/**
 * Resolves any incoming icon name (SF Symbol style or direct Material Symbol name)
 * to a valid Google Material Symbol ligature.
 */
export const resolveMaterialIconName = (name: string): string => {
  if (!name) return 'help';
  if (MATERIAL_SYMBOLS_MAP[name]) {
    return MATERIAL_SYMBOLS_MAP[name];
  }
  const clean = name.toLowerCase().trim();
  if (MATERIAL_SYMBOLS_MAP[clean]) {
    return MATERIAL_SYMBOLS_MAP[clean];
  }
  const normalized = clean.replace(/[.-]/g, '_');
  if (MATERIAL_SYMBOLS_MAP[normalized]) {
    return MATERIAL_SYMBOLS_MAP[normalized];
  }
  return normalized;
};

export interface SFSymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number | string;
  color?: string;
  filled?: boolean;
  weight?: number;
  animated?: boolean;
  effect?: 'bounce' | 'wiggle' | 'breathe' | 'rotate';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * Material Symbols Rounded (Filled) Icon Component
 * Replaces Apple SF Symbols with Google Material Symbols Rounded Filled.
 */
export const SFSymbol = React.forwardRef<HTMLSpanElement, SFSymbolProps>(({
  name,
  size = 20,
  color,
  filled = true,
  weight = 400,
  animated = true,
  effect = 'bounce',
  className = '',
  onClick,
  style,
  ...props
}, ref) => {
  const [animating, setAnimating] = useState(false);
  const glyph = resolveMaterialIconName(name);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (animated) {
      setAnimating(true);
      const duration = effect === 'rotate' ? 550 : effect === 'wiggle' ? 480 : 460;
      setTimeout(() => setAnimating(false), duration);

      // Trigger Telegram WebApp haptic vibration
      try {
        const tg = (window as any).Telegram?.WebApp;
        if (tg?.HapticFeedback) {
          tg.HapticFeedback.impactOccurred('light');
        }
      } catch (err) {}
    }

    onClick?.(e);
  };

  const animationClass = animating
    ? effect === 'wiggle'
      ? 'animate-sf-wiggle'
      : effect === 'rotate'
      ? 'animate-sf-rotate'
      : 'animate-sf-bounce'
    : '';

  const sizeVal = typeof size === 'number' ? `${size}px` : size;
  const isOutlineOnly = glyph === 'search' || glyph === 'filter_list' || glyph === 'tune';
  const effectiveWeight = isOutlineOnly && weight === 400 ? 600 : weight;
  const effectiveGrad = isOutlineOnly ? 100 : 0;

  return (
    <span
      ref={ref}
      onClick={handleClick}
      aria-hidden="true"
      className={`material-symbols-rounded select-none shrink-0 ${animationClass} ${className}`}
      style={{
        fontSize: sizeVal,
        width: sizeVal,
        height: sizeVal,
        fontWeight: effectiveWeight,
        color: color || undefined,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${effectiveWeight}, 'GRAD' ${effectiveGrad}, 'opsz' 24`,
        ...style,
      }}
      {...props}
    >
      {glyph}
    </span>
  );
});

SFSymbol.displayName = 'MaterialSymbol';

// Export aliases for flexible usage
export const MaterialSymbol = SFSymbol;
export type MaterialSymbolProps = SFSymbolProps;
