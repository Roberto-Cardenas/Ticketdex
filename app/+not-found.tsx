import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops not found!" }} />
      <View>
        <Link href="/" >
          Go back to the home screen!
        </Link>
      </View>
    </>
  );
}
