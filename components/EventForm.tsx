import { View, Text, TextInput, StyleSheet} from "react-native"
import DateTimeSelector from "./DateTimeSelector";
import LocationInput from "./LocationInput";
import TicketSourcePicker from "./TicketSourcePicker";
import { FileData, LocationData } from "@/imports/types";

type Props = {
  eventName: string;
  setEventName: (name: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  locationData: LocationData;
  setLocationData: (locationData: LocationData) => void;
  fileData: FileData;
  setFileData: (fileData: FileData) => void;
  selectedTicketType: string;
  setSelectedTicketType: (ticketType: string) => void;
}

export default function EventForm({ 
  eventName,
  setEventName,
  date,
  setDate,
  locationData,
  setLocationData,
  fileData,
  setFileData,
  selectedTicketType,
  setSelectedTicketType
 }: Props) {
  return (
    <>
      {/* Event name input */}
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Event</Text>
        <TextInput 
          style={styles.inputBox} 
          value={eventName} 
          onChangeText={setEventName}
          placeholder="Enter event name"
          placeholderTextColor="#677567"
        />
      </View>

      {/* Event date/time input */}
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Date and Time</Text>
        <DateTimeSelector date={date} setDate={setDate} />
      </View>

      {/* Event location picker input */}
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Location</Text>
        <LocationInput locationData={locationData} setLocationData={setLocationData} />
      </View>

      {/* Event ticket picker input */}
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Ticket</Text>
        <TicketSourcePicker 
          fileData={fileData} 
          setFileData={setFileData} 
          selected={selectedTicketType}
          setSelected={setSelectedTicketType}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 8
  },
  inputBox: {
    backgroundColor: '#1A201A',
    color: '#fff',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});
