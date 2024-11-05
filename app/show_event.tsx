// Library imports
import { View, StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import * as Clipboard from 'expo-clipboard';
import ImageView from 'react-native-image-viewing';
import { formatDate } from "@/imports/functions";

// Component imports
import Title from "@/components/Title";
import BackButton from "@/components/BackButton";
import IconButton from "@/components/IconButton";
import Button from "@/components/Button";

// Data layer imports
import { getEvent, deleteEvent } from "@/models/Event";

// Import filesystem
import { deleteTicket } from "@/filesystem/client";

export default function ShowEvent() {
  //////////////
  // Retrieve event data from database
  //////////////
  const params = useLocalSearchParams<{id?: string}>();

  if (params.id === undefined) {
    return;
  }

  const eventID = parseInt(params.id);


  // Setup state
  const [isTicketVisible, setIsTicketVisible] = useState(false);
  const [eventData, setEventData] = useState(getEvent(eventID));
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setEventData(getEvent(eventID));
    }, [])
  );

  // Event handlers
  const handleDelete = async () => {
    await deleteTicket(eventData.ticketURI);
    deleteEvent(eventData.id);
    router.back();
  };

  const handleCopyAddressToClipboard = async () => {
    await Clipboard.setStringAsync(eventData.locationAddress);
    alert('Address copied to clipboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main content container */}
      <View style={styles.mainContentContainer}>
        <View style={styles.headerContainer}>
          <BackButton />
          <View style={styles.iconButtonContainer}>
            <IconButton accessibilityLabel="Edit Event" icon="edit-square" onPress={() => { router.push(`/edit_event?id=${eventData.id}`) }} />
            <IconButton accessibilityLabel="Delete Event" icon="delete" onPress={() => {setIsDeleteDialogVisible(true)}}/>
          </View>
        </View>
        <View style={styles.eventContentContainer}>
          <Title>{ eventData.name }</Title>
          <Text style={styles.text}>{ formatDate(eventData.datetime) }</Text>
          <View style={styles.locationContainer}>
            <View style={styles.iconTextContainer}>
              <Entypo name="location-pin" size={18} color="#63de75" />
              <Text style={styles.text}>{ eventData.locationName }</Text>
            </View>
            <Pressable onPress={handleCopyAddressToClipboard}>
              <Text style={[styles.text, styles.locationText]}>{ eventData.locationAddress }  <Feather name="copy" size={18} color="#63de75" /></Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button label="Go to tickets" icon="ticket" onPress={() => {setIsTicketVisible(true)}} />
        </View>
      </View>
      {/* Show ticket modal */}
      <ImageView 
        images={[{uri: eventData.ticketURI}]}
        imageIndex={0}
        visible={isTicketVisible}
        onRequestClose={() => { setIsTicketVisible(false) }}
        animationType="slide"
      />
      {/* Delete dialogbox */}
      <ConfirmDialog
        title="Delete Event Ticket"
        message={`Are you sure you want to delete your ${eventData.name} ticket?`}
        visible={isDeleteDialogVisible}
        overlayStyle={{
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
        positiveButton={{
          title: 'Confirm',
          onPress: handleDelete,
          titleStyle: { color: '#007AFF' }
        }}
        negativeButton={{
          title: 'Cancel',
          onPress: () => {setIsDeleteDialogVisible(false)},
          titleStyle: { color: '#007AFF' }
        }}
        onRequestClose={() => {setIsDeleteDialogVisible(false)}}
        contentInsetAdjustmentBehavior="automatic"
        titleStyle={styles.dialogTitle}
        messageStyle={{
          fontSize: 14,
          color: '#000'
        }}
      />
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
  eventContentContainer: {
    gap: 16
  },
  mainContentContainer: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconButtonContainer: {
    flexDirection: 'row',
    gap: 16
  },
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  locationText: {
    color: '#C7DCC9',
    fontSize: 14
  },
  iconTextContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  locationContainer: {
    gap: 4
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    width: '100%'
  },
  modalContent: {
    backgroundColor: "#222b23",
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
  },
  dialogTitle: {
    color: '#000',
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  }
});