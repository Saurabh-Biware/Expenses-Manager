import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED,MOBILE_CHANGED,NAME_CHANGED,GENDER_CHANGED,OCCUPATION_CHANGED, LOGIN_USER_SUCCEESS, LOGIN_USER , LOGIN_USER_FAIL } from './types';
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, ToastAndroid } from 'react-native';


export const emailChanged = (text) => {
    return{
        type : EMAIL_CHANGED,
        payload:text
    };
};  

export const passwordChanged = (text) => {
    return{
        type : PASSWORD_CHANGED,
        payload:text
    };
};
export const mobileChanged = (text) =>{
    return{
        type: MOBILE_CHANGED,
        payload:text
    };
};
export const nameChanged = (text) => {
    return{
        type : NAME_CHANGED,
        payload:text
    };
};
export const genderChanged = (text) => {

    //alert(JSON.stringify(text))
    return{
        type : GENDER_CHANGED,
        payload:text
    };
};
export const occupationChanged = (text) => {
    return{
        type : OCCUPATION_CHANGED,
        payload:text
    };
};

removeData = async () => {
    try {
       // await AsyncStorage.removeItem('email')
       await AsyncStorage.setItem('userId','')
    } catch (e) {
        // remove error
    }

    console.log('Done.')
}

removeEmail = async () => {
    try {
       // await AsyncStorage.removeItem('email')
       await AsyncStorage.setItem('email','')
    } catch (e) {
        // remove error
    }

    console.log('Done.')
}




export const loginUser  = (mobileNo) =>{
    // alert(JSON.stringify(mobileNo))
    
    return(dispatch) => {
dispatch({ type: LOGIN_USER });
 
    firebase.auth().signInWithEmailAndPassword( mobileNo.email, mobileNo.password)
     
    .then(function(){
        //alert(JSON.stringify(data1))
        
        ToastAndroid.show('Email is registered already', ToastAndroid.LONG);
    })
    .catch((error) =>{
       
      // alert(JSON.stringify(error.message))
        firebase.auth().createUserWithEmailAndPassword( mobileNo.email, mobileNo.password )
        .then(data => {
        //   alert("success"+JSON.stringify(data.user.uid));
          

            if(firebase.auth().currentUser){
                let userId = firebase.auth().currentUser.uid;
                
 
                try {
                    AsyncStorage.setItem('userId', userId)
                } catch (e) {
                    //alert(e)
                }
            }
         

            
            
            firebase.database().ref(`Users`).child(data.user.uid).child('profile').set({
                userId: data.user.uid,
                name : mobileNo.name,
                mobile: mobileNo.mobileNo,
                gender: mobileNo.gender,
                occupation: mobileNo.occupation,
                email : mobileNo.email,
                // password:this.props.password,
        
        
            }).then((data)=>{
                Actions.welcome();
                //success callback
                // alert(data);
            }).catch((error)=>{
              //cd  ToastAndroid.show('Email is already registered', ToastAndroid.LONG);
                // error callback
                // console.log('error ' , error)
                alert(JSON.stringify(error.message))
            })
       
        })
        .catch(function(e){
            ToastAndroid.show(e.message, ToastAndroid.LONG);
           // Actions.Welcome();
        });
    });
};
};


export const userSpace  = (mobileNo) =>{
    // alert(JSON.stringify(mobileNo))
    
    return(dispatch) => {
dispatch({ type: LOGIN_USER });
 
    firebase.auth().signInWithEmailAndPassword( mobileNo.email, mobileNo.password)
     
    .then(function(){
       
         Actions.profile()  

    })
    .catch((error) =>{
         ToastAndroid.show(error.message, ToastAndroid.LONG);
        removeData()
        removeEmail()
    });
};
};

const loginUserFail =(dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
};

const loginUserSuccess = (dispatch, user ) => {
    dispatch({
        type: LOGIN_USER_SUCCEESS,
        payload: user
    });

    Actions.main();
};
