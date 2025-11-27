import { StyleSheet, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import Typography from '../atoms/Typography';
import { SPACING } from '../../constants/theme';

interface InputGroupProps extends PropsWithChildren {
  label?: string;
}

export default function InputGroup({ label, children }: InputGroupProps) {
  return (
    <View style={styles.container}>
      {label && <Typography variant="label">{label}</Typography>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
});
