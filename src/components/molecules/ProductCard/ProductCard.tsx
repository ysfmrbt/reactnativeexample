import React from 'react';
import { Image, ImageSourcePropType, Pressable, View } from 'react-native';
import Typography from '../../atoms/Typography';
import IconButton from '../../atoms/IconButton';

export interface ProductCardProps {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  onAddPress?: () => void;
  className?: string;
}

export default function ProductCard({
  title,
  subtitle,
  price,
  image,
  onPress,
  onAddPress,
  className,
}: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-64 rounded-card bg-background p-4 shadow-card ${
        className ?? ''
      }`}
    >
      {/* Image Container */}
      <View className="relative aspect-[1.05] w-full overflow-hidden rounded-2xl">
        <Image source={image} resizeMode="cover" className="h-full w-full" />
      </View>

      {/* Content */}
      <View className="mt-3 space-y-1">
        <Typography
          variant="h3"
          className="text-lg font-semibold"
          numberOfLines={1}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            variant="body"
            className="text-text-secondary"
            numberOfLines={1}
          >
            {subtitle}
          </Typography>
        ) : null}
      </View>

      {/* Footer: Price + Add Button */}
      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-end gap-1">
          <Typography
            variant="h2"
            className="text-2xl font-bold text-brand-primary"
          >
            {price}
          </Typography>
        </View>

        <IconButton
          size="sm"
          variant="solid"
          className="bg-brand-primary shadow-md shadow-brand-primary/40"
          onPress={onAddPress}
          renderIcon={({ size }) => (
            <Typography
              style={{ fontSize: size, lineHeight: size }}
              className="font-bold text-white"
            >
              +
            </Typography>
          )}
        />
      </View>
    </Pressable>
  );
}
