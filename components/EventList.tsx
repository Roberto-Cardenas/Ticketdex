import { FlatList, StyleProp, ViewStyle } from "react-native";
import EventCard from "./EventCard";
import { Event } from "@/models/Event";
import { formatDate } from "@/imports/functions";
import { router } from "expo-router";

type Props = {
  data: Event[],
  style?: StyleProp<ViewStyle>
};

export default function EventList({ data, style }: Props) {
  return (
    <FlatList 
      data={data}
      renderItem={({ item }) => (
        <EventCard 
          key={item.id}
          name={item.name}
          dateTime={formatDate(item.datetime)}
          location={item.locationName}
          onPress={() => { router.push(`/show_event?id=${item.id}`) }}
        />
      )}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style ? style : {}}
    />
  );
}
