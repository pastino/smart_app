import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PostUser from './construction/PostUser';
import PostText from './construction/PostText';
import styles from '../../styles/styles';
import {deletePost} from '../../../api';
import prettyFormat from 'pretty-format';

const CommunityTabView = ({
  navigation,
  data,
  tab,
  setData,
  moreDataHandle,
  next,
  accountId,
  token,
}) => {
  const deletePostHandle = async (postId) => {
    let deletedData;
    deletedData = data.filter((item) => item.id !== postId);
    setData(deletedData);
    const result = await deletePost(postId, token);
    if (result.status !== 204) {
      setData(data);
    }
  };
  const editDispatchHandle = (params: any) => {
    const editData = params.data;
    let changedData;
    const index = data.findIndex((item) => item.id === editData.id);
    const frontData = data.slice(0, index);
    const endData = data.slice(index + 1, -1);
    changedData = [...frontData, editData, ...endData];
    setData(changedData);
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      onScroll={async (e) => {
        let paddingToBottom = 50;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if (
          next &&
          e.nativeEvent.contentOffset.y + paddingToBottom >=
            e.nativeEvent.contentSize.height
        ) {
          moreDataHandle();
        }
      }}>
      <View style={{flex: 1}}>
        {data.map((item: any) => (
          <View
            key={item.id}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: styles.RIGHT_GRAY,
            }}>
            <View style={{padding: 10, paddingBottom: 30}}>
              <PostUser
                navigation={navigation}
                postId={item.id}
                text={item.text}
                created={item.created}
                {...item.user}
                accountId={accountId}
                deletePostHandle={deletePostHandle}
                tab={tab}
                editDispatchHandle={editDispatchHandle}
              />
              <PostText {...item} />
            </View>
          </View>
        ))}
        {data.length > 7 && next ? (
          <View style={{padding: 20}}>
            <ActivityIndicator size="small" color={styles.GRAY} />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default CommunityTabView;
