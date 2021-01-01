import React from 'react';
import {Text, View} from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <MainNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
