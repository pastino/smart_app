import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';

import styled from 'styled-components/native';
import Button from '../../../common/Button';
import constants from '../../../styles/constants';
import styles from '../../../styles/styles';

interface Props {
  businessName: string;
  setBusinessName: any;
  searchName: string;
  setSearchName: any;
  clickSearchHandle: () => void;
}

const SearchView: FunctionComponent<Props> = ({
  businessName,
  setBusinessName,
  searchName,
  setSearchName,
  clickSearchHandle,
}) => {
  const businessNameOnChange = (text) => {
    setBusinessName(text);
  };

  const searchNameOnChange = (text) => {
    setSearchName(text);
  };

  return (
    <Container>
      <View style={{marginBottom: 30}}>
        <Item
          title={'상호명'}
          value={businessName}
          onChange={businessNameOnChange}
          placeholder={'상호명을 입력해주세요'}
        />
      </View>
      <Item
        title={'키워드'}
        value={searchName}
        onChange={searchNameOnChange}
        placeholder={'키워드를 입력해주세요'}
      />
      <ButtonWrapper
        style={{
          width: constants.width / 1.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          width={160}
          height={50}
          text={'검색'}
          backColor={styles.GREEN}
          color={'white'}
          onClick={clickSearchHandle}
        />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 10px;
`;

const ButtonWrapper = styled.View`
  width: ${constants.width / 1.5}px;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

interface ItemProps {
  title: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

const Item: FunctionComponent<ItemProps> = ({
  title,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <ItemWrapper>
      <ItemTitle>{title}</ItemTitle>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    </ItemWrapper>
  );
};

const ItemWrapper = styled.View``;

const ItemTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 7px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 1.5}px;
  border-width: 1px;
  border-radius: 17px;
  border-color: ${styles.GRAY};
  padding: 10px 15px 10px 15px;
`;

export default SearchView;
