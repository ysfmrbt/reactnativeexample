import React from 'react';
import { ScrollView, View } from 'react-native';
import Pill from '../../atoms/Pill';
import { useCSSVariable } from 'uniwind';

export interface CategoryOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CategoryPillsProps {
  categories: CategoryOption[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export default function CategoryPills({
  categories,
  selectedId,
  onSelect,
  className,
}: CategoryPillsProps) {
  const foreground = useCSSVariable('--color-selected');
  const brandPrimary = useCSSVariable('--color-brand-primary');

  return (
    <View className={className}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
      >
        {categories.map(category => {
          const isSelected = category.id === selectedId;
          const iconColor = isSelected ? foreground : brandPrimary;
          const leftIcon = React.isValidElement(category.icon)
            ? React.cloneElement(category.icon, { color: iconColor })
            : category.icon;
          return (
            <Pill
              key={category.id}
              label={category.label}
              selected={isSelected}
              leftAdornment={leftIcon}
              onPress={() => onSelect?.(category.id)}
              variant={isSelected ? 'solid' : 'outline'}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
