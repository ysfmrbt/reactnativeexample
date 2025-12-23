import { Coffee } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Typography from '../../atoms/Typography';
import { ProductCard, ProductCardProps } from '../../molecules/ProductCard';
import { useCSSVariable } from 'uniwind';

export interface ProductGridProps {
  title?: string;
  products: ProductCardProps[];
  horizontal?: boolean;
  className?: string;
}

export default function ProductGrid({
  title,
  products,
  horizontal = false,
  className,
}: ProductGridProps) {
  const brandPrimary = useCSSVariable('--color-brand-primary');

  const renderEmpty = () => (
    <View className="mx-6 mt-2 rounded-2xl border border-dashed border-brand-primary/40 bg-background/80 px-4 py-6 shadow-soft">
      <View className="mb-3 self-start rounded-full bg-brand-primary/10 p-3">
        <Coffee size={20} color={brandPrimary} />
      </View>
      <Typography
        variant="h3"
        className="text-lg font-semibold text-text-primary"
      >
        Nothing to sip yet
      </Typography>
      <Typography variant="body" className="mt-1 text-text-secondary">
        Try a different search or pick another category to see our coffees.
      </Typography>
    </View>
  );

  if (!products?.length) {
    return (
      <View className={className}>
        {title ? (
          <View className="mb-4 px-6">
            <Typography variant="h3">{title}</Typography>
          </View>
        ) : null}
        {renderEmpty()}
      </View>
    );
  }

  const renderProduct = (product: ProductCardProps) => (
    <ProductCard key={product.id} {...product} className="mr-5" />
  );

  return (
    <View className={className}>
      {title ? (
        <View className="mb-4 px-6">
          <Typography variant="h3">{title}</Typography>
        </View>
      ) : null}

      {horizontal ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 8 }}
        >
          {products.map(renderProduct)}
        </ScrollView>
      ) : (
        <View className="flex-row flex-wrap justify-between px-6">
          {products.map(product => (
            <View key={product.id} className="mb-4 w-[48%]">
              <ProductCard {...product} className="w-full" />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
