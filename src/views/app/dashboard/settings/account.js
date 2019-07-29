import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux'



const listitem = (props) => {

    useEffect(()=>{
        console.log('triger use effect',props.user);
        
    })

  return (
    <View>
      <Text>Account setting</Text>
      <Text>UserName : </Text>
      <Text>Email : </Text>

    </View>
  );
};

const mapStatetoProps = state => {
    return{
        user : state.user
    }
}

export default connect(mapStatetoProps, null)(listitem);
