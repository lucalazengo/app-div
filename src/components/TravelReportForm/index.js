import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';

const TravelReportForm = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
    field9: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Lógica para enviar o relatório
    console.log('Relatório enviado:', formData);
  };

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', }}>
      <View style={{ flex: 1, padding: 6,  }}>
        <Text style={{ 
        padding: 12, 
        backgroundColor: '#510E16',
        width: '100%', 
        fontSize: 24, 
        textAlign: 'center', 
        marginBottom: 20,
        color: '#ffff' }}>
        Relatório de Viagem
        </Text>
        {/* Adicione os campos do formulário */}
        <Input
          label="Tipo de veículo"
          value={formData.field1}
          onChangeText={(text) => handleInputChange('field1', text)}
        />
        <Input
          label="PLACA "
          value={formData.field2}
          onChangeText={(text) => handleInputChange('field2', text)}
        />
        <Input
          label="Motorista"
          value={formData.field3}
          onChangeText={(text) => handleInputChange('field3', text)}
        />
         <Input
          label="Data da viagem"
          value={formData.field4}
          onChangeText={(text) => handleInputChange('field4', text)}
        />
         <Input
          label="Origem"
          value={formData.field5}
          onChangeText={(text) => handleInputChange('field5', text)}
        />
         <Input
          label="Destino"
          value={formData.field6}
          onChangeText={(text) => handleInputChange('field6', text)}
        />
         <Input
          label="Horário de saída"
          value={formData.field7}
          onChangeText={(text) => handleInputChange('field7', text)}
        />
         <Input
          label="Horário de Chegada"
          value={formData.field8}
          onChangeText={(text) => handleInputChange('field8', text)}
        />
         <Input
          label="KM de saída"
          value={formData.field9}
          onChangeText={(text) => handleInputChange('field9', text)}
        />
         <Input
          label="KM de chegada"
          value={formData.field10}
          onChangeText={(text) => handleInputChange('field10', text)}
        />
         <Input
          label="Nº. de Passageiros:
          "
          value={formData.field11}
          onChangeText={(text) => handleInputChange('field11', text)}
        />
         <Input
          label="Origem"
          value={formData.field12}
          onChangeText={(text) => handleInputChange('field12', text)}
        />
         <Input
          label="Destino"
          value={formData.field113}
          onChangeText={(text) => handleInputChange('field13', text)}
        />
         <Input
          label="Horário de saída"
          value={formData.field14}
          onChangeText={(text) => handleInputChange('field14', text)}
        />
         <Input
          label="Horário de Chegada"
          value={formData.field15}
          onChangeText={(text) => handleInputChange('field15', text)}
        />
         <Input
          label="KM de saída "
          value={formData.field16}
          onChangeText={(text) => handleInputChange('field16', text)}
        />
         <Input
          label="KM de chegada"
          value={formData.field17}
          onChangeText={(text) => handleInputChange('field17', text)}
        />
         <Input
          label="Nª de Passageiros:"
          value={formData.field18}
          onChangeText={(text) => handleInputChange('field18', text)}
        />
         <Input
          label="OBSERVAÇÕES DA VIAGEM"
          value={formData.field19}
          onChangeText={(text) => handleInputChange('field19', text)}
        />    
       
        <Button title="Enviar Relatório" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default TravelReportForm;
