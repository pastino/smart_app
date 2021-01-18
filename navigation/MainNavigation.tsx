import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import ResultView from '../src/screen/home/searchView/ResultView';
import LoginView from '../src/screen/login/LoginView';
import CreatePostView from '../src/screen/community/createPost/CreatePostView';
import EditPostView from '../src/screen/community/editPost/EditPostView';

const MainNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Tab"
      headerMode={'none'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
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
      <Stack.Screen
        name="LoginView"
        component={LoginView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePostView"
        component={CreatePostView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPostView"
        component={EditPostView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default MainNavigation;
