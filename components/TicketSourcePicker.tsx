import { View, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';

import TicketImagePicker from './TicketImagePicker';
import TicketFilePicker from './TicketFilePicker';
import { FileData } from '@/app/create_event';

type Props = {
  fileData: FileData;
  setFileData: (fileData: FileData) => void;
  selected: string;
  setSelected: (selected: string) => void;
};

export default function TicketSourcePicker({ fileData, setFileData, selected, setSelected }: Props) {
  return (
    <View style={{
      gap: 8
    }}>
      <View style={styles.radioButtonGroup}>
        <RadioButton.Android
          value="file"
          status={ selected === 'file' ? 'checked' : 'unchecked' }
          onPress={() => setSelected('file')}
          color='#B3CEB7'
          uncheckedColor='#374639'
        />
        <TicketFilePicker enabled={ selected === 'file' } fileData={fileData} setFileData={setFileData} />
      </View>
      <View style={styles.radioButtonGroup}>
        <RadioButton.Android
          value="image"
          status={ selected === 'image' ? 'checked' : 'unchecked' }
          onPress={() => setSelected('image')}
          color='#B3CEB7'
          uncheckedColor='#374639'
        />
        <TicketImagePicker enabled={ selected === 'image' } fileData={fileData} setFileData={setFileData} />
      </View>
      <View style={styles.radioButtonGroup}>
        <RadioButton.Android
          value="ra-guide"
          status={ selected === 'ra-guide' ? 'checked' : 'unchecked' }
          onPress={() => setSelected('ra-guide')}
          color='#B3CEB7'
          uncheckedColor='#374639'
        />
        <View style={ selected === 'ra-guide' ? styles.sourcePanel : styles.sourcePanelDisabled } >
          <Text style={ selected === 'ra-guide'? styles.sourcePanelText : styles.sourcePanelTextDisabled } >RA Guide</Text>
          <Entypo name="link" size={24} color={selected === 'ra-guide' ? '#fff' : '#B3CEB7'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
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
