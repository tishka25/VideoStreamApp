import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import TvizioButton from '../components/TvizioButton';
import user from '../utils/user';
import * as RootNavigation from "../rootNavigation";

export default function Profile() {

  const [userInfo, setUserInfo] = useState(user.get());

  function renderProfileInfo(){
    return (
      <Text style={[styles.text, styles.child]}>{`Profile: ${userInfo.email}`}</Text>
    )
  }

  async function handleSignout(){
    await user.signOut();
    RootNavigation.reset("Login");
  }

  return (
    <View style={styles.container}>
      {renderProfileInfo()}
      <View style={[styles.child]}>
        <TvizioButton name="Излез" onPress={handleSignout}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
  },
  text: {
    color: "white"
  },
  child: {
    marginVertical: 16,
  }
});
