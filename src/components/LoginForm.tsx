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
      <View style={styles.inputGroup}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
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
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  inputGroup: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
