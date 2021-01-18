import React from 'react';
import MainNavigation from './navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './redux/store';
import {MenuProvider} from 'react-native-popup-menu';
const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <SafeAreaView style={{flex: 1}}>
              <MainNavigation />
            </SafeAreaView>
          </NavigationContainer>
        </PersistGate>
      </MenuProvider>
    </Provider>
  );
};

export default App;
