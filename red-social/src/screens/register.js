import React, { useState} from 'react';
import { ActivityIndicator, ScrollView, ToastAndroid, TextInput, View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import { Text, Input, Button, Card} from 'react-native-elements';
import { fetchRegister } from '../services/usersServices';


export default function register() {
    let [name, setName] = useState('');
    let [username, setUsername] = useState('');
    let [lastname, setLastname] = useState('');
    let [password, setPassword] = useState('');
    let [location, setLocation] = useState('');
    let [email, setEmail] = useState('');
    let [date, setDate] = useState('');
    let [buttonTitle, setButtonTitle] = useState('Register');
    let [loading, setLoading] = useState(false);
    /* let [fileURI, setFileURI] = useState(null);
    let [type, setType] = useState('jpg');

    const fileInput = (data) => {
        setType(data.type);
        setFileURI(data.uri);
    } */
  return (
    <ScrollView>
        <ImageBackground 
        source={require('./images/back.jpeg')}
        style={{height: Dimensions.get('window').height/2.5,
    }}>
        
        <View style={styles.brandView}>
        
         <Text style={{color: 'black', fontSize: 30,fontFamily:'impact',fontWeight: 'bold', textTransform:'uppercase', textAlign: 'center'  }}>Social Style<Card.Image
    style={styles.avatar}
    source={{ uri: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png' }} /></Text>
        </View>

        </ImageBackground>

        <View style={styles.bottomView} >

        

        <Text style={{textAlign: 'center', marginTop:'5%', fontSize:25, fontFamily:'Arial'}}>Sign Up</Text>
        {/* <Image source={{uri: 'https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png'}}></Image> */}
        <View> 
            <Input onChangeText={(value) => {setName(value)}}  label={'Username'} style={styles.input}></Input>
        </View> 
        <View>
            <Input onChangeText={(value) => {setUsername(value)}} label={'Name'} style={styles.input}/>
        </View>
        <View>
            <Input onChangeText={(value) => {setLastname(value)}}  label={'Last Name'} style={styles.input}></Input>
        </View> 
        <View>
            <Input onChangeText={(value) => {setEmail(value)}}  label={'Email'} style={styles.input}></Input>
        </View> 
        <View> 
            <Input onChangeText={(value) => {setPassword(value)}}  label={'Password'} style={styles.input}></Input>
        </View>
        <View> 
            <Input onChangeText={(value) => {setLocation(value)}} label={'Location'} style={styles.input}></Input>
        </View>
        <View>
            <Input onChangeText={(value) => {setDate(value)}} label={'Date Of Birth'} style={styles.input}></Input>
        </View>
    
        <Button title={buttonTitle} onPress={() =>{
            setButtonTitle('');
            setLoading(true);
            let data = {
                username: username,
                name: name,
                lastname: lastname,
                email: email,
                password: password,
                location: location,
                date: date
            }

            fetchRegister(data).
            then(json => {
                setButtonTitle('Register');
                setLoading(false);
                console.log(json)
                //ToastAndroid.showWithGravity(json.content, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            });
        }} icon={<ActivityIndicator color={'#e94560'} animating={loading} />} disabled={loading}/>  
       
       
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
        justifyContent: "center",
        alignItems: "center",
        
    }, 
    input: {
        height: 30,
        margin: 20,
        borderWidth: 2,
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        borderColor:'white'
        
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
