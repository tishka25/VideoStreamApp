import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";


interface Props {
    name: string;
    color?: string;
}

export default function Title(props: Props) {
    const defaultColor = "white";
    return (
        <View>
            <Text style={[styles.header, { color: props.color || defaultColor }]}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        marginVertical: 10,
    },
});