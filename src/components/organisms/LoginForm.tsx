import { View } from 'react-native';
import { FormData } from '../../types/FormData';
import EmailInput from '../molecules/EmailInput';
import PasswordInput from '../molecules/PasswordInput';
import InputGroup from '../molecules/InputGroup';

interface LoginFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function LoginForm({ formData, setFormData }: LoginFormProps) {
  return (
    <View className="w-full">
      <InputGroup label="Email">
        <EmailInput
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
          placeholder="Enter your email"
          className="bg-surface-muted"
        />
      </InputGroup>
      <InputGroup label="Password">
        <PasswordInput
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
          placeholder="••••••••"
          className="bg-surface-muted"
        />
      </InputGroup>
    </View>
  );
}
