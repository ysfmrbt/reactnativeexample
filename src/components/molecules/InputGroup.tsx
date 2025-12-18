import { View } from 'react-native';
import type { PropsWithChildren } from 'react';
import Typography from '../atoms/Typography';

interface InputGroupProps extends PropsWithChildren {
  label?: string;
}

export default function InputGroup({ label, children }: InputGroupProps) {
  return (
    <View className="mb-4">
      {label && <Typography variant="label">{label}</Typography>}
      {children}
    </View>
  );
}
