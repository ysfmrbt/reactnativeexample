import React from 'react';
import {
  Image,
  ImageProps,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { tv } from 'tailwind-variants';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<ImageProps, 'source'> {
  /**
   * Source image for the avatar.
   * If not provided, Avatar renders a placeholder circle.
   */
  source?: ImageProps['source'];

  /**
   * Controls the rendered size of the avatar.
   */
  size?: AvatarSize;

  /**
   * Optional container className for Uniwind.
   */
  className?: string;

  /**
   * Optional container style (rarely needed).
   */
  containerStyle?: StyleProp<ViewStyle>;

  /** Optional press handler */
  onPress?: () => void;
}

const containerVariants = tv({
  base: 'overflow-hidden items-center justify-center rounded-full bg-surface',
  variants: {
    size: {
      sm: 'h-9 w-9',
      md: 'h-11 w-11',
      lg: 'h-14 w-14',
      xl: 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function Avatar({
  source,
  size = 'md',
  className,
  containerStyle,
  style,
  onPress,
  ...props
}: AvatarProps) {
  // If there is no source, render a simple placeholder circle.
  if (!source) {
    return (
      <Pressable
        onPress={onPress}
        className={containerVariants({ size, className })}
        style={containerStyle as StyleProp<ViewStyle>}
        accessibilityRole="image"
        accessibilityLabel="Avatar"
      />
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className={containerVariants({ size, className })}
      style={containerStyle as StyleProp<ViewStyle>}
    >
      <Image
        source={source}
        resizeMode="cover"
        className="h-full w-full"
        style={style}
        accessibilityRole="image"
        accessibilityLabel="Avatar"
        {...props}
      />
    </Pressable>
  );
}
