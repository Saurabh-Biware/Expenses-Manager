import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'

class Pie extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            datapresent: false,
            colorfill: 0,
            datarun: [],
            dataran: [],
            pie: [],
            data: [],
            databases: [],
            sumdata: 0,
            SumOfExpenses: 0
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userId')
            //alert(JSON.stringify(userId))
            if (value != null) {
                this.setState({ userId: value });

            }
        } catch (e) {
            alert(e)
        }
    }


    async readDataOther() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/Income`);
        recentPostsRef.once('value').then(async (snapshot) => {

            var income = await parseInt(snapshot.val().IncomeAmount) + parseInt(snapshot.val().OtherIncome)

            this.setState({ sumdata: income })

            var total = this.state.SumOfExpenses / income * 100
            this.setState({ datasum: parseFloat(total).toFixed(2) })
            //alert(this.state.datasum)
        })

    }


    async componentDidMount() {
        await this.getData()
        await this.readData()
        await this.readDataOther()


    }

    async    readData() {

        var recentPostsRef = await firebase.database().ref(`/Users/${this.state.userId}/New Expenses`);
        await recentPostsRef.once('value').then(snapshot => {
            // alert(JSON.stringify(snapshot))

            this.setState({ databases: Object.values(snapshot.val()) })

            for (let i = 0; i < this.state.databases.length; i++) {
                this.state.data.push(this.state.databases[i].Amountadded)
                var expenses = this.state.SumOfExpenses + parseInt(this.state.databases[i].Amountadded)
                this.setState({ SumOfExpenses: expenses })
            }


        })
        if (this.state.data.length > 1) {
            this.setState({ datapresent: true })
        }

       // alert(this.state.data)
    }

    

    render() {


        // alert("Data : " + JSON.stringify(this.state.data))
        // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53 ]
        // const data = this.state.data
        //const data = [1]
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        // const randomColor = ['#00008B', '#d3d3d3','red', 'green', 'yellow','black', 'blue']
        // alert(randomColor())
        const pieData = this.state.data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: '#00008B',
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        const dataPie = [50]

            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: '#d3d3d3',
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    {(this.state.datapresent) ? <PieChart
                        style={styles.pieStyle}
                        data={pieData}
                    /> : <PieChart
                            style={styles.pieStyle}
                            data={dataPie}
                        />}
                        <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold'}}>
                        Total Expenses spend: {this.state.datasum} %
                    </Text>
                </View >
                {/* <View style={{ flex: 1 }}>

                    <Text style={{ marginBottom: 5,fontSize: 12,paddingRight: 2,color:'red'}}>&#8226; Home/Rent</Text>
                    <Text style={{marginBottom: 5,fontSize: 12,paddingRight: 2,color:'maroon'}}>&#8226; Daily Needs</Text>
                    <Text style={{marginBottom: 5,fontSize: 12,paddingRight: 2,color:'green'}}>&#8226; Transportation</Text>
                    <Text style={{marginBottom: 5,fontSize: 12,paddingRight: 2,color:'blue'}}>&#8226; Entertainment</Text>
                    <Text style={{marginBottom: 5,fontSize: 12,paddingRight: 2,color:'cyan'}}>&#8226; Health Care</Text>
                    <Text style={{marginBottom: 5,fontSize: 12,paddingRight: 2,color:'dark-green'}}>&#8226; Subscriptions</Text>
                    <Text style={{marginBottom: 5,fontSize: 12,paddingRight: 2,color:'violet'}}>&#8226; Financial saving</Text>
                    <Text style={{marginBottom: 5,fontSize: 12,paddingRight: 2,color:'brown'}}>&#8226; Others</Text>
                </View> */}
                {/* <View style={{flexDirection:'column'}}>
                    
                </View> */}



            </View>

        )

    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 3,
        marginLeft: 6
    },
    TextFace: {

        marginBottom: 5,
        fontSize: 12,
        color: 'black',
        paddingRight: 2
    },
    pieStyle: {
        height: 250,
        paddingTop: 20,
        paddingBottom: 20
    }
})

export default Pie