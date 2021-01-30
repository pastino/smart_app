import React, {useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../../../common/Header';
import constants from '../../../../styles/constants';
import styles from '../../../../styles/styles';
import Button from '../../../../common/Button';
import {editComment} from '../../../../../api';

const EditComment = ({route, navigation: {goBack}}) => {
  const {isLoggedIn, token, user} = useSelector((state) => state.usersReducer);
  const id = route?.params.id;
  const text = route?.params.text;
  const myUser = route?.params.myUser;
  const post = route?.params.post;

  const [value, setValue] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (text) => {
    setValue(text);
  };

  const editCommentHandle = async () => {
    if (text === value) {
      ToastAndroid.showWithGravity(
        '변동사항이 없습니다.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      setIsLoading(true);
      const response = await editComment(id, {text: value, post}, token);
      const status = response.status;
      setIsLoading(false);
      if (status === 200) {
        route.params.editDispatchHandle({data: response.data});
        goBack();
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header text={'수정하기'} back={true} goback={goBack} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              width: constants.width,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 30,
            }}>
            <Text style={{marginBottom: 20}}>Comment 수정</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              style={{
                width: constants.width / 1.3,
                height: constants.height / 1.5,
                borderWidth: 1,
                borderColor: styles.GRAY,
                borderRadius: 10,
                textAlignVertical: 'top',
                padding: 20,
              }}
              multiline={true}
              numberOfLines={200}
            />
            <View style={{marginTop: 30}}>
              <Button
                text={'완료'}
                backColor={styles.GREEN}
                color={'white'}
                onClick={() => editCommentHandle()}
                width={constants.width / 2}
                height={50}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Spinner visible={isLoading} />
    </View>
  );
};

export default EditComment;
