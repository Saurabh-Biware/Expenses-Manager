import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Icon, Header, Right, Title, Body } from 'native-base';
import { Paragraph } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Subheading } from 'react-native-paper';



class AboutUs extends Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="cog" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content
                        title="About us"
                    // subtitle="Subtitle"
                    />
                </Appbar.Header>
                <View style={{ flex: 2 ,padding:5 }} >
                    
                <Subheading>About Expenses Manager,</Subheading>
                <Paragraph>
                        If you mostly have your money situation under control but want better charts and graphs for your finances,
                        Expenses Manager is the best option. Expenses Manager is actually a full-featured investment manager for hire,
                        but its free Expenses Manager dashboard is available for anyone and is packed with features.
                        </Paragraph>
                        <Paragraph>
                        Specific to expenses, Expenses Manager automatically tracks and categorizes every expense you make.
                         From there, the app creates charts showing your monthly cash flow with an ability to break down expenses by category and dig in deeper where you see concerning spending habits.
                        It isn’t great for budgeting, but is powerful for tracking your finances overall, particularly your expenses.
                        </Paragraph>
                </View>
                <View style={{ flex: 1 }}  >
                    <TouchableOpacity onPress={() => Linking.openURL('https://inceptivetechnologies.com/')}>
                        <Image style={{ justifyContent: 'center', alignSelf: 'center' }} source={require('../../images/logosmall.png')} />
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textstyle: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 5,
        marginRight: 5,
        //fontFamily: 'sans-serif-condensed',
        fontSize: 15,
        paddingTop: 5

    }
})
export default AboutUs;
