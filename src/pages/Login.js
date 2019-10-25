import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

//import {connect} from 'react-redux';
import Logo from '../components/Logo';
import Form from '../components/Form';
import {Actions} from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton , statusCodes } from 'react-native-google-signin';
import firebase from 'firebase'
import { EventRegister } from 'react-native-event-listeners'
import AsyncStorage from '@react-native-community/async-storage'



class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      gettingLoginStatus: true,
      googleuser:false,
      check:false
    };
  }

 
   
    componentWillMount(){
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
          webClientId: '542302290376-ufeivojt9tks2ph5habj29jrd50sfpr8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
          offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          hostedDomain: '', // specifies a hosted domain restriction
          loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
          forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
          accountName: '', // [Android] specifies an account name on the device that should be used
          iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        this._isSignedIn();
        
    }

    _isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
       // alert('User is already signed in');
        //Get the User details as user is already signed in
        this._getCurrentUserInfo();
      } else {
        //alert("Please Login");
        console.log('Please Login');
      }
      this.setState({ gettingLoginStatus: false });
    };

    _getCurrentUserInfo = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        console.log('User Info --> ', userInfo);
        this.setState({ userInfo: userInfo });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
         // alert('User has not signed in yet');
          console.log('User has not signed in yet');
        } else {
         // alert("Something went wrong. Unable to get user's info");
          console.log("Something went wrong. Unable to get user's info");
        }
      }
    };

    _signIn = async () => {
      //Prompts a modal to let the user sign in into your application
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        //alert(JSON.stringify(userInfo));
        this.setState({ userInfo: userInfo });
         const credential = await firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
        
       const firebaseUserCredential =  await firebase.auth().signInWithCredential(credential);
       //alert(JSON.stringify(credential))
    //  console.log( alert(JSON.stringify(firebaseUserCredential.user.toJSON())))
       this.freezeData(firebaseUserCredential.user.toJSON())
      
       
     
       

      // login with credential
      } catch (error) {
       // alert('Message', error.message);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         // alert('User Cancelled the Login Flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
         // alert('Signin g In');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         // alert('Play Services Not Available or Outdated');
        } else { 
          //alert(error.code);
          this.setState({googleuser: true})
        }

        // if(this.state.googleuser){
        //     firebaseUserCredential()
        // }
      }
    };

    

     freezeData(user){
      firebase.database().ref(`Users`).child(user.uid).child('profile').set({
        userId: user.uid,
        name : user.displayName,
        mobile: user.phoneNumber,
        gender: '',
        occupation: '',
        email : user.email,
        // password:this.props.password,


    }).then((data)=>{
      this.storeData(user.uid)
        Actions.profile()
       // alert(JSON.stringify(data));
    }).catch((err)=>{
      alert(err)
    })
    }

    storeData = async (userId) => {
      try {
        await AsyncStorage.setItem('userId',userId)
      } catch (e) {
       alert(userId)
      }
    }

      _signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
    
          this.setState({ userInfo: null, error: null });
        } catch (error) {
          this.setState({
            error,
          });
        }
      };


    
    signup(){
        Actions.signup()
    }

    render(){
    
        return(
            <View style={styles.container}>
                <Logo />
                <Form type="Login" />
                <GoogleSigninButton
                    style={{ width: 250, height: 45,marginTop:60 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this._signIn}
                    // disabled={this.state.isSigninInProgress} 
                    />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}>
                    <Text style={styles.signupButton}>Sign up</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles =StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupTextCont:{
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent:'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText:{
        color: '#00008B',
        fontSize: 16,

    },
    signupButton:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#00008B'

    }
});


export default Login;