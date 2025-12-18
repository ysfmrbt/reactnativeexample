import { TextInput, TextInputProps } from 'react-native';
import { tv } from 'tailwind-variants';

type InputVariant = 'filled' | 'outline';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends TextInputProps {
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
}

const inputVariants = tv({
  base: 'rounded-input text-text-primary',
  variants: {
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-base',
    },
    variant: {
      filled: 'bg-surface',
      outline: 'bg-transparent border border-border',
    },
    disabled: {
      true: 'opacity-60',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'filled',
    disabled: false,
  },
});

export default function Input({
  variant = 'filled',
  size = 'md',
  className,
  style,
  editable,
  ...props
}: InputProps) {
  const disabled = editable === false;

  return (
    <TextInput
      className={inputVariants({ size, variant, disabled, className })}
      style={style}
      editable={editable}
      {...props}
    />
  );
}
