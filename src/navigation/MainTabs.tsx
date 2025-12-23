import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Heart,
  Home as HomeIcon,
  ShoppingCart,
  User,
} from 'lucide-react-native';
import MainScreen from '../screens/Main/MainScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useCSSVariable } from 'uniwind';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const brandPrimary = useCSSVariable('--color-brand-primary');
  const iconInactive = useCSSVariable('--color-icon-inactive');
  const surface = useCSSVariable('--color-surface');
  const foreground = useCSSVariable('--color-foreground');

  const renderTabIcon = useCallback(
    (IconComponent: React.ElementType, focused: boolean) => {
      const color = focused ? brandPrimary : iconInactive;
      return (
        <IconComponent
          size={22}
          color={color}
          strokeWidth={focused ? 2.4 : 2}
        />
      );
    },
    [brandPrimary, iconInactive],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 28,
          height: 68,
          paddingBottom: 12,
          paddingTop: 12,
          elevation: 8,
          shadowColor: foreground,
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          backgroundColor: surface,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(HomeIcon, focused),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(Heart, focused),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(ShoppingCart, focused),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(User, focused),
        }}
      />
    </Tab.Navigator>
  );
}
