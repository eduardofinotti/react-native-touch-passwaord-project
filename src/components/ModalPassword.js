import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable'
import FlashMessage from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialIcons';
var Message = require('../utils/message.js');

const  MyModal = (props) => {

    var onSave = props.onSave;

    const [keyboardOpen, setKeyboardOpen] = useState(false)
    
    const [passwordStored, setPasswordStored] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

      useEffect(() => {
        
        async function getPassword() {
          const myPassword = await AsyncStorage.getItem('password')
          
          if (myPassword) {
            setPasswordStored(myPassword)
          }
          Keyboard.dismiss()
          setKeyboardOpen(false)
        }
        getPassword()
      }, [])

    const savePassword = async () => {

      if (!passwordStored) {

        if (password == '' || confirmPassword == '') {
          Message.message("Error!", "Fill all fields!", "warning")
          return
        }

        if (password !== confirmPassword) {
          Message.message("Error!", "Your passwords are not equals!", "danger")
          return
        }

        if (password.length < 3 || confirmPassword.length < 3) {
          Message.message("Error!", "The password must have 3 chars!", "danger")
          return
        }

        await AsyncStorage.setItem('password', password)
        setPasswordStored(password)
        Message.message("Success!", "Password registred! Enter in your account!", "success")
        setPassword('')
        setKeyboardOpen(false)
      } else {
        if(passwordStored!==password) {
          Message.message("Error!", "Your password is wrong!", "danger")
          return
        }
        Keyboard.dismiss()
        setKeyboardOpen(false)
        props.navigation.navigate('Home')
        onSave() //of props
      }
    }

    function resetPassword() {
      AsyncStorage.clear()
      Message.message('Success!', 'Password removed!', 'success')
      setPassword('')
      setConfirmPassword('')
      setPasswordStored(null)
    }

  return (
    <Modal
    testID={'modal'}
    isVisible={props.visible}
    onSwipeComplete={props.close}
    swipeDirection={['down']}
    style={[styles.modal]}>

      <FlashMessage position="top" /> 

      <Animatable.View style={[styles.contentModal, {height: keyboardOpen?'70%':'40%'}]}>
          
            <View style={styles.modalHeader}>

            <TouchableOpacity>
              <Icon name="keyboard-arrow-down" size={30}/>
            </TouchableOpacity>

              <Text style={styles.modalTitle}>{passwordStored? `Access your account!`: `Register a password!`}</Text>
            </View>

          <View style={{marginTop: 10}}>
            <TextInput 
            multiline={false}
            secureTextEntry={true}
            placeholderTextColor='#747474'
            autoCorrect={true}
            placeholder="Password"
            style={styles.inputPassword}
            onFocus={() => {setKeyboardOpen(true)}}
            onBlur={() => {setKeyboardOpen(false)}}
            value={password}
            onChangeText={ (texto) => setPassword(texto)}
            />
            {!passwordStored && 
              <TextInput 
              multiline={false}
              secureTextEntry={true}
              placeholderTextColor='#747474'
              autoCorrect={false}
              placeholder='Confirm password'
              style={styles.inputPassword}
              onFocus={() => {setKeyboardOpen(true)}}
              onBlur={() => {setKeyboardOpen(false)}}
              value={confirmPassword}
              onChangeText={ (texto) => setConfirmPassword(texto)}
              />
            }
            <TouchableOpacity style={styles.enterRegisterButton} onPress={() => savePassword()}>
              <Text style={styles.handleAddText}>{passwordStored? `Enter`: `Register`}</Text>
            </TouchableOpacity>

            {passwordStored &&
            <TouchableOpacity style={styles.resetPassword} onPress={() => resetPassword()}>
              <Text style={styles.resetPasswordText}>Reset password</Text>
            </TouchableOpacity>  
            }
          </View>

        </Animatable.View>
  </Modal>
  );
}

const styles = StyleSheet.create({

    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  
    contentModal: {
      height: '70%',  
      backgroundColor: '#fff', 
      borderTopEndRadius: 15, 
      borderTopStartRadius: 15,
      alignItems: 'center',
      padding: 0
    },

    modalHeader: {
     alignItems: 'center'
    },

    inputPassword: {
      fontSize: 15,
      margin: 5,
      backgroundColor: '#fff',
      padding: 9,
      height: 45,
      width: 270,
      textAlignVertical: 'top',
      color: '#000',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'gray'
    },
    enterRegisterButton: { 
      backgroundColor: '#3C71FF',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
      height: 45,
      borderRadius: 5
    },
    handleAddText: {
      fontSize: 17,
      color: "#fff",
      fontWeight: 'bold'
    },

    resetPassword: {
      alignContent: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10
    },

    resetPasswordText: {
      fontSize: 17,
      color: "gray",
    },

    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold'
    },
  });

  export default MyModal