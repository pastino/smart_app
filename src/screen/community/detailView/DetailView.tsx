import React, {useEffect, useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import constants from '../../../styles/constants';
import styles from '../../../styles/styles';
import DetailUser from './DetailUser';
import {useSelector} from 'react-redux';
import DetailText from './DetailText';
import DetailComment from './DetailComment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createComment, getComments} from '../../../../api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {delteComment} from '../../../../api';

const DetailView = ({route, navigation}) => {
  const {isLoggedIn, token, user} = useSelector((state) => state.usersReducer);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const accountId = user?.account_id;
  const data = route?.params?.data;
  const postId = data.id;
  const created = data.created;

  const onChange = (text) => {
    setValue(text);
  };

  const getCommentsHandle = async () => {
    setIsLoading(true);
    const response = await getComments(postId);
    if (response.status === 200) {
      const data = response.data;
      setComments(data);
    }
    setIsLoading(false);
  };

  const submitCommentHandle = async () => {
    if (value.length > 0) {
      const response = await createComment({text: value, post: postId}, token);
      const status = response.status;
      if (status === 201) {
        setValue('');
        setComments([response.data, ...comments]);
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        '글을 입력해주세요',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  const deleteCommentHandle = async (id) => {
    const response = await delteComment(id, token);
    if (response.status === 204) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  const editDispatchHandle = (params) => {
    const editData = params.data;
    let changedData;
    const index = comments.findIndex((item) => item.id === editData.id);
    const frontData = comments.slice(0, index);
    const endData = comments.slice(index + 1, editData.length);
    changedData = [...frontData, editData, ...endData];
    setComments(changedData);
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
          <View style={{paddingTop: 20, paddingBottom: 20}}>
            <DetailText text={data.text} />
          </View>
          {isLoading ? null : !isLoading && comments.length === 0 ? (
            <View
              style={{
                width: constants.width,
                height: 60,
                borderTopWidth: 1,
                borderTopColor: styles.RIGHT_GRAY,
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: styles.GRAY,
                  fontWeight: '700',
                }}>
                댓글이 존재하지 않습니다.
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: constants.width,
                height: 60,
                borderTopWidth: 1,
                borderTopColor: styles.RIGHT_GRAY,
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 20,
              }}>
              <MaterialCommunityIcons
                name={'comment-processing-outline'}
                size={25}
                color={styles.GRAY}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: styles.GRAY,
                  fontWeight: '700',
                }}>
                {comments.length}개
              </Text>
            </View>
          )}
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
                <DetailComment
                  navigation={navigation}
                  {...comments}
                  deleteCommentHandle={deleteCommentHandle}
                  editDispatchHandle={editDispatchHandle}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            width: constants.width,
          }}>
          <TextInput
            value={value}
            onChangeText={onChange}
            style={{
              width: constants.width * 0.8,
              height: 55,
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: styles.RIGHT_GRAY,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => submitCommentHandle()}
            style={{
              backgroundColor: value.length > 0 ? styles.GREEN : styles.GRAY,
              width: constants.width * 0.2,
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
              전송
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAwareScrollView>
      <Spinner visible={isLoading} />
    </View>
  );
};

export default DetailView;
