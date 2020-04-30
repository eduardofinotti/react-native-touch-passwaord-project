import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  {
    title: 'Uma base para iniciar \nprojetos em React-Native',
    text: 'Login por TouchID',
    image: require('../../assets/touchid.png'),
    bg: '#ECF2FF',
  },
  {
    title: 'Uma base para iniciar \nprojetos em React-Native',
    text: 'Login usando senha',
    image: require('../../assets/password.png'),
    bg: '#ECF2FF',
  },
  {
    title: 'Uma base para iniciar \nprojetos em React-Native',
    text: "Customize tudo como quiser \nem um código simples!",
    image: require('../../assets/checklist.png'),
    bg: '#ECF2FF',
  },
];

export default function Onboarding({navigation}) {
  const _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles.skipText}>
        <Text style={{color:"rgba(10, 40, 250, .8)", fontWeight: 'bold', fontSize: 18}}>Skip</Text>
      </View>
    );
  };

  const _keyExtractor = (item) => item.text;

    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={_keyExtractor}
          renderDoneButton={_renderDoneButton}
          renderNextButton={_renderNextButton}
          renderSkipButton={_renderSkipButton}
          renderItem={_renderItem}
          showSkipButton
          data={data}
          onDone={() => {navigation.navigate('Login')}}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    marginVertical: 32,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 24
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(10, 40, 250, .8)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skipText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
});