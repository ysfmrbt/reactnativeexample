import { Text, TextProps } from 'react-native';
import { tv } from 'tailwind-variants';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  className?: string;
}

const typographyVariants = tv({
  base: 'text-foreground',
  variants: {
    variant: {
      h1: 'text-3xl font-bold',
      h2: 'text-2xl font-bold',
      h3: 'text-xl font-semibold',
      body: 'text-base leading-6',
      caption: 'text-xs text-text-secondary',
      label: 'text-sm font-semibold text-text-secondary',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export default function Typography({
  variant = 'body',
  className,
  style,
  children,
  ...props
}: TypographyProps) {
  return (
    <Text
      className={typographyVariants({ variant, className })}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}
