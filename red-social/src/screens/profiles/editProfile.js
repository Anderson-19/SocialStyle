import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, ToastAndroid, TextInput, View, StyleSheet} from 'react-native';
import { Text, Input, Button, Card, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchRegister } from '../../services/usersServices';
import { getUserProfile, updateUserProfile } from '../../services/usersServices';

function EditProfile(props) {
    let [name, setName] = useState('');
    let [username, setUsername] = useState('');
    let [lastname, setLastname] = useState('');
    let [password, setPassword] = useState('');
    let [location, setLocation] = useState('');
    let [email, setEmail] = useState('');
    let [date, setDate] = useState('');
    let [bio, setBio] = useState('');
    let [buttonTitle, setButtonTitle] = useState('Edit');
    let [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() =>{
      getUserProfile(props.sessionToken, props.route.params.user_id).then(
        res =>{
            setUserProfile(res.contentUser);
        }
    ) 
    }, [])

  return (
    <ScrollView>
        <View  >
        <Card>
        <View style={{marginTop:'10%', marginLeft: '40%'}}>
                <Avatar
                    source={{
                    uri: props.avatar,
                    headers: {Range: 'bytes=0-'},
                    }}
                    rounded
                    size={'large'}
                />
        </View>
          <View> 
              <Input onChangeText={(value) => {setName(value)}}  label={'Username'} style={styles.input} defaultValue={userProfile.username}></Input>
          </View> 
          <View>
              <Input onChangeText={(value) => {setUsername(value)}} label={'Name'} style={styles.input} defaultValue={userProfile.name}/>
          </View>
          <View>
              <Input onChangeText={(value) => {setLastname(value)}}  label={'Last Name'} style={styles.input} defaultValue={userProfile.lastname}></Input>
          </View> 

          <View> 
              <Input onChangeText={(value) => {setLocation(value)}} label={'Location'} style={styles.input} defaultValue={userProfile.location}></Input>
          </View>
          <View>
              <Input onChangeText={(value) => {setDate(value)}} label={'Date Of Birth'} style={styles.input} defaultValue={userProfile.date}></Input>
          </View>
          <View>
              <Input multiline onChangeText={(value) => {setBio(value)}} label={'Bio'} style={styles.input} defaultValue={'Soy un estudiante de ingenieria en computacion que esta cursando la materia desarrollo de aplicaciones moviles'}></Input>
          </View>
      
          <Button title={buttonTitle} onPress={() =>{
              setButtonTitle('');
              setLoading(true);
              let data = {
                  username: username,
                  name: name,
                  lastname: lastname,
                  location: location,
                  date: date,
                  avatar:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',
                  bio: bio
              }

              updateUserProfile(data, props.sessionToken).
              then(json => {
                console.log(json)
                  setButtonTitle('Edit');
                  setLoading(false);
                  if(json.verify){
                    props.navigation.navigate('Profile',{user_id: userProfile._id})
                  }
              });
          }} icon={<ActivityIndicator color={'#e94560'} animating={loading} />} disabled={loading}/>  
        
        </Card>
       
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
        justifyContent: "center",
        alignItems: "center",
        
    }, 
    input: {
        height: 30,
        margin: 0,
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
        paddingBottom:250,
        
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: 'white',
        bottom: 50,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
       
    },
    
});

const mapStateToProps = (state) => {
  return {
      name: state.name,
      email: state.email,
      avatar: state.avatar,
      sessionToken: state.sessionToken,
  }
}

export default connect(mapStateToProps, null)(EditProfile);