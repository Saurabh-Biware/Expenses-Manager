import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, Dimensions, Image, ImageBackground } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import Dashboard from '../modules/Screens/Dashboard';
import BudgetedExpenses from '../modules/Screens/BudgetedExpenses';
import Transaction from '../modules/Screens/Transaction';
import Contactus from '../../src/modules/Screens/Contactus';
import AboutUs from '../../src/modules/Screens/AboutUs'
import Logout from '../../src/modules/Screens/Logout'
import Expenses from '../modules/Screens/Expenses'
import ExpensesAnalytics from '../../src/modules/Screens/ExpensesAnalytics'
import Profile from '../modules/Screens/Profile'
import AsyncStorage from '@react-native-community/async-storage'
import { EventRegister } from 'react-native-event-listeners'
import firebase from 'firebase'
import All_Budget from '../modules/Screens/All_Budget'


const { width } = Dimensions.get('window')

class ProfileInformation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: '',
      datas: '',
      userId: ''
    }
  }

  componentDidMount() {
    //await this.getProfile()
    const { currentUser } = firebase.auth()
    try {
      AsyncStorage.setItem('userId', currentUser.uid)
  } catch (e) {
     // alert(e)
  }
    this.listener = EventRegister.addEventListener('profilepic', (event) => {
      // alert(event)
    })
    this.getData()
    this.readDataOther()
  }


  getProfile = async () => {
    try {
      const value = await AsyncStorage.getItem('ProfilePicture')
      // alert(value)
      if (value != null) {
        this.setState({ avatarSource: value });
        // alert('value: ' +this.state.userId)
        // alert(response.uri)

      }
    } catch (e) {
      alert(e)
    }
  }

  getData = async () => {
    try {

      const value = await AsyncStorage.getItem('userId')

      if (value != null) {
        this.setState({ userId: value });
      }
      //  alert(JSON.stringify(this.state.userId))
    } catch (e) {
      //alert(e)
    }
  }


  async readDataOther() {
    // alert(this.state.userId)
    const value = await AsyncStorage.getItem('userId')
    //alert(JSON.stringify(value))
    var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/profile`);
    recentPostsRef.once('value').then(snapshot => {
      //alert(JSON.stringify(snapshot))

      this.setState({ datas: (snapshot.val()) })
      // alert(JSON.stringify(this.state.datas))


    })

  }

  render() {
    return (

      <AppDrawerNavigator />

    );
  }
}




const CustomDrawerComponent = (props) => {

  return (


    <SafeAreaView style={{ flex: 5 }}>
      <View style={styles.container}>
          {/* source={this.state.avatarSource !== undefined?{uri: this.state.avatarSource}:require('../images/profile.png')} */}
          <Image source={require('../images/img2.png')} style={{width:200,height:100,alignItems:'center',marginLeft:30,marginTop:30}} />
        
        <View style={styles.overlay}>
          {/* <Image
            // source={this.state.avatarSource !== undefined?{uri: this.state.avatarSource}:require('../images/profile.png')}
            // source={require('../images/profile.png')}
            style={styles.avatarStyle} /> */}
          <Text style={styles.textStyle} >Expenses Manager</Text>
          {/* <Text style={styles.balanceContainer} > Track your financial life & plan for future! </Text> */}
        </View>
        
      </View>
      <ScrollView>
        <DrawerItems

          {...props} />
      </ScrollView>
      <View style={styles.footer}><Text>App Version: 1.0.11</Text></View>
    </SafeAreaView>
  )
}


const AppDrawerNavigator = createDrawerNavigator({

  Dashboard: Dashboard,
  //BudgetedExpenses: BudgetedExpenses,
  //Expenses: Add_Expenses,
  Profile: Profile,
  ExpensesAnalytics: ExpensesAnalytics,
  All_Budget: All_Budget,
  Contactus: Contactus,
  AboutUs: AboutUs,
  Logout: Logout
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: 'orange'
  }
}
)

const styles = StyleSheet.create({
  footer: {
    height: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginBottom:10


  },
  container: {
   flex:4
  },
  overlay: {
    //backgroundColor: 'rgba(255,255,255,0.5)',
   // flex:4,
    alignItems:'center',
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    marginTop: 10,
    marginBottom:10,
    fontSize: 18,
    color: "black",
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  balanceContainer: {
    fontSize:13,
    color:'#00008B',
    // marginTop:5,
  }
})


export default ProfileInformation;