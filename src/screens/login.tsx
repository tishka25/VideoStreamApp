
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../types';


// { navigation, setTabBarVisible , route}
type Props = NativeStackScreenProps<RootStackParamList, "Login">
export default function Login(props: Props){
    return(
        <View>
            <Text>asd</Text>
        </View>
    )
}
