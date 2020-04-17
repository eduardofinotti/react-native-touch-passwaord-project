 import React, {useState } from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';

import * as Animatable from 'react-native-animatable'
import * as LocalAuthentication from 'expo-local-authentication';

import ModalPassword from '../../components/ModalPassword';
 
import styles from './styles'
import logo from '../../assets/logo.png'

export default function Login({ navigation }) {

  const [showModal, setShowModal] = useState(false)
  const [myPassword, setMyPassword] = useState('')

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
        <StatusBar backgroundColor='#FFF' barStyle="dark-content" />

        <View style={{ alignContent:'center', alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
          <Image source={logo} />
        </View>

        <Animatable.View 
          animation='fadeInUp' duration={300}
          style={styles.constainerAuth}>
        
          <TouchableOpacity 
            style={styles.buttonAuth}
            onPress={() => scanFingerPrint()} >
            <Text style={styles.textButtonAuth}> TouchId Auth</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonAuth}
            onPress={() => setShowModal(true)} >
            <Text style={styles.textButtonAuth}>Login whith password</Text>
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