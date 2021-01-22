import prettyFormat from 'pretty-format';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import constants from '../../../styles/constants';
import styles from '../../../styles/styles';
import DetailUser from './DetailUser';
import {useSelector} from 'react-redux';
import DetailText from './DetailText';
import DetailComment from './DetailComment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getComments} from '../../../../api';

const DetailView = ({route}) => {
  const {isLoggedIn, token, user} = useSelector((state) => state.usersReducer);
  const [comments, setComments] = useState([]);
  const accountId = user?.account_id;
  const data = route?.params?.data;

  const postId = data.id;
  const created = data.created;

  const getCommentsHandle = async () => {
    const response = await getComments(postId);
    if (response.status === 200) {
      const data = response.data;
      setComments(data);
    }
  };

  useEffect(() => {
    getCommentsHandle();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: constants.width,
          height: 50,
          backgroundColor: styles.GREEN,
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', paddingLeft: 20}}>디테일..</Text>
      </View>
      <KeyboardAwareScrollView style={{height: constants.height}}>
        <ScrollView style={{height: constants.height - 50}}>
          <DetailUser created={created} accountId={accountId} {...data.user} />
          <DetailText text={data.text} />
          <View style={{marginBottom: 65}}>
            {comments.map((comments: any) => (
              <View
                key={comments.id}
                style={{
                  borderTopWidth: 1,
                  borderTopColor: styles.RIGHT_GRAY,
                  padding: 10,
                  paddingBottom: 20,
                }}>
                <DetailComment {...comments} />
              </View>
            ))}
          </View>
        </ScrollView>
        <TextInput
          style={{
            position: 'absolute',
            bottom: 0,
            width: constants.width,
            height: 60,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: styles.RIGHT_GRAY,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DetailView;
