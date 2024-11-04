// Library imports
import { View, StyleSheet, FlatList, Text } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { formatDate } from "@/imports/functions";

// Component imports
import Title from "@/components/Title";
import EventCard from "@/components/EventCard";
import CircleButton from "@/components/CircleButton";

// Model imports
import { deletePastEvents, Event, getUpcomingEvents } from "@/models/Event";

export default function Index() {
  const [events, setEvents] = useState<Event[]>(getUpcomingEvents());

  useFocusEffect(
    useCallback(() => {
      setEvents(getUpcomingEvents());
      deletePastEvents();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Main content container */}
      <View style={styles.mainContentContainer}>
        <View style={styles.eventsContainer}>
          <Title>UPCOMING EVENT TICKETS</Title>
          { 
            events.length > 0 ? (
              <FlatList 
                data={events}
                renderItem={({ item }) => (
                  <EventCard 
                    key={item.id}
                    eventID={item.id} 
                    name={item.name}
                    dateTime={formatDate(item.datetime)}
                    location={item.locationName}
                    onPress={() => { router.push(`/show_event?id=${item.id}`) }}
                  />
                )}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.eventsFlatlist}
              />
            ) : (
              <Text style={styles.noEventsText}>No upcoming events, press the add button below to add more!</Text>
            )
          }
        </View>
        <View style={styles.eventButtonContainer}>
          <CircleButton accessibilityLabel="Add new event" onPress={() => { router.push('/create_event') }} />
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
  },
  eventsContainer: {
    marginVertical: 10,
    paddingBottom: 24,
    flexBasis: 'auto',
  },
  eventsFlatlist: {
    paddingBottom: 128
  },
  eventButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 8
  },
  noEventsText: {
    color: '#B8CDB8',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginVertical: 16
  }
});
