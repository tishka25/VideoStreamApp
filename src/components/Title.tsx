import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { normalize } from "../utils/normalize";


interface Props {
    name: string;
    color?: string;
}

export default function Title(props: Props) {
    const defaultColor = "white";
    return (
        <View>
            <Text 
                style={[styles.header, { color: props.color || defaultColor }]}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {props.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: normalize(20),
        fontWeight: "bold",
        marginLeft: 10,
        marginVertical: 10,
    },
});