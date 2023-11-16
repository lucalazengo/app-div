import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps'
import * as Location from 'expo-location'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapViewDirections from 'react-native-maps-directions'

const MapScreen = () => {
  const route = useRoute()
  const [currentLocation, setCurrentLocation] = useState(null)
  const [destination, setDestination] = useState(null)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [duration, setDuration] = useState(null)
  const [isRouteOpen, setIsRouteOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
      }
      if (
        route.params &&
        route.params.driverLocation &&
        route.params.driverLocation.latitude &&
        route.params.driverLocation.longitude
      ) {
        const { latitude, longitude } = route.params.driverLocation
        setCurrentLocation({ latitude, longitude })
      } else {
        console.log('driverLocation or its latitude/longitude is not defined')
      }
    })()
  }, [route.params])

  const handleStartRoute = () => {
    setIsRouteOpen(true)
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation}
        region={currentLocation}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        toolbarEnabled
      >
        <MapViewDirections
          origin={currentLocation}
          destination={destination}
          apikey="AIzaSyDevAuVwiMi3DTNcKcMquHV2I-_EzjmJz8"
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={(result) => {
            console.log(`Distance: ${result.distance} km`)
            console.log(`Duration: ${result.duration} min.`)
          }}
        />
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Destino"
            description="Destino"
          />
        )}

        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Origem"
            description="Origem"
          />
        )}
      </MapView>

      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 10,
          right: 10,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Insira o destino"
          onPress={(data, details = null) => {
            console.log(data, details)
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            })
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDevAuVwiMi3DTNcKcMquHV2I-_EzjmJz8',
            language: 'pt',
            components: 'country:br',
          }}
          styles={{
            textInput: {
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: 'white',
              padding: 10,
            },
          }}
        />
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#510E16',
          }}
        >
          <Button
            title="Iniciar rota"
            onPress={handleStartRoute}
            color="black"
          />
        </View>
      </View>
    </View>
  )
}
export default MapScreen
