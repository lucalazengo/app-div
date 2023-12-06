import React, { useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native'

const TravelReportForm = () => {
  const [vehicleType, setVehicleType] = useState('')
  const [plate, setPlate] = useState('')
  const [driver, setDriver] = useState('')
  const [tripDate, setTripDate] = useState('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [departureKm, setDepartureKm] = useState('')
  const [arrivalKm, setArrivalKm] = useState('')
  const [passengerCount, setPassengerCount] = useState('')
  const [trip2Origin, setTrip2Origin] = useState('')
  const [trip2Destination, setTrip2Destination] = useState('')
  const [trip2DepartureTime, setTrip2DepartureTime] = useState('')
  const [trip2ArrivalTime, setTrip2ArrivalTime] = useState('')
  const [trip2DepartureKm, setTrip2DepartureKm] = useState('')
  const [trip2ArrivalKm, setTrip2ArrivalKm] = useState('')
  const [trip2PassengerCount, setTrip2PassengerCount] = useState('')
  const [tripNotes, setTripNotes] = useState('')

  const handleSubmit = () => {
    // Implemente a lógica para enviar o relatório
    // Você pode acessar todos os estados aqui para enviar para o servidor ou armazenar localmente
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatório de Viagem</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tipo de veículo"
          value={vehicleType}
          onChangeText={setVehicleType}
        />

        <TextInput
          style={styles.input}
          placeholder="PLACA"
          value={plate}
          onChangeText={setPlate}
        />

        <TextInput
          style={styles.input}
          placeholder="Motorista"
          value={driver}
          onChangeText={setDriver}
        />

        <TextInput
          style={styles.input}
          placeholder="Data da viagem"
          value={tripDate}
          onChangeText={setTripDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Origem"
          value={origin}
          onChangeText={setOrigin}
        />

        <TextInput
          style={styles.input}
          placeholder="Destino"
          value={destination}
          onChangeText={setDestination}
        />

        <TextInput
          style={styles.input}
          placeholder="Horário de saída"
          value={departureTime}
          onChangeText={setDepartureTime}
        />

        <TextInput
          style={styles.input}
          placeholder="Horário de Chegada"
          value={arrivalTime}
          onChangeText={setArrivalTime}
        />

        <TextInput
          style={styles.input}
          placeholder="KM de saída"
          value={departureKm}
          onChangeText={setDepartureKm}
        />

        <TextInput
          style={styles.input}
          placeholder="KM de chegada"
          value={arrivalKm}
          onChangeText={setArrivalKm}
        />

        <TextInput
          style={styles.input}
          placeholder="Nº. de Passageiros"
          value={passengerCount}
          onChangeText={setPassengerCount}
        />

        <TextInput
          style={styles.input}
          placeholder="Origem 2"
          value={trip2Origin}
          onChangeText={setTrip2Origin}
        />

        <TextInput
          style={styles.input}
          placeholder="Destino 2"
          value={trip2Destination}
          onChangeText={setTrip2Destination}
        />

        <TextInput
          style={styles.input}
          placeholder="Horário de saída 2"
          value={trip2DepartureTime}
          onChangeText={setTrip2DepartureTime}
        />

        <TextInput
          style={styles.input}
          placeholder="Horário de Chegada 2"
          value={trip2ArrivalTime}
          onChangeText={setTrip2ArrivalTime}
        />

        <TextInput
          style={styles.input}
          placeholder="KM de saída 2"
          value={trip2DepartureKm}
          onChangeText={setTrip2DepartureKm}
        />

        <TextInput
          style={styles.input}
          placeholder="KM de chegada 2"
          value={trip2ArrivalKm}
          onChangeText={setTrip2ArrivalKm}
        />

        <TextInput
          style={styles.input}
          placeholder="Nª de Passageiros 2"
          value={trip2PassengerCount}
          onChangeText={setTrip2PassengerCount}
        />

        <TextInput
          style={styles.input}
          placeholder="Observações da Viagem"
          value={tripNotes}
          onChangeText={setTripNotes}
          multiline
        />

        <Button title="Enviar Relatório" onPress={handleSubmit} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    top: 30,
    backgroundColor: '#0000',
    color: '#510E16',
    position: 'fixed',
  },
  form: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
})

export default TravelReportForm
