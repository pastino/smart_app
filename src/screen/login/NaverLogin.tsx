import React from 'react';
import {Image, Text, View} from 'react-native';

const NaverLogin = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../../assets/images/logo/naverLogo.png')}
        style={{width: 70, height: 70}}
      />
      <Text style={{marginTop: 15, fontWeight: '700'}}>네이버 로그인</Text>
    </View>
  );
};

export default NaverLogin;
