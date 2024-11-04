import { View, StyleSheet, Pressable, Text } from 'react-native';
// import { RadioButton } from 'react-native-paper';// For later use

import TicketImagePicker from './TicketImagePicker';
import { FileData } from '@/app/create_event';

type Props = {
  fileData: FileData;
  setFileData: (fileData: FileData) => void;
};

export default function TicketSourcePicker({ fileData, setFileData }: Props) {
  return (
    <View>
      <Text style={styles.text}>File</Text>
      <TicketImagePicker fileData={fileData} setFileData={setFileData} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
