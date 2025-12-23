import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { useCSSVariable } from 'uniwind';

export interface SearchBarProps extends TextInputProps {
  /**
   * Optional icon to render on the left side (e.g. search icon).
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional icon to render on the right side (e.g. filter icon).
   */
  rightIcon?: React.ReactNode;

  /**
   * Container className for Uniwind.
   */
  className?: string;
}

const searchBar = tv({
  slots: {
    root: 'flex-row items-center rounded-pill bg-surface-muted px-5 py-3.5 shadow-soft',
    input: 'flex-1 text-base text-text-primary ml-3',
  },
});

export default function SearchBar({
  leftIcon,
  rightIcon,
  className,
  style,
  ...props
}: SearchBarProps) {
  const { root, input } = searchBar();
  const placeholderColor = useCSSVariable('--color-text-secondary');

  return (
    <View className={root({ className })} style={style}>
      {leftIcon ? <View>{leftIcon}</View> : null}

      <TextInput
        placeholderTextColor={placeholderColor}
        className={input()}
        {...props}
      />

      {rightIcon ? <View className="ml-3">{rightIcon}</View> : null}
    </View>
  );
}
