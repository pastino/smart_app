import React, {FunctionComponent} from 'react';
import {Text, View, Modal, TouchableWithoutFeedback} from 'react-native';

import styles from '../styles/styles';

interface Props {
  visible: boolean;
  setVisible: any;
  children: any;
  width?: number;
  height?: number;
  confirmHandle: () => void;
}

const ModalComponent: FunctionComponent<Props> = ({
  visible,
  setVisible,
  children,
  width = 300,
  height = 200,
  confirmHandle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width,
            height,
          }}>
          <View
            style={{
              width,
              height: height - 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {children}
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderColor: styles.LIGHT_GRAY,
            }}>
            <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
              <View
                style={{
                  width: width / 2,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>취소</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => confirmHandle()}>
              <View
                style={{
                  width: width / 2,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftWidth: 1,
                  borderLeftColor: styles.LIGHT_GRAY,
                }}>
                <Text>확인</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
