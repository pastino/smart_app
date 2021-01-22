import React from 'react';
import {Text, View} from 'react-native';

const DetailText = ({text}) => {
  return (
    <View style={{padding: 10}}>
      <Text>{text}</Text>
    </View>
  );
};

export default DetailText;
