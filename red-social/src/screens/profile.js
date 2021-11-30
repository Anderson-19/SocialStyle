import React, { useState} from 'react';
import { ActivityIndicator, ScrollView, ToastAndroid, TextInput, Button, View, StyleSheet, Text, Image} from 'react-native';
//import { fetchLogin } from '../services/usersServices';

export default function Profile({navigation}) {


  return (

        <Text style={styles.createAccount} >
                    PROFILE
        </Text>
   
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
