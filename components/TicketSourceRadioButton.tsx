import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
  selected: string;
  setSelected: (selected: string) => void;
  value: string;
};

export default function TicketSourceRadioButton({ selected, setSelected, value, children }: Props) {
  return (
    <View style={styles.radioButtonGroup}>
      <RadioButton.Android
        value={value}
        status={ selected === value ? 'checked' : 'unchecked' }
        onPress={() => setSelected(value)}
        color='#B3CEB7'
        uncheckedColor='#374639'
      />
      { children }
    </View>
  );
}

const styles = StyleSheet.create({
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
});
