import { showMessage, hideMessage } from "react-native-flash-message";
import { Keyboard } from 'react-native';

function message(title, description, type){
    Keyboard.dismiss()
      showMessage({
        message: title,
        floating: true,
        type: type,
        description: description,
      });
  }

  module.exports = {message}