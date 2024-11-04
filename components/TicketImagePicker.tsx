import { StyleSheet, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { FileData } from '@/app/create_event';

type Props = {
  fileData: FileData;
  setFileData: (fileData: FileData) => void;
};

export default function TicketImagePicker({ fileData, setFileData }: Props) {
  const pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (result.canceled) {
      return;
    }

    setFileData({
      name: result.assets[0].fileName ? result.assets[0].fileName : new Date().toTimeString(),
      uri: result.assets[0].uri
    });
  };

  return (
      <Pressable style={styles.sourcePanel} onPress={pickDocument}>
        <Text style={styles.sourcePanelText}>{ fileData.name.trim() === "" ? "Upload screenshot" : fileData.name }</Text>
        <MaterialIcons name="upload-file" size={28} color="#fff" />
      </Pressable>
  );
}

const styles = StyleSheet.create({
  sourcePanel: {
    backgroundColor: '#374639',
    padding: 16,
    borderRadius: 8,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4
  },
  sourcePanelText: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  }
});
