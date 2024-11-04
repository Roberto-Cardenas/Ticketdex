import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  date: Date;
  setDate: (newDate :Date) => void;
}

export default function DateTimeSelector({ date, setDate }: Props) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  // Date Picker functions
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  // Time Picker functions
  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  // Update Date object
  const handleConfirm = (date: Date | undefined, handlePicker: () => void) => {
    if (!date) {
      return;
    }

    handlePicker();
    setDate(date);
  };

  return (
    <View style={styles.dateTimeContainer}>
      <Pressable style={styles.button} onPress={showDatePicker}>
        <Text style={styles.buttonText} >
          {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={showTimePicker}>
        <Text style={styles.buttonText} >
          {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date: Date | undefined) => {handleConfirm(date, hideDatePicker)}}
        onCancel={hideDatePicker}
        date={date}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(date: Date | undefined) => {handleConfirm(date, hideTimePicker)}}
        onCancel={hideTimePicker}
        date={date}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 8
  },
  button: {
    backgroundColor: '#1A201A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 18
  }
});
