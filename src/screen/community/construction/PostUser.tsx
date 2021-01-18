import React, {useState} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import styles from '../../../styles/styles';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ModalComponent from '../../../common/ModalComponent';

const PostUser = ({
  navigation,
  postId,
  text,
  username,
  avatar,
  created,
  accountId,
  account_id,
  deletePostHandle,
  tab,
  editDispatchHandle,
}) => {
  const {isLoggedIn, token, user} = useSelector((state) => state.usersReducer);
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {avatar ? (
          <Image
            source={{uri: avatar}}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
        ) : (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: styles.GRAY,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>{username.substr(0, 2)}</Text>
          </View>
        )}
        <View
          style={{
            marginLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '700'}}>{username}</Text>
          <Text style={{marginTop: 3, fontSize: 10}}>{dateBefore}</Text>
        </View>
        {accountId === account_id ? (
          <View style={{position: 'absolute', right: 0, top: 10}}>
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
                    navigation.navigate('EditPostView', {
                      tab,
                      text,
                      postId,
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
      <ModalComponent
        visible={deleteModal}
        setVisible={setDeleteModal}
        height={170}
        confirmHandle={() => deletePostHandle(postId)}>
        <Text style={{fontWeight: '700'}}>정말로 삭제하시겠습니까?</Text>
      </ModalComponent>
    </View>
  );
};

export default PostUser;
