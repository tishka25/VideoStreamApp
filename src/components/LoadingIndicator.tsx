
import React from 'react';
import { ActivityIndicator, Dimensions, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface Props {
}

export default function LoadingIndicator(props: Props){
    
    return (
        <ActivityIndicator size="large" color="#0000ff" style={styles.container}/>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height,
        left: 0,
        top: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#00000000"
        // backgroundColor:"black"
    },
    indicator: {

    }
});