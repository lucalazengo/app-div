import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, TextInput, Alert , Text} from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function App() {
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [isRouteActive, setIsRouteActive] = useState(false);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão para acessar a localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      let subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
        (newLocation) => {
          if (isRouteActive) {
            setCoordinates((prevCoords) => [...prevCoords, newLocation.coords]);
          }
        }
      );

      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    })();
  }, [isRouteActive]);

  const startRoute = () => {
    setCoordinates([]);
    setIsRouteActive(true);
  };

  const stopRoute = () => {
    setIsRouteActive(false);
  };

  const handleSelectDestination = async (data, details) => {
    try {
      const startLocation = `${location.latitude},${location.longitude}`;
      const endLocation = `${details.geometry.location.lat},${details.geometry.location.lng}`;

      const apiKey = 'SUA_CHAVE_DA_API_DO_GOOGLE';

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation}&destination=${endLocation}&key=${apiKey}`
      );

      const result = await response.json();

      if (result.status === 'OK') {
        setDestination({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          name: details.formatted_address,
        });

        startRoute();
      } else {
        Alert.alert('Erro', 'Não foi possível calcular a rota. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao calcular a rota:', error);
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <>
          <MapView style={styles.map} initialRegion={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
            <Marker coordinate={location} title="Localização Atual" />
            {isRouteActive && <Polyline coordinates={coordinates} strokeWidth={4} strokeColor="blue" />}
            {destination && <Marker coordinate={destination} title="Destino" />}
          </MapView>
          {!isRouteActive && (
            <View style={styles.destinationInputContainer}>
              <GooglePlacesAutocomplete
                placeholder="Digite o destino"
                onPress={handleSelectDestination}
                query={{
                  key: 'AIzaSyDevAuVwiMi3DTNcKcMquHV2I-_EzjmJz8',
                  language: 'pt-BR',
                }}
                styles={{
                  container: {
                    flex: 0,
                  },
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
              />
              <TouchableOpacity style={styles.button} onPress={startRoute}>
                <Text style={styles.buttonText}>Iniciar Rota</Text>
              </TouchableOpacity>
            </View>
          )}
          {isRouteActive && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={stopRoute}>
                <Text style={styles.buttonText}>Parar Rota</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    bottom: 140,
    padding: 15,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  destinationInputContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#510E16',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
