import { useNavigation } from '@react-navigation/native';
import { Coffee } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Typography from '../../components/atoms/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryPills } from '../../components/molecules/CategoryPills';
import { HomeHeader } from '../../components/organisms/HomeHeader';
import { ProductGrid } from '../../components/organisms/ProductGrid';
import { useCSSVariable } from 'uniwind';
import {
  getCategories,
  getProductsFiltered,
  getTopRated,
  CategoryRow,
  ProductRow,
  incrementCartQuantity,
} from '../../persistence/repository';
import { useAuth } from '../../contexts/AuthContext';

export default function MainScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [topRated, setTopRated] = useState<ProductRow[]>([]);
  const brandPrimary = useCSSVariable('--color-brand-primary');

  const fallbackImage = require('../../../assets/bg-coffee-small.png');

  const formatTND = (value: number) =>
    Number(value).toLocaleString('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cats = await getCategories();
        if (mounted) setCategories(cats);
      } catch (error) {
        console.log('Failed to load categories', error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getProductsFiltered({
          search: searchTerm,
          categoryId: selectedCategory,
        });
        const popular = await getTopRated(4, selectedCategory);
        if (mounted) {
          setProducts(data);
          setTopRated(popular);
        }
      } catch (error) {
        console.log('Failed to load products', error);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [searchTerm, selectedCategory]);

  const productsWithHandlers = useMemo(
    () =>
      products.map(product => ({
        id: product.id,
        title: product.title,
        subtitle: product.subtitle ?? undefined,
        price: formatTND(product.price),
        image: product.image_url ? { uri: product.image_url } : fallbackImage,
        description: product.description ?? undefined,
        onPress: () =>
          // @ts-ignore - navigator is untyped for now
          navigation.navigate('ProductDetail', { product }),
        onAddPress: async () => {
          try {
            await incrementCartQuantity(product.id, 1);
          } catch (error) {
            console.log('Failed to add to cart', error);
          }
        },
      })),
    [navigation, products, fallbackImage],
  );

  const specialOffersWithHandlers = useMemo(
    () =>
      topRated.map(product => ({
        id: product.id,
        title: product.title,
        subtitle: product.subtitle ?? undefined,
        price: formatTND(product.price),
        image: product.image_url ? { uri: product.image_url } : fallbackImage,
        description: product.description ?? undefined,
        onPress: () =>
          // @ts-ignore - navigator is untyped for now
          navigation.navigate('ProductDetail', { product }),
        onAddPress: async () => {
          try {
            await incrementCartQuantity(product.id, 1);
          } catch (error) {
            console.log('Failed to add to cart', error);
          }
        },
      })),
    [navigation, topRated, fallbackImage],
  );

  const categoriesOptions = useMemo(
    () =>
      (categories.length
        ? categories
        : [
            { id: 'all', name: 'All' },
            { id: 'cappuccino', name: 'Cappuccino' },
            { id: 'coffee', name: 'Coffee' },
            { id: 'espresso', name: 'Espresso' },
            { id: 'latte', name: 'Latte' },
          ]
      ).map(cat => ({
        id: cat.id,
        label: cat.name,
        icon: <Coffee size={16} color={brandPrimary} />,
      })),
    [brandPrimary, categories],
  );

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <HomeHeader
          userName={user?.name ?? 'Youssef Mrabet'}
          userAvatar={require('../../../assets/bootsplash/logo.png')} // Placeholder
          location="Sfax, Tunisia"
          searchValue={searchTerm}
          onSearch={setSearchTerm}
          onFilterPress={() => console.log('Filter pressed')}
          onNotificationPress={() => console.log('Notification pressed')}
          onAvatarPress={() =>
            // @ts-ignore navigating to profile tab
            navigation.navigate('ProfileTab')
          }
          className="mb-4"
        />

        {/* Categories */}
        <View className="mb-6">
          <View className="px-6 mb-3">
            <Typography variant="h3">Categories</Typography>
          </View>
          <CategoryPills
            categories={categoriesOptions}
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </View>

        {/* Horizontal Product List */}
        <ProductGrid
          title="Our Coffee"
          products={productsWithHandlers}
          horizontal
          className="mb-8"
        />

        {/* Special Offer Section */}
        <ProductGrid
          title="Special Offer"
          products={specialOffersWithHandlers}
          horizontal={false} // Grid layout
        />
      </ScrollView>
    </View>
  );
}
