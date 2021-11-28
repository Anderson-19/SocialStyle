import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserPages from './userPages';

const Stack = createNativeStackNavigator();

function Modal() {
    return (
        <Stack.Navigator mode={'modal'} >
            <Stack.Screen
                name={'userPages'}
                component={UserPages}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Modal;