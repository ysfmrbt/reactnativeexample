import React from 'react';
import { Alert, Image, ImageBackground, View } from 'react-native';
import Container from '../components/atoms/Container';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';

const bgPattern = require('../../assets/bg-coffee.png');
const logo = require('../../assets/bootsplash/logo.png');

export default function HomeScreen() {
  const handleGetStarted = React.useCallback(() => {
    Alert.alert(
      'Get Started',
      'Hook this up to navigation (e.g. Login / Sign up)',
    );
  }, []);

  return (
    <Container className="flex-1">
      <View className="flex-1">
        {/* Gradient background (approximation without adding new deps) */}
        <View
          className="absolute inset-0"
          style={{ backgroundColor: '#D7A870' }}
        />
        <View
          className="absolute inset-0 opacity-80"
          style={{ backgroundColor: '#B08149' }}
        />

        {/* Pattern overlay */}
        <ImageBackground
          source={bgPattern}
          resizeMode="repeat"
          className="absolute inset-0 opacity-40"
        />

        <View className="flex-1 justify-between px-6 pb-10 pt-14">
          <View className="items-center">
            {/* Hero image/logo */}
            <Image source={logo} resizeMode="contain" className="h-72 w-full" />

            {/* Headline */}
            <Typography variant="h2" className="mt-6 text-center text-white">
              Coffee so good,
              {'\n'}your taste buds
              {'\n'}will love it
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body"
              className="mt-4 text-center text-white/80"
            >
              The best grain, the finest roas, the
              {'\n'}most powerful flavor.
            </Typography>

            {/* Small page indicator */}
            <View className="mt-6 h-1 w-10 rounded-full bg-green-700" />
          </View>

          {/* CTA */}
          <View>
            <Button
              title="Get started"
              onPress={handleGetStarted}
              className="w-full rounded-full"
            />
          </View>
        </View>
      </View>
    </Container>
  );
}
