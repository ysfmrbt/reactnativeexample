import { LogOut, Moon, Sun } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from '../components/atoms/Typography';
import { Uniwind, useCSSVariable, useUniwind } from 'uniwind';
import { useAuth } from '../contexts/AuthContext';

type ThemeChoice = 'light' | 'dark' | 'system';

const bgPattern = require('../../assets/bg-coffee-small.png');

type ThemeChipProps = {
  value: ThemeChoice;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onPress: (value: ThemeChoice) => void;
};

function ThemeChip({ value, label, icon, active, onPress }: ThemeChipProps) {
  return (
    <Pressable
      onPress={() => onPress(value)}
      className={`min-w-[44%] flex-1 flex-row items-center gap-2 rounded-2xl px-4 py-3 ${
        active ? 'bg-background shadow-card' : 'bg-background/70 border border-background/60'
      }`}
    >
      <View
        className={`h-9 w-9 items-center justify-center rounded-full ${
          active ? 'bg-brand-primary/10' : 'bg-surface-muted'
        }`}
      >
        {icon}
      </View>
      <Typography className="text-base font-semibold text-brand-primary">
        {label}
      </Typography>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useUniwind();
  const { signOut } = useAuth();
  const brandPrimary = useCSSVariable('--color-brand-primary');
  const [selectedTheme, setSelectedTheme] = useState<ThemeChoice>('system');

  useEffect(() => {
    if (theme === 'light' || theme === 'dark' || theme === 'system') {
      setSelectedTheme(theme as ThemeChoice);
    }
  }, [theme]);

  const handleThemeChange = (value: ThemeChoice) => {
    setSelectedTheme(value);
    try {
      // @ts-ignore Uniwind runtime API
      Uniwind.setTheme(value);
    } catch (error) {
      console.warn('Theme change not supported in this build.', error);
    }
  };

  return (
    <ImageBackground source={bgPattern} resizeMode="repeat" className="flex-1">
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: brandPrimary,
          opacity: 0.7,
        }}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 48,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Typography className="mb-3 text-base font-semibold text-brand-primary">
            Theme
          </Typography>
          <View className="flex-row flex-wrap gap-3">
            <ThemeChip
              value="light"
              label="Light"
              icon={<Sun size={18} color={brandPrimary} />}
              active={selectedTheme === 'light'}
              onPress={handleThemeChange}
            />
            <ThemeChip
              value="dark"
              label="Dark"
              icon={<Moon size={18} color={brandPrimary} />}
              active={selectedTheme === 'dark'}
              onPress={handleThemeChange}
            />
            <ThemeChip
              value="system"
              label="System"
              icon={<Sun size={18} color={brandPrimary} />}
              active={selectedTheme === 'system'}
              onPress={handleThemeChange}
            />
          </View>
        </View>

        <View className="mb-12">
          <Pressable
            className="flex-row items-center justify-center gap-2 rounded-pill bg-background/95 py-3 shadow-soft"
            onPress={signOut}
          >
            <LogOut size={18} color={brandPrimary} />
            <Typography className="text-base font-semibold text-brand-primary">
              Log out
            </Typography>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
