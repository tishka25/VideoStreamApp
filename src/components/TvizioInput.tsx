
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    title: string;
    customStyle?: StyleProp<ViewStyle>
}

export default function TvizioInput(props: Props){
    return (
        <TextInput 
            style={[styles.container, props.customStyle]} 
            placeholder={props.title}
            placeholderTextColor={"white"}
        ></TextInput>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        width: "80%",
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#7A00EE',
        borderRadius: 40,
        fontSize: 12,
        padding: 16,
        color: "white",
        textDecorationColor: "white",
        backgroundColor: "black"
    }
});