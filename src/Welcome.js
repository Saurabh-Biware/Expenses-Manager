import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from '../src/components/common/Button';
import { Actions } from 'react-native-router-flux'
import Onboarding from 'react-native-onboarding-swiper';


const { width, height } = Dimensions.get("window")

const Simple = (props) => (
    <Onboarding
        onDone={() => props.Wellcome()  }
        skipLabel
        pages={[
            {
                image: <Image source={require('../src/images/holdingmoney.png')} />,
                backgroundColor: '#fff',
                title: 'TRACK YOUR MONEY',
                subtitle: 'It helps you to track your expenses quickly and easily',
            },
            {
                image: <Image style={{height:180,width:180}} source={require('../src/images/graph.png')} />,
                backgroundColor: '#fff',
                title: 'UNDERSTAND YOUR FINANCES',
                subtitle: 'Overview your spending progress by category',
            },
            {
                image: <Image style={{height:180, width:180}} source={require('../src/images/fund.png')} />,
                backgroundColor: '#fff',
                title: 'ORGANIZE YOUR FINANCES',
                subtitle: "Easy and user friendly Personal Finance App to take control of your money so you can spend smarter ",
            },
        ]}
    />
);

class Welcome extends Component {

    onWelcome() {
        Actions.profile()
    }

    render() {
        return (
            <View style={styles.container}>
                <Simple Wellcome={this.onWelcome} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ButtonStyle: {
        justifyContent: 'flex-start',

    }
})

export default Welcome;