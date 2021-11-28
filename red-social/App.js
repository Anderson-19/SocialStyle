import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './state/store/store';
import Register from './src/screens/register';
import Login from './src/screens/login';
import Modal from './src/screens/modal';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='login'>
            <Stack.Screen component={Login} name="Login" options={{ headerShown: false }}/>
            <Stack.Screen component={Register} name="Register" options={{ headerShown: false }}/>
            <Stack.Screen component={Modal} name="Modal" options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
      </Provider>
    </>
  );
}
