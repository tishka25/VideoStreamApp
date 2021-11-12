
import React from 'react';
import { ActivityIndicator, Dimensions, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface Props {
}

export default function LoadingIndicator(props: Props){
    
    return (
        // <View>
            <ActivityIndicator color="white" size="large"/>
        // {/* </View> */}
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#00000000"
        // backgroundColor:"black"
    },
    indicator: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
    }
});