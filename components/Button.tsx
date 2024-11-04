import { Pressable, Text, View, StyleSheet } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  onPress: () => void;
  label: string;
  icon: keyof typeof Entypo.glyphMap
};

export default function Button({ onPress, label, icon }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
        <Entypo name={icon} size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 4,
    borderColor: '#63de75',
    padding: 3,
    backgroundColor: '#222b23',
    borderRadius: 11
  },
  button: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 5
  },
  buttonLabel: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium'
  }
});