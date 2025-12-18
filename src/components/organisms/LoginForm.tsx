import { View } from 'react-native';
import { FormData } from '../../types/FormData';
import EmailInput from '../molecules/EmailInput';
import PasswordInput from '../molecules/PasswordInput';
import InputGroup from '../molecules/InputGroup';
import Button from '../atoms/Button';

interface LoginFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
}

export default function LoginForm({
  formData,
  setFormData,
  onSubmit,
}: LoginFormProps) {
  return (
    <View className="w-full mt-5">
      <InputGroup label="Email">
        <EmailInput
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
        />
      </InputGroup>
      <InputGroup label="Password">
        <PasswordInput
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
        />
      </InputGroup>
      <Button title="Login" onPress={onSubmit} />
    </View>
  );
}
