import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import { FormData } from '../types/FormData';
import Typography from '../components/atoms/Typography';
import Container from '../components/atoms/Container';

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
    <Container className="flex-1">
      <Typography variant="h2">Login with your email and password</Typography>
      <LoginForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleLogin}
      />
    </Container>
  );
}
