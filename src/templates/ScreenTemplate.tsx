import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function ScreenTemplate(props: PropsWithChildren) {
  return <View className="flex-1 p-safe">{props.children}</View>;
}
