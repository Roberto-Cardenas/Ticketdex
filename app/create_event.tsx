// Library imports
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";

// Component imports
import Title from "@/components/Title";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import EventForm from "@/components/EventForm";

// Import Data layer
import { Event, createEvent } from "@/models/Event";

// Import filesystem API
import { saveTicket } from "@/filesystem/client";

// Import types
import { LocationData, FileData } from "@/imports/types";
import { defaultDate } from "@/imports/functions";

// Import constants
import { externalTicketLinks } from "@/constants/ExternalTicketLinks";

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
      ticketURI = await saveTicket(fileData.name, fileData.uri);
    // Else just select the appropriate external link
    } else {
      if (selectedType in externalTicketLinks) {
        ticketURI = externalTicketLinks[selectedType as keyof typeof externalTicketLinks].url;
      }
    }

    return ticketURI;
  };

  const handleCreateNewEvent = async () => {
    if (!validateTypedInput() || !validateTicketFileInput()) {
      return;
    }
    
    const newEvent: Event = {
      id: 0,
      name: eventName,
      datetime: date,
      locationName: locationData.name,
      locationAddress: locationData.address,
      ticketType: selectedType,
      ticketURI: await handleTicketURI()
    };

    createEvent(newEvent);
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
        <Title>ADD NEW EVENT TICKET</Title>
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
});
