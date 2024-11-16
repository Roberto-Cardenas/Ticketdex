import { View, Text, StyleSheet, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  eventID: number;
  name: string;
  location: string;
  dateTime: string;
  onPress: () => void;
};

function processLocationText(locationName: string) {
  if (locationName.length > 20) {
    return `${locationName.substring(0, 20)}...`;
  } else {
    return locationName;
  }
}

export default function EventCard({ eventID, name, location, dateTime, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[styles.text, styles.title]}>{name}</Text>
      <View style={styles.subcontainer}>
        <View style={styles.iconTextContainer}>
          <Entypo name="location-pin" size={16} color="#63de75" />
          <Text style={styles.text}>{processLocationText(location)}</Text>
        </View>
        <Text style={styles.text}>{dateTime}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A422E'
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconTextContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  }
});
