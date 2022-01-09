import React, {useState} from 'react' 
import { ScrollView, View, Text, StyleSheet, TextInput, Alert, ImageBackground, Dimensions, Image, TouchableOpacity, Button } from 'react-native'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import Checkbox from 'expo-checkbox'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import {Picker} from '@react-native-picker/picker';

import useForm from '../hooks/useForm'

const {width, height} = Dimensions.get('window')

export default ({ navigation }) => {

  const [current, setCurrent] = useState("natural");
  const [isSelected, setSelection] = useState(false);

  const [date, setDate] = useState(new Date(2004, 0, 0));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [selectedDepartament, setSelectedDepartament] = useState();

  const initialState = {
    "username": "",
    "nombres": "",
    "apellidos": "",
    "dni": "",
    "fecha_de_nacimiento": "",
    "email": "",
    "celular": "",
    "departamento": "",
    "lugar_colegiatura": "",
    "numero_colegiatura": "",
    //"curriculum_vitae": "",
    "descripcion": "",
    "password": "",
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSubmit = values => {
    fetch('http://192.168.1.39:1337/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if(!response.statusCode){
        return Alert.alert(
          'Éxito',
          'Gracias por registrarse en el aplicativo Firma Venturo, en unos momentos uno de nuestros asistentes se comunicará con usted'
        )
      }
      Alert.alert(
        'Error',
        'Error al registrarse'
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
          <Text style={{color: '#4632A1', fontSize: 34}}>Regístrate</Text>
          <Text>
            Ya tienes una cuenta? 
            <Text style={{color: 'red', fontStyle: 'italic'}} onPress={()=>navigation.navigate('Login')}> Ingresar</Text>
          </Text> 
         {/* Forms Input View */}
         <View style={{marginTop: 10}}>
          <Text style={{ marginBottom: 5 }}>Soy una persona: </Text>
          <RadioButtonGroup
            containerStyle={{ marginBottom: 10, flexDirection: 'row',
            justifyContent: 'space-between' }}
            selected={current}
            onSelected={(value) => setCurrent(value)}
            radioBackground="#4632A1"
          >
            <RadioButtonItem value="natural" label="Natural" />
            <RadioButtonItem value="juridica" label="Jurídica" />
          </RadioButtonGroup>

          { current == 'natural' ?
            <>
              <View>
                <Text style={{color:'#6f6f6f'}}>Usuario</Text>
                <TextInput
                  style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
                  value={inputs.username}
                  onChangeText={subscribe('username')}
                  placeholder='Harv2022'
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color:'#6f6f6f'}}>Nombres</Text>
                <TextInput
                  style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
                  value={inputs.nombres}
                  onChangeText={subscribe('nombres')}
                  placeholder='Harvey'
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color:'#6f6f6f'}}>Apellidos</Text>
                <TextInput
                  style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
                  value={inputs.apellidos}
                  onChangeText={subscribe('apellidos')}
                  placeholder='Specter'
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{marginTop: 10, width: width/2.8}}>
                  <Text style={{color:'#6f6f6f'}}>DNI</Text>
                  <TextInput
                    style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
                    value={inputs.dni}
                    onChangeText={subscribe('dni')}
                    placeholder='20404020'
                  />
                </View>
                <View style={{marginTop: 10, width: width/2.5}}>
                  <Text style={{color:'#6f6f6f'}}>Fecha de Nacimiento</Text>
                  <TouchableOpacity 
                    onPress={showDatepicker} 
                    style={{ borderColor: '#4632A1', borderBottomWidth: 1}}>
                    <Text style={{color:'#aaa', marginTop: 4.2, textAlign: 'center'}}>{moment(date).format("DD/MM/YYYY")}</Text> 
                  </TouchableOpacity>
                  { show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>
              <View style={{
                marginTop: 10, 
                borderColor: '#4632A1',
                borderBottomWidth: 1
              }}>
                <Picker
                  style={{}}
                  selectedValue={selectedDepartament}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedDepartament(itemValue)
                  }>
                  <Picker.Item label="Elija su Departamento" value="null" enabled={false} />
                  <Picker.Item label="Amazonas" value="amazonas"/>
                  <Picker.Item label="Ancash" value="ancash"/>
                  <Picker.Item label="Apurimac" value="apurimac"/>
                  <Picker.Item label="Arequipa" value="arequipa"/>
                  <Picker.Item label="Ayacucho" value="ayacucho"/>
                  <Picker.Item label="Cajamarca" value="cajamarca"/>
                  <Picker.Item label="Callao" value="callao"/>
                  <Picker.Item label="Cusco" value="cusco"/>
                  <Picker.Item label="Huancavelica" value="huancavelica"/>
                  <Picker.Item label="Huánuco" value="huanuco"/>
                  <Picker.Item label="Ica" value="ica"/>
                  <Picker.Item label="Junín" value="junin"/>
                  <Picker.Item label="La Libertad" value="la_libertad"/>
                  <Picker.Item label="Lambayeque" value="lambayeque"/>
                  <Picker.Item label="Lima" value="lima"/>
                  <Picker.Item label="Loreto" value="loreto"/>
                  <Picker.Item label="Madre de Dios" value="madre_de_dios"/>
                  <Picker.Item label="Moquegua" value="moquegua"/>
                  <Picker.Item label="Pasco" value="pasco"/>
                  <Picker.Item label="Piura" value="piura"/>
                  <Picker.Item label="Puno" value="puno"/>
                  <Picker.Item label="San Martin" value="san_martin"/>
                  <Picker.Item label="Tacna" value="tacna"/>
                  <Picker.Item label="Tumbes" value="tumbes"/>
                  <Picker.Item label="Ucayali" value="ucayali"/>
                </Picker>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color:'#6f6f6f'}}>Celular</Text>
                <TextInput
                  style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
                  value={inputs.cerlular}
                  onChangeText={subscribe('cerlular')}
                  placeholder='964223344'
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color:'#6f6f6f'}}>Correo Electrónico</Text>
                <TextInput
                  style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
                  value={inputs.email}
                  onChangeText={subscribe('email')}
                  placeholder='harvey.specter@gmail.com'
                />
              </View>
              <View style={{ marginTop: 10}}>
                <Text style={{color:'#6f6f6f'}}>Contraseña</Text>
                <TextInput
                  style={{borderBottomWidth: 1, borderColor: '#4632A1'}}
                  value={inputs.password}
                  onChangeText={subscribe('password')}
                  placeholder='********'
                  secureTextEntry={true}
                />
              </View>
            </>
            :
            <View> 
              <Text>asd</Text>
            </View>
          }
         </View>
         {/* Tems and Conditions View */}
         <View style={styles.TermsConditionsView}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Checkbox 
              value={isSelected}
              onValueChange={setSelection} 
              color='#4632A1'
              />
            <Text style={{color:'#8f9195'}}> Acepto los <Text style={{color:'red'}}>Términos y condiciones</Text> </Text>
          </View>
         </View>
         
         {/* Login Button */}
         <View 
          style={{
            height:100,
            justifyContent: 'center',
            alignItems: 'center'
          }}
         >
           <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
            <Text style={{color: '#fff', }}>Registrarme</Text>
           </TouchableOpacity>
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
  TermsConditionsView:{
    height: 50,
    marginTop: 20,
  },
  registerBtn:{
    alignSelf: 'center',
    backgroundColor: '#4632A1',
    width: width/2,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})