import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    style?: ViewStyle;
    onPress?: ()=>void;
    size?: number;
    tintColor?: string
}

export default function BackIcon(props: Props) {
    return (
        <View style={[styles.icon,props.style]}>
            <TouchableOpacity onPress={props.onPress}>
                <FontAwesome5Icon
                    name="chevron-left"
                    size={props.size || 32}
                    color={props.tintColor || "#987bf3"}
                    />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: "#00000080",
        borderRadius: 32,
        width: 32,
        height: 32
    }
})