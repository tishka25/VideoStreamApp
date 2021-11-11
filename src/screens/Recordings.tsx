
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../components/Title';
import { RootTabParamList } from '../types';
import * as RootNavigation from "../rootNavigation";

type Props = NativeStackNavigationProp<RootTabParamList, 'Recordings'>;

export default function Recordings(props: Props) {

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <ScrollView style={styles.container}>
                <Title name="Записи за канали" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        width: "100%"
    },

});