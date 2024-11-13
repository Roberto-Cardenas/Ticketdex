import { View, StyleSheet, Pressable, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';// For later use

import TicketImagePicker from './TicketImagePicker';
import TicketFilePicker from './TicketFilePicker';
import { FileData } from '@/app/create_event';
import { useState } from 'react';

type Props = {
  fileData: FileData;
  setFileData: (fileData: FileData) => void;
};

export default function TicketSourcePicker({ fileData, setFileData }: Props) {
  const [selected, setSelected] = useState(fileData.type.trim() === '' ? 'file' : fileData.type);

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
  }
});
