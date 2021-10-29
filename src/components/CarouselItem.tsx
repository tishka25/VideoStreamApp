import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    imageSrc: string;
    title: string;
    onPress?: any;

}

export default function CarouselItem(props: Props) {
    return (
        <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
                    onPress={props.onPress}
                >
                    <Image source={{ uri: props.imageSrc }} style={styles.carouselImage} />
                    <Text style={styles.carouselText}>{props.title}</Text>
                </TouchableOpacity>
            </View>
    );
}


const styles = StyleSheet.create({
    header: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        marginVertical: 10,
    },
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
    movieInfoContainer: {
        flexDirection: "row",
        marginTop: 16,
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
