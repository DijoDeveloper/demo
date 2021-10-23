import 'react-native-gesture-handler';

import EStyleSheet from 'react-native-extended-stylesheet';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import React from 'react';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import store from './redux/store';
import theme from './theme';

const {Navigator, Screen} = createStackNavigator();

const storeProvider = store();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Provider store={storeProvider}>
          <Navigator>
            <Screen
              name={Screen1.name}
              component={Screen1.component}
              options={{headerShown: false}}
            />
            <Screen
              name={Screen2.name}
              component={Screen2.component}
              options={{
                title: 'My Cart',
                backTitle: null,
                headerBackTitle: null,
                headerBackTitleVisible: false,
                headerStyle: {
                  backgroundColor: '#081D2C',
                  elevation: 0,
                  borderBottomWidth: 0,
                  shadowColor: 'transparent',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 20,
                },
              }}
            />
          </Navigator>
        </Provider>
      </NavigationContainer>
    </>
  );
};

EStyleSheet.build({...theme});

export default App;
