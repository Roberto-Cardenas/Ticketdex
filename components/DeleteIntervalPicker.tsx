import { Modal, Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

type Props = {
  selectedInterval: number;
  enabled: boolean;
  onSelect: (interval: number) => void;
};

const options = [
  {
    label: '3 Days',
    value: 3
  },
  {
    label: '1 Week',
    value: 7
  },
  {
    label: '2 Weeks',
    value: 14
  },
  {
    label: '1 Month',
    value: 30
  },
];

export default function DeleteIntervalPicker ({ selectedInterval, enabled, onSelect }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(options.findIndex((option) => option.value === selectedInterval));

  return (
      <View>
        {/* Picker Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
        > 
          <View style={styles.modalContent}>
            <View style={styles.pickerContainer} >
              <Picker
                  selectedValue={selectedOptionIndex}
                  onValueChange={(value) => {
                    setSelectedOptionIndex(value);
                  }}
                >
                {options.map((option, index) => (
                  <Picker.Item key={index} label={option.label} value={index} />
                ))}
              </Picker>
              <Pressable 
                style={styles.confirmButton} 
                onPress={() => {
                  setIsVisible(false);
                  onSelect(options[selectedOptionIndex].value);
                }}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
  
        {/* Clickable component that opens the picker modal */}
        <Pressable 
          onPress={() => {
            setIsVisible(true);
          }}
          style={enabled ? styles.openModalButton : styles.openModalButtonDisabled}
          disabled={!enabled}
        >
          <Text 
            style={enabled ? styles.openModalButtonText : styles.openModalButtonTextDisabled}>
              {options[selectedOptionIndex].label}
          </Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8
  },
  confirmButton: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1
  },
  confirmButtonText: {
    fontSize: 24,
    color: '#007AFF'
  },
  openModalButton: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#1A201A',
    borderRadius: 8,
    marginTop: 8
  },
  openModalButtonDisabled: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#374639',
    borderRadius: 8,
    marginTop: 8
  },
  openModalButtonText: {
    color: '#FFFFFF'
  },
  openModalButtonTextDisabled: {
    color: '#B3CEB7'
  }
});
