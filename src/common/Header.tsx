import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import constants from '../styles/constants';
import styles from '../styles/styles';

interface Props {
  text: string;
  back?: boolean;
}

const Header: FunctionComponent<Props> = ({text, back = true}) => {
  return (
    <Container>
      {!back ? <Title>{text}</Title> : <Title>{text}</Title>}
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
