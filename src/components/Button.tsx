import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      //style={[styles.button, props.style]}
      style={{
        ...styles.button,
        ...(props.style ?? {}),
      }}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: '600',
  },
});
