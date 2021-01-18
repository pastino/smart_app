import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import constants from '../styles/constants';
import styles from '../styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../redux/usersSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  text: string;
  back?: boolean;
  login?: boolean;
  navigation?: any;
  goback?: any;
}

const Header: FunctionComponent<Props> = ({
  text,
  back = false,
  login = false,
  navigation,
  goback,
}) => {
  const {isLoggedIn, token} = useSelector((state) => state.usersReducer);

  const dispatch = useDispatch();

  return (
    <Container>
      {!back ? (
        <Title>{text}</Title>
      ) : (
        <>
          <TouchableWithoutFeedback
            onPress={() => goback()}
            containerStyle={{position: 'absolute', left: 15}}>
            <MaterialIcons
              name={'keyboard-arrow-left'}
              size={40}
              color={'black'}
            />
          </TouchableWithoutFeedback>
          <Title>{text}</Title>
        </>
      )}
      {login ? (
        <View style={{position: 'absolute', right: 20, top: 15}}>
          {isLoggedIn ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(logOut({}));
              }}>
              <Text style={{fontWeight: '700', color: styles.GRAY}}>
                로그아웃
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('LoginView')}>
              <Text style={{fontWeight: '700', color: styles.GRAY}}>
                로그인
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  width: ${constants.width}px;
  height: 60px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.LIGHT_GRAY};
  box-shadow: 0px 0px 4px rgba(142, 142, 142, 0.16);
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

export default Header;
