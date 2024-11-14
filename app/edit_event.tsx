// Library imports
import { ScrollView, View, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

// Component imports
import Title from "@/components/Title";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import DateTimeSelector from "@/components/DateTimeSelector";
import LocationInput from "@/components/LocationInput";
import TicketSourcePicker from "@/components/TicketSourcePicker";

// Import Data layer
import { Event, getEvent, updateEvent } from "@/models/Event";

// Import filesystem API
import { saveTicket, deleteTicket } from "@/filesystem/client";
import { FileData } from "./create_event";


// Type declarations and exports
export type LocationData = {
  googlePlaceID: string;
  name: string;
  address: string;
};

const externalTicketLinks = {
  'ra-guide': 'https://residentadvisor.page.link/'
};

export default function EditEvent() {
  //////////////
  // Retrieve event data from database
  //////////////
  const params = useLocalSearchParams<{id?: string}>();

  if (params.id === undefined) {
    return;
  }

  const eventID = parseInt(params.id);
  const eventData = getEvent(eventID);
  const fileName = eventData.ticketURI.split('/').pop();

  // Initialize state
  const [eventName, setEventName] = useState<string>(eventData.name);
  const [date, setDate] = useState<Date>(eventData.datetime);
  const [locationData, setLocationData] = useState<LocationData>({
    googlePlaceID: '',
    name: eventData.locationName,
    address: eventData.locationAddress
  });
  const [fileData, setFileData] = useState<FileData>({
    name: fileName ? fileName : '',
    uri: eventData.ticketURI,
    type: eventData.ticketType
  });
  const [selectedType, setSelectedType] = useState(eventData.ticketType);

  const handleCreateNewEvent = async () => {//FIX ME: Add more extensive form validation
    if (eventName.trim() === '') {
      alert('Please enter an event name');
      return;
    }

    if (locationData.name.trim() === '') {
      alert('Please enter an event location');
      return;
    }

    if (selectedType === 'image' || selectedType === 'file') {
      // This catches the case where the goes from an external link to a file and doesnt select a file
      if (fileData.name.trim() === '' || fileData.uri.trim() === '') {
        alert('Please upload a ticket for this event');
        return;
      }

      // Case where the user selects one ticket type, uploads a file then selects a different ticket type and doesnt upload a file
      if (fileData.type === 'image' || fileData.type === 'file') {
        if (fileData.type !== selectedType) {
          alert('Please upload a ticket for this event');
          return;
        }
      }
    }
    
    let ticketURI = "";
    let ticketType = selectedType;

    // If the new ticket type is an image or a file
    if (selectedType === 'image' || selectedType === 'file') {

      // Check if its the same file from before
      // case where the user chose a different file type but 
      // didnt upload a new file has already been ruled out
      if (eventData.ticketURI === fileData.uri) {
        ticketURI = eventData.ticketURI;
      // If a new file, save the file and delete the old one if necessary
      } else {
        ticketURI = await saveTicket(fileData.name, fileData.uri);
        
        if (eventData.ticketType === 'file' || eventData.ticketType === 'image') {
          deleteTicket(eventData.ticketURI);
        }
      }
    // If the new ticket type is an external link
    } else {
      // Get the external link and delete the old ticket file from the file system if necessary
      if (selectedType in externalTicketLinks) {
        ticketURI = externalTicketLinks[selectedType as keyof typeof externalTicketLinks];

        if (eventData.ticketType === 'file' || eventData.ticketType === 'image') {
          deleteTicket(eventData.ticketURI);
        }
      }
    }
    
    
    const updatedEvent: Event = {
      id: eventID,
      name: eventName,
      datetime: date,
      locationName: locationData.name,
      locationAddress: locationData.address,
      ticketType: ticketType,
      ticketURI: ticketURI
    };

    await updateEvent(updatedEvent);
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
      </View>
      <Title>EDIT EVENT TICKET</Title>
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
        <Button label="Update Event" icon="check" onPress={handleCreateNewEvent}/>
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
  },
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});