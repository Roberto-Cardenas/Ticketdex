// Library imports
import { View, StyleSheet, Switch, Text } from "react-native";
import { useState } from "react";

// Component imports
import Title from "@/components/Title";
import DeleteIntervalPicker from "@/components/DeleteIntervalPicker";

// Model imports
import { Config, getConfig, setConfig } from "@/models/Config";

export default function Settings() {
  const appConfig = getConfig();
  const [autoDeleteEvents, setAutoDeleteEvents] = useState(appConfig.autoDeleteEvents);
  const [selectedDeleteInterval, setSelectedDeleteInterval] = useState(appConfig.deleteEventOffset);

  const handleConfigSave = (key: keyof Config, value: number | boolean) => {
    let newConfig: Config = {
      autoDeleteEvents: autoDeleteEvents,
      deleteEventOffset: selectedDeleteInterval
    };

    Object.defineProperty(newConfig, key, { value: value });

    setConfig(newConfig);
  };

  const handleAutoDeleteChange = () => {
    handleConfigSave('autoDeleteEvents', !autoDeleteEvents);
    setAutoDeleteEvents(!autoDeleteEvents);
  }

  const handleIntervalSelect = (interval: number) => {
    handleConfigSave('deleteEventOffset', interval);
    setSelectedDeleteInterval(interval);
  }

  return (
    <View style={styles.container}>
      {/* Main content container */}
      <View style={styles.mainContentContainer}>
          <Title>SETTINGS</Title>
          <View style={styles.optionPanel}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <View>
                <Text style={styles.optionHeaderText} >Delete Past Event Tickets</Text>
                <Text style={styles.optionSubHeaderText} >Delete past event tickets automatically after a set amount of time</Text>
              </View>
              <Switch
              value={autoDeleteEvents}
              onValueChange={handleAutoDeleteChange}
              trackColor={{false: '#B3CEB7', true: '#63DE75'}}
              ios_backgroundColor='#B3CEB7'
            />
            </View>
            <View>
              <DeleteIntervalPicker 
                selectedInterval={selectedDeleteInterval} 
                onSelect={handleIntervalSelect}
                enabled={autoDeleteEvents}
              />
            </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222b23",
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
  },
  mainContentContainer: {
    flex: 1,
    marginVertical: 10
  },
  optionPanel: {
    marginTop: 16
  },
  optionHeaderText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  },
  optionSubHeaderText: {
    color: '#C7DCC9',
    fontFamily: 'Roboto-Regular',
    width: 250,
    marginTop: 8
  }
});