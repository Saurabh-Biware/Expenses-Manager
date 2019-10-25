import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    StatusBar,
} from 'react-native';
import firebase from 'firebase';
import Routes from '../Routes';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from './src/components/SplashScreen'

export default class MainStore extends Component {
    render() {
        return (
            <PaperProvider theme={theme}>
                <Provider store={store}>
                    <View style={styles.container}>

                        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

                        <Routes />

                    </View>
                </Provider>
            </PaperProvider>
        )
    }

}

