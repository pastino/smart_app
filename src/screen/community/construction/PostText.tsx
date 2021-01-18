import React from 'react';
import {View, Text} from 'react-native';
import constants from '../../../styles/constants';
import styles from '../../../styles/styles';

const PostText = ({text}) => {
  return (
    <View
      style={{
        width: constants.width,
      }}>
      <Text style={{marginTop: 10, padding: 10}}>{text}</Text>
    </View>
  );
};

export default PostText;
