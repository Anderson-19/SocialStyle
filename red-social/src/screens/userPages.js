import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Dashboard from './dashboard';
import Profile from './profile';
import Post from './post';

const Tab = createBottomTabNavigator();

function UserPages({ navigation }) {
  return (
    <Tab.Navigator initialRouteName={'Dashboard'} >
       <Tab.Screen
        name={'Dashboard'}
        component={Dashboard}
        options={
          {
            tabBarIcon: (focused) => (
              <Icon size={25}
                type={'font-awesome-5'}
                name={focused ? 'clipboard' : 'clipboard-outline'}
                color={focused ? '#00aae4' : '#84142d'}
              />
            ),
            title: 'Dashboard',
            headerShown: false 
          }
          
        }
      />
   <Tab.Screen
        name={'Profile'} 
        component={Profile}
        options={
          {
            tabBarIcon: (focused) => (
              <Icon
                type={'font-awesome-5'}
                size={25} name={focused ? 'user-circle' : 'user-circle-outline'}
                color={focused ? '#00aae4' : '#84142d'} />
            ),
            title: ' Profile',
            headerShown: false 
          }
        }
      /> 
     <Tab.Screen
        name={'Post'} 
        component={Post}
        options={
          {
            tabBarIcon: (focused) => (
              <Icon
                type={'material-icons'}
                size={25} name={focused ? 'library-add' : 'library-add'}
                color={focused ? '#00aae4' : '#84142d'} />
            ),
            title: ' Post',
            headerShown: false 
          }
        }
      /> 
    </Tab.Navigator>
  )
}

export default UserPages;