import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import { Avatar, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUserProfile, userFollow, userUnFollow } from '../../services/usersServices';

function Profile(props) {
    const [userProfile, setUserProfile] = useState({});
    let [buttonTitle, setButtonTitle] = useState('Follow');
    let [loading, setLoading] = useState(false);

    useEffect(()=>{
        getUserProfile(props.sessionToken, props.route.params.user_id[0]).then(
            res =>{
                setUserProfile(res.contentUser);
                if(res.contentFollower.following === props.route.params.user_id[0]){
                    setButtonTitle('Following')
                }else{
                    setButtonTitle('Follow')
                }
            }
        )

    }, [])

  return (
 <View >
     <Card>
        <View style={{marginTop:'10%', marginLeft: '40%'}}>
                <Avatar
                    source={{
                    uri: userProfile.avatar,
                    headers: {Range: 'bytes=0-'},
                    }}
                    rounded
                    size={'large'}
                />
        </View>
        <Text style={{fontSize: 22, marginTop:'1%' ,marginLeft: '24%', color:'black'}} >{userProfile.name+" "+userProfile.lastname}</Text>
        {props.route.params.user_id[1] === 'true' && buttonTitle !== 'Following' ? (
            <Button 
                title={buttonTitle}
                disabled={loading}
                onPress={() =>{
                    setButtonTitle('');
                    setLoading(true);

                    userFollow(props.sessionToken, props.route.params.user_id[0]).
                    then(json => {
                        setButtonTitle('Following');
                        setLoading(false);     
                    }); 
                }}
                icon={<ActivityIndicator color={'#e94560'} animating={loading} />}
            />
        ):(
            <Button 
            title={buttonTitle}
            disabled={loading}
            onPress={() =>{
                setButtonTitle('');
                setLoading(true);

                userUnFollow(props.sessionToken).
                then(json => {
                    setButtonTitle('Follow');
                    setLoading(false);     
                }); 
            }}
            icon={<ActivityIndicator color={'#e94560'} animating={loading} />}
            />
        )}
        <Card.Divider />
        <Text style={{fontSize: 20, marginTop:'1%' , color:'black'}} >Username: {userProfile.username}</Text>
        <Text style={{fontSize: 20, marginTop:'1%' , color:'black'}} >Localtion: {userProfile.location}</Text>
        <Text style={{fontSize: 20, marginTop:'1%' , color:'black'}} >Date: {userProfile.date}</Text>
        <Card.Divider />
     </Card>
  </View> 
   
  );
}


const mapStateToProps = (state) => {
    return {
        name: state.name,
        email: state.email,
        avatar: state.avatar,
        sessionToken: state.sessionToken,
    }
}

export default connect(mapStateToProps, null)(Profile);