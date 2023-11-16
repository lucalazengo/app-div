import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  formContext: {
    width: '100%',
    height: '100%',
    bottom: '0',
    backgroundColor: '#510E16',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 2,
    // pmetade da tela
    marginTop: 320,
  },
  form: {
    width: '100%',
    height: 'auto',
    marginTop: 5,
    padding: 2,
  },
  formLabel: {
    color: '#FFFFFF',
    fontSize: 18, // Alterado para 18
    padding: 10,
  },

  input: {
    paddingHorizontal: 10,
    width: '90%',
    height: 60, // Aumentado para 60
    margin: 12,
    borderRadius: 8, // Aumentado para 8
    backgroundColor: '#fff',
    marginTop: 8, // Adicionado espaçamento superior
  },

  textbuttonEntrar: {
    fontSize: 24, // Alterado para 24
    color: '#020202',
    fontWeight: 'bold',
  },

  buttonEntrar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    margin: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingLeft: 0,
    marginLeft: 12,
    paddingVertical: 10, // Alterado para paddingVertical
    height: 60, // Aumentado para 60
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  buttonMotorista: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
  },

  buttonPassageiro: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
  },

  buttonText: {
    color: '#510E16',
    fontSize: 16,
  },
})

export default styles
