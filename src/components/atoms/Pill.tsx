import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { tv } from 'tailwind-variants';

type PillVariant = 'solid' | 'outline';
type PillSize = 'sm' | 'md';

export interface PillProps extends Omit<PressableProps, 'children'> {
  label: string;
  selected?: boolean;
  variant?: PillVariant;
  size?: PillSize;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  className?: string;
}

const pill = tv({
  slots: {
    root: 'flex-row items-center justify-center rounded-full',
    label: 'font-medium',
  },
  variants: {
    variant: {
      solid: {
        root: 'bg-brand-primary shadow-md shadow-brand-primary/20',
        label: 'text-foreground',
      },
      outline: {
        root: 'bg-surface border border-border shadow-sm shadow-black/5',
        label: 'text-brand-primary',
      },
    },
    size: {
      sm: { root: 'px-3 py-1.5', label: 'text-xs' },
      md: { root: 'px-4 py-2.5', label: 'text-sm' },
    },
    selected: {
      true: {},
      false: {},
    },
    disabled: {
      true: { root: 'opacity-60' },
      false: {},
    },
  },
  compoundVariants: [
    // When selected, always show as solid brand
    {
      selected: true,
      class: {
        root: 'bg-brand-primary border-transparent shadow-soft',
        label: 'text-selected',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    selected: false,
    disabled: false,
  },
});

export default function Pill({
  label,
  selected = false,
  variant = 'outline',
  size = 'md',
  leftAdornment,
  rightAdornment,
  className,
  disabled,
  ...props
}: PillProps) {
  const isDisabled = disabled === true;

  const { root, label: labelClass } = pill({
    size,
    variant,
    selected,
    disabled: isDisabled,
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: isDisabled }}
      disabled={isDisabled}
      className={root({ className })}
      {...props}
    >
      {leftAdornment ? <Text className="mr-2">{leftAdornment}</Text> : null}
      <Text className={labelClass()}>{label}</Text>
      {rightAdornment ? <Text className="ml-2">{rightAdornment}</Text> : null}
    </Pressable>
  );
}
