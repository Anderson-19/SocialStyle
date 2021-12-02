import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserPages from './userPages';
import EditPost from './post/editPost';
import Post from './post/post';

const Stack = createNativeStackNavigator();

function Modal() {
    return (
        <Stack.Navigator mode={'modal'}>
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
              <Stack.Screen
               name={'EditPost'} 
               component={EditPost}
               options={{title: '                       Edit Post'}}
             /> 
        </Stack.Navigator>
    );
}

export default Modal;