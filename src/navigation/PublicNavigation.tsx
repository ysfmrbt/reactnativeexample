import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const PublicStack = createNativeStackNavigator();
function PublicNavigation() {
  return (
    <PublicStack.Navigator initialRouteName="Login">
      <PublicStack.Screen name="Login" component={LoginScreen} />
    </PublicStack.Navigator>
  );
}

export default PublicNavigation;
