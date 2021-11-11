import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    style?: ViewStyle;
    onPress?: ()=>void;
    size?: number;
}

export default function CloseIcon(props: Props) {
    return (
        // <Pressable
        //     onPress={props.onPress}
        // >
        <View style={props.style}>
        <TouchableOpacity onPress={props.onPress}>
            <FontAwesome5Icon
                name="times-circle"
                size={props.size || 32}
                color="#987bf3"
                />
        </TouchableOpacity>
        </View>
        // </Pressable>
    )
}

const styles = StyleSheet.create({
})