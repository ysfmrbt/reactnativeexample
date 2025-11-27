import { TextInputProps } from 'react-native';
import Input from '../atoms/Input';

export default function EmailInput(props: TextInputProps) {
  return (
    <Input
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
}
