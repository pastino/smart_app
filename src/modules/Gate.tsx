import React from 'react';
import {Text, View} from 'react-native';

export default () => {
  const isLoggedIn = false;
  return (
    <View>{isLoggedIn ? <Text>Welcome</Text> : <Text>Login Please</Text>}</View>
  );
};
