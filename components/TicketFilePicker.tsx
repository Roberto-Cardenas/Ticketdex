import { StyleSheet, Pressable, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FileData } from '@/imports/types';

type Props = {
  fileData: FileData;
  setFileData: (fileData: FileData) => void;
  enabled: boolean;
};

export default function TicketFilePicker({ fileData, setFileData, enabled }: Props) {
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    });

    if (result.canceled) {
      return;
    }

    setFileData({
      name: result.assets[0].name,
      uri: result.assets[0].uri,
      type: 'file'
    });
  };

  return (
      <Pressable disabled={!enabled} style={ enabled ? styles.sourcePanel : styles.sourcePanelDisabled } onPress={pickDocument}>
        <Text style={ enabled ? styles.sourcePanelText : styles.sourcePanelTextDisabled }>
          { fileData.name.trim() === "" ? "Upload PDF" : (fileData.type === 'file' ? fileData.name : 'Upload PDF' ) }
        </Text>
        <MaterialIcons name="upload-file" size={28} color={enabled ? '#fff' : '#B3CEB7'} />
      </Pressable>
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