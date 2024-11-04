import { TextInput, View, StyleSheet, Modal, Pressable, Text, FlatList, Keyboard } from "react-native";
import { useState } from "react";

import BackButton from "./BackButton";
import Title from "./Title";

import { LocationData } from "@/app/create_event";

// //////////////
// TODO
/////////////////
// * Add session token functionality!!!!

type Props = {
  locationData: LocationData;
  setLocationData: (location: LocationData) => void
};

export default function LocationInput({ locationData, setLocationData }: Props) {

  // Declare types
  type PredictionType = {
    description: string
    place_id: string
    reference: string
    matched_substrings: any[]
    structured_formatting: Object
    terms: Object[]
    types: string[]
  }

  // Declare constants
  const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place/';

  // Set up state
  const [predictions, setPredictions] = useState<PredictionType[] | null>(null);
  const [textInput, setTextInput] = useState(locationData.name);
  const [isVisible, setIsVisible] = useState(false);

  // Callback functions
  const handleSearchChange = async (value: string) => {
    setTextInput(value);

    let newPredictions = await getPredictions(value);

    setPredictions(newPredictions);
  }

  const getPredictions = async (query: string) => {
    if (query.trim() === '') {
      return;
    }

    const apiURL = `${GOOGLE_PLACES_BASE_URL}autocomplete/json?key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}&input=${query}`;

    try {
      const response = await fetch(apiURL);
      const newData = await response.json();

      return newData.predictions;
    } catch (error) {
      console.log(error);
    }
  }

  const handlePredictionPress = async (placeID: string) => {
    let placeData = await getPlace(placeID);

    setLocationData({
      googlePlaceID: placeID,
      name: placeData.name,
      address: placeData.formatted_address
    });

    Keyboard.dismiss();

    setIsVisible(false);
  }

  const getPlace = async (placeID: string) => {
    const apiURL = `${GOOGLE_PLACES_BASE_URL}details/json?key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}&place_id=${placeID}&fields=name,formatted_address`;

    try {
      const response = await fetch(apiURL);
      const locationData = await response.json();

      return locationData.result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      {/* Search Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      > 
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <BackButton onPress={ () => {setIsVisible(false)} } />
          </View>
          <Title>Venue search</Title>
          <TextInput 
            style={[styles.inputBox, {marginTop: 16}]}
            value={textInput}
            onChangeText={handleSearchChange}
            autoFocus={true}
          />
          <View style={styles.googleAttributionContainer}>
            <Text style={styles.text}>Powered by <Text style={styles.googleAttributionText} >Google</Text></Text>
          </View>
          {
            predictions && 
            (
              <>
                <FlatList 
                  data={predictions}
                  renderItem={({ item }) => (
                    <Pressable style={styles.prediction} onPress={() => {handlePredictionPress(item.place_id)}}>
                      <Text style={styles.predictionText}>
                        {item.description}
                      </Text>
                    </Pressable>
                  )}
                  keyExtractor={item => item.place_id}
                  keyboardShouldPersistTaps='handled'
                  alwaysBounceVertical={false}
                  style={styles.predictionList}
                />
              </>
            )
          }
        </View>
      </Modal>

      {/* Clickable component that opens the search modal */}
      <Pressable 
        style={styles.inputBox} 
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Text style={locationData.name.trim() === '' ? styles.inputBoxText : styles.inputBoxActiveText} >
          {locationData.name.trim() === '' ? "Search for venue" : locationData.name}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#1A201A',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#fff",
  },
  inputBoxText: {
    fontSize: 16,
    color: "#677567",
  },
  inputBoxActiveText: {
    fontSize: 16,
    color: "#fff",
  },
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "#222b23",
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
  },
  modalHeader: {
    marginBottom: 16
  },
  prediction: {
    paddingVertical: 12,

  },
  predictionText: {
    color: '#BDE5C3',
    fontFamily: 'Roboto-Regular'
  },
  predictionList: {
    paddingBottom: 8,
    paddingHorizontal: 12
  },
  googleAttributionContainer: {
    marginHorizontal: 12,
    paddingVertical: 16
  },
  googleAttributionText: {
    fontFamily: 'Roboto-Medium',
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.69
  }
});
