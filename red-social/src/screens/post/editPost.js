import React, {useState, useEffect} from 'react';
import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import {Input, Icon, Avatar, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import { getPost, updatePost, getPosts } from '../../services/postServices';

function EditPost (props){
    const initialState = {
        post_id: '',
        comment: '',
    }
  const [post, setPost] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (name, value) =>{
      setPost({...post, [name]: value})
  }

  useEffect(() =>{

      getPost(props.route.params.post_id, props.sessionToken).then( json =>{
            console.log(json.content)
            setPost({
                ...json.content,
                post_id: props.route.params.post_id
            }) 
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
      <View style={{marginTop:'10%', marginLeft: '15%'}}>
        <Avatar
              source={{
              uri: props.avatar,
              headers: {Range: 'bytes=0-'},
              }}
              rounded
              size={'large'}
          />
          <Text style={{fontSize: 22, marginTop:'-14%' ,marginLeft: '28%'}} >{props.name}</Text>
      </View>
      <View style={{marginTop: '15%'}}>
        <Input
          multiline
          maxLength={150}
          value={post.description}
          onChangeText={(value) => handleChangeText("comment", value)}  
          rightIcon={
            <>
                <Pressable
                  onPress={() =>{
                    let data = {
                        post_id: props.route.params.post_id,
                        description: post.description                     
                    }
                      updatePost(data,props.sessionToken).then(
                          res =>{
                            getPost(props.route.params.post_id, props.sessionToken).then(
                                json =>{
                                  setPost({...json.content,
                                    post_id: props.route.params.post_id}) 
                                  setLoading(false);
                                  props.navigation.navigate('Dashboard');
                                }
                            )
                                            
                          }
                      )
                  }} 
                  android_ripple={{color: 'gray', borderless: true}}>
                  <Icon type={'font-awesome-5'} name={'paper-plane'} />
                </Pressable>
            </>
          }
          />
          <>
            <Pressable
              onPress={() =>{alert('file-image')}} 
              android_ripple={{
                color: 'gray',
                borderless: true,
              }}>
              <Icon
                style={{marginRight: '85%'}} 
                type={'font-awesome-5'}
                name={'file-image'}
              />
            </Pressable>
          </>
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
        width: '100%',
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
        width: '100%',
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

export default connect(mapStateToProps, {})(EditPost);
