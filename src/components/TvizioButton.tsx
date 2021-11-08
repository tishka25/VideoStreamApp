
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface Props {
    onPress?: ()=>void;
    title: string;
    customStyle?: StyleProp<ViewStyle>
}

export default function TvizioButton(props: Props){
    const pressedColor = '#01D357';
    const defaultColor = '#2d2739';
    return (
        <Pressable 
            style={({ pressed }) => [
                {
                backgroundColor: pressed
                    ? pressedColor
                    : defaultColor
                },
                styles.button,
                props.customStyle
            ]}
            onPress={props.onPress}
        >
            <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    button:{
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        height: 48,
        width: 128,
        borderRadius: 40,
    }
});