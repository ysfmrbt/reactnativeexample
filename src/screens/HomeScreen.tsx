import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { HomeScreenCarousel } from '../components/organisms/HomeScreenCarousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/atoms/Button';
import { useCSSVariable } from 'uniwind';

const bgPattern = require('../../assets/bg-coffee-small.png');
const heroImage = require('../../assets/bootsplash/logo.png');

type Slide = {
  id: string;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Coffee so good,\nyour taste buds\nwill love it',
    subtitle: 'The best grain, the finest roas, the\nmost powerful flavor.',
  },
  {
    id: '2',
    title: 'Discover our\npremium coffee\nselection',
    subtitle: 'Handpicked beans from the finest\nfarms around the world.',
  },
  {
    id: '3',
    title: 'Enjoy the perfect\ncup every single\ntime',
    subtitle: 'Expertly roasted and crafted\nfor your enjoyment.',
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const brandPrimary = useCSSVariable('--color-brand-primary');

  const handleGetStarted = () => {
    // @ts-ignore - simple navigation for now
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 overflow-hidden">
      <View className="absolute inset-0 bg-gradient-base" />
      <View className="absolute inset-0 bg-gradient-overlay opacity-60" />

      <ImageBackground
        source={bgPattern}
        resizeMode="repeat"
        className="absolute inset-0"
        imageStyle={{
          tintColor: brandPrimary,
          opacity: 1,
        }}
      />

      <View
        className="flex-1"
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {/* Hero */}
        <View className="flex-1 items-center justify-center px-8 max-h-[45%]">
          <Image
            source={heroImage}
            resizeMode="contain"
            className="h-full w-full"
          />
        </View>

        <HomeScreenCarousel data={SLIDES} />

        {/* CTA */}
        <View className="pt-4 px-8">
          <Button
            title="Get started"
            onPress={handleGetStarted}
            className="w-full rounded-full"
          />
        </View>
      </View>
    </View>
  );
}
