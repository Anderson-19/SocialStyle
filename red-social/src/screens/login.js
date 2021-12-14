import React, { useState} from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet, ToastAndroid, ImageBackground, Dimensions } from 'react-native';
import { Text, Input, Button, Card} from 'react-native-elements';
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
    <ScrollView style={styles.container} showVerticalScrollIndicator={false}>
        <ImageBackground 
        source={require('./images/backgroundImage.jpeg')}
        style={{height: Dimensions.get('window').height/2.5,
    }}>

        <View style={styles.brandView}>
        <Card.Image
    style={styles.avatar}
    source={{ uri: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png' }} />
         <Text style={{color: '#ffff', fontSize: 30,fontFamily:'impact',fontWeight: 'bold', textTransform:'uppercase', textAlign: 'center'  }}>Social Style</Text>
        </View>
        </ImageBackground>
        
        {/**bottomview */ }
        <View style={styles.bottomView} >
           <View style={{padding: 30}}>
               <Text style={{color:'black', fontSize:32, paddingBottom:10, marginLeft:50}}>Log In</Text>
            <View style={{marginTop:50}} style={{borderColor:'#4632A1'}}>
                
                <Input onChange={(e) => { setEmail(e.nativeEvent.text); }} style={styles.input} label={'Email'} keyboardType={'email-address'}  />
            </View> 
            <View> 
                <Input onChange={(e) => { setPassword(e.nativeEvent.text); }} style={styles.input} label={'Password'} secureTextEntry={true} />
            </View>
        
            <Button 
                containerStyle={{padding: 25}}
                title={buttonTitle}
                disabled={loading}
                icon={<ActivityIndicator color={'#e94560'} animating={loading} />}
                onPress={() =>{
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
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container:{
        
        /** marginTop: 80, **/
        flex: 1,
        flexDirection: "column",
        
        
    },
     avatar:{
        width: '80px',
        height: '80px', 
        borderRadius:'50%',
        opacity: 0.8,
        marginLeft: '40%',
        marginTop: '5%',
        justifyContent: "center",
        alignItems: "center"
    }, 
    input: {
        borderColor:'white',
        height: 30,
        margin: 10,
        borderWidth: 2,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        
    },
    
    createAccount: {
        color: '#3282b8',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
        left: '2%',
        position: 'relative',
        top: '3%',
        justifyContent: "center",
        alignItems: "center",
        marginBottom:30
    },
    brandView: {
        flex:1,
        justifyContent: 'center',
        paddingBottom:60,
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: 'white',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
    },
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