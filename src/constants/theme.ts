// Spacing scale (4px base)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Border radius
export const RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
} as const;

// Font sizes
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

// Font weights
export const FONT_WEIGHT = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Line heights
export const LINE_HEIGHT = {
  tight: 16,
  normal: 24,
  relaxed: 32,
} as const;

// Colors
export const COLORS = {
  // Primary
  primary: '#007AFF',
  primaryLight: '#b7d9ffff',
  primaryDark: '#0056B3',

  // Neutrals
  text: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',

  // Backgrounds
  background: '#F5F5F5',
  backgroundSecondary: '#EBEBEB',
  white: '#FFFFFF',

  // Semantic
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',

  // Border
  border: '#E0E0E0',
  borderDark: '#CCCCCC',

  // Transparent
  transparent: 'transparent',
} as const;
