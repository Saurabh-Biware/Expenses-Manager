import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, ToastAndroid, Alert, Dimensions} from 'react-native';
import { Left, Right, Icon, Body, Header } from 'native-base'
import DateTimePickerTester from '../DateTime';
//import { Button } from '../../components/common/Button'
import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native-paper';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firebase from 'firebase';
import TimeDatePickerTester from '../TimeDate'
import AsyncStorage from '@react-native-community/async-storage'
import { Snackbar } from 'react-native-paper';

export default class Income extends Component {

    constructor(props) {
        super(props);

        this.state = {
            IncomeText: '',
            OtherIncome: '',
            userId: '',
            visible: false,
            DialogueIndex: 0,
            data: '',
            datas: '',
            Description: '',
            TextInputDisableStatus: true
        }
    }
    async componentDidMount() {
        await this.getData()
        await this.readData()
        await this.readDataOther()
    }

    onAdd() {
        this.setState({ Error: '' })
        this.myFun()
        this.UserInfo()
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userId')

            if (value != null) {
                this.setState({ userId: value });
                // alert('value: ' +this.state.userId)
            }
        } catch (e) {
            alert(e)
        }
    }

    
    myFun() {
        let numreg = /^[0-9]+$/;
        if (this.state.IncomeText === '') {        
                // alert('please enter email')
                ToastAndroid.show('Please add income field', ToastAndroid.LONG);
        }

        else if (this.state.IncomeText.trim() == "") {
            ToastAndroid.show('Please add income field', ToastAndroid.LONG);
        }
        else if (numreg.test(this.state.IncomeText)  === false){
            ToastAndroid.show('Invalid Amount!', ToastAndroid.LONG);
                return(true)
        
        }
        else if (this.state.IncomeText === '0') {
            ToastAndroid.show('Invalid Amount!', ToastAndroid.LONG);
        }
        else if (this.state.OtherIncome === '') {
            ToastAndroid.show('Please mention other sources of income!', ToastAndroid.LONG);
        }
        else if (this.state.OtherIncome.trim() === "") {
            ToastAndroid.show('Please mention other sources of income!', ToastAndroid.LONG);
        }
        else if (this.state.OtherIncome === '0') {
            ToastAndroid.show('Invalid Amount!', ToastAndroid.LONG);
        }
        else if (numreg.test(this.state.OtherIncome)  === false){
          
            ToastAndroid.show('Invalid amount entered', ToastAndroid.LONG);
                return(true)
        
        }

        else {
            // alert(this.state.userId)
            firebase.database().ref(`Users`).child(this.state.userId).child('Income').set(
                {
                    IncomeAmount: this.state.IncomeText,
                    OtherIncome: this.state.OtherIncome,
                    Description: this.state.Description
                }
            )
            //this.goBack()
            //alert(this.state.OtherIncome)
            Actions.profile()
            ToastAndroid.show('Your income is added successfully', ToastAndroid.SHORT);

        }
    }

     UserInfo() {
        firebase.database().ref(`UserInfo`).child(this.state.userId).child('Income').set(
            {
                IncomeAmount: this.state.IncomeText,
                OtherIncome: this.state.OtherIncome,
                Description: this.state.Description
            }
        )
    }


    async readData() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Income`);
        recentPostsRef.once('value').then(snapshot => {

            //alert(JSON.stringify(snapshot.val().IncomeAmount))
            // alert(JSON.stringify(this.state.userId))
            this.setState({ data: parseInt(snapshot.val().IncomeAmount) })
            //this.setState({data: parseInt(snapshot.val().OtherIncome)})



        })
        // alert(this.state.data)
        if (snapshot.val().IncomeAmount !== 0) {
            this.setState({ TextInputDisableStatus: false })
        }

    }

   

    async readDataOther() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Income`);
        recentPostsRef.once('value').then(snapshot => {

            //alert(JSON.stringify(snapshot))
            this.setState({ datas: parseInt(snapshot.val().OtherIncome) })



        })
        //alert(this.state.datas)
    }




    goBack() {
        Actions.pop()
    }

    onDescriptionChange(text) {
        
        if(text.length == 60){
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else {
            this.setState({ Description: text })
        }
    }

    onIncomeTextChange(text) {
        if(text.length == 8){
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else {
            this.setState({ IncomeText: text })
        }

        

    }
    onOtherIncomeChange(text) {
        if(text.length == 8){
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else {
            this.setState({ OtherIncome: text })
        }
        
    }


    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="paper" style={{ fontSize: 24, color: tintColor }} />
        )
    }



    render() {


        return (

            <SafeAreaView style={styles.safeAreaView}>


                <DateTimePickerTester />
                <TimeDatePickerTester />

                
                <TextInput style={{ backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }}
                    label='Add your Income'
                    value={this.state.IncomeText}
                    maxLength={8}
                    keyboardType='numeric'
                   // disabled={this.state.TextInputDisableStatus}
                    onChangeText={this.onIncomeTextChange.bind(this)}
                />
                <TextInput style={{ backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }}
                    label='Add Other Income'
                    value={this.state.OtherIncome}
                    maxLength={8}
                    keyboardType='numeric'
                   // disabled={this.state.TextInputDisableStatus}
                    onChangeText={this.onOtherIncomeChange.bind(this)}
                />


                <TextInput style={{ height: 100, backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }}
                    label='Description'
                    multiline={true}
                    value={this.state.Description}
                    maxLength={60}
                    onChangeText={this.onDescriptionChange.bind(this)}
                />
               

               
                <View style={{ flex: 3, backgroundColor: '#fff', padding: 20, flexDirection: 'column-reverse' }}>
                    <TouchableOpacity>
                        <Button style={{ margin: 10 }} mode='contained' onPress={() => { this.goBack() }}>
                            Cancel
  </Button></TouchableOpacity>
                    <TouchableOpacity>
                        <Button style={{ margin: 10 }} mode="contained" onPress={() => { this.onAdd() }}>
                            Add
                        </Button>
                    </TouchableOpacity>


                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
         flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
    },
    viewStyle: {

        backgroundColor: '#fff',
        height: 150,
        position: 'relative'
    },
    errorTextStyle: {
        fontSize: 16,
        // marginTop: 10,
        alignSelf: 'center',
        paddingTop: 30,
        color: 'red'
    },
    imgstyle: {
        height: 150,
        width: 300,
        opacity: 0.4
    },
    container: {
        flex: 1,
        height: 80
    },
    headerstyle: {
        backgroundColor: '#FFA611'
    },
    CardSectionStyle: {

        height: 50
    }
})