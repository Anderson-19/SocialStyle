import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserPages from './userPages';
import Post from './post/post';

const Stack = createNativeStackNavigator();

function Modal() {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name={'userPages'}
                component={UserPages}
                options={{ headerShown: false }}
            />
            <Stack.Screen
               name={'Post'} 
               component={Post}
               options={{title: '                       Create Post'}}
             /> 
        </Stack.Navigator>
    );
}

export default Modal;