import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapViewDirections from 'react-native-maps-directions'
import { watchPositionAsync } from 'expo-location'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useRoute, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

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
  const navigation = useNavigation()
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const route = useRoute()
  const userData = route.params.userData
  const [location, setLocation] = useState(null)
  const [destination, setDestination] = useState(null)
  const [duration, setDuration] = useState(null)
  const mapRef = useRef(null)
  const [drivers, setDrivers] = useState([])
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDevAuVwiMi3DTNcKcMquHV2I-_EzjmJz8'

  const dropdownOptions = [
    { id: 1, label: 'Gerar Relatórios de Viagens', screen: 'RelatóriosScreen' },
    { id: 2, label: 'Históricos', screen: 'HistóricosScreen' },
    { id: 3, label: 'Ajuda & Suporte', screen: 'AjudaScreen' },
  ]

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData')
      navigation.navigate('Login')
    } catch (error) {
      console.log(error)
    }
  }

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
    <>
      <View>
        {location && (
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={userData?.nome}
              pinColor="red"
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
        <GooglePlacesAutocomplete
          placeholder="Para onde vamos?"
          onPress={onDestinationSelect}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'pt-BR',
          }}
          fetchDetails
          styles={{
            container: {
              position: 'absolute',
              top: 40,
              width: '100%',
            },
            textInput: {
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 0,
              padding: 15,
              marginHorizontal: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 5,
              fontSize: 18,
            },
            listView: {
              position: 'absolute',
              top: 100,
              backgroundColor: '#fff',
              borderRadius: 0,
              padding: 10,
              marginHorizontal: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 5,
            },
            description: {
              fontSize: 16,
            },
            row: {
              padding: 20,
              height: 58,
            },
          }}
        />
        {duration && (
          <Text
            style={{
              position: 'absolute',
              top: 100,
              backgroundColor: '#fff',
              borderRadius: 0,
              padding: 10,
              marginHorizontal: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 5,
            }}
          >
            Tempo estimado de chegada: {Math.round(duration)} min
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setDropdownVisible(!dropdownVisible)}
          style={{ position: 'absolute', top: 48, right: 20 }}
        >
          <Icon name="menu" size={30} color="#510E16" />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={dropdownVisible}
          onRequestClose={() => setDropdownVisible(!dropdownVisible)}
          style={{ backgroundColor: 'red' }}
        >
          <View
            style={{
              backgroundColor: '#510E16',
              marginRight: '40%',
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
              }}
            >
              <Icon name="person-circle-outline" size={50} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 20 }}>
                {userData?.nome}
              </Text>
            </View>
            <FlatList
              data={dropdownOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setDropdownVisible(!dropdownVisible)
                    navigation.navigate(item.screen)
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      padding: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: '#fff',
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={handleLogout} style={{ padding: 20 }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff',
                }}
              >
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  )
}

export default MapScreen
