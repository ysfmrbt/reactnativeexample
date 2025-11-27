import { StyleSheet, View } from 'react-native';
import { FormData } from '../../types/FormData';
import EmailInput from '../molecules/EmailInput';
import PasswordInput from '../molecules/PasswordInput';
import InputGroup from '../molecules/InputGroup';
import Button from '../atoms/Button';
import { SPACING } from '../../constants/theme';

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
    <View style={styles.formContainer}>
      <InputGroup label="Email:">
        <EmailInput
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
        />
      </InputGroup>
      <InputGroup label="Password:">
        <PasswordInput
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
        />
      </InputGroup>
      <Button variant="ghost" title="Login" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginTop: SPACING.xl,
  },
});
