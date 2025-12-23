import React, { useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import Container from '../components/atoms/Container';
import Typography from '../components/atoms/Typography';
import LoginForm from '../components/organisms/LoginForm';
import { FormData } from '../types/FormData';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/atoms/Button';
import { useCSSVariable } from 'uniwind';

const bgPattern = require('../../assets/bg-coffee-small.png');
const hero = require('../../assets/bootsplash/logo.png');

export default function LoginScreen() {
  const { signInWithCredentials } = useAuth();
  const brandPrimary = useCSSVariable('--color-brand-primary');
  const [formData, setFormData] = useState<FormData>({
    email: 'yudi@example.com',
    password: 'password',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }
    setSubmitting(true);
    setError(null);
    const result = await signInWithCredentials(
      formData.email,
      formData.password,
    );
    if (!result.success) {
      setError(result.error ?? 'Unable to sign in');
    }
    setSubmitting(false);
  };

  return (
    <ImageBackground source={bgPattern} resizeMode="repeat" className="flex-1">
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: brandPrimary,
          opacity: 0.6,
        }}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Container spacing="lg" className="flex-1 pb-10">
          <View className="mt-12 items-center">
            <View className="h-16 w-16 items-center justify-center rounded-3xl bg-background/90 shadow-soft">
              <ImageBackground
                source={hero}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            </View>
            <Typography
              variant="h2"
              className="mt-4 text-3xl font-bold text-white"
            >
              Welcome back
            </Typography>
            <Typography
              variant="body"
              className="mt-2 text-center text-white/80"
            >
              Sign in to brew your favorites and keep your cart in sync.
            </Typography>
          </View>

          <View className="mt-10 rounded-3xl bg-background/95 p-6 shadow-card">
            <Typography className="mb-4 text-lg font-semibold text-brand-primary">
              Continue with email
            </Typography>
            <LoginForm formData={formData} setFormData={setFormData} />

            {error ? (
              <Typography className="mt-3 text-sm font-semibold text-error">
                {error}
              </Typography>
            ) : null}

            <Button
              title={submitting ? 'Signing in...' : 'Sign in'}
              onPress={handleLogin}
              disabled={submitting}
              className="mt-4"
            />
          </View>
        </Container>
      </ScrollView>
    </ImageBackground>
  );
}
