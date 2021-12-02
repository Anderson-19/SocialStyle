import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Pressable, ScrollView, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { Input, Text, Icon, Avatar, Card, ListItem, Image } from 'react-native-elements';
import { getPosts, deletePost, getSearchPosts } from '../services/postServices';

function Dashboard(props) {
    const [post, setPost] = useState([]);
    const [tablaPost, setTablaPost]= useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({
        posts: '',
        users: ''
    })

    const getSearch = (name, value) =>{
        setSearch({...search, [name]: value})
        filtrar(search.posts);
    }

    useEffect(()=>{
 
        getPosts(props.sessionToken).
        then( json =>{
           setPost(json.content)
           setLoading(false)
        }) 
    })

    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda = post.filter((elemento)=>{
          if(elemento.description.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()/* )
          || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase() */)
          ){
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
                    <Icon type={'font-awesome-5'} name={'search'} />
                    </Pressable>
                }
                </>
            }
            />
            {search.posts.length > 0 ? (
                tablaPost.map(items =>{
                    return(
                        <ListItem key={items._id} bottomDivider>
                            <ListItem.Chevron /> 
                            <ListItem.Content>
                                <View>
                                    <Avatar
                                        source={{
                                        uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',
                                        headers: {Range: 'bytes=0-'},
                                        }}
                                        rounded
                                        size={'medium'}
                                    />
                                    <Text style={{fontSize: 18, marginTop:'-10%' ,marginLeft: '20%'}} >{props.name}</Text>
                                    <Text style={{fontSize: 16, marginTop:'8%' ,marginLeft: '-1%'}} >{items.description}</Text> 
                                    <Image
                                      source={{ uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png' }}
                                      style={{ width: 300, height: 300 }}
                                      PlaceholderContent={<ActivityIndicator />}
                                    />
                                    <Card.Divider />
                                        <Text style={ styles.textActions }>{`${1} likes   |   ${1} dislikes   |   ${1} comments`}</Text>
                                    <Card.Divider />
                                </View>
                                <View style={styles.viewStyle}>
                                    {/* this.props.ownerButtons */true ? (
                                        <>
                                        <Pressable
                                            android_ripple={{color: 'gray', borderless: true}}
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
                                            <Icon
                                            style={styles.iconStyle}
                                            color={/* this.state.loading ?  */'gray'/*  : 'red' */}
                                            name={'trash'}
                                            type={'font-awesome-5'}
                                            />
                                        </Pressable>
                                        <Pressable
                                            android_ripple={{color: 'gray', borderless: true}}
                                            onPress={() =>{ props.navigation.navigate('EditPost',{post_id: post._id})}} >
                                            <Icon style={styles.iconStyle} name={'pen'} type={'font-awesome-5'} />
                                        </Pressable>
                                        </>
                                    ) : null}
                                    <Pressable
                                        android_ripple={{color: 'gray', borderless: true}}
                                        /* onPress={this.props.onCommentPress} */>
                                        <Icon style={styles.iconStyle} name={'comment'} type={'font-awesome-5'} />
                                    </Pressable>
                                    <Pressable
                                        android_ripple={{color: 'gray', borderless: true}}
                                        /* onPress={() => this.interact('dislike')} */>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-down'}
                                        type={'font-awesome-5'}
                                        color={
                                            /* this.state.loading
                                            ? 'gray'
                                            : this.state.interaction.dislike === 'ADD'
                                            ? */ 'black'
                                            /* : 'red' */
                                        }
                                        solid={/* this.state.interaction.dislike === */ 'REMOVE'}
                                        />
                                    </Pressable>
                                    <Pressable
                                        android_ripple={{color: 'gray', borderless: true}}
                                        /* onPress={() => this.interact('like')} */>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-up'}
                                        type={'font-awesome-5'}
                                        color={
                                            /* this.state.loading
                                            ? 'gray'
                                            : this.state.interaction.like === 'ADD'
                                            ? */ 'black'
                                            /* : 'lime' */
                                        }
                                        solid={/* this.state.interaction.like ===  */'REMOVE'}
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
                            <ListItem.Content>
                                <View>
                                    <Avatar
                                        source={{
                                        uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',
                                        headers: {Range: 'bytes=0-'},
                                        }}
                                        rounded
                                        size={'medium'}
                                    />
                                    <Text style={{fontSize: 18, marginTop:'-10%' ,marginLeft: '20%'}} >{props.name}</Text>
                                    <Text style={{fontSize: 16, marginTop:'8%' ,marginLeft: '-1%'}} >{post.description}</Text> 
                                    <Image
                                      source={{ uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png' }}
                                      style={{ width: 300, height: 300 }}
                                      PlaceholderContent={<ActivityIndicator />}
                                    />
                                    <Card.Divider />
                                        <Text style={ styles.textActions }>{`${1} likes   |   ${1} dislikes   |   ${1} comments`}</Text>
                                    <Card.Divider />
                                </View>
                                <View style={styles.viewStyle}>
                                    {/* this.props.ownerButtons */true ? (
                                        <>
                                        <Pressable
                                            android_ripple={{color: 'gray', borderless: true}}
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
                                            <Icon
                                            style={styles.iconStyle}
                                            color={/* this.state.loading ?  */'gray'/*  : 'red' */}
                                            name={'trash'}
                                            type={'font-awesome-5'}
                                            />
                                        </Pressable>
                                        <Pressable
                                            android_ripple={{color: 'gray', borderless: true}}
                                            onPress={() =>{ props.navigation.navigate('EditPost',{post_id: post._id})}} >
                                            <Icon style={styles.iconStyle} name={'pen'} type={'font-awesome-5'} />
                                        </Pressable>
                                        </>
                                    ) : null}
                                    <Pressable
                                        android_ripple={{color: 'gray', borderless: true}}
                                        /* onPress={this.props.onCommentPress} */>
                                        <Icon style={styles.iconStyle} name={'comment'} type={'font-awesome-5'} />
                                    </Pressable>
                                    <Pressable
                                        android_ripple={{color: 'gray', borderless: true}}
                                        /* onPress={() => this.interact('dislike')} */>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-down'}
                                        type={'font-awesome-5'}
                                        color={
                                            /* this.state.loading
                                            ? 'gray'
                                            : this.state.interaction.dislike === 'ADD'
                                            ? */ 'black'
                                            /* : 'red' */
                                        }
                                        solid={/* this.state.interaction.dislike === */ 'REMOVE'}
                                        />
                                    </Pressable>
                                    <Pressable
                                        android_ripple={{color: 'gray', borderless: true}}
                                        /* onPress={() => this.interact('like')} */>
                                        <Icon
                                        style={styles.iconStyle}
                                        name={'thumbs-up'}
                                        type={'font-awesome-5'}
                                        color={
                                            /* this.state.loading
                                            ? 'gray'
                                            : this.state.interaction.like === 'ADD'
                                            ? */ 'black'
                                            /* : 'lime' */
                                        }
                                        solid={/* this.state.interaction.like ===  */'REMOVE'}
                                        />
                                    </Pressable>
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
        color: '#00aae4',
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
        flex: 1,
        flexDirection: 'row-reverse',
        margin: 10,
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

