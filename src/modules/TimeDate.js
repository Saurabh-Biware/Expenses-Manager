import React, { Component } from "react";
// import { Button, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import { Actions } from "react-native-router-flux";
import {Button} from 'react-native-paper'

 
export default class TimeDatePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      handleDatePicked:'',
      userId:'',
      date:'',
      data:[]

    };
  }
  componentWillMount(){
    this.getData()
}

  getData= async () => {
    try {
        const value = await AsyncStorage.getItem('userId')
    
        if(value != null){
            this.setState({userId: value });
        }
    } catch (e) {
        alert(e)
    }
}
 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = async (date) =>  {

    //alert(JSON.stringify(date));
    firebase.database().ref(`Users`).child(this.state.userId).child('Budgeted_date_to').set(
      {
        date:date.toJSON()
      }
    )
    this.hideDateTimePicker();
    Actions.Income()
  };

  DatePick = async (date) =>  {

    // alert(JSON.stringify(date));
     firebase.database().ref(`UserInfo`).child(this.state.userId).child('Budgeted_date_to').set(
       {
         date:date.toJSON()
       }
     )
   };
 
  render() {
    return (
      <>
       <Button icon="camera" mode="outlined" onPress={() => this.showDateTimePicker()} >
         Enter end date
          </Button>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
        //   onConfirm={this.DatePick}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}