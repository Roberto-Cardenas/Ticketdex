import { SafeAreaView, StyleSheet, Pressable, Modal } from 'react-native';
import PdfRendererView from 'react-native-pdf-renderer';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  visible: boolean;
  onClose: () => void;
  uri: string;
};

export default function PDFModalViewer({ uri, visible, onClose }: Props) {
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <PdfRendererView
          style={{backgroundColor: '#222B23'}}
          source={uri}
        />
        <Pressable style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={20} color="white" />
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 32,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 32
  }
});
