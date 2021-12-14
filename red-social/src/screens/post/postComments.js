import React, {useState, useEffect} from 'react';
import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import {Input, Icon, Avatar, Text, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import { createComment } from '../../services/postCommentServices';
import { getPost } from '../../services/postServices';

function PostComment (props){
    const initialState = {
        post_id: '',
        description: '',
        createdAt:''
    }
  const [post, setPost] = useState(initialState);
  const [comment, setComment] = useState({post_id: '', comment: '',});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeText = (name, value) =>{
        setComment({...comment, [name]: value})
  }

useEffect(() =>{
      getPost(props.route.params.post_id, props.sessionToken).then(
          json =>{
            setPost({
                ...json.contentPost,
                post_id: props.route.params.post_id
            }) 
            setUser(json.contentUser)
            console.log(props.route.params.post_id)
            console.log(json.contentPost)

            setLoading(false);
          }
      )
  },[]) 

  if(loading){
      return(
          <View>
              <ActivityIndicator color='#9e9e9e' size='large' />
          </View>
      )
  }
  return (
    <View>
        <View >
          <Card >
            <Avatar
                containerStyle={{marginTop: "-2%"}}
                source={{
                /* uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png', */
                uri: user.avatar,
                headers: {Range: 'bytes=0-'},
                }}
                rounded
                size={'small'}
            />
            <Text style={{fontSize: 18, marginTop:'-8%' ,marginLeft: '12%'}} >{user.name+" "+user.lastname}</Text>
            <Card.Divider style={{paddingTop: 12}}/>
            <Text style={{fontSize: 18}} >{post.description}</Text>
            <Text style={{fontSize: 15, marginLeft: '70%'}} >{post.createdAt.split('T')[0].split('-')[2]+"-"+post.createdAt.split('T')[0].split('-')[1]+"-"+post.createdAt.split('T')[0].split('-')[0]}</Text>
            <Text style={{fontSize: 15}} >commenting on {user.email}</Text>
            <Card.Divider style={{paddingTop: 8}}/>
            <Input
                multiline
                maxLength={150}
                placeholder={'Comment'}
                onChangeText={(value) => handleChangeText("comment", value)}  
                rightIcon={
                  <>
                      <Pressable
                        onPress={() =>{
                          let data = {
                            comment: comment.comment, 
                            sessionToken: props.sessionToken,
                            id: props.route.params.post_id            
                          }
                          createComment(data).
                          then( json =>{
                               props.navigation.navigate('Dashboard')
                            })
                        }} 
                        android_ripple={{color: 'gray', borderless: true}}>
                        <Icon type={'font-awesome-5'} name={'paper-plane'} />
                      </Pressable>
                  </>
                }
            />
          </Card>
        </View>
      </View>
   
       
  );
}

const styles = StyleSheet.create({
    iconContainer:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    imageStyle:{
        alignSelf: 'center',
        width: 100,
        height: 500,
        borderRadius: 15,
        resizeMode: 'contain',
        marginTop: 25,
    },
    iconStyle:{
        paddingLeft: 10, 
    },
    videoStyle:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: 100,
        height: 300,
        borderRadius: 15,
        backgroundColor: 'gray',
        display: 'flex',
        flex: 1,
        marginTop: 25,
        marginBottom: 25,
    }
})

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        avatar: state.avatar,
        name: state.name
    }
}

export default connect(mapStateToProps, {})(PostComment);