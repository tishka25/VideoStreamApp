import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
//@ts-ignore
import Orientation from 'react-native-orientation';
import CarouselView, { ICarouselViewItem } from '../components/CarouselView';
import user from '../utils/user';
import network from '../utils/network';
import LoadingIndicator from '../components/LoadingIndicator';
import { getPrettyDateString, getScreenshotUrl } from '../utils/utils';
import LiveChannelList from '../components/LiveChannelList';
import constants, { BASE_URL } from '../utils/constants';
import { ILiveChannelListItem } from '../components/LiveChannelListItem';
import * as RootNavitaion from "../rootNavigation";
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@react-navigation/stack';


export default function Home(props: any) {
    Orientation.lockToPortrait();

    const [userInfo] = useState(user.get());

    const [loading, setLoading] = useState(true);

    const [historyList, setHistoryList] = useState<ICarouselViewItem[]>([]);
    const [liveList, setLiveList] = useState<ILiveChannelListItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);

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
                description: element.name,
                id: element.bid
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
                cid: item.cid,
                rec: item.rec === "1"
            }
        }));
        setLoading(false);
    }

    useEffect(() => {
        loadData();
        // const updateInterval = setInterval(()=>{
        //     loadData();
        // }, constants.DATA_UPDATE_PERIOD_IN_SECONDS);
        // return () => clearInterval(updateInterval);
    }, []);


    function OpenPlayer(id: string){
        RootNavitaion.navigate("Player", { isLive: false, id })
    }

    function renderSearchBox(){
        return (
            <View style={styles.searchBoxContainer}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#666"
                    style={styles.searchBox}
                />
            </View>
        )
    }

    function renderMainView(){
        return (
            loading ? <LoadingIndicator /> :
                <View>
                    <CarouselView
                        name="Последно гледани"
                        items={historyList}
                        onSelect={OpenPlayer}
                        header={renderSearchBox()}
                    />
                    <LiveChannelList items={liveList} />
                </View>
        )
    }

    function renderSearchView(){
        return (
            <Text style={{color: "white"}}>Search view</Text>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: "black" }} bounces={false}>
            <StatusBar barStyle="light-content"/>
            {/* <SafeAreaView style={{ backgroundColor: "black" , flex: 1}}>
            </SafeAreaView> */}
            {/* <View style={styles.searchBoxContainer}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#666"
                    style={styles.searchBox}
                />
            </View> */}
            {renderMainView()}

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
        marginBottom: 14,
        marginVertical: 64,
        width: "95%",
        flexDirection: "row",
        alignSelf: "center",
    },
    searchBox: {
        padding: 20,
        paddingLeft: 20,
        fontSize: 16,
    },
});
