import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class Logo extends Component {
    render() {
        return (

            <View style={styles.container}>
                <Image style={{ width: 180, height: 90 }}
                    source={require('../images/img2.png')} />
                <Text style={styles.logoText}>Track your FINANCIAL Life & PLAN for the FUTURE</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 15,
    },
    logoText: {
        marginVertical: 15,
        fontSize: 16,
        alignItems: 'center',
        color: '#00008B',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    }
});