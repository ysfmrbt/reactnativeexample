import { StyleSheet, View, ViewProps } from 'react-native';
import { SPACING } from '../../constants/theme';

type Variant = 'default' | 'compact' | 'spacious';

interface ContainerProps extends ViewProps {
  variant?: Variant;
  centered?: boolean;
}

export default function Container({
  variant = 'default',
  centered = false,
  style,
  children,
  ...props
}: ContainerProps) {
  return (
    <View
      style={[styles.base, styles[variant], centered && styles.centered, style]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  default: {
    padding: SPACING.xl,
  },
  compact: {
    padding: SPACING.md,
  },
  spacious: {
    padding: SPACING.xxxl,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
