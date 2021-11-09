
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types';
import * as RootNavitaion from "../rootNavigation";
import user from '../utils/user';
//@ts-ignore
// import tvizioLogo from "../icons/tvizio logo.png"

type Props = NativeStackScreenProps<RootStackParamList, "Launcher">
export default function Launcher(props: Props){

    setTimeout(async ()=>{
        if(await user.autoSignIn()){
            RootNavitaion.reset('HomeTabs');
        }else{
            RootNavitaion.reset("Login");
        }
    }, 1000);

    return(
        <View style={styles.container}>
            <Image style={styles.imageLogo} resizeMode="contain" source={require("../icons/tvizio_logo.png")}/>
            <ActivityIndicator color="white" size="large"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems:"center"
    },
    imageLogo: {
        width: 256,
        height: undefined,
        aspectRatio: 1
    }
});