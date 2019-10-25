import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, FlatList, Dimensions, BackHandler, Alert, Image } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'
import { Appbar, Card, Title, Paragraph, Avatar, Button } from 'react-native-paper';
import CardView from 'react-native-cardview'
import { Actions } from 'react-native-router-flux';

export default class All_Budget extends Component {

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
            databases: '',
            TextInputDisableStatus: true
        }
    }
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="stars" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    async componentDidMount() {
        await this.getData()
        await this.dataCatch()
        await this.readData()
        await this.readDataOther()
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

    getListViewItem = (item) => {
        Alert.alert(item.key);
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

    async dataCatch() {

        var leadsRef = await firebase.database().ref(`/UserInfo/${this.state.userId}/New Expenses`)
        await leadsRef.once('value').then(snapshot => {
            // alert(JSON.stringify( Object.values(snapshot.val())))
            this.setState({ databases: Object.values(snapshot.val()).reverse() })
            //this.state.databases(Object.values(snapshot.val()))
            //alert(JSON.stringify(this.state.databases))
        })
        if (this.state.databases.length > 0) {
            this.setState({ datapresent: true })
            // alert(this.state.databases)
            // alert(JSON.stringify( Object.values(snapshot.val())))
        }
    }







    render() {

        const width = Dimensions.get('window').width
        return (

            <SafeAreaView style={styles.safeAreaView}>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content
                        title="All Budget"
                    // subtitle="Subtitle"
                    />
                </Appbar.Header>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <Card>
                        <Card.Content>
                            <Title style={{ alignSelf: 'center' }}>EXPENSES MANAGER</Title>

                        </Card.Content>
                        <Card.Cover source={require('../../images/budgets.png')} />
                        <Card.Content>
                            {/* <Title>Card title</Title> */}
                            <Paragraph>Expenses Manager automation is the means by which an individual can significantly reduce transaction costs and improve management control when logging, calculating and processing personal expenses.</Paragraph>
                        </Card.Content>
                    </Card>
                    
                    <Text style={styles.child}>Total Spends</Text>
                    {/* <Text style={styles.child}>{this.state.date.substring(0,10)}</Text> */}
                
                    {(this.state.datapresent) ?
                        <FlatList
                            data={this.state.databases}
                            renderItem={({ item, index }) => (

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
                                

                            )}
                            
                            extraData={this.state}
                            keyExtractor={item => item.Category}

                        />
                        
                        : <View style={{ justifyContent: 'center', marginTop: '25%', alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
                            <Text style={{ fontSize: 20, color: '#e1e1e1', textAlign: 'center', fontWeight: 'bold', flexWrap: 'wrap' }}>Get started with adding your income </Text>
                            <Text style={{ fontSize: 20, color: '#e1e1e1', textAlign: 'center', fontWeight: 'bold' }}>₹</Text>

                                
                        </View>
                    
                    }
                       

                    {/* </CardView> */}


                </ScrollView>
            </SafeAreaView >
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

        fontSize: 25,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        color: '#00008B',
        alignSelf: 'center',
        marginLeft: 10
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
        backgroundColor: '#FFA611'
    },
    CardSectionStyle: {

        height: 50
    }
})