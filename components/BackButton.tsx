import { Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  onPress?: () => void;
};

export default function BackButton({ onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={ onPress ? onPress : () => { router.back(); } }>
      <Text style={styles.text}>BACK</Text>
      <Ionicons name="return-down-back-sharp" size={28} color="#63de75" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
    fontSize: 20
  },
  button: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'
  }
});
