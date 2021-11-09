import React from "react";
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

export default function PlayIcon(props: any) {
    return (
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
        borderColor: "rgba(2,173,148,0.2)",
        marginBottom: 14,
    },
})