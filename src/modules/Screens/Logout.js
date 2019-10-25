import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
import { EventRegister } from 'react-native-event-listeners'




class Logout extends Component {

    removeValue = async () => {
        try {
           // await AsyncStorage.removeItem('email')
           await AsyncStorage.setItem('email','')
        } catch (e) {
            // remove error
        }

        console.log('Done.')
    }

    getData= async () => {
        try {
           
            const value = await AsyncStorage.getItem('userId')
        
            if(value != null){
                this.setState({userId: value });
            }
       //    alert(JSON.stringify(this.state.userId))
        } catch (e) {
            //alert(e)
        }
    }

    removeData = async () => {
        try {
           // await AsyncStorage.removeItem('email')
           await AsyncStorage.setItem('userId','')
        } catch (e) {
            // remove error
        }

        console.log('Done.')
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (

            <Icon name="logout" style={{ fontSize: 24, color: tintColor }} />
        )
    }
      componentDidMount() {
          this.removeValue()
        this.getData()
          EventRegister.emit('myCustomEvent', 'it works!!!')
          this.removeData()
          Actions.login()
        
    }
     
    

    render() {
        return (
            <View style={styles.container}>
                
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})
export default Logout;
