import React, {useState} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import styles from '../../../styles/styles';
import constants from '../../../styles/constants';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ModalComponent from '../../../common/ModalComponent';

const DetailComment = ({
  navigation,
  created,
  id,
  post,
  text,
  user,
  deleteCommentHandle,
  editDispatchHandle,
}) => {
  const {isLoggedIn, token, user: myUser} = useSelector(
    (state) => state.usersReducer,
  );

  const [deleteModal, setDeleteModal] = useState(false);

  let dateBefore;
  const today = new Date();
  const createdDate = new Date(created);

  const day = Math.round(
    (today.getTime() - createdDate.getTime()) / 1000 / 60 / 60 / 24,
  );
  const time = Math.round(
    (today.getTime() - createdDate.getTime()) / 1000 / 60 / 60,
  );
  const minute = Math.round(
    (today.getTime() - createdDate.getTime()) / 1000 / 60,
  );

  dateBefore =
    time >= 20
      ? day === 1
        ? '하루 전'
        : `${day}일 전`
      : time === 0
      ? `${minute}분 전`
      : `${time}시간 전`;

  return (
    <View>
      <View
        style={{
          width: constants.width,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          {user.avatar ? (
            <Image source={{uri: user.avatar}} />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 25,
                backgroundColor: styles.GRAY,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>{user.username.substr(0, 2)}</Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text style={{color: 'black', fontWeight: '700'}}>
            {user.username}
          </Text>
          <Text style={{marginTop: 3, fontSize: 10, textAlign: 'center'}}>
            {dateBefore}
          </Text>
        </View>
        {myUser.account_id === user.account_id ? (
          <View style={{position: 'absolute', right: 15, top: 0}}>
            <Ionicons
              name={'ellipsis-vertical'}
              size={20}
              color={styles.GRAY}
            />
            <Menu
              style={{
                position: 'absolute',
                right: 0,
                width: 50,
                height: 50,
              }}>
              <MenuTrigger text="      " />
              <MenuOptions
                optionsContainerStyle={{
                  width: 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MenuOption
                  onSelect={() => {
                    navigation.navigate('EditComment', {
                      id,
                      text,
                      myUser,
                      post,
                      editDispatchHandle,
                    });
                  }}
                  style={{paddingTop: 15, paddingBottom: 15}}>
                  <Text style={{color: 'black', fontSize: 15}}>수정하기</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    setDeleteModal(!deleteModal);
                  }}
                  style={{paddingTop: 15, paddingBottom: 15}}>
                  <Text style={{color: 'black', fontSize: 15}}>삭제하기</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        ) : null}
      </View>
      <View style={{marginTop: 20}}>
        <Text>{text}</Text>
      </View>
      <ModalComponent
        visible={deleteModal}
        setVisible={setDeleteModal}
        height={170}
        confirmHandle={() => deleteCommentHandle(id)}>
        <Text style={{fontWeight: '700'}}>정말로 삭제하시겠습니까?</Text>
      </ModalComponent>
    </View>
  );
};

export default DetailComment;
