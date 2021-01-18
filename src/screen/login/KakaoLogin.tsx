import React from 'react';
import {Text, Image} from 'react-native';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {loginUser} from '../../../api';
import {useDispatch} from 'react-redux';
import {logIn} from '../../../redux/usersSlice';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const KakaoLogin = ({navigation: {goBack}, setIsLoading}) => {
  const dispatch = useDispatch();

  const kakaoLogin = async () => {
    await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then(async (result) => {
        setIsLoading(true);
        // const token = result.accessToken;
        const profileResult: any = await getProfile();
        if (profileResult !== false) {
          const result = await loginUser({
            account_id: profileResult.id,
            username: profileResult.nickname,
            login_method: 'kakao',
          });
          const access = result.status;
          if (access === 200) {
            const data = result.data;
            dispatch(
              logIn({
                token: data.token,
                user: data,
              }),
            );
            goBack();
          }
        }
      })
      .catch((err) => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          console.log(`Login Cancelled:${err.message}`);
        } else {
          console.log(`Login Failed:${err.code} ${err.message}`);
        }
      });
    setIsLoading(false);
  };

  const getProfile = async () => {
    return KakaoLogins.getProfile()
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        console.log(`Get Profile Failed:${err.code} ${err.message}`);
        return false;
      });
  };

  const kakaoLogout = () => {
    KakaoLogins.logout()
      .then((result) => {
        // setToken(TOKEN_EMPTY);
        // setProfile(PROFILE_EMPTY);
        console.log(`Logout Finished:${result}`);
      })
      .catch((err) => {
        console.log(`Logout Failed:${err.code} ${err.message}`);
      });
  };

  const unlinkKakao = () => {
    KakaoLogins.unlink()
      .then((result) => {
        // setToken(TOKEN_EMPTY);
        // setProfile(PROFILE_EMPTY);
        console.log(`Unlink Finished:${result}`);
      })
      .catch((err) => {
        console.log(`Unlink Failed:${err.code} ${err.message}`);
      });
  };

  // const {id, email, profile_image_url: photo} = profile;

  return (
    <TouchableWithoutFeedback
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => kakaoLogin()}>
      <Image
        source={require('../../../assets/images/logo/kakaoLogoTest.png')}
        style={{width: 70, height: 70}}
      />
      <Text style={{marginTop: 15, fontWeight: '700'}}>카카오 로그인</Text>
    </TouchableWithoutFeedback>
  );
};

export default KakaoLogin;
