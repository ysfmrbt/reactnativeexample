import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Heart, Plus } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from '../components/atoms/IconButton';
import Typography from '../components/atoms/Typography';
import { useCSSVariable } from 'uniwind';
import {
  getFavorites,
  incrementCartQuantity,
  ProductRow,
  toggleFavorite,
} from '../persistence/repository';

const PRODUCT_IMAGE = require('../../assets/bg-coffee-small.png');

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = React.useState<ProductRow[]>([]);
  const brandPrimary = useCSSVariable('--color-brand-primary');
  const brandPrimaryColor = (brandPrimary ?? '#000') as string;

  const loadFavorites = React.useCallback(async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.log('Failed to load favorites', error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
      return () => {};
    }, [loadFavorites]),
  );

  const renderEmpty = () => (
    <View className="mx-6 mt-4 rounded-2xl bg-background p-5 shadow-soft">
      <Typography className="text-lg font-semibold text-brand-primary">
        No favorites yet
      </Typography>
      <Typography className="mt-2 text-text-secondary">
        Tap the heart on a coffee to save it here for quick access.
      </Typography>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 mb-4">
          <Typography
            variant="h3"
            className="text-lg font-semibold text-brand-primary"
          >
            Favorite
          </Typography>
        </View>

        <View className="flex-row flex-wrap justify-between px-4">
          {favorites.length === 0 && renderEmpty()}
          {favorites.map(item => (
            <Pressable
              key={item.id}
              className="mb-5 w-[47%] rounded-2xl bg-background p-3 shadow-card"
              onPress={() =>
                // @ts-ignore simple stack navigation
                navigation.navigate('ProductDetail', { product: item })
              }
            >
              <View className="relative mb-3 overflow-hidden rounded-xl">
                <Image
                  source={
                    item.image_url ? { uri: item.image_url } : PRODUCT_IMAGE
                  }
                  resizeMode="cover"
                  className="h-32 w-full"
                />
                <Pressable
                  className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-soft"
                  onPress={async () => {
                    try {
                      await toggleFavorite(item.id);
                      setFavorites(prev =>
                        prev.filter(fav => fav.id !== item.id),
                      );
                    } catch (error) {
                      console.log('Failed to toggle favorite', error);
                    }
                  }}
                >
                  <Heart
                    size={18}
                    color={brandPrimaryColor}
                    fill={brandPrimaryColor}
                  />
                </Pressable>
              </View>

              <Typography className="text-base font-semibold text-brand-primary">
                {item.title}
              </Typography>
              <Typography
                variant="caption"
                className="mt-1 text-text-secondary"
              >
                {item.subtitle}
              </Typography>
              <View className="mt-2 flex-row items-center justify-between">
                <View className="flex-row items-end">
                  <Typography className="ml-1 text-xl font-bold text-brand-primary">
                    {Number(item.price).toLocaleString('fr-TN', {
                      style: 'currency',
                      currency: 'TND',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </View>
                <IconButton
                  size="sm"
                  variant="solid"
                  className="bg-brand-primary"
                  renderIcon={({ size }) => <Plus size={size} color="white" />}
                  onPress={async () => {
                    try {
                      await incrementCartQuantity(item.id, 1);
                    } catch (error) {
                      console.log('Failed to add favorite to cart', error);
                    }
                  }}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
