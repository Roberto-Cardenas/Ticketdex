import { View, StyleSheet, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  selected: string;
  value: string;
  label: string;
};

export default function TicketExternalLink({ selected, value, label }: Props) {
  return (
    <View style={ selected === value ? styles.sourcePanel : styles.sourcePanelDisabled } >
      <Text style={ selected === value? styles.sourcePanelText : styles.sourcePanelTextDisabled } >
        {label}
      </Text>
      <Entypo name="link" size={24} color={selected === value ? '#fff' : '#B3CEB7'} />
    </View>
  );
}

const styles = StyleSheet.create({
  sourcePanel: {
    backgroundColor: '#1A201A',
    padding: 16,
    borderRadius: 8,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    flex: 1
  },
  sourcePanelDisabled: {
    backgroundColor: '#374639',
    padding: 16,
    borderRadius: 8,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    flex: 1
  },
  sourcePanelText: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  sourcePanelTextDisabled: {
    color: "#B3CEB7",
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  }
});
