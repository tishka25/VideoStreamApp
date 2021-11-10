import React from "react";
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { normalize } from "../utils/normalize";

interface Props {
    subtitle: string;
    title: string;
    imageSrc: string;
    height?: number;
    titleFontSize?:number;
    subtitleFontSize?:number;
}

export default function ListItemDetail(props: Props) {
    const defaultHeight = 120;
    const defaultTitleFontSize = normalize(18);
    const defaultSubtitleFontSize = normalize(14);
    return (
        <View style={[styles.container, { height: props.height || defaultHeight }]}>
            <View style={styles.col}>
                <View style={[styles.row, { alignItems: "center" }]}>
                    <Image source={{ uri: props.imageSrc }} resizeMode="contain" style={styles.channelListItemLogo}/>
                    <View style={[styles.col, { justifyContent: "center", marginLeft: 8 }]}>
                        <Text style={[styles.title, { fontSize: props.titleFontSize || defaultTitleFontSize }]}>{props.title}</Text>
                        <Text style={[styles.subtitle, { fontSize: props.subtitleFontSize || defaultSubtitleFontSize }]}>{props.subtitle}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { width: "100%", paddingLeft: 8, paddingRight: 8, backgroundColor: undefined},
    row: {
        flex: 1,
        flexDirection: "row"
    },
    col: {
        flex: 1,
        flexDirection: "column"
    },
    title: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 8,
    },
    subtitle: {
        color: "white",
        fontWeight: "normal",
        marginLeft: 32,
    },
    channelListItemLogo: { width: undefined, height: 64, aspectRatio: 1 },
})