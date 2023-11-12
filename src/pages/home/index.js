import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function Home() {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [selectedBus, setSelectedBus] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [data, setData] = useState([])
  const [userData, setUserData] = useState(null)

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData')
      if (value !== null) {
        setUserData(JSON.parse(value))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getOnibus = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://efae-45-4-28-15.ngrok-free.app/api/onibus',
      )
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getUserData()
    getOnibus()
  }, [getOnibus])

  console.log(userData)

  const updateSearch = (search) => {
    setSearch(search)
  }

  const filteredData = data.filter((item) =>
    item.placa.toLowerCase().includes(search.toLowerCase()),
  )

  const selectBus = (bus) => {
    setSelectedBus(bus)
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            paddingLeft: 10,
          }}
        >{`Olá, ${userData?.nome}`}</Text>
        <Icon
          placa="user"
          size={30}
          style={{ textAlign: 'center', color: 'white' }}
        />
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchTitle}>Encontre seu ônibus</Text>
        <SearchBar
          placeholder="Pesquise o ônibus aqui..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
          inputContainerStyle={{
            backgroundColor: '#E8E8E8',
            borderRadius: 10,
          }}
          clearIcon={{ color: 'gray' }}
        />
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor:
                  item._id === selectedId ? '#510E16' : '#E8E8E8',
                margin: 5,
                // lastItemMargin: 50,
              }}
              onPress={() => {
                selectBus(item)
                setSelectedId(item._id)
              }}
            >
              <Text
                style={{
                  color: item._id === selectedId ? '#fff' : '#000',
                  fontWeight: 'bold',
                }}
              >
                {item.modelo} - {item.placa}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        />
        {selectedBus && (
          <View style={styles.buttonContainer}>
            <Button
              title={`Ver horários do ${selectedBus.placa}`}
              onPress={() => alert('Botão pressionado!')}
              color="white"
            />
          </View>
        )}
      </View>
      {selectedBus && (
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('MapScreen')}
        >
          <Text style={styles.bottomButtonText}>Avançar</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 0,
    paddingTop: 0,
    height: '100%',
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#510E16',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 55,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 10,
  },
  searchContainer: {
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#510E16',
    padding: 18,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})
