import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ImageBackground,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Appbar, Avatar, Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-picker';
//import RNFetchBlob from 'rn-fetch-blob'
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import { EventRegister } from 'react-native-event-listeners'
import { Actions } from 'react-native-router-flux'





const options = {
  title: 'Select Image',
   customButtons: [{ name: 'Remove', title: 'Remove Profile Picture' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

setProfile = async (response) => {
  try {
    await AsyncStorage.setItem('ProfilePicture', response)
  } catch (e) {
    // alert(e)
  }
}


const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

//var RNFetchBlob = require('rn-fetch-blob').default

export default class Profile extends Component {

  getProfile = async () => {
    try {
      const value = await AsyncStorage.getItem('ProfilePicture')

      if (value != null) {
        this.setState({ avatarSource: value });
      }
    } catch (e) {
      //alert(e)
    }
  }


  componentWillMount() {

    this.getData()
    this.getProfile()
    this.readDataOther()
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

  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      avatarSource: '',
      datapresent: false,
      userId: '',
      img: null,
      datas: ''
    }
  }

  profileCatch() {

    var leadsRef = firebase.database().ref(`/Users/${this.state.userId}/ProfilePicture`)
    leadsRef.once('value').then(snapshot => {

      this.setState({ img: (snapshot.val()) })
      try {
        AsyncStorage.setItem('ProfilePicture', snapshot.val())
      } catch (e) {
        // alert(e)
      }
    })
  }

  async readDataOther() {
    // alert(this.state.userId)
    const value = await AsyncStorage.getItem('userId')
    //alert(JSON.stringify(value))
    var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/profile`);
    recentPostsRef.once('value').then(snapshot => {


      this.setState({ datas: (snapshot.val()) })


    })

  }




  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      //alert(JSON.stringify(this.state.userId))
      const imageRef = firebase.database.ref(`Users`).child(this.state.userId).child('Profile Picture')

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }



  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="profile" style={{ fontSize: 24, color: tintColor }} />
    )
  }

  camerapicker = () => {
    //alert('clicked')
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //alert(JSON.stringify(this.state.userId))
        
        firebase.database().ref(`Users`).child(this.state.userId).child('ProfilePicture').set({
          ProfilePicture: response.uri
        })
        if (response.uri !== ''){
          this.setState({ datapresent: true})
          }
      
        setProfile(response.uri)
        //alert(response.uri)
        this.setState({
          avatarSource: response.uri,

        });
        this.profileCatch()
        Actions.profile()
      }
      const event = this.state.avatarSource
      //alert(this.state.avatarSource)
      EventRegister.emit('profilepic', event)
    });
  }

  async twitter() {

    let url = 'https://www.twitter.com'
    await Linking.openURL(url);
  }

  async facebook() {

    let url = 'https://www.facebook.com'
    await Linking.openURL(url);
  }

  async instagram() {

    let url = 'https://www.instagram.com'
    await Linking.openURL(url);
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 1 ,backgroundColor:'#fff'}} >


        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
          <Appbar.Content
            title="My Profile"
          // subtitle="Subtitle"
          />
        </Appbar.Header>


        {/* <View > */}
        {/* <TouchableOpacity onPress={this.camerapicker}> */}
        {/* <Image onPress={() => this.options} style={styles.avatar} source={{ uri: this.state.avatarSource }} /> */}
        {/* <Icon style={{ alignSelf: 'center' }} name={'edit'} onPress={console.log('I was clicked')} /> */}
        {/* </TouchableOpacity> */}
        {/* </View> */}

        <View style={{ height: 238 }} >
          {(!this.state.datapresent) ? 
           <ImageBackground
           source={require('../../images/whitescreen.png')}
           style={styles.container}>
             <View style={styles.overlay}>
               
           <TouchableOpacity onPress={this.camerapicker}>
             <Image onPress={() => this.options} source={require('../../images/placehold.png')}
               style={styles.avatarStyle} />
           </TouchableOpacity>
          
           <Text style={styles.textStyle} > {this.state.datas.name}</Text>
           <Text style={styles.textStyle} > {this.state.datas.occupation}</Text>
           <Text style={styles.textStyle} > {this.state.datas.mobile}</Text>
           </View>
         </ImageBackground> :
          <ImageBackground
          source={{ uri: this.state.avatarSource }}
          style={styles.container}>
            <View style={styles.overlay}>
              
          <TouchableOpacity onPress={this.camerapicker}>
            <Image onPress={() => this.options} source={{ uri: this.state.avatarSource }}
              style={styles.avatarStyle} />
          </TouchableOpacity>
         
          <Text style={styles.textStyle} > {this.state.datas.name}</Text>
          <Text style={styles.textStyle} > {this.state.datas.occupation}</Text>
          <Text style={styles.textStyle} > {this.state.datas.mobile}</Text>
          </View>
        </ImageBackground>
        }
          
        </View>


        {/* <Text style={styles.description}>Hello,</Text>
            <Text style={styles.name}>Saurabh</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text> */}

        {this.state.datas !== null || this.state.datas !== undefined ?
          <View style={styles.bodyContent}>
            <Card.Title 
              title={this.state.datas.name}
              subtitle="Name"
              left={(props) => <Avatar.Icon {...props} icon="info" />}
              right={(props) => <IconButton {...props} onPress={() => { }} />}
            />
            <Card.Title
              title={this.state.datas.mobile}
              subtitle="Mobile"
              left={(props) => <Avatar.Icon {...props} icon="phone" />}
              right={(props) => <IconButton {...props} onPress={() => { }} />}
            />
            <Card.Title
              title={this.state.datas.email}
              subtitle="Personal"
              left={(props) => <Avatar.Icon {...props} icon="email" />}
              right={(props) => <IconButton  {...props} onPress={() => { }} />}
            /></View> : <View></View>}
        <View style={styles.signupTextCont}>
          <TouchableOpacity><Icon onPress={this.twitter} size={width = 30} name="twitter" /></TouchableOpacity>
          <Icon onPress={this.facebook} size={width = 30} name="facebook-square" />
          <Icon onPress={this.instagram} size={width = 30} name="instagram" />
        </View>


      </SafeAreaView>




    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    // height: 200,
  },
  container: {
    //  height:HEIGHT,
    //  width:WIDTH,
    flex: 1,
   


  },
  overlay: {
    backgroundColor:'rgba(255,255,255,0.5)',
},
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 50,
    borderRadius: 50,
    alignSelf: 'center',
   
  },
  signupTextCont: {
    // flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: '#00008B',
    fontSize: 16,

  },
  avatar: {

    width: 130,
    height: 130,
    backgroundColor: '#d3d3d3',
    borderRadius: 63,
    marginBottom: 10,
    alignSelf: 'center',
    // position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  textStyle: {
    marginTop: 5,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: 'bold',
    alignSelf: 'center',
},
  body: {
    marginBottom: 30,
    //backgroundColor:'red'
  },
  bodyContent: {
    flex: 1,
    // alignItems: 'baseline',
    // paddingTop: 80
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});