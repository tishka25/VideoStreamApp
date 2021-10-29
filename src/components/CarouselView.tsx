import React, { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    FlatList,
    ScrollView,
    TextInput,
    TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from "react-native-anchor-carousel";
// import { MaterialIcons, FontAwesome5 } from "react-native-vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Orientation from "react-native-orientation";
//@ts-ignore
import { SERVER_URL } from "@env";
import DescriptionBox from "./DescriptionBox";
import CarouselItem from "./CarouselItem";

interface Props {
    
}

export default function CarouselView(props: Props) {

    const [gallery, setgallery] = useState([
        {
            image: `${SERVER_URL}/thumbnail/0`,
            title: "Посоки",
            released: "2018",
            desc:
                "„Посоки“ е игрален филм от 2017 г. на режисьора Стефан Командарев. Той е копродукция между България, Германия и Република Македония. Филмът е подкрепен от Националния филмов център – България, Регионалния филмов фонд МДМ – Германия, Македонската филмова агенция, „КИА моторс“ – България, Дарик радио, Yellow Taxi.",
            key: "0",
        },
        {
            image: `${SERVER_URL}/thumbnail/1`,
            title: "Слава",
            released: "2016",
            desc:
                "Слава е български игрален филм от 2016 година на режисьорите – Кристина Грозева и Петър Вълчанов. Това е вторият филм от планираната трилогия на двамата режисьори. Филмът взима участие в множество филмови фестивали по света, като прави дебюта си на кинофестивала в Локарно на 4 август 2016 година.",
            key: "1",
        },
        {
            image: `${SERVER_URL}/thumbnail/2`,
            title: "Tilt",
            released: "2011",
            desc:
                "Тилт“ е български игрален филм от 2011 година на режисьора Виктор Чучков, по сценарий на Борислав Чучков и Виктор Чучков. Оператор е Рали Ралчев.",
            key: "2",
        },
        {
            image: `${SERVER_URL}/thumbnail/3`,
            title: "Бензин",
            released: "2017",
            desc:
                "„Бензин“ е български игрален филм от 2017 година на режисьорите Асен Блатечки и Катерина Горанова. Сценарият е на Алексей Кожухаров. Оператор е Мартин Чичов.",
            key: "3",
        },
    ]);
    const [selectedMovie, setSelectedMovie] = useState(gallery[0]);

    const carouselRef = useRef(null);
    const { width, height } = Dimensions.get("window");

    //@ts-ignore
    const renderItem = ({ item, index }) => {
        return (
            <CarouselItem
                onPress={()=>{
                    if(carouselRef != null){
                        //@ts-ignore
                        carouselRef.current.scrollToIndex(index);
                        setSelectedMovie(item);
                    }
                }}
                title={item.title}
                imageSrc={item.image}
            />
        );
    };

    return (
        <View style={styles.carouselContentContainer}>
            <View
                style={{ backgroundColor: "#000", ...(StyleSheet.absoluteFill as {}) }}
            >
                <ImageBackground
                    source={{ uri: selectedMovie.image }}
                    style={styles.imageBackground}
                    blurRadius={10}
                >
                    <View style={styles.searchBoxContainer}>
                        <TextInput
                            placeholder="Search"
                            placeholderTextColor="#666"
                            style={styles.searchBox}
                        />
                    </View>
                    <Text style={styles.header}>Най-гледани</Text>

                    <View style={styles.carouselContainerView}>
                        <Carousel
                            style={styles.carousel}
                            data={gallery}
                            renderItem={renderItem}
                            itemWidth={200}
                            containerWidth={width - 20}
                            separatorWidth={0}
                            ref={carouselRef}
                            inActiveOpacity={0.4}
                        />
                    </View>

                    <DescriptionBox
                        date={selectedMovie.released}
                        description={selectedMovie.desc}
                        title={selectedMovie.title}
                    />
                   
                </ImageBackground>
            </View>
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
