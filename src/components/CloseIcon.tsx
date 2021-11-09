import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    style?: ViewStyle;
    onPress?: ()=>void;
    size?: number;
}

export default function CloseIcon(props: Props) {
    return (
        <View style={props.style}>
        <TouchableOpacity>
            <FontAwesome5Icon
                name="times-circle"
                onPress={props.onPress}
                size={props.size || 32}
                color="#987bf3"
                />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
})