import React from 'react';
import { Text, View }  from 'react-native';

//make a component
const Headerss  = (props) => {
const {textStyles,viewStyle}=styles;     

  return(
    
    <View style={viewStyle}>
      <Text style={textStyles}>{props.headerText}</Text>
     {/* <Text style={textStyle}>hello</Text>; */}
     </View>
  );
    };

const styles = {
  viewStyle: {
      backgroundColor:'#fff',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      paddingTop: 50,
      paddingBottom: 30,
      shadowColor:'#ffffff',
      shadowOffset:{width: 0 , height: 2},
      shadowOpacity: 2,
      elevation: 2,
      position:'relative'
  },
  textStyles: {
    fontSize: 30,
    color: '#FFA611',
    fontWeight: 'bold',
    fontFamily: 'serif'


  }
};

export { Headerss };