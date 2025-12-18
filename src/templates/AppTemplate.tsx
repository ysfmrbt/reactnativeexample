import type { PropsWithChildren } from 'react';
import { StatusBar, View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';
import {
  SafeAreaListener,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ScreenTemplate from './ScreenTemplate';

export default function AppTemplate(props: PropsWithChildren) {
  const { theme, hasAdaptiveThemes } = useUniwind();

  const effectiveTheme = hasAdaptiveThemes ? 'system' : theme;
  const isDarkMode = effectiveTheme === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View className="flex-1">
          <ScreenTemplate>{props.children}</ScreenTemplate>
        </View>
      </SafeAreaListener>
    </SafeAreaProvider>
  );
}
