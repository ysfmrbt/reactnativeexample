import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

export type TabItem = {
  key: string;
  label: string;
  icon: React.ElementType;
};

export interface AppBottomTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
  className?: string;
}

export default function AppBottomTabs({
  tabs,
  activeTab,
  onTabPress,
  className,
}: AppBottomTabsProps) {
  const brandPrimary = useCSSVariable('--color-brand-primary');
  const iconInactive = useCSSVariable('--color-icon-inactive');

  return (
    <View
      className={`flex-row items-center justify-around bg-surface px-6 py-4 pb-8 rounded-tabbar shadow-floating ${
        className ?? ''
      }`}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;
        const IconComponent = tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            className="items-center justify-center"
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <IconComponent
              size={24}
              color={isActive ? brandPrimary : iconInactive}
              strokeWidth={isActive ? 2.4 : 2}
              fill={isActive ? brandPrimary : 'none'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
