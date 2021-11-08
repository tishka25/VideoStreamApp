
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../types';
import * as RootNavitaion from "../rootNavigation";

type Props = NativeStackScreenProps<RootStackParamList, "Launcher">
export default function Launcher(props: Props){

    useEffect(()=>{
        setTimeout(()=>{
            RootNavitaion.navigate("Login");
        }, 1000);
    }, []);

    return(
        <View>
            <Text>Launcher</Text>
        </View>
    )
}
