import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import { Avatar, Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUsersFollowing, getUserProfile } from '../services/usersServices';

function Profile(props) {
    const [following, setFollowing] = useState([]);
    const [userProfile, setUserProfile] = useState({});

    useEffect(()=>{
        if(following || userProfile){
            
            getUsersFollowing(props.sessionToken).then(
                res =>{
                    setFollowing(res.contentFollower);
                }
            )
    
             getUserProfile(props.sessionToken, props.route.params.user_id).then(
                res =>{
                    setUserProfile(res.contentUser);
                }
            ) 
        }
        
    }, [following || userProfile])

  return (
 <View >
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
                <Icon
                    onPress={() => props.navigation.navigate('EditProfile',{user_id: userProfile._id})}  
                    style={{marginTop: -1.5}}
                    name={'user-edit'}
                    type={'font-awesome-5'}
                    color={'black'}
                />
        </View>
        <Text style={{fontSize: 22, marginTop:'1%' ,marginLeft: '24%', color:'black'}} >{userProfile.name+" "+ userProfile.lastname}</Text>
        <View style={{display: 'flex', flex: 1, flexGrow: 1}}>
            <Text style={{textAlign: 'center'}}>{following.length} Following  {/* followers.length | */ 0} Followers</Text>
            
        </View>
        <Card.Divider />
        <Text style={{fontSize: 18, marginTop:'1%' , color:'black'}} >Username: {userProfile.username}</Text>
        <Card.Divider />
        <Text style={{fontSize: 18, marginTop:'1%' , color:'black'}} >Location: {userProfile.location}</Text>
        <Card.Divider />
        <Text style={{fontSize: 18, marginTop:'1%' , color:'black'}} >Date Of Birth: {userProfile.date}</Text>
        <Card.Divider />
        <Text style={{fontSize: 18, marginTop:'1%' , color:'black'}} >Bio: {userProfile.bio}</Text>

     </Card>
     <Card>
     {/* <Text >Following: </Text>
         {following.map(following =>{
             return(
                 <View>
                     
                    <ListItem key={following.follower} bottomDivider>
                    <ListItem.Chevron /> 
                    <ListItem.Content>
                    <View>
                        
                            <Avatar
                                source={{
                                uri: following.userFollower.avatar,
                                headers: {Range: 'bytes=0-'},
                                }}
                                rounded
                                size={'medium'}
                            />
                            <Text 
                                style={{fontSize: 18, marginTop: -35, marginLeft: 80, color: 'black'}} 
                                onPress={() =>{ 
                                    if(post.userAuthor.email !== props.email){
                                        props.navigation.navigate('UsersProfiles',{user_id: [post.userAuthor._id, 'true']})
                                    }else{
                                        props.navigation.navigate('Profile')
                                    }
                                }}
                            >{following.userFollower.name+" "+following.userFollower.lastname}</Text>
                    </View>
                    </ListItem.Content>
                    </ListItem>
                 </View>
             )
         })} */}
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