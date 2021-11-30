import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Pressable, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Input, Text, Icon, Avatar, Card } from 'react-native-elements';
//import { getPosts } from '../services/postServices';

function Dashboard({navigation, sessionToken, name, email, avatar}) {
    let [description, setDescription] = useState([]);

/*     useEffect(()=>{
        getPosts(sessionToken).
        then( json =>{
            json.content.forEach(element => {
                setDescription(description.push(element.description));
            });
            //setDescription(json.description);
            console.log("DESCRIPCION: "+description);
        }) 
    },[]) */

  return (
      <ScrollView>
        <View style={{ flex: 1 }}>
            <Input
            placeholder={'Search something'}
            style={styles.textStyle}
            /*  onChangeText={text =>
                this.setState({...this.state, search: text})
            } */
            leftIcon={
                <Pressable
                android_ripple={{
                    color: 'gray',
                    borderless: true,
                }}
                /* onPress={() =>
                    this.props.navigation.navigate('ProfileModal', {
                    deviceUser: true,
                    user_id: this.props.state.id,
                    })
                } */>
                </Pressable>
            }
            rightIcon={
                <>
                {/* true? (
                    <ActivityIndicator color={'lime'} />
                ) : ( */
                    <Pressable
                    android_ripple={{
                        color: 'gray',
                        borderless: true,
                    }}
                    /* onPress={this.search} */>
                    <Icon type={'font-awesome-5'} name={'search'} />
                    </Pressable>
                /* ) */}
                </>
            }
            />
        </View>
        <View>
            <Card>
                <Avatar
                    source={{
                    uri: avatar,
                    headers: {Range: 'bytes=0-'},
                    }}
                    rounded
                    size={'medium'}
                />
                <Text style={{fontSize: 18, marginTop:'-10%' ,marginLeft: '20%'}} >{name}</Text>
                {/* {description.forEach(item =>{
                    <Text style={{fontSize: 16, marginTop:'8%' ,marginLeft: '-1%'}} >{item}</Text>
                })
                } */}
                <Card.Image
                    source={{ uri: avatar }} 
                />
                <Card.Divider />
                    <Text style={ styles.textActions}>{`${1} likes | ${1} dislikes | ${1} comments`}</Text>
                <Card.Divider />
                <View style={styles.viewStyle}>
                    {/* this.props.ownerButtons */true ? (
                        <>
                        <Pressable
                            android_ripple={{color: 'gray', borderless: true}}
                           /*  onPress={this.deletePost} */>
                            <Icon
                            style={styles.iconStyle}
                            color={/* this.state.loading ?  */'gray'/*  : 'red' */}
                            name={'trash'}
                            type={'font-awesome-5'}
                            />
                        </Pressable>
                        <Pressable
                            android_ripple={{color: 'gray', borderless: true}}
                            /* onPress={this.props.onEditPress} */>
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
                {/* <SafeAreaView  >
                <FlatList
                    data={[description]}
                    renderItem={({item}) => <Text>{item.item}</Text>}
                    />  
                </SafeAreaView> */}
            </Card>
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
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    iconStyle:{
        paddingLeft: 5,
        paddingRight: 10,
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

