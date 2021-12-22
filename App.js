import React from 'react';
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons } from "@expo/vector-icons"

import IndexScreen from "./screens/IndexScreen"
import LoginScreen from "./screens/LoginScreen"
import RegistroScreen from "./screens/RegistroScreen"
import RegistroAbogadoScreen from "./screens/RegistroAbogadoScreen"

import PerfilScreen from "./screens/PerfilScreen"
import ConsultaOrganicaScreen from "./screens/ConsultaOrganicaScreen"
import EmergenciaScreen from "./screens/EmergenciaScreen"

const LoginStack= createStackNavigator({
  Inicio: IndexScreen,
  Login : LoginScreen,
  Registro: RegistroScreen,
  Registro2: RegistroAbogadoScreen,
}, {
  initialRouteName: 'Inicio',
})

const MenuStack= createBottomTabNavigator({
  Perfil: PerfilScreen,
  Consulta: ConsultaOrganicaScreen,
  Emergencia: EmergenciaScreen,
}, {
  initialRouteName: 'Perfil',
  defaultNavigationOptions:({ navigation }) => ({
    tabBarIcon: ({ tintColor }) =>{
      const { routeName } = navigation.state
      let iconName 
      if ( routeName === 'Perfil'){
        iconName = `ios-person-circle`
      }
      if ( routeName === 'Consulta'){
        iconName = `ios-help-circle`
      }
      if ( routeName === 'Emergencia'){
        iconName = `ios-alert-circle`
      }
      return <Ionicons name={iconName} size={20} tintColor={tintColor} /> 
    },
    tabBarOptions: {
      activeTintColor: '#3853A1',
    }
  })
})

const RootStack= createSwitchNavigator({
  LoginStack: LoginStack,
  MenuStack : MenuStack,
},
{
  initialRouteName: 'LoginStack',
})

export default createAppContainer(RootStack)