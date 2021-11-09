import React from "react";
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"

interface Props {
    date: string;
    name: string;
    logoSrc: string;
    height?: number;
}

export default function CurrentShow(props: Props) {
    return (
        <View style={{ height: 120,width: "100%" ,backgroundColor: "grey" }}>
            <View style={[styles.col, { justifyContent: "center" }]}>
                <Text style={styles.text}>{props.name}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row"
    },
    col: {
        flex: 1,
        flexDirection: "column"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 8
    },
    date: {
        color: "white",
        fontWeight: "normal",
        marginLeft: 32
    },
    channelListItemLogo: { width: undefined, height: 64, aspectRatio: 1 },
})