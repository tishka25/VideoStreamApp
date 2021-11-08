
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TvizioButton from '../components/TvizioButton';
import TvizioInput from '../components/TvizioInput';
import { RootStackParamList } from '../types';
import user from '../utils/user';


type Props = NativeStackScreenProps<RootStackParamList, "Login">
export default function Login(props: Props){
    const [loginCode, setLoginCode] = useState("336378125321");
    const onLogin = ()=>{
        user.signIn(loginCode);
    }

    return(
        <View style={styles.container}>
            <Text>Login</Text>
            <View style={styles.loginInputContainer}>
                <TvizioInput 
                    title="Code"
                    customStyle={styles.loginElement}
                    type="numeric"
                    maxLength={12}
                    defaultValue={loginCode}
                    onChangeText={setLoginCode}
                />
                <TvizioButton 
                    title="Login" 
                    onPress={onLogin}
                    customStyle={styles.loginElement}
                />
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
    loginElement:{
        margin: 8
    },
    loginButton: {

    }
});