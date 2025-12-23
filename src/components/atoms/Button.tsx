import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { tv } from 'tailwind-variants';

type ButtonTone = 'primary' | 'secondary';
type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
  tone?: ButtonTone;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonVariants = tv({
  slots: {
    root: 'items-center justify-center rounded-button',
    text: 'font-medium',
  },
  variants: {
    size: {
      sm: {
        root: 'px-3 py-2',
        text: 'text-sm',
      },
      md: {
        root: 'px-4 py-3',
        text: 'text-base',
      },
      lg: {
        root: 'px-5 py-4',
        text: 'text-base',
      },
    },
    variant: {
      solid: {
        root: '',
        text: '',
      },
      outline: {
        root: 'bg-transparent border',
        text: '',
      },
      ghost: {
        root: 'bg-transparent',
        text: '',
      },
    },
    tone: {
      primary: {
        root: '',
        text: '',
      },
      secondary: {
        root: '',
        text: '',
      },
    },
    disabled: {
      true: {
        root: 'opacity-60',
        text: '',
      },
      false: {
        root: '',
        text: '',
      },
    },
  },
  compoundVariants: [
    // SOLID
    {
      variant: 'solid',
      tone: 'primary',
      class: {
        root: 'bg-brand-primary',
        text: 'text-text-pressable',
      },
    },
    {
      variant: 'solid',
      tone: 'secondary',
      class: {
        root: 'bg-brand-secondary',
        text: 'text-text-primary',
      },
    },

    // OUTLINE
    {
      variant: 'outline',
      tone: 'primary',
      class: {
        root: 'border-brand-primary',
        text: 'text-brand-primary',
      },
    },
    {
      variant: 'outline',
      tone: 'secondary',
      class: {
        root: 'border-border',
        text: 'text-text-primary',
      },
    },

    // GHOST
    {
      variant: 'ghost',
      tone: 'primary',
      class: {
        text: 'text-brand-primary',
      },
    },
    {
      variant: 'ghost',
      tone: 'secondary',
      class: {
        text: 'text-text-primary',
      },
    },
  ],
  defaultVariants: {
    tone: 'primary',
    variant: 'solid',
    size: 'md',
    disabled: false,
  },
});

export default function Button({
  title,
  className,
  tone = 'primary',
  variant = 'solid',
  size = 'md',
  ...props
}: ButtonProps) {
  const disabled = props.disabled === true;

  const { root, text } = buttonVariants({
    tone,
    variant,
    size,
    disabled,
  });

  return (
    <TouchableOpacity className={root({ className })} {...props}>
      <Text className={text()}>{title}</Text>
    </TouchableOpacity>
  );
}
