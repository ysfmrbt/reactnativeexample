import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FormData } from '../types/FormData';

export default function LoginFormComponent({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: (data: FormData) => void;
}) {
  return (
    <View style={styles.formContainer}>
      <View>
        <Text>Email:</Text>
        <TextInput
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View>
        <Text>Password:</Text>
        <TextInput
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
          secureTextEntry
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    marginTop: 20,
  },
});
