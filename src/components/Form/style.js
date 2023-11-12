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
    marginTop: 320,
    padding: 2,
  },
  form: {
    width: '100%',
    height: 'auto',
    marginTop: 5,
    padding: 2,
  },
  formLabel: {
    color: '#FFFFFF',
    fontSize: '20',
    padding: 10,
  },
  input: {
    paddingHorizontal: 1,
    width: '90%',
    height: 50,
    margin: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    //paddingLeft: 20,
    marginTop: 0,
  },

  textbuttonEntrar: {
    fontSize: 30,
    color: '##020202',
    fontWeight: 'bold',
  },
  buttonEntrar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    margin: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingLeft: 0,
    marginLeft: 12,
    paddingBattom: 20,
    paddingTop: 14,
  },
})
export default styles
