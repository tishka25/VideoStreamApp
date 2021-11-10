import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PlayIcon from "./PlayIcon";

interface Props {
    title: string;
    date: string;
    description: string;
    onSelect?: () => void;

}

export default function DescriptionBox(props: Props) {

    return (
        <View>
            <View style={styles.movieInfoContainer}>
                <View style={{ justifyContent: "center" }}>
                    <Text style={styles.movieName}>{props.title}</Text>
                    <Text style={styles.movieStat}>{props.date}</Text>
                </View>
                <PlayIcon />
            </View>

            <View style={{ paddingHorizontal: 14, marginBottom: 14 }}>
                <Text style={{ color: "white", opacity: 0.8, lineHeight: 20 }}>
                    {props.description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    carouselContentContainer: {
        flex: 1,
        backgroundColor: "#000",
        height: 720,
        paddingHorizontal: 14,
    },
    imageBackground: {
        flex: 1,
        // height: null,
        // width: null,
        opacity: 1,
        justifyContent: "flex-start",
    },
    searchBoxContainer: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 4,
        marginVertical: 14,
        width: "95%",
        flexDirection: "row",
        alignSelf: "center",
    },
    searchBox: {
        padding: 12,
        paddingLeft: 20,
        fontSize: 16,
    },
    carouselContainerView: {
        width: "100%",
        height: 350,
        justifyContent: "center",
        alignItems: "center",
    },
    carousel: {
        flex: 1,
        overflow: "visible",
    },
    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    carouselText: {
        paddingLeft: 14,
        color: "white",
        position: "absolute",
        bottom: 10,
        left: 2,
        fontWeight: "bold",
    },
    carouselIcon: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    movieInfoContainer: {
        flexDirection: "row",
        marginTop: 0,
        justifyContent: "space-between",
        width: Dimensions.get("window").width - 14,
    },
    movieName: {
        paddingLeft: 14,
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 6,
    },
    movieStat: {
        paddingLeft: 14,
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        opacity: 0.8,
    },
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
});
