import React from 'react';
import { StatusBar , View , Image,StyleSheet } from 'react-native';
import Actions from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage';



export default class blankScreen extends React.Component {

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem("email")
          
          if(value !== null) {
            //alert(value)
            if(value !== ""){
              Actions.profile()
            }else {
               alert(value)
            }
          
            // value previously stored
           // alert("data fetched")
           
          }else
          {
           // alert("login : " +JSON.stringify(value))
          //alert("sau")
            Actions.login()
            
          }
         
        } catch(e) {
           // alert(e)
          Actions.login()
        }
      }
    
     
    
      render() {
       
     
        return (
            <View style={styles.container}>
            {/* <Image style={{ width: 180, height: 90, alignSelf:'center' }}
                source={require('../../images/img2.png')} /> */}
            

        </View>
        )

      }
}

const styles  = StyleSheet.create({
    container: {
        flex:1,
        
        backgroundColor:'#fff',
        alignContent: 'center',

        
    },
})