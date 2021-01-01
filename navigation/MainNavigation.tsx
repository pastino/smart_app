import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import ResultView from '../src/screen/home/searchView/ResultView';

const MainNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Tab" headerMode={'none'}>
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResultView"
        component={ResultView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default MainNavigation;
