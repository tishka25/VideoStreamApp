import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import user from '../utils/user';


export default function Profile() {

  const [userInfo, setUserInfo] = useState(user.get());

  function renderProfileInfo(){
    return (
      <Text style={styles.text}>{`Profile: ${userInfo.email}`}</Text>
    )
  }

  return (
    <View style={styles.container}>
      {renderProfileInfo()}
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#15152d',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
  },
  text: {
    color: "white"
  }
});
