import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Pressable, ScrollView, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { Input, Text, Icon, Avatar, Card, ListItem, Image } from 'react-native-elements';
import { getPosts, deletePost} from '../services/postServices';
import { getComments, deleteComment } from '../services/postCommentServices';

function Dashboard(props) {
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState([]);
    const [tablaPost, setTablaPost]= useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({
        posts: '',
        users: ''
    });
    const [connect, setConnect] = useState(false);

    const getSearch = (name, value) =>{
        setSearch({...search, [name]: value})
        filtrar(search.posts);
    }

    useEffect(()=>{
        getPosts(props.sessionToken).
        then( json =>{
            setPost(json.content)
            setLoading(false)

        });
        getComments(props.sessionToken).
            then( json =>{
                setComment(json.content)
        }); 
    })

    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda = post.filter((elemento)=>{
          if(elemento.description.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return elemento;
          }
        });
        setTablaPost(resultadosBusqueda);
      }
    
  if(loading){
    return(
        <View>
            <ActivityIndicator color='#9e9e9e' size='large' />
        </View>
    )
  }
  return (
      <ScrollView>
        <View style={{ flex: 1 }}>
            <Input
            placeholder={'Search something'}
            style={styles.textStyle}
            onChangeText={(text) => getSearch("posts", text)} 
            rightIcon={
                <>
                {
                    <Pressable
                    android_ripple={{
                        color: 'gray',
                        borderless: true,
                    }}
                    /* onPress={this.search} */>
                    <Icon type={'font-awesome-5' } name={'search'} />
                    </Pressable>
                }
                </>
            }
            />
            <Text style={{textAlign: 'center'}}>{connect}</Text>
            {search.posts.length > 0 ? (
                tablaPost.map(items =>{
                    return(
                        <ListItem key={items._id} bottomDivider>
                            <ListItem.Chevron /> 
                            <ListItem.Content>
                            <View>
                                    <Avatar
                                        source={{
                                        uri: items.userAuthor.avatar,
                                        headers: {Range: 'bytes=0-'},
                                        }}
                                        rounded
                                        size={'medium'}
                                    />
                                    <Text style={{fontSize: 18, marginTop:'-10%' ,marginLeft: '20%'}} >{items.userAuthor.name+" "+items.userAuthor.lastname}</Text>
                                    <Text style={{fontSize: 16, marginTop:'8%' ,marginLeft: '-1%'}} >{items.description}</Text> 
                                    <Card.Divider />
                                        <Text style={ styles.textActions }>{`${1} likes   |   ${1} dislikes   |   ${1} comments`}</Text>
                                    <Card.Divider />
                                </View>
                                <View style={styles.viewStyle}>
                                    {items.userAuthor.email === props.email ? (
                                        <>
                                        <Pressable
                                            onPress={()=>{
                                                deletePost(items._id, props.sessionToken).then(
                                                    res =>{
                                                        getPosts(props.sessionToken).
                                                        then( json =>{
                                                           setPost(json.content)
                                                           setLoading(false)
                                                        })
                                                    }
                                                )
                                            }} >
                                            <Icon
                                                style={styles.iconStyle}
                                                color={'gray'}
                                                name={'trash'}
                                                type={'font-awesome-5'}
                                            />
                                        </Pressable>
                                        </>
                                    ) : null}
                                    <Pressable onPress={() =>{ props.navigation.navigate('PostComment',{post_id: items._id})}}>
                                        <Icon style={styles.iconStyle} name={'comment'} type={'font-awesome-5'} />
                                    </Pressable>
                                    <Pressable>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-down'}
                                        type={'font-awesome-5'}
                                        color={'black'}
                                        />
                                    </Pressable>
                                    <Pressable>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-up'}
                                        type={'font-awesome-5'}
                                        color={ 'black'}
                                        />
                                    </Pressable>
                                </View>
                            </ListItem.Content>
                        </ListItem>
                        )
                })
            
            ):(
                post.map(post =>{
                    return(
                        <ListItem key={post._id} bottomDivider>
                            <ListItem.Chevron /> 
                            <ListItem.Content >
                                <View style={{backgroundColor:'#3282b8',flex:1.5, borderTopStartRadius: 30,
        borderTopEndRadius: 40}}>
                            <View style={{backgroundColor:'#A6A1A0', flex:1.5, borderTopStartRadius: 60,
        borderTopEndRadius: 60}}>
                                    <Avatar
                                        source={{
                                        uri: post.userAuthor.avatar,
                                        headers: {Range: 'bytes=0-'},
                                        }}
                                        rounded
                                        size={'medium'}
                                    />
                                    <Text style={{fontSize: 18, marginTop:'-10%' ,marginLeft: '20%'}} 
                                        onPress={() =>{ 
                                            if(post.userAuthor.email !== props.email){
                                                props.navigation.navigate('UsersProfiles',{user_id: [post.userAuthor._id, 'true']})
                                            }else{
                                                props.navigation.navigate('Profile')
                                            }
                                        }}
                                    >{"@"+post.userAuthor.name+" "+post.userAuthor.lastname}</Text> 
                                    <Text style={{fontSize: 16, marginTop:'8%' ,marginLeft: '-1%'}} >{post.description}</Text> 
                                    <Card.Divider />
                                        <Text style={ styles.textActions }>{`${1} likes   |   ${1} dislikes   |   ${1} comments`}</Text>
                                    <Card.Divider />
                                </View>
                                <View style={styles.viewStyle}>
                                    {post.userAuthor.email === props.email ? (
                                        <>
                                        <Pressable   
                                            onPress={()=>{
                                                deletePost(post._id, props.sessionToken).then(
                                                    res =>{
                                                        getPosts(props.sessionToken).
                                                        then( json =>{
                                                           setPost(json.content)
                                                           setLoading(false)
                                                        })
                                                    }
                                                )
                                            }} >
        
                                             <Avatar
                                                source={{
                                                uri: 'https://image.flaticon.com/icons/png/512/18/18297.png',
                                                headers: {Range: 'bytes=0-'},
                                                }}
                                                rounded
                                                size={'small'}
                                            />
                                        </Pressable>
                                        </>
                                    ) : null}
                                    <Pressable onPress={() =>{ props.navigation.navigate('PostComment',{post_id: post._id})}} >
                                        <Icon style={styles.iconStyle} name={'comment'} type={'font-awesome-5'} />
                                    </Pressable>
                                    <Pressable>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-down'}
                                        type={'font-awesome-5'}
                                        color={'black'}
                                        />
                                    </Pressable>
                                    <Pressable>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-up'}
                                        type={'font-awesome-5'}
                                        color={ 'black'}
                                        
                                        />
                                    </Pressable>
                                    </View>
                               {comment ? comment.map(comments =>
                                {
                                    if(post._id === comments.author){
                                        return(
                                        <ListItem key={comments._id} bottomDivider>
                                            <ListItem.Chevron /> 
                                            <ListItem.Content>
                                            <View style={{backgroundColor:'#4A5050' , borderColor:'#000000'}}>
                                                <Text style={{fontSize: 14,color:'#FFFFFF', marginBottom:2}} >{comments.description}</Text> 
                                                <Card.Divider />
                                                    <Text style={ styles.textActions }>{`${1} likes   |   ${1} dislikes   |   ${1} comments`}</Text>
                                                <Card.Divider />
                                            </View>
                                            <View style={styles.viewStyle}>
                                                {post._id === comments.author ? (
                                                    <>
                                                    <Pressable   
                                                        onPress={()=>{
                                                            deleteComment(comments._id, props.sessionToken).then(
                                                                res =>{
                                                                    getComments(props.sessionToken).
                                                                    then( json =>{
                                                                        setComment(json.content)
                                                                        setLoading(false)
                                                                    });
                                                                }
                                                            )
                                                        }} >
                    
                                                        <Avatar
                                                            source={{
                                                            uri: 'https://image.flaticon.com/icons/png/512/18/18297.png',
                                                            headers: {Range: 'bytes=0-'},
                                                            }}
                                                            rounded
                                                            size={'small'}
                                                        />
                                                    </Pressable>
                                                    </>
                                                ) : null}
                                                <Pressable onPress={() =>{ props.navigation.navigate('PostComment',{post_id: post._id})}} >
                                                    <Icon style={styles.iconStyle} name={'comment'} type={'font-awesome-5'} />
                                                </Pressable>
                                                <Pressable>
                                                    <Icon
                                                    style={styles.iconStyle}
                                                    name={'thumbs-down'}
                                                    type={'font-awesome-5'}
                                                    color={'black'}
                                                    />
                                                </Pressable>
                                                <Pressable>
                                                    <Icon
                                                    style={styles.iconStyle}
                                                    name={'thumbs-up'}
                                                    type={'font-awesome-5'}
                                                    color={ 'black'}
                                                    
                                                    />
                                                </Pressable>
                                            </View>
                                            </ListItem.Content>
                                        </ListItem> 
                                        )
                                    }
                                }): null} 
                                </View>
                            </ListItem.Content>
                            
                        </ListItem>
                    )
                })

            )
            }   
        </View>
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
    createAccount: {
        color: '#3282b8',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
        left: '2%',
        position: 'relative',
        top: '3%'
    },
    textStyle:{
        fontSize: 18,
        marginTop: 15,
    },
    textActions:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        marginLeft: 25
    },
    iconStyle:{
        paddingLeft: 5,
        paddingRight: 10,
        marginLeft: 16
    },
    viewStyle:{
        display: 'flex',
        flex: 1.5,
        flexDirection: 'row-reverse',
        marginBottom: 10,
        backgroundColor:'#3282b8',
        borderColor:'#000000',
        borderBottomStartRadius: 20, 
        borderBottomEndRadius:20
    }
});

const mapStateToProps = (state) => {
    return {
        name: state.name,
        email: state.email,
        avatar: state.avatar,
        sessionToken: state.sessionToken,
    }
}


export default connect(mapStateToProps, null)(Dashboard);

