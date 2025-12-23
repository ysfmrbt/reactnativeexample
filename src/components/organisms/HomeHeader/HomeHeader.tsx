import { Bell, MapPin, Search, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import Avatar from '../../atoms/Avatar';
import IconButton from '../../atoms/IconButton';
import Typography from '../../atoms/Typography';
import { SearchBar } from '../../molecules/SearchBar';
import { useCSSVariable } from 'uniwind';

export interface HomeHeaderProps {
  userName: string;
  userAvatar?: any; // ImageSourcePropType
  location?: string;
  searchValue?: string;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
  className?: string;
}

export default function HomeHeader({
  userName,
  userAvatar,
  location = 'Sfax, Tunisia',
  searchValue,
  onSearch,
  onFilterPress,
  onNotificationPress,
  onAvatarPress,
  className,
}: HomeHeaderProps) {
  const brandPrimary = useCSSVariable('--color-brand-primary');
  const textSecondary = useCSSVariable('--color-text-secondary');

  return (
    <View className={`px-6 pt-2 ${className ?? ''}`}>
      {/* Top Row: Avatar, Location, Notification */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Avatar source={userAvatar} size="md" onPress={onAvatarPress} />
          <View>
            <Typography variant="caption" className="text-text-secondary">
              Good morning,
            </Typography>
            <Typography variant="h3" className="text-base">
              {userName}
            </Typography>
          </View>
        </View>

        <View className="flex-row items-center gap-1">
          <View className="flex-row items-center gap-1">
            <MapPin size={16} color={brandPrimary} fill={brandPrimary} />
            <Typography variant="caption" className="font-medium">
              {location}
            </Typography>
          </View>

          <IconButton
            onPress={onNotificationPress}
            renderIcon={({ size, color }) => <Bell size={size} color={color} />}
          />
        </View>
      </View>

      {/* Search Bar */}
      <View className="mt-6">
        <SearchBar
          placeholder="Search Coffee ..."
          value={searchValue}
          onChangeText={onSearch}
          leftIcon={<Search size={20} color={textSecondary} />}
          rightIcon={
            <IconButton
              size="sm"
              variant="solid"
              className="bg-brand-primary"
              onPress={onFilterPress}
              renderIcon={({ size }) => (
                <SlidersHorizontal size={size * 0.8} color="white" />
              )}
            />
          }
        />
      </View>
    </View>
  );
}
