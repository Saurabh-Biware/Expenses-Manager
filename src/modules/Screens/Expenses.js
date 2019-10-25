import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Picker, ToastAndroid, ScrollView, Alert } from 'react-native';
import { Left, Right, Icon, Body, Header } from 'native-base'
import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native-paper';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage'
import { EventRegister } from 'react-native-event-listeners'
import DateTimePickerTester from '../DateTime';



export default class Expenses extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Amount: '',
            text: '',
            ExpensesTitle: '',
            Description: '',
            Category: '',
            title: '',
            date: '',
            userId: '',
            description: '',
            data: '',
            datas: '',
            isVisible: false,
        }
    };

    async  componentWillMount() {

        await this.getData()
        await this.readData()
        await this.readDataOther()

    }

    getData = async () => {
        try {

            const value = await AsyncStorage.getItem('userId')

            if (value != null) {
                this.setState({ userId: value });
            }
            // alert(JSON.stringify(this.state.userId))
        } catch (e) {
            //alert(e)
        }
    }





    onAmountChange(text) {
        if (text.length == 9) {
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else if (this.state.datas + this.state.data > text) {
            this.setState({ Amount: text })
        }
        else {
            Alert.alert("Amount entered is invalid!")
        }


    }
    onAmountExpensesTitleChange(text) {
        if (text.length == 15) {
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else {
            this.setState({ ExpensesTitle: text })
        }

    }

    onDescriptionChange(text) {

        if (text.length == 35) {
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else {
            this.setState({ Description: text })
        }
    }
    onCategoryChange(text) {
        this.setState({ Category: text })
    }


    onAdd() {


        this.setState({ Error: '' })
        this.myFun()
        this.UserInfo()
        const event = this.state.Amount
        EventRegister.emit('myCustom', event)
    }

    goBack() {
        Actions.pop()
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="paper" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    async readData() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Income`);
        await recentPostsRef.once('value').then(snapshot => {

            // alert(JSON.stringify(snapshot))
            // alert(JSON.stringify(this.state.userId))
            this.setState({ data: parseInt(snapshot.val().IncomeAmount) })
            //this.setState({data: parseInt(snapshot.val().OtherIncome)})



        })
        // alert(JSON.stringify(this.state.data))
    }



    async readDataOther() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Income`);
        await recentPostsRef.once('value').then(snapshot => {

            // alert(JSON.stringify(this.state.userId))
            this.setState({ datas: parseInt(snapshot.val().OtherIncome) })

            // alert(JSON.stringify(this.state.datas))

        })
        // alert(JSON.stringify(this.state.datas))
    }

    myFun() {
        let numreg = /^[0-9]+$/;
        if (this.state.ExpensesTitle === '') {
            ToastAndroid.show('Please add Expenses Title', ToastAndroid.LONG);
        }

        else if (this.state.ExpensesTitle.trim() == "") {
            ToastAndroid.show('Please add Expenses Title', ToastAndroid.LONG);
        }
        else if (this.state.Amount === '') {
            ToastAndroid.show('Please add the amount', ToastAndroid.LONG);
        }
        else if (this.state.Amount.trim() === "") {
            ToastAndroid.show('Please add the amount', ToastAndroid.LONG);
        }
        else if (numreg.test(this.state.Amount) === false) {
            ToastAndroid.show('Invalid Amount!', ToastAndroid.LONG);
            return (true)

        }
        else if (this.state.Amount === '0') {
            ToastAndroid.show('Invalid Amount!', ToastAndroid.LONG);
        }
        else if (this.state.Category === '') {
            ToastAndroid.show('Please add the Category', ToastAndroid.LONG);
        }
        else if (this.state.Category.trim() === "") {
            ToastAndroid.show('Please add the Category', ToastAndroid.LONG);
        }

        else {

            firebase.database().ref(`Users`).child(this.state.userId).child('New Expenses').push(
                {

                    ExpensesTitle: this.state.ExpensesTitle,
                    Amountadded: this.state.Amount,
                    Category: this.state.Category,
                    Description: this.state.Description


                }
            )
            Actions.profile()
            ToastAndroid.show('Your expenses is added successfully', ToastAndroid.LONG);

        }
    }

    UserInfo() {
        firebase.database().ref(`UserInfo`).child(this.state.userId).child('New Expenses').push(
            {

                ExpensesTitle: this.state.ExpensesTitle,
                Amountadded: this.state.Amount,
                Category: this.state.Category,
                Description: this.state.Description


            }
        )
    }


    render() {


        return (
           

                <SafeAreaView style={styles.safeAreaView}>



                    <TextInput style={{ backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }}
                        label='Expenses Title'
                        value={this.state.ExpensesTitle}
                        maxLength={15}
                        onChangeText={this.onAmountExpensesTitleChange.bind(this)}
                    />
                    <TextInput style={{ backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }}
                        label='Add Amount'
                        value={this.state.Amount}
                        maxLength={9}
                        keyboardType='numeric'
                        onChangeText={this.onAmountChange.bind(this)}
                    />

                    <View>
                        <Picker
                            style={{
                                width: 300,
                                marginLeft: 10, marginRight: 10,
                                alignSelf: 'flex-start',

                            }}
                            selectedValue={(this.state && this.state.Category) || 'a'}
                            onValueChange={(value) => {
                                this.setState({ Category: value });
                            }} itemStyle={{ color: 'white' }}>
                            <Picker.Item label={'Select Category'} value={''} />
                            <Picker.Item label={'Home/Rent'} value={'Home/Rent'} />
                            <Picker.Item label={'Daily Needs'} value={'Daily Needs'} />
                            <Picker.Item label={'Transportation'} value={'Transportation'} />
                            <Picker.Item label={'Entertainment'} value={'Entertainment'} />
                            <Picker.Item label={'Health Care'} value={'Health Care'} />
                            <Picker.Item label={'Dues/Subscriptions'} value={'Dues/Subscriptions'} />
                            <Picker.Item label={'Financial Saving'} value={'Financial Saving'} />
                            <Picker.Item label={'Others'} value={'Others'} />

                        </Picker>
                    </View>





                    <TextInput style={{ height: 100, backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }}
                        label='Description'
                        multiline={true}
                        value={this.state.Description}
                        maxLength={35}
                        onChangeText={this.onDescriptionChange.bind(this)}
                    />

                    <View style={{  backgroundColor: '#fff', padding: 20, flexDirection: 'column-reverse' }}>
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
        backgroundColor: '#fff'
    },
    viewStyle: {

        backgroundColor: '#fff',
        //justifyContent: 'center',
        //alignItems: 'center',
        height: 150,
        //paddingTop: 50,
        //paddingBottom: 30,
        // shadowColor:'#ffffff',
        //shadowOffset:{width: 0 , height: 2},
        // shadowOpacity: 2,
        // elevation: 2,
        position: 'relative'
    },
    errorTextStyle: {
        fontSize: 16,
        marginTop: 190,
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