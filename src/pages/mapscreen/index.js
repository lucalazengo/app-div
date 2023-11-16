import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Button, Animated } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapViewDirections from 'react-native-maps-directions'

const MapScreen = () => {
  const route = useRoute()
  const [currentLocation, setCurrentLocation] = useState()
  const [destination, setDestination] = useState(null)
  const [isRouteOpen, setIsRouteOpen] = useState(false)
  const [animation] = useState(new Animated.Value(0))
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

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

  const handleStartRoute = async () => {
    setIsRouteOpen(true)
    startAnimation()
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
        onUserLocationChange={(event) => {
          setCurrentLocation(event.nativeEvent.coordinate)
        }}
      >
        <MapViewDirections
          origin={currentLocation}
          destination={destination}
          apikey="AIzaSyDevAuVwiMi3DTNcKcMquHV2I-_EzjmJz8"
          strokeWidth={6}
          strokeColor="hotpink"
          onReady={(result) => {
            console.log(`Distance: ${result.distance} km`)
            console.log(`Duration: ${result.duration} min.`)

            const updatedDistance = `Distance: ${result.distance.toFixed(2)} km`
            const updatedDuration = `Duration: ${result.duration.toFixed(
              2,
            )} min.`

            if (distance !== updatedDistance) {
              setDistance(updatedDistance)
            }

            if (duration !== updatedDuration) {
              setDuration(updatedDuration)
            }
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

      <View style={styles.searchContainer}>
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
        <View style={styles.startRouteButton}>
          <Button
            title="Iniciar rota"
            color="black"
            onPress={handleStartRoute}
          />
        </View>
        {isRouteOpen && (
          <Animated.View style={styles.routeInfoContainer}>
            <Text>{distance}</Text>
            <Text>{duration}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
  },
  startRouteButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#510E16',
  },
  routeInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    transform: [
      {
        translateY: 0,
      },
      {
        translateY: 0,
      },
      {
        translateY: 0,
      },
      {
        scale: 1,
      },
      {
        perspective: 1000,
      },
    ],
  },
})

export default MapScreen
