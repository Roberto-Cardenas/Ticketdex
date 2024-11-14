// Library imports
import { ScrollView, View, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";

// Component imports
import Title from "@/components/Title";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import DateTimeSelector from "@/components/DateTimeSelector";
import LocationInput from "@/components/LocationInput";
import TicketSourcePicker from "@/components/TicketSourcePicker";

// Import Data layer
import { Event, createEvent } from "@/models/Event";

// Import filesystem API
import { saveTicket } from "@/filesystem/client";


// Type declarations and exports
export type LocationData = {
  googlePlaceID: string;
  name: string;
  address: string;
};

export type FileData = {
  name: string;
  uri: string;
  type: string;
};

function defaultDate() {
  const date = new Date();
  date.setHours(22);
  date.setMinutes(0);
  date.setDate(date.getDate() + 1);

  return date;
}

const externalTicketLinks = {
  'ra-guide': 'https://residentadvisor.page.link/'
};

export default function CreateEvent() {
  const [eventName, setEventName] = useState<string>("");
  const [date, setDate] = useState<Date>(defaultDate());
  const [locationData, setLocationData] = useState<LocationData>({
    googlePlaceID: '',
    name: '',
    address: ''
  });
  const [fileData, setFileData] = useState<FileData>({
    name: '',
    uri: '',
    type: ''
  });
  const [selectedType, setSelectedType] = useState('file');

  const handleCreateNewEvent = async () => {//FIX ME: Add more extensive form validation
    if (eventName.trim() === '') {
      alert('Please enter an event name');
      return;
    }

    if (locationData.googlePlaceID.trim() === '') {
      alert('Please enter an event location');
      return;
    }

    if (selectedType === 'image' || selectedType === 'file') {
      // This catches the case where the goes from an external link to a file and doesnt select a file
      if (fileData.name.trim() === '' || fileData.uri.trim() === '') {
        alert('Please upload a ticket for this event');
        return;
      }

      // Case where we are going from one file type to the other and the user doesnt select a new file
      if (fileData.type === 'image' || fileData.type === 'file') {
        if (fileData.type !== selectedType) {
          alert('Please upload a ticket for this event');
          return;
        }
      }
    }

    let ticketURI = "";
    let ticketType = selectedType;

    // If new ticket is an image or file save it to the file system
    if (selectedType === 'image' || selectedType === 'file') {
      ticketURI = await saveTicket(fileData.name, fileData.uri);
    // Else just select the appropriate external link
    } else {
      if (selectedType in externalTicketLinks) {
        ticketURI = externalTicketLinks[selectedType as keyof typeof externalTicketLinks];
      }
    }
    
    const newEvent: Event = {
      id: 0,
      name: eventName,
      datetime: date,
      locationName: locationData.name,
      locationAddress: locationData.address,
      ticketType: ticketType,
      ticketURI: ticketURI
    };

    createEvent(newEvent);
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
      </View>
      <Title>ADD NEW EVENT TICKET</Title>
      <ScrollView 
        contentContainerStyle={styles.formContainer}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
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
            selected={selectedType}
            setSelected={setSelectedType}
          />
        </View>
        <Button label="Add Event" icon="plus" onPress={handleCreateNewEvent}/>
      </ScrollView>
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
  headerContainer: {
    marginBottom: 16
  },
  formContainer: {
    marginTop: 16,
    gap: 16,
    paddingBottom: 20
  },
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
