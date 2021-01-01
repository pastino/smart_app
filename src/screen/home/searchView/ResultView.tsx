import React from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import styled from 'styled-components';
import Header from '../../../common/Header';
import constants from '../../../styles/constants';
import styles from '../../../styles/styles';

const ResultView = ({navigation, route}) => {
  const {result, businessName} = route.params;

  return (
    <>
      <Header text={'조회 결과 (1 ~ 12페이지)'} back={true} />
      <ScrollView style={{flexGrow: 1}}>
        <View style={{backgroundColor: 'white'}}>
          {result.map((item: any, index) => {
            const title = item.title
              .replace(/<b>/gi, '')
              .replace(/<\/b>/gi, '');
            const page = Math.ceil(index / 40);
            const order = index % 40;

            return item.mallName === businessName ? (
              <TouchableWithoutFeedback
                onPress={() => Linking.openURL(item.link)}
                key={index}
                style={{
                  flexDirection: 'row',
                  borderBottomColor: styles.LIGHT_GRAY,
                  borderBottomWidth: 1,
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: constants.width / 4,
                    height: constants.width / 4,
                  }}
                />
                <View
                  style={{
                    width: constants.width / 1.3,
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>
                  <Text style={{height: 45}}>{title}</Text>
                  <Text style={{fontWeight: '700', marginTop: 5}}>
                    {item.mallName}
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text
                      style={{
                        marginRight: 10,
                        color: styles.GREEN,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {page}페이지
                    </Text>
                    <Text
                      style={{
                        color: styles.GREEN,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {order + 1}위
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ) : null;
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default ResultView;
