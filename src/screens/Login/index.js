 import React, {useState } from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';

import * as Animatable from 'react-native-animatable'
import * as LocalAuthentication from 'expo-local-authentication';

import ModalPassword from '../../components/ModalPassword';
 
import styles from './styles'
import logo from '../../assets/logo.png'

export default function Login({ navigation }) {

  const [showModal, setShowModal] = useState(false)

  saveItem = async () => {
    setShowModal(false)
  }

  async function scanFingerPrint() {
    let exp = await LocalAuthentication.supportedAuthenticationTypesAsync()
     
    if(exp[0]===1){
      let results = await LocalAuthentication.authenticateAsync();

      if (results.success) {
        navigation.navigate('Home')
      } else {
        alert('Erro!')
      }
    } else {
      alert('Not supported')
    }
  }
 
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '40%' }}>
          <Image source={logo} />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{fontSize: 24, justifyContent: 'center', marginHorizontal: 20, color: '#0034BE'}}>
            Faça login, e aproveite 
          </Text>
          <Text style={{fontSize: 24, justifyContent: 'center', marginHorizontal: 20, color: '#0034BE'}}>
            o seu aplicativo!
          </Text>
        </View>

        <Animatable.View animation='fadeInUp' duration={300} style={styles.constainerAuth}>
          <TouchableOpacity 
            style={styles.buttonAuth}
            onPress={() => scanFingerPrint()} >
            <Text style={styles.textButtonAuth}> TouchID</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonAuth}
            onPress={() => setShowModal(true)} >
            <Text style={styles.textButtonAuth}>Senha</Text>
          </TouchableOpacity>
        </Animatable.View>

        <ModalPassword 
          visible={showModal} 
          close={() => setShowModal(false)} 
          onSave = {saveItem} 
          navigation={navigation}
        />
      </SafeAreaView>
    );
}