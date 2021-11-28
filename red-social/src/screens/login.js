import React, { useState} from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet, ToastAndroid } from 'react-native';
import { Text, Input, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { saveSessionToken } from '../../state/actions/saveSessionToken';
import { saveUserName, saveUserEmail, saveUserAvatar } from '../../state/actions/saveUserData';
import { fetchLogin } from '../services/usersServices';

function Login({navigation, reduxSaveSessionToken, reduxUserDataName, reduxUserDataEmail, reduxUserDataAvatar }) {
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('');
    let [buttonTitle, setButtonTitle] = useState('Login');
    let [loading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
        <Card  >
            <Text style={{textAlign: 'center', marginTop:'10%', fontSize:25, fontFamily:'Arial'}}>Log In</Text>
            <Card.Image
                style={styles.avatar}
                source={{ uri: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png' }} />
            <View>
                <Input onChange={(e) => { setEmail(e.nativeEvent.text); }} style={styles.input} label={'Email'} keyboardType={'email-address'} placeholder={'Email'} />
            </View> 
            <View> 
                <Input onChange={(e) => { setPassword(e.nativeEvent.text); }} style={styles.input} label={'Password'} secureTextEntry={true} placeholder={'Password'} />
            </View>
        
            <Button 
                title={buttonTitle}
                disabled={loading}
                icon={<ActivityIndicator color={'#e94560'} animating={loading} />}
                onPress={() =>{
                    navigation.navigate('Modal');
                    setButtonTitle('');
                    setLoading(true);
                    let data = {
                        email: email,
                        password: password
                    }
                    
                   fetchLogin(data).
                    then(json => {
                        setButtonTitle('Login');
                        setLoading(false);
                        console.log({name: json.name, email: json.email, avatar: json.avatar})
                        if(json.verify){
                            reduxSaveSessionToken(json.token);
                            reduxUserDataName(json.name);
                            reduxUserDataEmail(json.email);
                            reduxUserDataAvatar(json.avatar);
                            navigation.navigate('Modal');
                        }
            
                    });  
                }} />  

            <Text style={styles.createAccount} 
                onPress={() => { navigation.navigate('Register'); }} >
                        Don't have Account ? Sign Up
            </Text>
        </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 80
    },
    avatar:{
        width: '80px',
        height: '80px', 
        borderRadius:'50%',
        opacity: 0.8,
        marginLeft: '40%',
        marginTop: '5%'
    },
    input: {
        height: 25,
        margin: 10,
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

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        reduxSaveSessionToken: (sessionToken) => {
            dispatch(saveSessionToken(sessionToken));
        },
        reduxUserDataName: (name) => {
            dispatch(saveUserName(name));
        },
        reduxUserDataEmail: (email) => {
            dispatch(saveUserEmail(email));
        },
        reduxUserDataAvatar: (Avatar) => {
            dispatch(saveUserAvatar(Avatar));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);