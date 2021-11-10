
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { BaseButtonProps } from 'react-native-gesture-handler';
import { normalize } from '../utils/normalize';

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
            <Text 
                style={styles.buttonText}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {props.title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        color: '#FFFFFF',
        fontSize: normalize(12),
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