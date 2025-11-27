import { TextInputProps } from 'react-native';
import Input from '../atoms/Input';

export default function PasswordInput(props: TextInputProps) {
  return (
    <Input
      secureTextEntry
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
}
