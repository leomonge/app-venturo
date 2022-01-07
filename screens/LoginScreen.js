import React from 'react' 
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert, ImageBackground, Dimensions, Image } from 'react-native'
import Checkbox from 'expo-checkbox'
import useForm from '../hooks/useForm'

const {width, height} = Dimensions.get('window')

export default ({ navigation }) => {

  const initialState = {
    "identifier": "",
    "password": "",
  }

  const onSubmit = values => {
    fetch('http://192.168.1.39:1337/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(response => {
      if(!response.statusCode){
        return Alert.alert(
          'Éxito',
          'Bienvenido/a a la aplicación de la firma Venturo'
        )
      }
      Alert.alert(
        'Error',
          'Usuario o contraseña Incorrecta',
      )
    })
  }


  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)
  return(
    //Container start
    <ScrollView 
      style={{flex: 1, backgroundColor:'#fff'}}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand View */}
      <ImageBackground
        source={require('../assets/background/background-blue-justice.jpg')}
        style={{height: height/ 2.5}}
      >
        <View style={styles.brandView}>
          <Image
            source={require('../assets/logo/logo-firma-venturo.png')}
          />
        </View>
      </ImageBackground>
      {/* Bottom View */}
      <View style={styles.bottomView}>
        {/* Welcome View */}
        <View style={{padding: 40}}>
          <Text style={{color: '#4632A1', fontSize: 34}}>Bienvenido</Text>
          <Text>
            No tiene una cuenta? 
            <Text style={{color: 'red', fontStyle: 'italic'}}> Regístrate</Text>
          </Text> 
         {/* Forms Input View */}
         <View style={{marginTop: 50}}>
          <View>
          <Text style={{color:'#6f6f6f'}}>Correo Electrónico</Text>
          <TextInput
              style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
              value={inputs.email}
              onChangeText={subscribe('identifier')}
              placeholder='harvey.specter@gmail.com'
            />
          </View>
          <View style={{ marginTop: 20}}>
            <Text style={{color:'#6f6f6f'}}>Contraseña</Text>
            <TextInput
              style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
              value={inputs.password}
              onChangeText={subscribe('password')}
              placeholder='********'
              secureTextEntry={true}
            />
          </View>  
         </View>
         {/* Forgot Password and Remember Me View */}
         <View style={styles.forgotPassView}>
          <View stye={{flex:1, marginLeft: -20}}>
            <View style={{flexDirection: 'row'}}>
              <Checkbox value={true} color='#4632A1'/>
              <Text style={{color:'#8f9195'}}> Recordarme</Text>
            </View>
          </View>
          <View stye={{flex:1, marginRight: -20}}>
            <Text style={{color:'#8f9195'}}>Olvidaste tu Contraseña</Text>
          </View>
         </View>
        </View>
      </View>
    </ScrollView> 
  )
}
const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView:{
    flex: 1,
    backgroundColor: '#fff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60
  },
  forgotPassView:{
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})