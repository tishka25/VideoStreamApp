import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
// import { MaterialIcons, FontAwesome5 } from "react-native-vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation';
//@ts-ignore
import { SERVER_URL } from "@env"
import CarouselView, { ICarouselViewItem } from '../components/CarouselView';
import user from '../utils/user';
import network from '../utils/network';
import LoadingIndicator from '../components/LoadingIndicator';
import { getPrettyDateString, getScreenshotUrl } from '../utils/utils';
import LiveChannelList from '../components/LiveChannelList';
import { BASE_URL } from '../utils/constants';
import { ILiveChannelListItem } from '../components/LiveChannelListItem';


export default function Home(props: any) {
    Orientation.lockToPortrait();

    const [userInfo] = useState(user.get());

    const [loading, setLoading] = useState(true);

    const [historyList, setHistoryList] = useState<ICarouselViewItem[]>([]);
    const [liveList, setLiveList] = useState<ILiveChannelListItem[]>([]);

    // const [lastWatchedMovie, setLastMovie] = useState(gallery[0]);

    async function loadData() {
        // Load history
        const _history = await network.getHistory();
        console.log("History", _history);
        const items: ICarouselViewItem[] = _history.map((element: any) => {
            return {
                imageSrc: getScreenshotUrl(element.cid, element.bid),
                title: "",
                date: getPrettyDateString(element.date, true, false, element.time),
                description: element.name
            }
        });
        setHistoryList(items);
        //
        const _liveList = await network.getChannels();
        setLiveList(_liveList.map((item: any) => {
            return {
                imageSrc: `${BASE_URL}${item.background}?hash=${Date.now()}`, //Disable cache
                logoSrc: `${BASE_URL}${item.logo}`,
                channelName: item.chName,
                currentShowName: item.name,
                nextShowName: item.next_name,
                elapsed: item.elapsed,
                start: item.start,
                startNext: item.start_next,
                cid: item.cid
            }
        }));
        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [])


    const OpenPlayer = (id: string) => {
        props.navigation.navigate("Player", { id });
    }


    return (
        // <View >
        //     {loading ? <ActivityIndicator/> : 
        <ScrollView style={{ backgroundColor: "black" }}>
            <View style={styles.searchBoxContainer}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#666"
                    style={styles.searchBox}
                />
            </View>
            {loading ? <LoadingIndicator /> :
                <View>
                    <CarouselView
                        name="Последно гледани"
                        items={historyList}
                    />
                    <LiveChannelList items={liveList} />
                </View>
            }

            {/* Continue to watch section */}
            {/* <View style={{ marginHorizontal: 14 }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 24, marginTop: 24 }}>Continue Watching</Text>
                <ImageBackground
                    source={{ uri: lastWatchedMovie.image }}
                    style={{ height: 250, width: "100%", backgroundColor: "#000" }}
                    resizeMode="cover"
                >
                    <Text style={{ color: "white", padding: 14, fontWeight: "bold" }}>{lastWatchedMovie.title}</Text>

                    <TouchableOpacity style={[styles.playIconContainer]} onPress={()=> OpenPlayer(lastWatchedMovie.key)}>
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
                            </TouchableOpacity>
                        );
                    }}
                />

            </View> */}

        </ScrollView>
        // }
        // </View>
    );
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
        marginBottom: 14
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
});
