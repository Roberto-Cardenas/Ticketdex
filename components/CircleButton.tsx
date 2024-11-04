import { Pressable, View, StyleSheet } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  onPress: () => void;
  accessibilityLabel: string;
};

export default function CircleButton({ onPress, accessibilityLabel }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable accessibilityLabel={accessibilityLabel} style={styles.circleButton} onPress={onPress}>
        <Entypo name="plus" size={48} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#63de75',
    borderRadius: 42,
    padding: 3,
    backgroundColor: '#222b23'
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});
