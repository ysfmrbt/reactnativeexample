import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { tv } from 'tailwind-variants';
import { useCSSVariable } from 'uniwind';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant = 'solid' | 'ghost';

export interface IconButtonProps extends Omit<PressableProps, 'children'> {
  /**
   * Render prop for the icon.
   * You receive a suggested `size` and `color` to apply to your icon.
   */
  renderIcon: (params: { size: number; color: string }) => React.ReactNode;

  size?: IconButtonSize;
  variant?: IconButtonVariant;

  /**
   * Overrides the computed icon color (useful when your icon component
   * doesn't follow `color` well).
   */
  iconColor?: string;

  /**
   * Container style/className hooks for Uniwind.
   */
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const rootVariants = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'h-9 w-9 rounded-full',
      md: 'h-11 w-11 rounded-full',
      lg: 'h-13 w-13 rounded-full',
    },
    variant: {
      solid: 'bg-background/90',
      ghost: 'bg-transparent',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'ghost',
    disabled: false,
  },
});

const ICON_SIZE: Record<IconButtonSize, number> = {
  sm: 18,
  md: 20,
  lg: 22,
};

export default function IconButton({
  renderIcon,
  size = 'md',
  variant = 'ghost',
  iconColor,
  className,
  style,
  disabled,
  ...props
}: IconButtonProps) {
  const foreground = useCSSVariable('--color-foreground');
  const brandPrimary = useCSSVariable('--color-brand-primary');

  const iconSize = ICON_SIZE[size];
  const icColor =
    iconColor ?? (variant === 'solid' ? foreground : brandPrimary);
  const isDisabled = disabled === true;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={rootVariants({
        size,
        variant,
        disabled: isDisabled,
        className,
      })}
      style={style as StyleProp<ViewStyle>}
      {...props}
    >
      <View pointerEvents="none">
        {renderIcon({ size: iconSize, color: icColor })}
      </View>
    </Pressable>
  );
}
