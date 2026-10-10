/**
 * OneWebUI Radius Tokens
 */
export const radii = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',       // Standard for inputs & cards
  '2xl': '20px',
  '3xl': '24px',
  sheet: '32px',    // Bottom sheets, modal dialogs
  full: '9999px',   // Pills, badges, avatars
} as const;

export type RadiusToken = keyof typeof radii;
