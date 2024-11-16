import { View, StyleSheet } from "react-native";
import BasicSettingPanel from "./BasicSettingPanel";
import DeleteIntervalPicker from "./DeleteIntervalPicker";

type Props = {
  switchValue: boolean;
  onSwitchValueChange: () => void;
  selectedDeleteInterval: number;
  handleIntervalSelect: (interval: number) => void;
};

export default function AutoDeleteSettingPanel({ switchValue, onSwitchValueChange, selectedDeleteInterval, handleIntervalSelect }: Props) {
  return (
    <View style={styles.optionPanel}>
      <BasicSettingPanel 
        header="Delete Past Event Tickets" 
        subheader="Delete past event tickets automatically after a set amount of time"
        switchValue={switchValue}
        onValueChange={onSwitchValueChange}
      />
      <View>
        <DeleteIntervalPicker 
          selectedInterval={selectedDeleteInterval} 
          onSelect={handleIntervalSelect}
          enabled={switchValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionPanel: {
    marginTop: 16
  },
});
