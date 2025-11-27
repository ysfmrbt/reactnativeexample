import { StyleSheet, Text, View } from 'react-native';
import LoginFormComponent from '../components/LoginForm';
import React from 'react';
import { FormData } from '../types/FormData';
import Button from '../components/Button';

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
        <Text>Login</Text>
      </View>
      <LoginFormComponent formData={formData} setFormData={setFormData} />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button
          style={{ backgroundColor: 'red' }}
          title="Cancel"
          onPress={handleLogin}
        />
        <Button title="Reset" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
  },
});
