import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    keyboard,
    KeyboardAvoidingView,
    ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux';
import firebase from 'firebase';
import { emailChanged, passwordChanged, loginUser,userSpace } from '../actions';
import { CardSection,Spinner } from '../components/common';
import AsyncStorage from '@react-native-community/async-storage';
import { EventRegister } from 'react-native-event-listeners'



class Logo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            loading:'',
            data: []
        }
    }
  
storeData = async (email) => {
    try {
      await AsyncStorage.setItem('email',email)
      .then( () =>{
          console.log(email)
      .catch( () => {
       // alert('there was an error')
      })
      })
    } catch (e) {
      // saving error
    }
  }

  

  componentDidMount(){
    this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
        this.props.emailChanged('');
        this.props.passwordChanged('')
     // alert("llllll")
  })
  }

    myFun()  {
        const {email,password} = this.props;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(email === ''){
            ToastAndroid.show('Please enter email id', ToastAndroid.LONG);
    return(true)
        }
        else if (reg.test(email)  === false){
            ToastAndroid.show('Invalid email!', ToastAndroid.LONG);
        }
        else if(password === ''){
            ToastAndroid.show('Password is required!', ToastAndroid.LONG);
        }
    }


    onEmailchange(text) {
        this.props.emailChanged(text);
    }
    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }

    renderButton() {

        // if (this.props.loading) {
        //     return <Spinner size="large" color="#0000ff" />;
        // }

       
        return (
            <TouchableOpacity style={styles.button} onPress= {this.onButtonPress.bind(this)}>
            <Text style={styles.buttonText}>
            Log In
            </Text>
        </TouchableOpacity>
        
        
        );
        
    }

   
    onButtonPress(){
       
        const {email,password} = this.props;
      var Error =  this.myFun()
        this.props.userSpace({email,password})
        this.storeData(email)
        this.onLoginSuccess()
        //this.clearText()
       // Actions.reset("login")
       

    }

    onLoginFail(){
        this.setState({ error: 'Authentication Failed!'})
    }

    onLoginSuccess(){
        this.setState({
            email:'',
            password:'',
            error:''
        });
    }
 
    render(){

       
        return(
            
            
            <View style={styles.container}>
                <CardSection>
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Username or Email"
                placeholderTextColor = 'gray'
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                onChangeText={this.onEmailchange.bind(this)}
                value={this.props.email}
                autoCapitalize="none"
                onSubmitEditing={() => this.refs.txtPassword.focus()}
                />
                </CardSection>
                <CardSection>
                 <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry
                placeholderTextColor = 'gray'
                returnKeyType='go'
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                autoCorrect={false}
                ref={"txtPassword"}
                />
                </CardSection>

              <Text style={styles.errorTextStyle}>{this.state.Error}</Text>
                {this.renderButton()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems:'center',
        marginTop:15
    },

    inputBox:{
        width:300,
        backgroundColor:'rgba(255, 255,255,0.8)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'black',
        marginVertical: 10,
        borderColor:'#F6820D'
      },
    button :{
        // width: 300,
        // backgroundColor:'#1c313a',
        // borderRadius: 25,
        // marginVertical: 10,
        // paddingVertical: 13
        marginTop:30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText : {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign:'center'
    },
    errorTextStyle:{
        fontSize:16,
        alignSelf:'center',
        paddingTop:30,
        color:'red' 
    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser,userSpace })(Logo);