import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen.tsx';

const PublicStack = createNativeStackNavigator();

function PublicNavigation() {
  return (
    <PublicStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <PublicStack.Screen name="Home" component={HomeScreen} />
      <PublicStack.Screen name="Login" component={LoginScreen} />
    </PublicStack.Navigator>
  );
}

export default PublicNavigation;
