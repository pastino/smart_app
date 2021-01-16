import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import constants from '../../styles/constants';
import KakaoLogin from './KakaoLogin';
import NaverLogin from './NaverLogin';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginView = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../assets/images/ads/LoginAds.jpg')}
        style={{
          width: constants.width / 1.5,
          height: constants.width / 1,
        }}
        resizeMode={'contain'}
      />
      <View style={{marginTop: 70, flexDirection: 'row'}}>
        <KakaoLogin navigation={navigation} setIsLoading={setIsLoading} />
        <View style={{marginLeft: 50}}>
          <NaverLogin />
        </View>
      </View>
      <Spinner visible={isLoading} />
    </View>
  );
};

export default LoginView;
