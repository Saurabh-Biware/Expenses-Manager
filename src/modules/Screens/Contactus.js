import React,{Component} from 'react';
import {Text,View,ScrollView,StyleSheet,Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome'


class Contactus extends Component{


    static navigationOptions = {
        drawerIcon: ({tintColor})  =>(
            <Icon name="comments" style={{ fontSize: 24, color: tintColor }}  />
        )
    }

    async callContactUs(){

        let url = 'mailto:saurabh.biware@inceptiveconsulting.com?subject=Need%20a%20help%20-%20Expenses%20-%20Manager&body=\n\n\n\nDevice%20Manufacturer:%20' + DeviceInfo.getManufacturer() + '\nModel:%20' + DeviceInfo.getBrand() + '%20' + DeviceInfo.getModel() + '\nOS%20Version:%20' + DeviceInfo.getSystemVersion() + '\nApp%20Version:%20' + DeviceInfo.getVersion();
        await Linking.openURL(url);
        }
componentDidMount(){
    this.callContactUs()
}

    render(){
        return(
            <View style={styles.container}> 
                <Text style={styles.ContactText}>We loved to hear it from you</Text>
                <Text style={{color:'#00008B',fontSize:20}}>Thank You</Text>
                <Text style={{fontSize:15}}>Our Development Team will get back to you shortly</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    ContactText:{
        fontFamily:'sans-serif-condensed',
        fontWeight:'bold',
        fontSize:25,

    }
})
export default Contactus;
