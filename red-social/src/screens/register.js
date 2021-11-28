import React, { useState} from 'react';
import { ActivityIndicator, ScrollView, ToastAndroid, TextInput, Button, View, StyleSheet, Text, Image} from 'react-native';
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
        <Text style={{textAlign: 'center', marginTop:'10%', fontSize:25, fontFamily:'Arial'}}>Sing Up</Text>
        {/* <Image source={{uri: 'https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png'}}></Image> */}
        <View> 
            <TextInput onChangeText={(value) => {setName(value)}} placeholder="Username" style={styles.input}></TextInput>
        </View> 
        <View>
            <TextInput onChangeText={(value) => {setUsername(value)}} placeholder="Name" style={styles.input}/>
        </View>
        <View>
            <TextInput onChangeText={(value) => {setLastname(value)}} placeholder="LastName" style={styles.input}></TextInput>
        </View> 
        <View>
            <TextInput onChangeText={(value) => {setEmail(value)}} placeholder="Email" style={styles.input}></TextInput>
        </View> 
        <View> 
            <TextInput onChangeText={(value) => {setPassword(value)}} placeholder="Password" style={styles.input}></TextInput>
        </View>
        <View> 
            <TextInput onChangeText={(value) => {setLocation(value)}} placeholder="Location" style={styles.input}></TextInput>
        </View>
        <View>
            <TextInput onChangeText={(value) => {setDate(value)}} placeholder="Date Of Brith" style={styles.input}></TextInput>
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
    
});
