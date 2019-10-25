import React, { Component } from 'react';
import {
    Text, View, ScrollView, StyleSheet, SafeAreaView, FlatList,
    Dimensions, BackHandler, Alert, Image, TouchableOpacity, ToastAndroid, TouchableHighlight
} from 'react-native';
import Pie from '../Pie';
import { FloatingAction } from "react-native-floating-action";
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'
import { Appbar, Card, Title, Paragraph, Dialog, Button, TextInput } from 'react-native-paper';
import CardView from 'react-native-cardview'
import { Actions } from 'react-native-router-flux';
//import Spinner from 'react-native-loading-spinner-overlay'
import { Spinner } from '../../components/common/Spinner'
import { EventRegister } from 'react-native-event-listeners'
import Swipeable from 'react-native-swipeable-row';



const actions = [

    {
        text: "Add Income",
        icon: require('../../images/icon5.png'),
        name: 'bt_Add Income',
        position: 1,
        color: '#FFA611'
    },
    {
        text: "Add Expenses",
        icon: require('../../images/img6.png'),
        name: 'bt_Expenses',
        position: 2,
        color: '#FFA611'
    },
    {
        text: "Refresh Income & Expenses",
        icon: require('../../images/delete.png'),
        name: 'bt_Delete',
        position: 3,
        color: '#FFA611'
    },
];


const leftContent = <Text>Pull to activate</Text>;



class Dashboard extends Component {



    constructor(props) {
        super(props);

        this.state = {
            IncomeText: 0,
            OtherIncome: 0,
            userId: '',
            visible: false,
            datapresent: false,
            DialogueIndex: 0,
            data: 0,
            databases: [],
            spinnervisible: '',
            loading: '',
            dates: '',
            //databasess:'',
            datas: 0,
            spend: 0,
            date: '',
            swipe:[]

        }
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this.setState({ backClickCount: +1 });
        return true;
    };

    async dateRead() {
        // alert('value: ' +this.state.userId)
        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Budgeted_date_from`);
        recentPostsRef.once('value').then(snapshot => {


            this.setState({ date: (snapshot.val().date) })

            // alert(JSON.stringify(this.state.date))

        })
        //  alert(JSON.stringify(this.state.userId))


    }



    async dateData() {
        //  alert('value: ' +this.state.userId)
        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Budgeted_date_to`);
        recentPostsRef.once('value').then(snapshot => {


            this.setState({ dates: (snapshot.val().date) })

            //  alert(JSON.stringify(this.state.dates))

        })
        //  alert(JSON.stringify(this.state.userId))


    }

    async componentDidMount() {
        await this.getData()
        await this.dateRead()
        await this.dateData()
        await this.readData()
        await this.readDataOther()
        await this.dataCatch()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.listener = EventRegister.addEventListener('myCustom', (event) => {
            this.setState({ spend: event })
        })

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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


    async readData() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Income`);
        recentPostsRef.once('value').then(snapshot => {

            // alert(JSON.stringify(snapshot))
            // alert(JSON.stringify(this.state.userId))
            this.setState({ data: parseInt(snapshot.val().IncomeAmount) })
            //this.setState({data: parseInt(snapshot.val().OtherIncome)})



        })
        this.setState({ TextInputDisableStatus: false })
    }



    async readDataOther() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Income`);
        recentPostsRef.once('value').then(snapshot => {

            //alert(JSON.stringify(snapshot))
            this.setState({ datas: parseInt(snapshot.val().OtherIncome) })



        })
        //alert(this.state.datas)
    }



    async dataCatch() {

        var leadsRef = await firebase.database().ref(`/Users/${this.state.userId}/New Expenses`).orderByKey();
        await leadsRef.once('value').then(snapshot => {
            // alert(JSON.stringify( Object.values(snapshot.val())))
            this.setState({ databases: Object.values(snapshot.val()).reverse(),swipe:( snapshot.val())})
            //this.state.databases(Object.values(snapshot.val()))
            //alert(JSON.stringify(this.state.databases))
            ToastAndroid.showWithGravity ('Swipe left for more options', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        })
        if (this.state.databases.length > 0) {
            this.setState({ datapresent: true })
            // alert(this.state.databases)
            // alert(JSON.stringify( Object.values(snapshot.val())))
        }
    }

    


    deleteNote(index) {
        Alert.alert(
            '',
            'Are you sure you want to delete spend?',
            [

                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => this.DeleteFlatlist(index) },
            ],
            { cancelable: false },
        );
        // alert('length is: ' + Object.keys(this.state.snapData).length)


        // alert('actual length is: ' + actualIndex)
        //alert('length: ' + JSON.stringify(this.state.snapData).length + "\n actualIndex: " + this.state.snapData.length - (index + 1))
        // alert(actualIndex + "\n delete data" + JSON.stringify(Object.keys(this.state.snapData)[actualIndex]) + "\n all data" + JSON.stringify(this.state.snapData))
        // alert(JSON.stringify(Object.keys(this.state.snapData)[index]));


    }

    async   DeleteFlatlist(index) {
        let actualIndex = Object.keys(this.state.swipe).length - (index + 1);
      // alert(actualIndex)
         //alert(actualIndex)
       let arr =this.state.databases
        arr.splice(index, 1)
        //alert(JSON.stringify(this.state.databases))
        const userId = this.state.userId
        //  this.setState({databases: arr})
        await firebase.database().ref(`/Users/${userId}/New Expenses/${Object.keys(this.state.swipe)[actualIndex]}`).remove();
        
        //alert(JSON.stringify (Object.keys(this.state.databases)[actualIndex]))
        //this.dataCatch()
        this.setState({ databases: arr})
        ToastAndroid.show('Spending has been deleted', ToastAndroid.LONG)
    }



    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="dashboard" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    state = {
        dialogVisible: false,
        OtherDialogvisible: false
    };

    _hideDialog = () => this.setState({ dialogVisible: false });


    showDialog = (index) => {

        this.setState({ dialogVisible: true, DialogueIndex: index });
    };

    showOtherDialog = () => {

        this.setState({ dialogVisible: false, OtherDialogvisible: true });

    };

    handleCancel = () => {
        this.setState({ dialogVisible: false, });
    };

    onIncomeTextChange(text) {
        if (text.length == 8) {
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else {
            this.setState({ IncomeText: text })
        }



    }
    onOtherIncomeChange(text) {
        if (text.length == 8) {
            Alert.alert("Sorry, You have reached the maximum input limit.")
        } else {
            this.setState({ OtherIncome: text })
        }

    }

    IncomeDialog() {
        firebase.database().ref(`Users`).child(this.state.userId).child('Income').update(
            {
                IncomeAmount: this.state.IncomeText
            }
        )
        this.setState({ dialogVisible: false });
        Actions.profile()
        ToastAndroid.show('Your income is added successfully', ToastAndroid.LONG);
    }

    OtherIncomeDialog() {
        firebase.database().ref(`Users`).child(this.state.userId).child('Income').update(
            {
                OtherIncome: this.state.OtherIncome,
            }
        )
        this.setState({ dialogVisible: false });
        Actions.profile()
        ToastAndroid.show('Your income is added successfully', ToastAndroid.LONG);
    }



    handleOK = () => {

    };

    getListViewItem = (item) => {
        Alert.alert(item.key);
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#CED0CE',
                }}
            />
        );
    };



    render() {

        const { visible } = this.state;
        const width = Dimensions.get('window').width
        const screenHeight = (Dimensions.get('window').height);
        return (

            <SafeAreaView style={styles.safeAreaView}>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content
                        title="Dashboard"
                    // subtitle="Subtitle"
                    />
                </Appbar.Header>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        {/* <Spinner visible={this.state.spinnervisible} color='#0BC43B' /> */}


                        <View flexDirection="row">
                            <CardView
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={5}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    flex: 1,
                                    margin: 10,
                                    width: 250,
                                    height: 220
                                }}
                            >


                                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'left', color: '#00008B', flexDirection: 'row' }}>Total Income  </Text>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'left', color: '#00008B', flexDirection: 'row' }}> ₹ {this.state.data + this.state.datas}</Text>
                                <TouchableOpacity onPress={() => this.showDialog(1)}>
                                    <CardView style={{ height: 40, width: 300, alignSelf: 'flex-start', marginTop: 15, marginLeft: 20 }}
                                        cardElevation={3}
                                        cardMaxElevation={3}
                                        cornerRadius={5}
                                    >
                                        <Text style={{ fontSize: 20, fontWeight: '100', textAlign: 'left', color: '#00008B', marginLeft: 10, marginTop: 8 }}>Salary:  ₹ {this.state.data}  </Text>

                                    </CardView>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.showDialog(2)}>
                                    <CardView style={{ height: 40, width: 300, alignSelf: 'flex-start', marginTop: 15, marginLeft: 20 }}
                                        cardElevation={3}
                                        cardMaxElevation={3}
                                        cornerRadius={5}

                                    >
                                        <Text style={{ fontSize: 20, fontWeight: '100', textAlign: 'left', color: '#00008B', marginLeft: 10, marginTop: 8 }}>
                                            Other Income: ₹ {this.state.datas} </Text>
                                    </CardView>
                                </TouchableOpacity>
                            </CardView>

                        </View>
                    </View>

                    <View style={{ marginTop: 160 }}>

                        {/* <CardView style={{margin:10,aspectRatio:1,width:width-22,borderRadius:5}}> */}
                        <Text style={styles.child}>Track your expenses monthly</Text>
                        <Text style={styles.subchild}>Start date: {this.state.date.substring(0, 10)}</Text>
                        <Text style={styles.subchild}>End date: {this.state.dates.substring(0, 10)}</Text>
                        <Text style={styles.design}>---------------------------</Text>
                        <Text style={styles.headerstyle}>Recent Spendings</Text>
                        {(this.state.datapresent) ?

                            <FlatList
                                data={this.state.databases}
                                renderItem={({ item, index }) => (
                                    <Swipeable rightButtons={[

                                        <TouchableOpacity onPress={() => this.deleteNote(index)} >
                                            <Icon name="delete-forever" color={'#FFA611'} style={{ fontSize: 50, alignContent: 'center', justifyContent: 'center' }} />
                                        </TouchableOpacity>,
                                        // <TouchableOpacity>
                                        //     <Icon name="share" color={'#FFA611'} style={{ fontSize: 50, alignContent: 'center', justifyContent: 'center' }} />
                                        // </TouchableOpacity>


                                    ]} >
                                        <Card style={{ backgroundColor: '#fff', margin: 10 }} onPress={() => this.getListViewItem.bind(this, item)}>

                                            <Card.Content>

                                                <View style={{ flexDirection: 'row' }}>
                                                    <Icon name="assistant" style={{ fontSize: 14 }} />
                                                    <Text style={{ fontWeight: 'bold', marginLeft: 6 }} >Expenses Title: </Text>
                                                    <Text style={{ flex: 0.5 }}  >{item.ExpensesTitle}</Text>
                                                </View>

                                                <View style={{ width: width, flexDirection: 'row' }}>
                                                    <Icon name="attach-money" style={{ fontSize: 14 }} />
                                                    <Text style={{ fontWeight: 'bold', marginLeft: 6 }} >Amount: </Text>
                                                    <Text  >{item.Amountadded}</Text>
                                                </View>
                                                <View style={{ width: width, flexDirection: 'row' }}>
                                                    <Icon name="gamepad" style={{ fontSize: 14 }} />
                                                    <Text style={{ fontWeight: 'bold', marginLeft: 6 }} >Category: </Text>
                                                    <Text  >{item.Category}</Text>
                                                </View>
                                                <View style={{ width: width, flexDirection: 'row' }}>
                                                    <Icon name="description" style={{ fontSize: 14 }} />
                                                    <Text style={{ fontWeight: 'bold', marginLeft: 6 }} >Description: </Text>
                                                    <Text style={{ flexWrap: 'wrap', marginRight: 5 }}  >{item.Description}</Text>
                                                </View>
                                            </Card.Content>

                                        </Card>
                                    </Swipeable>
                                )}
                                extraData={this.state}
                                keyExtractor={item => item.Category}

                            />

                            : <View style={{ justifyContent: 'center', marginTop: '25%', alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
                                <Text style={{ fontSize: 20, color: '#e1e1e1', textAlign: 'center', fontWeight: 'bold', flexWrap: 'wrap' }}>Get started with adding your income </Text>
                                <Text style={{ fontSize: 20, color: '#e1e1e1', textAlign: 'center', fontWeight: 'bold' }}>₹</Text>


                            </View>}

                        {/* </CardView> */}


                    </View>

                </ScrollView>

                {this.state.DialogueIndex === 1 ?
                    <Dialog
                        visible={this.state.dialogVisible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>INCOME</Dialog.Title>
                        <TextInput style={{ backgroundColor: '#fff' }}
                            label='Add your Income here'
                            value={this.state.IncomeText}
                            maxLength={8}
                            keyboardType='numeric'
                            onChangeText={this.onIncomeTextChange.bind(this)}
                        />
                        <Dialog.Actions>
                            <Button onPress={() => this.handleCancel()}>Cancel</Button>
                            <Button onPress={() => this.IncomeDialog()}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog> :
                    this.state.DialogueIndex === 2 ?
                        <Dialog
                            visible={this.state.dialogVisible}
                            onDismiss={this._hideDialog}>
                            <Dialog.Title>OTHER INCOME</Dialog.Title>
                            <TextInput style={{ backgroundColor: '#fff' }}
                                label='Add Other Income'
                                value={this.state.OtherIncome}
                                maxLength={8}
                                keyboardType='numeric'
                                onChangeText={this.onOtherIncomeChange.bind(this)}
                            />
                            <Dialog.Actions>
                                <Button onPress={() => this.handleCancel()}>Cancel</Button>
                                <Button onPress={() => this.OtherIncomeDialog()}>Ok</Button>
                            </Dialog.Actions>
                        </Dialog> : <View></View>

                }





                <FloatingAction
                    actions={actions}
                    color='#FFA611'
                    //overlayColor='#D4D4D4'
                    dismissKeyboardOnPress='true'
                    actionsPaddingTopBottom={0}
                    position='right'


                    onPressItem={name => {
                        if (name === "bt_Add Income") {

                            if (this.state.data === 0) {
                                Actions.Income()
                            }
                            else {
                                Alert.alert('Income already added',
                                    'Please delete the previous expenses to add new income')
                            }
                        }
                        else if (name === "bt_Expenses") {

                            if (this.state.data === 0 && this.state.datas === 0) {
                                Alert.alert('No Income added',
                                    'Please add your income to continue')
                            }
                            else {
                                Actions.Expenses()
                            }

                        }
                        else if (name === "bt_Delete") {
                            Actions.Transaction()
                        }
                    }}
                />

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        height: 80,
        //top: 400,
        //marginBottom: 10
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

    child: {

        fontSize: 22,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        fontWeight: '300',
        color: '#00008B',
        alignSelf: 'center',
        // marginLeft: 10
    },
    subchild: {

        fontSize: 18,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        fontWeight: "100",
        color: '#00008B',
        alignSelf: 'center',
        // marginLeft: 10
    },
    design: {

        fontSize: 18,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        color: '#FFA611',
        alignSelf: 'center',
        // marginLeft: 10
    },
    card: {
        alignItems: 'center',
        // backgroundColor:'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: 10,
        width: 250,
        height: 150,
        flexDirection: 'row'
    },
    subCard: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        flex: 1,
        flexDirection: 'row-reverse',
        margin: 10,
        width: 150,
        // height: 10
    },
    headerstyle: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#00008B',
        alignSelf: 'center',
    },
    CardSectionStyle: {

        height: 50
    }
})
export default Dashboard;

// 