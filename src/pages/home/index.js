import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Home() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([
    { id: '1', name: 'Ônibus 101' },
    { id: '2', name: 'Ônibus 102' },
    { id: '3', name: 'Ônibus 103' },
    { id: '4', name: 'Ônibus 104' },
    { id: '5', name: 'Ônibus 105' },
    { id: '6', name: 'Trem A' },
    { id: '7', name: 'Trem B' },
    { id: '8', name: 'Metrô Linha 1' },
    { id: '9', name: 'Metrô Linha 2' },
    { id: '10', name: 'Metrô Linha 3' },
  ])

  const updateSearch = (search) => {
    setSearch(search)
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem vindo ao Busca Ônibus</Text>
        <Icon
          name="user"
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
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: '#E8E8E8',
                margin: 5,
              }}
            >
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
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
    backgroundColor: '#920D0D',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 40,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
})
