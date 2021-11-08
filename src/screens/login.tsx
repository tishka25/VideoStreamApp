
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TvizioButton from '../components/TvizioButton';
import TvizioInput from '../components/TvizioInput';
import { RootStackParamList } from '../types';


type Props = NativeStackScreenProps<RootStackParamList, "Login">
export default function Login(props: Props){
    return(
        <View style={styles.container}>
            <Text>Login</Text>
            <View style={styles.loginInputContainer}>
                <TvizioInput title="Code"/>
                <TvizioButton title="Login" onPress={()=>{}}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: "black"
    },
    loginInputContainer:{
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loginInput:{
        width: "80%",
        height: 48,
        borderColor: '#dedede',
        borderWidth: 2
    }
});