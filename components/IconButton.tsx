import { StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap,
  accessibilityLabel: string,
  onPress: () => void
};

export default function IconButton({ icon, accessibilityLabel, onPress }: Props) {
  return (
    <Pressable accessibilityLabel={accessibilityLabel} onPress={onPress}>
      <MaterialIcons name={icon} size={28} color="#B3CEB7" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  
});