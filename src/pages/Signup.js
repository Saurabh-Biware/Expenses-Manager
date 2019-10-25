import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Picker,
    ScrollView,
    ToastAndroid,
    ListView,
    Spinner
} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, mobileChanged, nameChanged, genderChanged, occupationChanged, loginUser } from '../actions';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../components/common'
// import InputText from '../components/InputText';
import { TextInput } from 'react-native-paper';
import { Loader} from '../components/common/Loader'

import { Appbar } from 'react-native-paper';

class Signup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            mobileNo: '',
            gender: '',
            occupation: '',
            name: '',
            email: '',
            password: '',
            confirm: '',
            data: []
        }
    }
    ErrorUtil() {

        const { name, gender, mobileNo, occupation, confirm } = this.state;
        const { email, password } = this.props;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (name.trim() == "") {
            ToastAndroid.show('Name is required!', ToastAndroid.LONG);
            return (true)
        }
        else if (mobileNo.trim() === '') {
            ToastAndroid.show('Mobile no is required!', ToastAndroid.LONG);
            return (true)
        }
        else if (mobileNo.length !== 10){
            ToastAndroid.show('Invalid Mobile No!', ToastAndroid.LONG);
            return(true)
        }
        
        else if (phoneno.test(mobileNo) === false){
            ToastAndroid.show('Invalid Mobile No!', ToastAndroid.LONG);
            return(true)
        }
        else if (mobileNo === '0000000000') {
            
            ToastAndroid.show('Invalid Mobile No!', ToastAndroid.LONG);
        }

        else if (this.state.gender === '') {
            ToastAndroid.show('Please Select gender', ToastAndroid.LONG);
            return (true)
        }   
        else if (occupation.trim() == "") {
            ToastAndroid.show('Occuptaion is required!', ToastAndroid.LONG);
            return (true)
        }
        else if (email === '') {
            ToastAndroid.show('please enter valid email!', ToastAndroid.LONG);
            return (true)
        }
        else if (reg.test(email)  === false){
            ToastAndroid.show('Invalid email!', ToastAndroid.LONG);
                return(true)
        
        }
       
        else if (password.length < 6)  {  
            ToastAndroid.show('Enter Password (min. 6 characters)', ToastAndroid.LONG);
            return (true)
        }
        else if (confirm.trim() === '') {
            ToastAndroid.show('Please enter password!', ToastAndroid.LONG);
            return (true)
        }
        else if (confirm !== this.props.password){
            ToastAndroid.show('Password does not match', ToastAndroid.LONG);
           return(true)
        }

        else {
            return (false)
        }

    }


    // state = {email: '', password: '' ,mobile: '' , gender:'', mobile: '',  error: '' };



    onEmailchange(text) {
        this.props.emailChanged(text);
    }
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }
    onMobileChange(text) {
        // this.props.mobileChanged(text);
        this.setState({ mobileNo: text })
        //alert(JSON.stringify(text))
    }
    onNameChange(text) {
        // this.props.nameChanged(text);
        this.setState({ name: text })
    }
    // onGenderChange(text) {
    //     // this.props.genderChanged(text);
    //     alert(JSON.stringify(text))

    //     this.setState({ gender: text })
    // }
    onOccupationChange(text) {
        // this.props.occupationChanged(text);

        this.setState({ occupation: text })
    }
    onConfirm(text) {
        this.setState({ confirm: text })
    }


    onButtonPress() {
        this.setState({Error : ''})
        //  alert(validate())
        const { email, password, mobileNo, name, gender, occupation } = this.props;
        var check = this.ErrorUtil()
        if (!check) 
        {
            this.props.loginUser({
                mobileNo: this.state.mobileNo, email: this.props.email, password: this.props.password,
                name: this.state.name, occupation: this.state.occupation, gender: this.state.gender, confirm: this.state.confirm
            })
            
        }
        else
        {
           
        }

        // this.props.loginUser({ email, password, mobile1,name, gender,occupation });
    }

    renderButton() {

       
        <Text style={styles.errorTextStyle}>{this.state.Error}</Text>

        return (
            <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.buttonText}>
                    Sign up
            </Text>
            </TouchableOpacity>
        );

    }

    goBack() {
        Actions.pop();
    }

    render() {
        return (
            
            <ScrollView>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={this.goBack}
                    />
                    <Appbar.Content
                        title="Registration"
                    // subtitle="Subtitle"
                    />
                </Appbar.Header>
                    <TextInput
                        label="Full Name"
                        underlineColorAndroid='transparent'
                        returnKeyType='next'
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.state.name}
                    /> 
                    <TextInput
                         label="Mobile No."
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        returnKeyType='next'
                        
                        onChangeText={this.onMobileChange.bind(this)}
                        value={this.state.mobileNo}
                    />
               
                <View style={{borderBottomWidth:1,borderBottomColor:'gray',borderRadius:1}}>
                    <Picker
                        style={{
                            width: 170,height:55,marginLeft:8
                        }}
                        selectedValue={(this.state && this.state.gender) || 'a'}
                        onValueChange={(value) => {
                            this.setState({ gender: value });
                        }} itemStyle={{ color: 'white' }}>
                        <Picker.Item label={'Select Gender'} value={''} />
                        <Picker.Item label={'Male'} value={'Male'} />
                        <Picker.Item label={'Female'} value={'Female'} />
                        <Picker.Item label={'Transgender'} value={'Transgender'} />

                    </Picker>
                    </View>
               
               
                    <TextInput
                        label="Occupation"
                        underlineColorAndroid='transparent'
                        onChangeText={this.onOccupationChange.bind((this))}
                        value={this.state.occupation}
                    />
              
               
                    <TextInput
                        label="Email"
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onChangeText={this.onEmailchange.bind(this)}
                        value={this.props.email}
                    />
               
                    <TextInput
                        secureTextEntry
                        label="Password"
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        onChangeText={this.onPasswordChange.bind((this))}
                        value={this.props.password}
                    />
               
               
                    <TextInput
                        secureTextEntry
                        label="Confirm Password"
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        onChangeText={this.onConfirm.bind(this)}
                        value={this.state.confirm}
                    />


                <Text style={styles.errorTextStyle}>{this.state.Error}</Text>
                {this.renderButton()}


              
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}>
                        <Text style={styles.signupButton}>Sign In</Text></TouchableOpacity>
                </View>
               


            </ScrollView>
        );
    }


}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        // width: 300,
        // backgroundColor:'#1c313a',
        // borderRadius: 25,
        // marginVertical: 10,
        // paddingVertical: 13
        marginTop: 5,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        alignSelf: 'center'
    },
    containerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        //marginBottom:50,
        flexDirection: 'row',
    },
    signupText: {
        color: '#00008B',
        fontSize: 16,


    },
    footer: {
        position: 'relative',
        justifyContent: 'flex-end'

    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    signupButton: {
        color: '#00008B',
        fontSize: 16,
        fontWeight: 'bold'

    },
    errorTextStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'red',
        paddingTop: 25
    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, mobileChanged, nameChanged, genderChanged, occupationChanged })(Signup);