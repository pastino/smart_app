import React, {ReactElement} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../src/screen/home/Home';
import Community from '../src/screen/community/Community';

const TabNavigation = (): ReactElement => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
};
export default TabNavigation;
