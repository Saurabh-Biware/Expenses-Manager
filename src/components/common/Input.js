import React from 'react';
import { TextInput, View, Text} from 'react-native';

const Input = ({ label, value, onChangeText ,placeholder,placeholderTextColor, secureTextEntry, keyboardType, autoFocus ,returnKeyType,maxLength }) => {
    const { inputStyle, labelStyle, containerStyle } =styles;
    return(
        <View style={containerStyle}>
            <Text style ={labelStyle}>{label}</Text>
            <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoFocus={autoFocus}
            autoCorrect={false} 
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            maxLength={maxLength}
            />
            </View>
    );

};
const styles ={
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 2,
        fontSize: 18,
        lineHeight: 30,
        flex: 2
    },
    labelStyle:{
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        color:'gray'
    },
    containerStyle:{
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#cccccc',
        borderRadius: 2,
        elevation:5,

       }
};

export { Input };