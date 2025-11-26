import { Button, StyleSheet, Text, View } from 'react-native';
import LoginFormComponent from '../components/LoginFormComponent';
import React from 'react';
import { FormData } from '../types/FormData';

export default function LoginScreen() {
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      console.error('Email and password are required');
      return;
    }
    console.log('Logging in with', formData);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Login Screen</Text>
      </View>
      <LoginFormComponent formData={formData} setFormData={setFormData} />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
