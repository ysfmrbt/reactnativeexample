import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen.tsx';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import MainTabs from './MainTabs';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../contexts/AuthContext';

const PublicStack = createNativeStackNavigator();

function PublicNavigation() {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <PublicStack.Navigator
      key={userToken ? 'auth' : 'guest'}
      initialRouteName={userToken ? 'MainTabs' : 'Home'}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {userToken ? (
        <>
          <PublicStack.Screen name="MainTabs" component={MainTabs} />
          <PublicStack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
          />
          <PublicStack.Screen name="Favorites" component={FavoritesScreen} />
          <PublicStack.Screen name="Cart" component={CartScreen} />
          <PublicStack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <PublicStack.Screen name="Home" component={HomeScreen} />
          <PublicStack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </PublicStack.Navigator>
  );
}

export default PublicNavigation;
