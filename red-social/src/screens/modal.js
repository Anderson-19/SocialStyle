import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserPages from './userPages';
import Post from './post/post';
import PostComment from './post/postComments';
import UsersProfiles from './profiles/usersProfiles';
import EditProfile from './profiles/editProfile';

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
            <Stack.Screen
               name={'PostComment'} 
               component={PostComment}
               options={{title: '                       '}}
             /> 
             <Stack.Screen
               name={'UsersProfiles'} 
               component={UsersProfiles}
               options={{title: '                       '}}
             /> 
             <Stack.Screen
               name={'EditProfile'} 
               component={EditProfile}
               options={{title: '                       '}}
             /> 
        </Stack.Navigator>
    );
}

export default Modal;