import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,SafeAreaView,Image,TouchableOpacity, Alert } from 'react-native';
import { Icon,Header,Right,Body,Title } from 'native-base';
import CardView from 'react-native-cardview'
import { Appbar } from 'react-native-paper';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage'
import { Actions } from 'react-native-router-flux';





class Transaction extends Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="cog" style={{ fontSize: 24, color: tintColor }} />
        )
    }


    constructor(props) {
      super(props);
      this.state = {
          Home: '',
          daily: '',
          Transportation: '',
          Entertainment: '',
          Health: '',
          Subscriptions: '',
          Financial: '',
          Others: '',
          DialogueIndex: 0,
          data: []
      }
  }

  getData= async () => {
    try {
       
        const value = await AsyncStorage.getItem('userId')
    
        if(value != null){
            this.setState({userId: value });
        }
      // alert(JSON.stringify(this.state.userId))
    } catch (e) {
        //alert(e)
    }
}

 async componentWillMount(){
   await this.getData()
   // await this.handleOK()
    await this.del()
  }

  static navigationOptions = {
      drawerIcon: ({ tintColor }) => (
          <Icon name="paper-plane" style={{ fontSize: 24, color: tintColor }} />
      )
  }

  state = {
      dialogVisible: false,
      OtherDialogvisible: false
  };

  showDialog = (index) => {

      this.setState({ dialogVisible: true, DialogueIndex: index });
  };

  showOtherDialog = () => {

      this.setState({ dialogVisible: false, OtherDialogvisible: true });

  }

  handleCancel = () => {
      this.setState({ dialogVisible: false, });
  };

  handleOK = () => {
    firebase.database().ref(`Users`).child(this.state.userId).child('Budgeted_date_from').set(
      {
        date:''
      }
    );
    firebase.database().ref(`Users`).child(this.state.userId).child('Budgeted_date_to').set(
      {
        date:''
      }
    );

      firebase.database().ref(`Users`).child(this.state.userId).child('Income').set(
        {
            IncomeAmount: 0,
            OtherIncome: 0,
            Description: 0
        }
    )

    firebase.database().ref(`Users`).child(this.state.userId).child('New Expenses').remove();
      
     Actions.profile()
  }
  

  del(){
    Alert.alert(
      'Please confirm',
      'Are you sure you want to delete income and expenses?',
      [
      {text: 'YES', onPress: () => this.handleOK() },
      {
      text: 'NO',
      onPress: () => Actions.profile(),
      style: 'cancel',
      },
      ],
      {cancelable: false},
      );
  }




    render() {
        return (


            
            <SafeAreaView style={styles.safeAreaView}>
                {/* <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content
                        title="Category"
                       // subti(tle="Subtitle"
                    />
                </Appbar.Header>
                 */}
             
              
      </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor:'#fff'
      },
      container: {
        flex: 1
        // backgroundColor: '#EEEEEE',
      },
      card: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: 10,
        width: 250,
        height:125
      },
      text: {
        fontSize: 18,
        fontFamily: 'serif',
        marginLeft: 20,
        alignSelf:'center',
        paddingRight:10
    },
      imageview: {
        height: 100,
        width: 300,
        marginLeft: 10
    },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
      }
})
export default Transaction;
