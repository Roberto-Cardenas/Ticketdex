import { View, Text, Switch, StyleSheet } from "react-native";

type Props = {
  header: string;
  subheader: string;
  switchValue: boolean;
  onValueChange: () => void;
};

export default function BasicSettingPanel({ header, subheader, switchValue, onValueChange }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.optionHeaderText} >{ header }</Text>
        <Text style={styles.optionSubHeaderText} >{ subheader }</Text>
      </View>
      <Switch
        value={switchValue}
        onValueChange={onValueChange}
        trackColor={{false: '#B3CEB7', true: '#63DE75'}}
        ios_backgroundColor='#B3CEB7'
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
