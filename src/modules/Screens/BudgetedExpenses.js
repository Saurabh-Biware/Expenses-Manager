import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header, Left, Right } from 'native-base';
import Pie from '../Pie';
import { CardSection } from '../../components/common';
import Dialog from "react-native-dialog";
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Feather'
import { Appbar } from 'react-native-paper';


class BudgetedExpenses extends Component {
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
            userId:'',
            DialogueIndex: 0,
            datas: 0,
            data: []
        }
    }

    componentWillMount(){
        this.getData()
        //this.readData()
    }

    getData= async () => {
        try {
           // alert(JSON.stringify(this.state.userId))
            const value = await AsyncStorage.getItem('userId')
        
            if(value != null){
                this.setState({userId: value });
            }
        } catch (e) {
            alert(e)
        }
    }

    async readData() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Expenses`);
        recentPostsRef.once('value').then(snapshot => {

             alert(JSON.stringify(snapshot))
            // alert(JSON.stringify(this.state.userId))
            this.setState({ datas: parseInt(snapshot.val().Home) })
            //this.setState({data: parseInt(snapshot.val().OtherIncome)})



        })
        // alert(this.state.data)
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="dollar-sign" style={{ fontSize: 24, color: tintColor }}  />
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
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        //alert(JSON.stringify(this.state.userId))
        firebase.database().ref(`Users`).child(this.state.userId).child('Expenses').set(
            {
                Home: this.state.Home,
                daily: this.state.daily,
                Transportation: this.state.Transportation,
                Entertainment: this.state.Entertainment,
                Health: this.state.Health,
                Subscriptions: this.state.Subscriptions,
                Financial: this.state.Financial,
                Others: this.state.Others
            }
        )
        this.setState({ dialogVisible: false });
    };





    render() {
        
        return (

            <SafeAreaView style={styles.safeAreaView}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.container}>


                        <Pie />
                    </View>
                    <Text style={styles.child}>SPENDS</Text>
                    <TouchableOpacity onPress={() => this.showDialog(1)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/homes.png')} />
                                
                                <Text style={styles.text}>Home/Rent</Text>
                                
                            </View>

                        </CardSection>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.showDialog(2)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/daily.png')} />
                                <Text style={styles.text}>Daily Needs</Text>
                            </View>

                            <View >

                            </View>
                        </CardSection>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => this.showDialog(3)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/transport.png')} />
                                <Text style={styles.text}>Transportation</Text>
                            </View>

                        </CardSection>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => this.showDialog(4)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/entertain.png')} />
                                <Text style={styles.text}>Entertainment</Text>
                            </View>

                        </CardSection>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => this.showDialog(5)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/medical.png')} />
                                <Text style={styles.text}>Health Care</Text>
                            </View>

                        </CardSection>
                    </TouchableOpacity>





                    <TouchableOpacity onPress={() => this.showDialog(6)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/dues.png')} />
                                <Text style={styles.text}>Dues/Subscriptions</Text>
                            </View>

                        </CardSection>
                    </TouchableOpacity>





                    <TouchableOpacity onPress={() => this.showDialog(7)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/saves.png')} />
                                <Text style={styles.text}>Financial Saving</Text>
                            </View>

                        </CardSection>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.showDialog(8)}>
                        <CardSection style={styles.CardSectionstyle}>
                            <View style={{ width: width * 0.80, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageview} source={require('../../images/other.png')} />
                                <Text style={styles.text}>Others</Text>
                            </View>
                            <View >

                            </View>
                        </CardSection>
                    </TouchableOpacity>
                    <View >
                        <View>
                            {this.state.DialogueIndex === 1 ?
                                <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add expenses for Home/Rent"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ Home: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container> : this.state.DialogueIndex === 2? <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add expenses for Daily Needs"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ daily: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container>:this.state.DialogueIndex === 3? <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add expenses for Transportation"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ Transportation: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container>:this.state.DialogueIndex === 4? <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add expenses for Entertainment"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ Entertainment: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container>:this.state.DialogueIndex === 5? <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add expenses for Health Care"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ Health: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container>:this.state.DialogueIndex === 6? <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add expenses for Subscription/Dues"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ Subscriptions: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container>:this.state.DialogueIndex === 7? <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add expenses for Financial Saving"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ Financial: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container>:this.state.DialogueIndex === 8? <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Add Budgeted Expenses</Dialog.Title>
                                    <Dialog.Input label="Please add Other expenses "
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ Others: text })}
                                        keyboardType='numeric'
                                    >
                                    </Dialog.Input>

                                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                                    <Dialog.Button label="OK" onPress={this.handleOK} />
                                </Dialog.Container>:<View></View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    inputBox: {
        width: 80,
        height: 50,
        backgroundColor: 'rgba(255, 255,255,0.8)',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingRight: 15,
        fontSize: 16,
        color: 'black',
        marginVertical: 10,
        borderColor: '#F6820D'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    child: {

        fontSize: 40,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        fontWeight: '100',
        color: 'gray',
        alignSelf: 'center'
    },
    text: {
        fontSize: 18,
        fontFamily: 'serif',
        marginLeft: 20,
    },
    CardSectionstyle: {
        flex: 1,
        flexDirection: 'row',
        height: height * 0.1,
        borderRadius: 0,
    },
    imageview: {
        height: 40,
        width: 40,
        marginLeft: 10
    }
})
export default BudgetedExpenses;
