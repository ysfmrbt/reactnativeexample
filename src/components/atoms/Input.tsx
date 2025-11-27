import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { SPACING, RADIUS, COLORS } from '../../constants/theme';

type Variant = 'default' | 'outlined';

interface InputProps extends TextInputProps {
  variant?: Variant;
}

export default function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.base, style]}
      placeholderTextColor={COLORS.textMuted}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    marginVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.backgroundSecondary,
  },
});
