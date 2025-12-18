import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import AppTemplate from './src/templates/AppTemplate';
import BootSplash from 'react-native-bootsplash';
import './src/global.css';
function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <NavigationContainer>
      <AppTemplate>
        <AppNavigation />
      </AppTemplate>
    </NavigationContainer>
  );
}

export default App;
