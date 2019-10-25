import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View,FlatList ,ScrollView} from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts'
import { PieChart } from 'react-native-svg-charts'
import { ProgressCircle } from 'react-native-svg-charts'
import { LineChart } from 'react-native-svg-charts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Pie from '../Pie'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import CardView from 'react-native-cardview'
import SwiperFlatList from 'react-native-swiper-flatlist';


export default class ExpensesAnalytics extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            datapresent: false,
            colorfill:0,
            datarun:[],
            dataran:[],
            pie:[],
            data: [],
            databases: [],
            sumdata : 0
        }
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

    async dataCatch() {

        var leadsRef = await firebase.database().ref(`/Users/${this.state.userId}/New Expenses`)
        await leadsRef.once('value').then(snapshot => {
            //alert(JSON.stringify( Object.values(snapshot.val())))
           this.setState({ databases: Object.values(snapshot.val()).reverse()})
          
           
        //    for(let i=0; i<this.state.databases.length;i++)
        //    {
        //        this.state.data.push(this.state.databases[i].Category)
        //    }
        //    alert(this.state.data)
        })
    }


 async   componentDidMount(){
     await this.getData()
    await this.dataCatch()
    }


    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="insert-chart" style={{ fontSize: 24, color: tintColor }}  />
        )
    }

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
        const fill = 'rgb(134, 65, 244)'
        const data = [50, 10, 40, 95,  85, 91, 35, 53]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))
        return (

           
            <View style={styles.container}>
                 <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content
                        title="Expenses Analytics"
                       // subtitle="Subtitle"
                    />
                </Appbar.Header>
                
                
                    <View style={[styles.child, { backgroundColor: '#fff' }]}>
                       <Pie />
                    </View>
                   
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={this.state.databases}
                            renderItem={({ item, index }) => (
                                
                                <Card style={{backgroundColor:'#fff',margin:10}} onPress={() => this.getListViewItem.bind(this, item)}>
                                <Card.Content style={{backgroundColor:'#FFA611'}}>
                                    {/* <View style={{flexDirection:'row'}}>
                                    <Text style={{fontWeight:'bold'}} >Expenses Title: </Text>
                                    <Text style={{flex:0.5}}  >{item.ExpensesTitle}</Text>
                                    </View> */}
                                    <View style={{width : width,flexDirection:'row'}}>
                                    <Icon name="gamepad" style={{fontSize:18}} />    
                                    <Text style={{fontWeight:'bold',marginLeft:6}} >Category: </Text>
                                    <Text  >{item.Category}</Text>
                                    </View>
                                    <View style={{width : width,flexDirection:'row'}}>
                                    <Icon name="attach-money" style={{fontSize:18}} />
                                    <Text style={{fontWeight:'bold',marginLeft:6}} >Amount: </Text>
                                    <Text  >{item.Amountadded}</Text>
                                    </View>
                                    {/* <View style={{width : width,flexDirection:'row',flexWrap:'wrap'}}>
                                    <Text style={{fontWeight:'bold'}} >Description: </Text>
                                    <Text style={{flexWrap:'wrap',marginRight:5}}  >{item.Description}</Text>
                                    </View> */}
                                </Card.Content>

                            </Card>

                            )}
                            extraData={this.state}
                            keyExtractor={item => item.Category}
                            
                        />
                        </ScrollView>
                        
                          
                          
                    </View>
            
           
            
        );
    }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    child: {
        height: height * 0.5,
        width,
        justifyContent: 'center'
    },
    text: {
        fontSize: width * 0.5,
        textAlign: 'center'
    }
});