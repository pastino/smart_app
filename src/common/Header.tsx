import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import constants from '../styles/constants';
import styles from '../styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../redux/usersSlice';

interface Props {
  text: string;
  back?: boolean;
  login?: boolean;
  navigation?: any;
}

const Header: FunctionComponent<Props> = ({
  text,
  back = true,
  login = false,
  navigation,
}) => {
  const {isLoggedIn} = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  return (
    <Container>
      {!back ? <Title>{text}</Title> : <Title>{text}</Title>}
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
