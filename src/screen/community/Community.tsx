import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import CommunityTabView from './CommunityTabView';
import Header from '../../common/Header';
import {useSelector} from 'react-redux';
import styles from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getPosts} from '../../../api';
import Spinner from 'react-native-loading-spinner-overlay';
import prettyFormat from 'pretty-format';

const Community = ({navigation}) => {
  const {isLoggedIn, token, user} = useSelector((state) => state.usersReducer);
  const accountId = user.account_id;
  const [currentPage, setCurrentPage] = useState(0);

  const communityTabs = ['블로그', '스마트 스토어', '스마트 플레이스'];

  const [blogData, setBlogData] = useState<any>([]);
  const [blogPage, setBlogPage] = useState(1);
  const [blogNext, setBlogNext] = useState(true);

  const [smartStoreData, setSmartStoreData] = useState<any>([]);
  const [smartStorePage, setSmartStorePage] = useState(1);
  const [storeNext, setStoreNext] = useState(true);

  const [smartPlaceData, setSmartPlaceData] = useState<any>([]);
  const [smartPlacePage, setSmartPlacePage] = useState(1);
  const [placeNext, setPlaceNext] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const getBlogPostsHandle = async () => {
    setIsLoading(true);
    const results = await getPosts('blog', blogPage);
    if (results.status === 200) {
      const data = results.data;
      if (data.next === null) {
        setBlogNext(false);
      }
      setBlogData(data.results);
    }
    setIsLoading(false);
  };

  const getMoreBlogPosts = async () => {
    try {
      const results = await getPosts('blog', blogPage + 1);
      setBlogPage(blogPage + 1);
      if (results.status === 200) {
        const data = results.data;
        const extractedData = data.results.filter(
          (item) => !blogData.map((obj) => obj.id).includes(item.id),
        );
        const moreData = blogData.concat(extractedData);
        setBlogData(moreData);
        if (data.next === null) {
          setBlogNext(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getStorePostsHandle = async () => {
    const results = await getPosts('smart_store', smartStorePage);
    if (results.status === 200) {
      const data = results.data;

      if (data.next === null) {
        setStoreNext(false);
      }
      setSmartStoreData(data.results);
    }
  };

  const getMoreStorePosts = async () => {
    const results = await getPosts('smart_store', smartStorePage + 1);
    setSmartStorePage(smartStorePage + 1);
    if (results.status === 200) {
      const data = results.data;
      const extractedData = data.results.filter(
        (item) => !smartStoreData.map((obj) => obj.id).includes(item.id),
      );
      const moreData = smartStoreData.concat(extractedData);
      setSmartStoreData(moreData);
      if (data.next === null) {
        setStoreNext(false);
      }
    }
  };

  const getPlacePostsHandle = async () => {
    const results = await getPosts('smart_place', smartPlacePage);
    if (results.status === 200) {
      const data = results.data;
      if (data.next === null) {
        setPlaceNext(false);
      }
      setSmartPlaceData(data.results);
    }
  };

  const getMorePlacePosts = async () => {
    const results = await getPosts('smart_place', smartPlacePage + 1);
    setSmartPlacePage(smartPlacePage + 1);
    if (results.status === 200) {
      const data = results.data;
      const extractedData = data.results.filter(
        (item) => !smartPlaceData.map((obj) => obj.id).includes(item.id),
      );
      const moreData = smartPlaceData.concat(extractedData);
      setSmartPlaceData(moreData);
      if (data.next === null) {
        setPlaceNext(false);
      }
    }
  };

  const createDispatchHandle = (params: any) => {
    switch (params.tab) {
      case '블로그':
        setBlogData([params.data, ...blogData]);
        break;
      case '스마트 스토어':
        setSmartStoreData([params.data, ...smartStoreData]);
        break;
      case '스마트 플레이스':
        setSmartPlaceData([params.data, ...smartPlaceData]);
        break;
    }
  };

  useEffect(() => {
    getBlogPostsHandle();
    getStorePostsHandle();
    getPlacePostsHandle();
  }, []);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header text={'커뮤니티'} login={true} navigation={navigation} />
        <ScrollableTabView
          onChangeTab={(e) => setCurrentPage(e.i)}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}>
          {communityTabs.map((item, index) => (
            <CommunityTabView
              key={index}
              navigation={navigation}
              token={token}
              tabLabel={item}
              tab={communityTabs[index]}
              data={
                index === 0
                  ? blogData
                  : index === 1
                  ? smartStoreData
                  : index === 2
                  ? smartPlaceData
                  : []
              }
              setData={
                index === 0
                  ? setBlogData
                  : index === 1
                  ? setSmartStoreData
                  : index === 2
                  ? setSmartPlaceData
                  : null
              }
              moreDataHandle={
                index === 0
                  ? getMoreBlogPosts
                  : index === 1
                  ? getMoreStorePosts
                  : index === 2
                  ? getMorePlacePosts
                  : null
              }
              next={
                index === 0
                  ? blogNext
                  : index === 1
                  ? storeNext
                  : index === 2
                  ? placeNext
                  : null
              }
              accountId={accountId}
            />
          ))}
        </ScrollableTabView>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('CreatePostView', {
              tab: communityTabs[currentPage],
              createDispatchHandle,
            })
          }
          containerStyle={{position: 'absolute', right: 20, bottom: 20}}
          style={{
            width: 60,
            height: 60,
            backgroundColor: styles.GREEN,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <MaterialCommunityIcons name={'plus'} size={30} color={'white'} />
        </TouchableWithoutFeedback>
      </View>
      <Spinner visible={blogData.length === 0 ? isLoading : false} />
    </ScrollView>
  );
};

export default Community;
