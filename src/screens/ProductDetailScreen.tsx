import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Heart, Star } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from '../components/atoms/IconButton';
import Pill from '../components/atoms/Pill';
import Typography from '../components/atoms/Typography';
import {
  incrementCartQuantity,
  isProductFavorite,
  toggleFavorite,
} from '../persistence/repository';
import { useCSSVariable } from 'uniwind';

const DEFAULT_SIZES = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

const DEFAULT_SUGAR = [
  { id: 'no-sugar', label: 'No Sugar' },
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
];

type ProductParam = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  rating?: number;
  image?: any;
  description?: string;
  sizes?: { id: string; label: string }[];
  sugarOptions?: { id: string; label: string }[];
  defaultSize?: string;
  defaultSugar?: string;
};

const FALLBACK_PRODUCT: ProductParam = {
  id: 'fallback',
  title: 'Cappuccino',
  subtitle: 'With Sugar',
  price: '8.50',
  rating: 4.8,
  image: require('../../assets/bg-coffee-small.png'),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  defaultSize: 'small',
  defaultSugar: 'no-sugar',
  sizes: DEFAULT_SIZES,
  sugarOptions: DEFAULT_SUGAR,
};

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const brandPrimary = useCSSVariable('--color-brand-primary');
  const iconInactive = useCSSVariable('--color-icon-inactive');
  const gradientBase = useCSSVariable('--color-gradient-base');

  const productParam = (route.params as { product?: ProductParam } | undefined)
    ?.product;
  const product = productParam ?? FALLBACK_PRODUCT;

  const [cupSize, setCupSize] = useState(product.defaultSize ?? 'small');
  const [sugarLevel, setSugarLevel] = useState(
    product.defaultSugar ?? 'no-sugar',
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const sizes = product.sizes ?? DEFAULT_SIZES;
  const sugarOptions = product.sugarOptions ?? DEFAULT_SUGAR;
  const description = product.description ?? FALLBACK_PRODUCT.description;

  const ratingText = useMemo(() => {
    const value = (product as any).rating ?? FALLBACK_PRODUCT.rating ?? 4.8;
    return Number.isFinite(value) ? value.toFixed(1) : '4.8';
  }, [product]);

  const formattedPrice = useMemo(() => {
    const raw = product.price as any;
    const value =
      typeof raw === 'number'
        ? raw
        : Number(
            String(raw)
              .replace(/[^0-9.,]/g, '')
              .replace(/,/g, ''),
          );
    if (!Number.isFinite(value)) return 'TND -';
    return value.toLocaleString('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [product.price]);

  const imageSource = useMemo(() => {
    if ((product as any).image_url) {
      return { uri: (product as any).image_url };
    }
    return product.image ?? FALLBACK_PRODUCT.image;
  }, [product]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!product?.id) return;
      try {
        const favorited = await isProductFavorite(String(product.id));
        if (mounted) setIsFavorite(favorited);
      } catch (error) {
        console.log('Failed to read favorite state', error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [product?.id]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="relative">
          <ImageBackground
            source={imageSource}
            resizeMode="cover"
            className="h-105"
          >
            <View className="absolute inset-0 bg-black/25" />

            <View
              className="flex-1"
              style={[styles.headerInset, { paddingTop: insets.top + 12 }]}
            >
              <View className="flex-row items-center justify-between">
                <IconButton
                  variant="solid"
                  className="bg-background/90"
                  renderIcon={({ size, color }) => (
                    <ArrowLeft size={size} color={color} />
                  )}
                  onPress={() => navigation.goBack()}
                />
                <IconButton
                  variant="solid"
                  className="bg-background/90"
                  renderIcon={({ size }) => (
                    <Heart
                      size={size}
                      color={isFavorite ? brandPrimary : iconInactive}
                      fill={isFavorite ? brandPrimary : 'transparent'}
                    />
                  )}
                  onPress={async () => {
                    if (!product?.id) return;
                    try {
                      await toggleFavorite(String(product.id));
                      setIsFavorite(prev => !prev);
                    } catch (error) {
                      console.log('Failed to toggle favorite', error);
                    }
                  }}
                />
              </View>
            </View>
          </ImageBackground>

          <View style={styles.cardOffset} className="px-5">
            <View className="rounded-t-4xl bg-background px-4 pb-10 pt-6 shadow-floating">
              <View className="mb-5 flex-row items-start justify-between">
                <View className="flex-1 pr-4">
                  <Typography
                    variant="h1"
                    className="text-3xl text-brand-primary"
                  >
                    {product.title}
                  </Typography>
                  {product.subtitle ? (
                    <Typography
                      variant="body"
                      className="mt-1 text-sm text-text-secondary"
                    >
                      {product.subtitle}
                    </Typography>
                  ) : null}
                </View>
                <View
                  className="flex-row items-center gap-2 rounded-full px-3 py-2"
                  style={{ backgroundColor: gradientBase }}
                >
                  <Star size={14} color="white" fill="white" />
                  <Typography
                    variant="caption"
                    className="font-semibold text-white"
                  >
                    {ratingText}
                  </Typography>
                </View>
              </View>

              <View className="mb-6">
                <Typography
                  variant="h3"
                  className="text-base font-semibold text-brand-primary"
                >
                  Cup Size
                </Typography>
                <View className="mt-3 flex-row items-center gap-3">
                  {sizes.map((option: { id: string; label: string }) => (
                    <Pill
                      key={option.id}
                      label={option.label}
                      selected={cupSize === option.id}
                      onPress={() => setCupSize(option.id)}
                      size="md"
                      className={cupSize === option.id ? '' : 'bg-background'}
                    />
                  ))}
                </View>
              </View>

              <View className="mb-6">
                <Typography
                  variant="h3"
                  className="text-base font-semibold text-brand-primary"
                >
                  Level Sugar
                </Typography>
                <View className="mt-3 flex-row items-center gap-3">
                  {sugarOptions.map((option: { id: string; label: string }) => (
                    <Pill
                      key={option.id}
                      label={option.label}
                      selected={sugarLevel === option.id}
                      onPress={() => setSugarLevel(option.id)}
                      size="md"
                      className={
                        sugarLevel === option.id ? '' : 'bg-background'
                      }
                    />
                  ))}
                </View>
              </View>

              <View>
                <Typography
                  variant="h3"
                  className="text-base font-semibold text-brand-primary"
                >
                  About
                </Typography>
                <Typography
                  variant="body"
                  numberOfLines={expanded ? undefined : 3}
                  className="mt-3 text-[15px] leading-6 text-text-secondary"
                >
                  {description}
                </Typography>
                {description.length > 180 ? (
                  <Pressable
                    onPress={() => setExpanded(prev => !prev)}
                    className="mt-2"
                  >
                    <Typography
                      variant="label"
                      className="font-semibold text-brand-primary"
                    >
                      {expanded ? 'Show Less' : 'Read More'}
                    </Typography>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="border-t border-border bg-background px-6"
        style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}
      >
        <Pressable
          className="flex-row items-center justify-between rounded-pill bg-brand-primary px-6 py-4 shadow-soft"
          onPress={async () => {
            if (!product?.id) return;
            try {
              await incrementCartQuantity(String(product.id), 1);
            } catch (error) {
              console.log('Failed to add to cart', error);
            }
          }}
        >
          <Typography className="text-lg font-semibold text-white">
            Add to cart
          </Typography>
          <Typography className="text-lg font-bold text-white">
            {formattedPrice}
          </Typography>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },
  headerInset: {
    paddingHorizontal: 20,
  },
  cardOffset: {
    marginTop: -28,
  },
  footer: {
    paddingTop: 14,
  },
});
