import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#63de75',
        tabBarStyle: {
          backgroundColor: '#191919',
          borderTopColor: '#191919',
          minHeight: '10%',
        },
        tabBarLabelStyle: {
          marginBottom: 10
        },
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: "Tickets",
          tabBarIcon: ({ color }) => (
            <Entypo name="ticket" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name="past_events"
        options={{
          title: "Past Events",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-clock" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Entypo name="cog" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
