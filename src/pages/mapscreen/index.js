import React, { useState, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapViewDirections from 'react-native-maps-directions'
import {
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
} from 'expo-location'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useRoute } from '@react-navigation/native'

const firebaseConfig = {
  apiKey: 'AIzaSyDxd5o8FV1payqlrrQnTu8hz0yV1hPIy1w',
  authDomain: 'app-div.firebaseapp.com',
  projectId: 'app-div',
  storageBucket: 'app-div.appspot.com',
  messagingSenderId: '782376204081',
  appId: '1:782376204081:web:aaaeca6b3de00b19e7e210',
  measurementId: 'G-FLEWE7EFZ9',
  databaseURL: 'https://app-div-default-rtdb.firebaseio.com/',
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const MapScreen = () => {
  const route = useRoute()
  const userData = route.params.userData
  const [location, setLocation] = useState(null)
  const [destination, setDestination] = useState(null)
  const [duration, setDuration] = useState(null)
  const mapRef = useRef(null)
  const [drivers, setDrivers] = useState([])
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDevAuVwiMi3DTNcKcMquHV2I-_EzjmJz8'

  const onDestinationSelect = async (data, details = null) => {
    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      title: data.description,
    })
  }

  async function requestLocationPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status === 'granted') {
      const currentPosition = await Location.getCurrentPositionAsync({})
      setLocation(currentPosition)
    } else {
      // Handle the case where permission is not granted
      console.warn('Location permission not granted')
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
        if (
          location &&
          location.coords &&
          location.coords.latitude &&
          location.coords.longitude &&
          userData &&
          userData.id &&
          userData.nome
        ) {
          setLocation(location)
          mapRef.current?.animateCamera({
            pitch: 70,
            center: location.coords,
          })

          const driversRef = ref(db, 'drivers/' + userData?.id)
          set(driversRef, {
            id: userData?.id,
            nome: userData?.nome,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
        } else {
          console.log('One or more required properties are undefined.')
        }
      },
    )
  }, [userData])

  useEffect(() => {
    const driversRef = ref(db, 'drivers')

    onValue(driversRef, (snapshot) => {
      const data = snapshot.val()
      const drivers = Object.values(data)
      setDrivers(drivers)
    })
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
          {drivers.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={{
                latitude: driver.latitude,
                longitude: driver.longitude,
              }}
              title={driver.nome}
              pinColor="blue"
            />
          ))}
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
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}
        >
          Tempo estimado de chegada: {Math.round(duration)} min
        </Text>
      )}
    </View>
  )
}

export default MapScreen
