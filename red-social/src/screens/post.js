import React, { useState} from 'react';
import { ActivityIndicator, ScrollView, ToastAndroid, TextInput, Button, View, StyleSheet, Image} from 'react-native';
import { Avatar, Text } from 'react-native-elements';
/* import PostMaker from '../components/postMaker'; */
//import { fetchLogin } from '../services/usersServices';

export default function Post() {

  return (
    <ScrollView>
      <Text>POST</Text>
      {/* <PostMaker /> */}
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 8,
    },
    createAccount: {
        color: '#3282b8',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
        left: '2%',
        position: 'relative',
        top: '3%'
    }
});
