// Library imports
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Component imports
import Title from "@/components/Title";
import AutoDeleteSettingPanel from "@/components/AutodeleteSettingPanel";

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
    <SafeAreaView style={styles.container}>
      {/* Main content container */}
      <View style={styles.mainContentContainer}>
          <Title>SETTINGS</Title>
          <AutoDeleteSettingPanel 
            switchValue={autoDeleteEvents}
            onSwitchValueChange={handleAutoDeleteChange}
            selectedDeleteInterval={selectedDeleteInterval}
            handleIntervalSelect={handleIntervalSelect}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222b23",
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
  },
  mainContentContainer: {
    flex: 1,
    marginVertical: 10
  },
});