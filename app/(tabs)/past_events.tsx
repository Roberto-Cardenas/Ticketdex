// Library imports
import { View, StyleSheet, FlatList, Text } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate } from "@/imports/functions";

// Component imports
import Title from "@/components/Title";
import EventCard from "@/components/EventCard";

// Model imports
import { Event, getPastEvents } from "@/models/Event";

export default function PastEvents() {
  const [pastEvents, setPastEvents] = useState<Event []>(getPastEvents());

  useFocusEffect(
    useCallback(() => {
      setPastEvents((getPastEvents()));
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Main content container */}
      <View style={styles.mainContentContainer}>
        <View style={styles.eventsContainer}>
          <Title>PAST EVENT TICKETS</Title>
          { 
            pastEvents.length > 0 ? (
              <>
                <FlatList 
                  data={pastEvents}
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
                />
              </>
            ) : (
              <Text style={styles.noEventsText}>No past events to show! Go out more...</Text>
            )
          }
        </View>
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
  },
  eventsContainer: {
    marginVertical: 10,
    paddingBottom: 24,
    flexBasis: 'auto',
  },
  noEventsText: {
    color: '#B8CDB8',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginVertical: 16
  }
});