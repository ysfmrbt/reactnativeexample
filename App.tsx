import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import AppTemplate from './src/templates/AppTemplate';
import BootSplash from 'react-native-bootsplash';
import './src/global.css';
import { AuthProvider } from './src/contexts/AuthContext';
import { ensureDBReady } from './src/persistence/repository';
function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
    ensureDBReady().catch(err => console.log('DB init failed', err));
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppTemplate>
          <AppNavigation />
        </AppTemplate>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
