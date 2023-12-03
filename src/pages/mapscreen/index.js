import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Button, Animated } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapViewDirections from 'react-native-maps-directions'
import {
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
} from 'expo-location'

const MapScreen = () => {
  const [location, setLocation] = useState(null)
  const [destination, setDestination] = useState(null)
  const [duration, setDuration] = useState(null)
  const mapRef = useRef(null)
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDevAuVwiMi3DTNcKcMquHV2I-_EzjmJz8'

  const onDestinationSelect = async (data, details = null) => {
    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      title: data.description,
    })
  }

  async function requestLocationPermissions() {
    const { granted } = await requestBackgroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      setLocation(currentPosition)
    }
  }

  useEffect(() => {
    requestLocationPermissions()
  }, [])

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        setLocation(location)
        mapRef.current?.animateCamera({
          pitch: 70,
          center: location.coords,
        })
      },
    )
  }, [])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Para onde?"
        fetchDetails
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={onDestinationSelect}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'pt-BR',
        }}
        styles={{
          container: {
            flex: 0,
            marginTop: 30,
          },
          textInput: {
            height: 50,
            color: '#5d5d5d',
            fontSize: 18,
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
          },
          listView: {
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 10,
          },
          row: {
            padding: 10,
            height: 50,
          },
        }}
      />
      {location && (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
          />
          {destination && (
            <>
              <Marker coordinate={destination} title={destination.title} />
              <MapViewDirections
                origin={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="#510E16"
                onReady={(result) => {
                  setDuration(result.duration)
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  })
                }}
              />
            </>
          )}
        </MapView>
      )}
      {duration && (
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#510E16',
          }}
        >
          Tempo estimado de chegada: {Math.round(duration)} min
        </Text>
      )}
    </View>
  )
}

export default MapScreen
