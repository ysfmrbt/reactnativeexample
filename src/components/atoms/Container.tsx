import { View, ViewProps } from 'react-native';
import { tv } from 'tailwind-variants';

type Spacing = 'none' | 'sm' | 'md' | 'lg';

interface ContainerProps extends ViewProps {
  spacing?: Spacing;
  centered?: boolean;
  className?: string;
}

const containerVariants = tv({
  base: '',
  variants: {
    spacing: {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8',
    },
    centered: {
      true: 'items-center justify-center',
      false: '',
    },
  },
  defaultVariants: {
    spacing: 'md',
    centered: false,
  },
});

export default function Container({
  spacing = 'md',
  centered = false,
  className,
  style,
  children,
  ...props
}: ContainerProps) {
  return (
    <View
      className={containerVariants({ spacing, centered, className })}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
