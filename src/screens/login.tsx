
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TvizioButton from '../components/TvizioButton';
import TvizioInput from '../components/TvizioInput';
import { RootStackParamList } from '../types';
import user from '../utils/user';
import * as RootNavitaion from "../rootNavigation";
import TvizioLogo from '../components/TvizioLogo';
import LoadingIndicator from '../components/LoadingIndicator';


type Props = NativeStackScreenProps<RootStackParamList, "Login">
export default function Login(props: Props){
    const [loginCode, setLoginCode] = useState("336378125322");
    const [isLoading, setLoading] = useState(false);
    const [error,setError] = useState<string | undefined>(undefined);
    const onLogin = async ()=>{
        setLoading(true);
        const response = await user.signIn(loginCode);
        setLoading(false);
        if(response){
            // Reset navigation from current point
            RootNavitaion.reset('HomeTabs');
        }else{
            setError("Невалиден код за достъп");
        }
    }

    return(
            <View style={styles.loginInputContainer}>
                <TvizioLogo style={styles.imageLogo}/>
                <Text style={styles.errorText}>{error}</Text>
                <TvizioInput 
                    title="Code"
                    customStyle={styles.loginElement}
                    type="numeric"
                    maxLength={12}
                    defaultValue={loginCode}
                    onChangeText={setLoginCode}
                />
                <TvizioButton 
                    name="Login" 
                    onPress={onLogin}
                    customStyle={styles.loginElement}
                />
                {isLoading && <LoadingIndicator/>}
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "black"
    },
    loginInputContainer:{
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "black"
    },
    loginElement:{
        margin: 8
    },
    imageLogo: {
        marginTop: "20%"
    },
    errorText: {
        color: "red",
    }
});