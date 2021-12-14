import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

function Profile(props) {
  return (
 <View >
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
      <Text style={{fontSize: 22, marginTop:'1%' ,marginLeft: '24%', color:'black'}} >{props.name}</Text>
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