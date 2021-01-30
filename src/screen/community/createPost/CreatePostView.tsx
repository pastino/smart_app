import React, {useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Header from '../../../common/Header';
import ImagePicker from 'react-native-image-picker';
import constants from '../../../styles/constants';
import styles from '../../../styles/styles';
import Button from '../../../common/Button';
import {createPost} from '../../../../api';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const CreatePostView = ({navigation, navigation: {goBack}, route}) => {
  const tab = route?.params?.tab;
  const type =
    tab === '블로그'
      ? 'blog'
      : tab === '스마트 스토어'
      ? 'smart_store'
      : tab === '스마트 플레이스'
      ? 'smart_place'
      : null;
  const [value, setValue] = useState('');
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useSelector((state) => state.usersReducer);

  const onChangeValue = (text) => {
    setValue(text);
  };

  const imagePickerHandle = () => {
    ImagePicker.launchImageLibrary(
      {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      },
      (response) => {
        if (response.path === undefined) {
          null;
        } else {
          console.log(response.path);
          setImage('file://' + response.path);
        }
      },
    );
  };

  const createPostHandle = async () => {
    if (value === '') {
      ToastAndroid.showWithGravityAndOffset(
        '글을 입력해주세요',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      try {
        setIsLoading(true);
        console.log(value, type, token);
        const result = await createPost({text: value, type}, token);
        setIsLoading(false);
        route.params.createDispatchHandle({tab, data: result.data});
        goBack();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header text={`${tab}`} back={true} goback={goBack} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              width: constants.width,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 30,
            }}>
            <Text style={{marginBottom: 20}}>
              품앗이, 이웃추가를 위한 글 허용
            </Text>
            <TextInput
              value={value}
              onChangeText={onChangeValue}
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
                onClick={() => createPostHandle()}
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

export default CreatePostView;
