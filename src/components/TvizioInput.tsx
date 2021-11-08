
import React from 'react';
import { KeyboardType, StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    title: string;
    customStyle?: StyleProp<ViewStyle>
    type?: KeyboardType
}

export default function TvizioInput(props: Props & TextInputProps){
    return (
        <TextInput 
            {...props}
            style={[styles.container, props.customStyle]} 
            placeholder={props.title}
            placeholderTextColor={"white"}
            keyboardType={props.type}
            maxLength={props.maxLength}
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