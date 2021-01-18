import React, {useState} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import Header from '../../common/Header';
import styles from '../../styles/styles';
import SearchView from './searchView/SearchView';
import {ToastAndroid} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Home = ({navigation}) => {
  const [businessName, setBusinessName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [resultShoppingData, setResultShoppingData] = useState<string[]>([]);

  const shoppinApi = axios.create({
    baseURL: 'https://openapi.naver.com/v1/',
    headers: {
      'X-Naver-Client-Id': 'A5SNMW0tRVBQVbHzFYVZ',
      'X-Naver-Client-Secret': '4dehC2d7WP',
      'Content-Type': 'application/json',
    },
  });

  const importShoppingData = async () => {
    let data: string[] = [];
    for (let i = 0; i < 5; i++) {
      const start =
        i === 0
          ? 1
          : i === 1
          ? 101
          : i === 2
          ? 201
          : i === 3
          ? 301
          : i === 4
          ? 401
          : 1;
      const response = await shoppinApi.get('search/shop.json', {
        params: {
          query: searchName,
          display: 100,
          start,
        },
      });
      const itemArray = JSON.parse(response.request._response).items;
      if (itemArray.length > 0) {
        data = [...data, ...itemArray];
        if (itemArray.length < 100) {
          break;
        }
      } else {
        break;
      }
    }
    return data;
  };

  const clickSearchHandle = async () => {
    if (searchName === '') {
      ToastAndroid.showWithGravity(
        '키워드를 입력해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (businessName === '') {
      ToastAndroid.showWithGravity(
        '상호명을 입력해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      setIsLoading(true);
      const result: string[] = await importShoppingData();
      setIsLoading(false);
      setResultShoppingData(result);
      navigation.navigate('ResultView', {result, businessName});
    }
  };

  return (
    <Container>
      <Header text={'나의 상품 순위검색'} back={false} />
      <TopView>
        <TopText>스마트 스토어에 올리신 상품의 순위를 알고 싶으신가요?</TopText>
      </TopView>
      <SearchView
        businessName={businessName}
        setBusinessName={setBusinessName}
        searchName={searchName}
        setSearchName={setSearchName}
        clickSearchHandle={clickSearchHandle}
      />
      <Spinner visible={isLoading} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
`;

const TopView = styled.View`
  padding: 20px;
`;
const TopText = styled.Text`
  text-align: center;
  color: ${styles.GRAY};
`;

export default Home;

// [
//   {
//     brand: '지웨이',
//     category1: '식품',
//     category2: '축산',
//     category3: '축산가공식품',
//     category4: '닭가공품',
//     hprice: '150000',
//     image:
//       'https://shopping-phinf.pstatic.net/main_2426132/24261329523.20201021143756.jpg',
//     link: 'https://search.shopping.naver.com/gate.nhn?id=24261329523',
//     lprice: '1180',
//     maker: '골든팜',
//     mallName: '네이버',
//     productId: '24261329523',
//     productType: '1',
//     title: '골든팜 지웨이 올스타 스팀 <b>닭가슴살</b> 오리지널맛 100g',
//   },
//   {
//     brand: '',
//     category1: '식품',
//     category2: '축산',
//     category3: '닭고기',
//     category4: '부위별닭고기',
//     hprice: '6500',
//     image:
//       'https://shopping-phinf.pstatic.net/main_1273608/12736086360.20201113123018.jpg',
//     link: 'https://search.shopping.naver.com/gate.nhn?id=12736086360',
//     lprice: '3680',
//     maker: '계림식품',
//     mallName: '네이버',
//     productId: '12736086360',
//     productType: '1',
//     title: '계림식품 국내산 냉장 <b>닭가슴살</b> 1kg',
//   },
//   {
//     brand: '헬스앤뷰티',
//     category1: '식품',
//     category2: '축산',
//     category3: '축산가공식품',
//     category4: '닭가공품',
//     hprice: '46000',
//     image:
//       'https://shopping-phinf.pstatic.net/main_1495342/14953428472.20180802172646.jpg',
//     link: 'https://search.shopping.naver.com/gate.nhn?id=14953428472',
//     lprice: '10200',
//     maker: '서동물산',
//     mallName: '네이버',
//     productId: '14953428472',
//     productType: '1',
//     title: '서동물산 헬스앤뷰티 훈제 저염 <b>닭가슴살</b> 180g',
//   },
//   {
//     brand: '',
//     category1: '식품',
//     category2: '축산',
//     category3: '축산가공식품',
//     category4: '닭가공품',
//     hprice: '0',
//     image: 'https://shopping-phinf.pstatic.net/main_8250908/82509088273.3.jpg',
//     link: 'https://search.shopping.naver.com/gate.nhn?id=82509088273',
//     lprice: '38700',
//     maker: '허스델리',
//     mallName: '랭킹닭컴',
//     productId: '82509088273',
//     productType: '2',
//     title: '잇메이트 소프트 <b>닭가슴살</b> 100g X 30팩 / 수비드 스팀',
//   },
//   {
//     brand: '바디나인',
//     category1: '식품',
//     category2: '축산',
//     category3: '축산가공식품',
//     category4: '닭가공품',
//     hprice: '0',
//     image: 'https://shopping-phinf.pstatic.net/main_1346145/13461453602.jpg',
//     link: 'https://search.shopping.naver.com/gate.nhn?id=13461453602',
//     lprice: '24900',
//     maker: '',
//     mallName: '바디나인',
//     productId: '13461453602',
//     productType: '2',
//     title: '바디나인 구현호 <b>닭가슴살</b> 내가몸짱이될닭 오리지널 10팩',
//   },source ~/.bash_profilesource ~/.bash_profile
// ];
