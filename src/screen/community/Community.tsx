import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import CommunityTabView from './CommunityTabView';
import Header from '../../common/Header';
import {useSelector, useDispatch} from 'react-redux';

const Community = ({navigation}) => {
  const communityTabs = ['블로그', '스마트 스토어', '스마트 플레이스'];
  const {isLoggedIn, token, user} = useSelector((state) => state.usersReducer);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header text={'커뮤니티'} login={true} navigation={navigation} />
        {/* <KakaoLogin /> */}
        <ScrollableTabView
          // style={{marginTop: 20}}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}>
          {communityTabs.map((item, index) => (
            <CommunityTabView key={index} tabLabel={item} />
          ))}
        </ScrollableTabView>
      </View>
    </ScrollView>
  );
};

export default Community;
