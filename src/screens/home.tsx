import React, { useRef, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Carousel from 'react-native-anchor-carousel';
// import { MaterialIcons, FontAwesome5 } from "react-native-vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation';
//@ts-ignore
import { SERVER_URL } from "@env"


export default function Home(props: any) {
    Orientation.lockToPortrait()


    const [gallery, setgallery] = useState([
        {
            image: `${SERVER_URL}/thumbnail/0`,
            title: "Посоки",
            released: '2018',
            desc: "„Посоки“ е игрален филм от 2017 г. на режисьора Стефан Командарев. Той е копродукция между България, Германия и Република Македония. Филмът е подкрепен от Националния филмов център – България, Регионалния филмов фонд МДМ – Германия, Македонската филмова агенция, „КИА моторс“ – България, Дарик радио, Yellow Taxi.",
            key: "0"
        },
        {
            image: `${SERVER_URL}/thumbnail/1`,
            title: "Слава",
            released: '2016',
            desc: "Слава е български игрален филм от 2016 година на режисьорите – Кристина Грозева и Петър Вълчанов. Това е вторият филм от планираната трилогия на двамата режисьори. Филмът взима участие в множество филмови фестивали по света, като прави дебюта си на кинофестивала в Локарно на 4 август 2016 година.",
            key: "1"
        },
        {
            image: `${SERVER_URL}/thumbnail/2`,
            title: "Tilt",
            released: "2011",
            desc: "Тилт“ е български игрален филм от 2011 година на режисьора Виктор Чучков, по сценарий на Борислав Чучков и Виктор Чучков. Оператор е Рали Ралчев.",
            key: "2"
        },
        {
            image: `${SERVER_URL}/thumbnail/3`,
            title: "Бензин",
            released: "2017",
            desc: "„Бензин“ е български игрален филм от 2017 година на режисьорите Асен Блатечки и Катерина Горанова. Сценарият е на Алексей Кожухаров. Оператор е Мартин Чичов.",
            key: "3"
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(gallery[0]);

    const [lastWatchedMovie, setLastMovie] = useState(gallery[0]);


    const carouselRef = useRef(null);

    const { width, height } = Dimensions.get("window");


    const OpenPlayer = (id: string)=>{
        props.navigation.navigate("Player", { id });
    }


    //@ts-ignore
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    onPress={() => {
                        if(carouselRef != null){
                            //@ts-ignore
                            carouselRef.current.scrollToIndex(index);
                            setSelectedMovie(item);
                        }
                    }}
                >
                    <Image source={{ uri: item.image }} style={styles.carouselImage} />
                    <Text style={styles.carouselText}>{item.title}</Text>
                    <MaterialIcons name="library-add" size={30} color="white" style={styles.carouselIcon} />
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <ScrollView style={{ backgroundColor: "#15152d" }}>
            <View style={styles.carouselContentContainer}>
                <View style={{ backgroundColor: "#000", ...StyleSheet.absoluteFill as {} }}>
                    <ImageBackground
                        source={{ uri: selectedMovie.image }}
                        style={styles.imageBackground}
                        blurRadius={10}
                    >
                        <View style={styles.searchBoxContainer}>
                            <TextInput placeholder="Search" placeholderTextColor="#666" style={styles.searchBox} />
                        </View>
                        <Text style={{
                            color: "white", fontSize: 24, fontWeight: "bold", marginLeft: 10, marginVertical: 10
                        }}>
                            Най-гледани
                        </Text>

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

                        <View style={styles.movieInfoContainer}>
                            <View style={{ justifyContent: "center" }}>
                                <Text style={styles.movieName} >{selectedMovie.title}</Text>
                                <Text style={styles.movieStat}>{selectedMovie.released}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.playIconContainer}
                                onPress={()=> OpenPlayer(selectedMovie.key)}
                            >
                                <FontAwesome5 name="play" size={22} color="#987bf3" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingHorizontal: 14, marginBottom: 14 }}>
                            <Text style={{ color: "white", opacity: 0.8, lineHeight: 20 }}>{selectedMovie.desc}</Text>
                        </View>

                    </ImageBackground>
                </View>
            </View>

            {/* Continue to watch section */}

            <View style={{ marginHorizontal: 14 }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 24, marginTop: 24 }}>Continue Watching</Text>
                <ImageBackground
                    source={{ uri: lastWatchedMovie.image }}
                    style={{ height: 250, width: "100%", backgroundColor: "#000" }}
                    resizeMode="cover"
                >
                    <Text style={{ color: "white", padding: 14, fontWeight: "bold" }}>{lastWatchedMovie.title}</Text>

                    <TouchableOpacity style={[styles.playIconContainer]} onPress={()=> OpenPlayer(lastWatchedMovie.key)}>
                        {/* <Icon name="play" size={24} color="#987bf3" style={{ marginLeft: 4 }}/> */}
                        <FontAwesome5 name="play" size={24} color="#987bf3" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>

                </ImageBackground>

                <View style={{ flexDirection: "row", height: 100, justifyContent: "space-between", alignItems: "center", marginBottom: 24, marginTop: 36 }}>
                    <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>My List</Text>
                    <TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 14, fontWeight: "normal" }}>View All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{ marginBottom: 30 }}
                    data={gallery}
                    horizontal
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => OpenPlayer(item.key)}>
                                <Image source={{ uri: item.image }} style={{ width: 200, height: 300 }} />
                                <View style={{ position: "absolute", height: 5, width: "100%", backgroundColor: "#02ad94", opacity: 0.8 }} ></View>
                                {/* <FontAwesome5 name="play" size={38} color="#fff" style={{
                                    position: "absolute",
                                    top: "45%",
                                    left: "45%",
                                    opacity: 0.9
                                }} /> */}
                            </TouchableOpacity>
                        );
                    }}
                />

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: "flex-start"
    },
    searchBoxContainer: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 4,
        marginVertical: 14,
        width: "95%",
        flexDirection: "row",
        alignSelf: "center"
    },
    searchBox: {
        padding: 12,
        paddingLeft: 20,
        fontSize: 16
    },
    carouselContainerView: {
        width: "100%",
        height: 350,
        justifyContent: "center",
        alignItems: "center"
    },
    carousel: {
        flex: 1,
        overflow: "visible"
    },
    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    carouselText: {
        paddingLeft: 14,
        color: "white",
        position: "absolute",
        bottom: 10,
        left: 2,
        fontWeight: "bold"
    },
    carouselIcon: {
        position: "absolute",
        top: 15,
        right: 15
    },
    movieInfoContainer: {
        flexDirection: "row",
        marginTop: 16,
        justifyContent: "space-between",
        width: Dimensions.get("window").width - 14
    },
    movieName: {
        paddingLeft: 14,
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 6
    },
    movieStat: {
        paddingLeft: 14,
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        opacity: 0.8
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
        marginBottom: 14
    }
});
