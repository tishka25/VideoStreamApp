import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    style?: ViewStyle;
    onPress?: ()=>void;
}

export default function CloseIcon(props: Props) {
    return (
        <View style={props.style}>
        <TouchableOpacity>
            <FontAwesome5Icon
                name="times-circle"
                onPress={props.onPress}
                size={28}
                color="#987bf3"
                style={{ marginLeft: 4 }}
                />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
})