import React, {useEffect, useState} from 'react';
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
import {getFavPosts, getPosts, toggleFavPost} from '../../../api';
import Spinner from 'react-native-loading-spinner-overlay';

const Community = ({navigation}) => {
  const {isLoggedIn, token, user} = useSelector((state) => state.usersReducer);

  const accountId = user?.account_id;
  const userId = user?.id;

  const [favPosts, setFavPosts] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(0);

  const communityTabs = ['블로그', '스마트 스토어', '스마트 플레이스'];

  const [blogData, setBlogData] = useState<any>([]);
  const [blogPage, setBlogPage] = useState(1);
  const [blogNext, setBlogNext] = useState(true);
  const [blogCreateNum, setBlogCreateNum] = useState(0);
  const [blogDeleteNum, setBlogDeleteNum] = useState(0);
  const blogDifferenceNum = blogCreateNum - blogDeleteNum;

  const [smartStoreData, setSmartStoreData] = useState<any>([]);
  const [smartStorePage, setSmartStorePage] = useState(1);
  const [storeNext, setStoreNext] = useState(true);
  const [storeCreateNum, setStoreCreateNum] = useState(0);
  const [storeDeleteNum, setStoreDeleteNum] = useState(0);
  const storeDifferenceNum = storeCreateNum - storeDeleteNum;

  const [smartPlaceData, setSmartPlaceData] = useState<any>([]);
  const [smartPlacePage, setSmartPlacePage] = useState(1);
  const [placeNext, setPlaceNext] = useState(true);
  const [placeCreateNum, setPlaceCreateNum] = useState(0);
  const [placeDeleteNum, setPlaceDeleteNum] = useState(0);
  const placeDifferenceNum = placeCreateNum - placeDeleteNum;

  const [isLoading, setIsLoading] = useState(false);

  const toggleFavHandle = async (postId) => {
    if (favPosts.includes(postId)) {
      setFavPosts(favPosts.filter((id) => id !== postId));
    } else {
      setFavPosts([...favPosts, postId]);
    }
    await toggleFavPost(userId, postId, token);
  };

  const getFavPostsHandle = async () => {
    const response = await getFavPosts(userId, token);
    if (response.status === 200) {
      setFavPosts(response.data.map((post) => post.id));
    }
  };

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
    if (blogDifferenceNum >= 0) {
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
    } else {
      try {
        const currentPageResult = await getPosts('blog', blogPage);
        const nextPageResutlt = await getPosts('blog', blogPage + 1);
        if (
          currentPageResult.status === 200 &&
          nextPageResutlt.status === 200
        ) {
          const data = currentPageResult.data;
          const extractedData = data.results.slice(10 - -blogDifferenceNum, 10);
          setBlogPage(blogPage + 1);
          setBlogDeleteNum(0);
          setBlogCreateNum(0);
          const moreData = blogData.concat(
            extractedData,
            nextPageResutlt.data.results,
          );
          setBlogData(moreData);
          if (nextPageResutlt.data.next === null) {
            setBlogNext(false);
          }
        }
      } catch (e) {
        console.log(e.message);
        const currentPageResult = await getPosts('blog', blogPage);
        if (currentPageResult.status === 200) {
          const data = currentPageResult.data;
          const extractedData = data.results.filter(
            (item) => !blogData.map((obj) => obj.id).includes(item.id),
          );
          setBlogDeleteNum(0);
          setBlogCreateNum(0);
          const moreData = blogData.concat(extractedData);
          setBlogData(moreData);
          if (data.next === null) {
            setBlogNext(false);
          }
        }
      }
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
    if (storeCreateNum - storeDeleteNum >= 0) {
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
    } else {
      try {
        const currentPageResult = await getPosts('smart_store', smartStorePage);
        const nextPageResutlt = await getPosts(
          'smart_store',
          smartStorePage + 1,
        );
        if (currentPageResult.status === 200) {
          const data = currentPageResult.data;
          const extractedData = data.results.slice(
            10 - -storeDifferenceNum,
            10,
          );
          const moreData = smartStoreData.concat(
            extractedData,
            nextPageResutlt.data.results,
          );
          setSmartStorePage(smartStorePage + 1);
          setStoreCreateNum(0);
          setStoreDeleteNum(0);
          setSmartStoreData(moreData);
          if (nextPageResutlt.data.next === null) {
            setStoreNext(false);
          }
        }
      } catch (e) {
        console.log(e.message);
        const currentPageResult = await getPosts('smart_store', smartStorePage);
        if (currentPageResult.status === 200) {
          const data = currentPageResult.data;
          const extractedData = data.results.filter(
            (item) => !smartStoreData.map((obj) => obj.id).includes(item.id),
          );
          setStoreCreateNum(0);
          setStoreDeleteNum(0);
          const moreData = smartStoreData.concat(extractedData);
          setSmartStoreData(moreData);
          if (data.next === null) {
            setStoreNext(false);
          }
        }
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
    if (placeCreateNum - placeDeleteNum >= 0) {
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
    } else {
      try {
        const currentPageResult = await getPosts('smart_place', smartPlacePage);
        const nextPageResutlt = await getPosts(
          'smart_place',
          smartPlacePage + 1,
        );
        if (currentPageResult.status === 200) {
          const data = currentPageResult.data;
          const extractedData = data.results.slice(
            10 - -placeDifferenceNum,
            10,
          );
          const moreData = smartPlaceData.concat(
            extractedData,
            nextPageResutlt.data.results,
          );
          setSmartPlacePage(smartPlacePage + 1);
          setPlaceCreateNum(0);
          setPlaceDeleteNum(0);
          setSmartPlaceData(moreData);
          if (nextPageResutlt.data.next === null) {
            setPlaceNext(false);
          }
        }
      } catch (e) {
        console.log(e.message);
        const currentPageResult = await getPosts('smart_place', smartPlacePage);
        if (currentPageResult.status === 200) {
          const data = currentPageResult.data;
          const extractedData = data.results.filter(
            (item) => !smartPlaceData.map((obj) => obj.id).includes(item.id),
          );
          setPlaceCreateNum(0);
          setPlaceDeleteNum(0);
          const moreData = smartPlaceData.concat(extractedData);
          setSmartPlaceData(moreData);
          if (data.next === null) {
            setPlaceNext(false);
          }
        }
      }
    }
  };

  const createDispatchHandle = (params: any) => {
    switch (params.tab) {
      case '블로그':
        setBlogData([params.data, ...blogData]);
        setBlogCreateNum(blogCreateNum + 1);
        break;
      case '스마트 스토어':
        setSmartStoreData([params.data, ...smartStoreData]);
        setStoreCreateNum(storeCreateNum + 1);
        break;
      case '스마트 플레이스':
        setSmartPlaceData([params.data, ...smartPlaceData]);
        setPlaceCreateNum(placeCreateNum + 1);
        break;
    }
  };

  useEffect(() => {
    getFavPostsHandle();
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
              deleteNum={
                index === 0
                  ? blogDeleteNum
                  : index === 1
                  ? storeDeleteNum
                  : index === 2
                  ? placeDeleteNum
                  : null
              }
              setDeleteNum={
                index === 0
                  ? setBlogDeleteNum
                  : index === 1
                  ? setStoreDeleteNum
                  : index === 2
                  ? setPlaceDeleteNum
                  : null
              }
              favPosts={favPosts}
              toggleFavHandle={toggleFavHandle}
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
