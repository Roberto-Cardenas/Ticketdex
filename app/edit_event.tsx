// Library imports
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

// Component imports
import Title from "@/components/Title";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import EventForm from "@/components/EventForm";

// Import Data layer
import { Event, getEvent, updateEvent } from "@/models/Event";

// Import filesystem API
import { saveTicket, deleteTicket } from "@/filesystem/client";
import { FileData, LocationData } from "@/imports/types";

// Import constants
import { externalTicketLinks } from "@/constants/ExternalTicketLinks";

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

  const validateTypedInput = () => {
    if (eventName.trim() === '') {
      alert('Please enter an event name');
      return false;
    }

    if (locationData.name.trim() === '') {
      alert('Please enter an event location');
      return false;
    }

    return true;
  };

  const validateTicketFileInput = () => {
    // Check if we should expect the fileData object to be populated with data
    if (selectedType === 'image' || selectedType === 'file') {
      // Check if fileData is populated, aka the user selected an image or file
      if (fileData.uri.trim() === '') {
        alert('Please upload a ticket for this event!');
        return false;
      }

      // So far we have determined that:
      // SelectedTicketType is either image or file
      // And that FileData is populated
      // Threfore we can check if the selectedType is the same as the populated fileData ticket type
      if (selectedType !== fileData.type ) {
        if (selectedType === 'image') {
          alert('Please upload a ticket screenshot for this event!');
          return false;
        } else {
          alert('Please upload a ticket PDF for this event!');
          return false;
        }
      }
    }

    return true;
  };

  const handleTicketURI = async () => {
    let ticketURI = '';

    // If new ticket is an image or file save it to the file system
    if (selectedType === 'image' || selectedType === 'file') {
      // Check if it is the same file as before editing the event before saving
      // eventData: previous event data
      // fileData: current event data to be saved
      if (eventData.ticketURI === fileData.uri) { 
        // File is the same so no changes in the file system needed
        ticketURI = eventData.ticketURI;
      } else {
        // New file is being uploaded so save it to the filesystem and delete the previous event ticket file if it exists
        ticketURI = await saveTicket(fileData.name, fileData.uri);

        // If previous ticket was an image or file delete from file system
        if (eventData.ticketType === 'file' || eventData.ticketType === 'file') {
          deleteTicket(eventData.ticketURI); 
        }
      }
    // Else just select the appropriate external link
    } else {
      if (selectedType in externalTicketLinks) {
        ticketURI = externalTicketLinks[selectedType as keyof typeof externalTicketLinks].url;

        // If previous ticket was an image or file delete from file system
        if (eventData.ticketType === 'file' || eventData.ticketType === 'file') {
          deleteTicket(eventData.ticketURI); 
        }
      }
    }

    return ticketURI;
  };

  const handleUpdateEvent = async () => {
    if (!validateTypedInput() || !validateTicketFileInput()) {
      return;
    }
    
    const updatedEvent: Event = {
      id: eventID,
      name: eventName,
      datetime: date,
      locationName: locationData.name,
      locationAddress: locationData.address,
      ticketType: selectedType,
      ticketURI: await handleTicketURI()
    };

    await updateEvent(updatedEvent);
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
      </View>
      <ScrollView 
        contentContainerStyle={styles.formContainer}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <Title>EDIT EVENT TICKET</Title>
        <EventForm 
          eventName={eventName}
          setEventName={setEventName}
          date={date}
          setDate={setDate}
          locationData={locationData}
          setLocationData={setLocationData}
          fileData={fileData}
          setFileData={setFileData}
          selectedTicketType={selectedType}
          setSelectedTicketType={setSelectedType}
        />
        <Button label="Update Event" icon="check" onPress={handleUpdateEvent}/>
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