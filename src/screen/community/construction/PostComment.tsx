import React from 'react';
import {Text, View} from 'react-native';
import constants from '../../../styles/constants';
import styles from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const PostCommnet = ({navigation, data}) => {
  return (
    <View
      style={{
        height: 50,
        width: constants.width,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: styles.RIGHT_GRAY,
      }}>
      <View
        style={{
          width: constants.width / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <MaterialCommunityIcons
          name={'cards-heart'}
          size={25}
          color={styles.RED}
        /> */}
        <MaterialCommunityIcons
          name={'heart-outline'}
          size={25}
          color={styles.GRAY}
        />
      </View>
      <View
        style={{width: 1, backgroundColor: styles.RIGHT_GRAY, height: 50}}
      />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('DetailView', {data})}
        style={{
          flexDirection: 'row',
        }}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: constants.width / 2,
        }}>
        <MaterialCommunityIcons
          name={'comment-processing-outline'}
          size={20}
          color={styles.GRAY}
        />
        <Text style={{color: styles.GRAY, marginLeft: 10, fontWeight: '700'}}>
          댓글쓰기
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PostCommnet;
