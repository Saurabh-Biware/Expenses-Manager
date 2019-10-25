import React from 'react';
import { StatusBar , View , Image } from 'react-native';
import Actions from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ isLoggedIn: false };
      }
    
      componentDidMount() {
        AsyncStorage.getItem('email',
        (value) => {
          this.setState({ email: value });
        });
      }
    
      render() {
        if (this.state.email === 'loggedIn') {
          return Actions.profile()
        }
        else if (this.state.email === 'loggedOut') {
          return <LogIn screenProps={{ isLoggedIn: () => this.setState({ email: 'loggedIn' }) }}/>
        }
     
        return <SplashScreen/>
      }
}