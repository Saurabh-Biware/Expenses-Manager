/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';
import firebase from 'firebase';
import Routes from './src/Routes';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFA611',
    accent: '#fff',
  }
};


export default class App extends Component {  

  componentWillMount() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDNpuH837Y-gcRC4Lpxx-f9afPdSeU_SII",
      authDomain: "expenses-manager-b13c0.firebaseapp.com",
      databaseURL: "https://expenses-manager-b13c0.firebaseio.com",
      projectId: "expenses-manager-b13c0",
      storageBucket: "expenses-manager-b13c0.appspot.com",
      messagingSenderId: "542302290376",
      appId: "1:542302290376:web:6764a63e38b2e2d0"
    };
    // Initialize Firebase
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
   
    this.getData()
  }
  

  
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("email")
     
      if(value !== null) {
       // alert(value)
        if(value !== ""){
          Actions.profile()
        }else {
          // alert(value)
        }
      
        // value previously stored
       // alert("data fetched")
       
      }else
      {
      //  alert("login : " +JSON.stringify(value))
        Actions.login()
      }
     
    } catch(e) {
      // error reading value
      console.log("data got")
    }
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <PaperProvider theme={theme}>
      <Provider store={store}>
        <View style={styles.container}>

          <StatusBar backgroundColor="#fff" barStyle="dark-content" />

          <Routes />

        </View>
      </Provider>
      </PaperProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center'
  }
});

