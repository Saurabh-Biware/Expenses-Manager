import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CardSection } from './CardSection';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return(
        <CardSection>
                <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>
            {children}
            </Text>
        </TouchableOpacity>
        </CardSection>
        
    );
};
const styles = {
    textStyle:{
        alignSelf: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,

        
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundcolor: '#acacac',
        justifyContent: 'center',
        //borderRadius: 7,
        borderWidth: 1,
        borderColor: '#007aff',
        //marginLeft: 5,
        //marginRight: 5
    
    }
};

export { Button };