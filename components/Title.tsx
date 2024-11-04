import { View, Text, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function Title({ children }: Props) {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}><Text style={styles.accent}>/  </Text>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  accent: {
    color: '#63de75',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  textContainer: {
    borderBottomColor: '#2A422E',
    borderBottomWidth: 1,
    paddingBottom: 4,
  }
});
