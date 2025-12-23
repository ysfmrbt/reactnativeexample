import { Heart, Minus, Plus } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from '../components/atoms/IconButton';
import Typography from '../components/atoms/Typography';
import {
  getCart,
  setCartQuantity,
  CartItem,
  clearCart,
  getFavorites,
  toggleFavorite,
} from '../persistence/repository';
import { useFocusEffect } from '@react-navigation/native';
import { useCSSVariable } from 'uniwind';

function formatCurrency(value: number) {
  const fixed = Number.isFinite(value) ? value : 0;
  return fixed.toLocaleString('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<CartItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const brandPrimary = useCSSVariable('--color-brand-primary');

  const loadCart = React.useCallback(async () => {
    try {
      const data = await getCart();
      const favs = await getFavorites();
      setItems(data);
      setFavoriteIds(new Set(favs.map(f => f.id)));
    } catch (error) {
      console.log('Failed to load cart', error);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useFocusEffect(
    React.useCallback(() => {
      loadCart();
      return () => {};
    }, [loadCart]),
  );

  const renderEmpty = () => (
    <View className="mt-2 rounded-2xl bg-background p-5 shadow-soft">
      <Typography className="text-lg font-semibold text-brand-primary">
        Your cart is empty
      </Typography>
      <Typography className="mt-2 text-text-secondary">
        Add some coffees to start your order.
      </Typography>
    </View>
  );

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const discount = 25000;
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }, [items]);

  const updateQuantity = async (productId: string, delta: number) => {
    const current = items.find(item => item.product.id === productId);
    const nextQty = Math.max(1, (current?.quantity ?? 0) + delta);
    await setCartQuantity(productId, nextQty);
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: nextQty } : item,
      ),
    );
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 56,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4">
          <Typography
            variant="h3"
            className="text-lg font-semibold text-brand-primary"
          >
            Cart
          </Typography>
        </View>

        <View className="space-y-3">
          {items.length === 0 && renderEmpty()}
          {items.map(item => (
            <View
              key={item.product.id}
              className="flex-row items-start rounded-2xl bg-background p-3 shadow-card"
            >
              <Image
                source={
                  item.product.image_url
                    ? { uri: item.product.image_url }
                    : require('../../assets/bg-coffee-small.png')
                }
                resizeMode="cover"
                className="mr-3 h-28 w-28 rounded-xl"
              />

              <View className="flex-1">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    <Typography className="text-base font-semibold text-brand-primary">
                      {item.product.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-text-secondary"
                    >
                      {item.product.subtitle}
                    </Typography>
                    <Typography className="mt-2 text-sm font-semibold text-brand-primary">
                      {formatCurrency(item.product.price)}
                    </Typography>
                  </View>

                  <IconButton
                    size="sm"
                    variant="ghost"
                    renderIcon={({ size }) => (
                      <Heart
                        size={size}
                        color={brandPrimary}
                        fill={
                          favoriteIds.has(item.product.id)
                            ? brandPrimary
                            : 'none'
                        }
                      />
                    )}
                    onPress={async () => {
                      try {
                        await toggleFavorite(item.product.id);
                        setFavoriteIds(prev => {
                          const next = new Set(prev);
                          if (next.has(item.product.id)) {
                            next.delete(item.product.id);
                          } else {
                            next.add(item.product.id);
                          }
                          return next;
                        });
                      } catch (error) {
                        console.log('Failed to toggle favorite', error);
                      }
                    }}
                  />
                </View>

                <View className="mt-2">
                  <Typography className="text-[13px] text-text-secondary">
                    Quantity:{' '}
                    <Typography className="font-semibold">
                      {item.quantity}
                    </Typography>
                  </Typography>
                </View>

                <View className="mt-3 flex-row flex-wrap items-center justify-between gap-3">
                  <View className="flex-row items-center gap-2">
                    <IconButton
                      size="sm"
                      variant="solid"
                      className="bg-brand-primary"
                      renderIcon={({ size, color }) => (
                        <Minus size={size} color="white" />
                      )}
                      onPress={() => updateQuantity(item.product.id, -1)}
                    />
                    <Typography className="text-xl font-semibold text-brand-primary">
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="sm"
                      variant="solid"
                      className="bg-brand-primary"
                      renderIcon={({ size, color }) => (
                        <Plus size={size} color="white" />
                      )}
                      onPress={() => updateQuantity(item.product.id, 1)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-8">
          <View className="mb-2 flex-row justify-between">
            <Typography className="text-base text-text-secondary">
              Subtotal
            </Typography>
            <Typography className="text-base text-text-secondary">
              {formatCurrency(totals.subtotal)}
            </Typography>
          </View>
          <View className="mb-2 flex-row justify-between">
            <Typography className="text-base text-text-secondary">
              Discount
            </Typography>
            <Typography className="text-base text-text-secondary">
              {formatCurrency(totals.discount)}
            </Typography>
          </View>
          <View className="mb-4 flex-row justify-between">
            <Typography className="text-base font-semibold text-brand-primary">
              Total
            </Typography>
            <Typography className="text-base font-semibold text-brand-primary">
              {formatCurrency(totals.total)}
            </Typography>
          </View>

          <Typography className="mb-2 text-sm font-semibold text-brand-primary">
            Payment
          </Typography>
          <View className="mb-4 flex-row items-center gap-3">
            {['VISA', 'PayPal', 'MasterCard'].map(method => (
              <View
                key={method}
                className="rounded-lg border border-border px-3 py-2"
              >
                <Typography className="text-sm font-semibold text-brand-primary">
                  {method}
                </Typography>
              </View>
            ))}
          </View>

          <Pressable
            className={`mb-4 items-center justify-center rounded-pill py-4 shadow-soft ${
              items.length === 0 ? 'bg-border' : 'bg-brand-primary'
            }`}
            disabled={items.length === 0}
            onPress={async () => {
              if (!items.length) return;
              try {
                await clearCart();
                await loadCart();
              } catch (error) {
                console.log('Checkout failed', error);
              }
            }}
          >
            <Typography
              className={`text-lg font-semibold ${
                items.length === 0 ? 'text-text-secondary' : 'text-white'
              }`}
            >
              Buy
            </Typography>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
