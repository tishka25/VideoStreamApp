import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    style?: ViewStyle;
    onPress?: ()=>void;
}

export default function PlayIcon(props: Props) {
    return (
        <Pressable onPress={props.onPress}>
            <View style={props.style}>
                <TouchableOpacity
                    style={styles.playIconContainer}
                >
                    <FontAwesome5Icon
                        name="play"
                        size={22}
                        color="#987bf3"
                        style={{ marginLeft: 4 }}
                />
            </TouchableOpacity>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    playIconContainer: {
        backgroundColor: "#212121",
        padding: 18,
        borderRadius: 40,
        justifyContent: "center",
        alignSelf: "center",
        elevation: 10,
        borderWidth: 4,
        borderColor: "#7A00EE",
        marginBottom: 14,
    },
})