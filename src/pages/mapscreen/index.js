import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';


const MapScreen= () => {
 const [currentLocation, setCurrentLocation] = useState(null);
 const [destination, setDestination] = useState(null);
 const [routeCoordinates, setRouteCoordinates] = useState([]);
 const [duration, setDuration] = useState(null);
 const [isRouteOpen, setIsRouteOpen] = useState(false);

 useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização é necessária!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    })();
 }, []);

 const handleLocationInput = async (input) => {
    let location = await Location.geocodeAsync(input);
    setDestination({ latitude: location[0].latitude, longitude: location[0].longitude });
 };

 const handleGetDirections = async () => {
    // Aqui você pode adicionar sua lógica para obter a rota entre os dois pontos.
    // Expo não fornece um método pronto para uso, mas você pode usar bibliotecas externas, como expo-google-app-auth
 };

 const handleStartRoute = () => {
    setIsRouteOpen(true);
 };

 const handleFinishRoute = () => {
    setIsRouteOpen(false);
 };

 return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation}
        showsUserLocation
      >
        {destination && (
          <Marker coordinate={destination} title="Destino" />
        )}
        {isRouteOpen && routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} onChangeText={handleLocationInput} placeholder="Insira o destino" />
        <Button title="Escolher Destino" onPress={handleGetDirections} style={styles.button} />
      </View>
      {isRouteOpen && destination && (
        <View style={styles.routeContainer}>
          <Text>Tempo estimado de viagem: {duration}</Text>
          <Button title="Iniciar Rota" onPress={handleStartRoute}style={styles.button} />
          <Button title="Fim da Rota" onPress={handleFinishRoute} style={styles.button}/>
        </View>
      )}
    </View>
 );
};

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
    padding: 15,
    bottom: 130,
 },
 searchContainer: {
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
 },
 input: {
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    width: '80%',
    bottom: 100,
 },
 routeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000'
 },
 button: {
  marginVertical: 10,
  backgroundColor: '#0000',
  padding: 10,
  borderRadius: 5,
  width: '80%',
},
});
export default MapScreen;