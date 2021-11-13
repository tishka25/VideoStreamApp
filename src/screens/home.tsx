import React, { useEffect, useRef, useState } from 'react';
import { Platform, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
//@ts-ignore
import Orientation from 'react-native-orientation';
import CarouselView, { ICarouselViewItem } from '../components/CarouselView';
import network from '../utils/network';
import LoadingIndicator from '../components/LoadingIndicator';
import { getPrettyDateString, getScreenshotUrl } from '../utils/utils';
import LiveChannelList from '../components/LiveChannelList';
import * as RootNavitaion from "../rootNavigation";
import { SafeAreaView } from 'react-native-safe-area-context';
import { normalize } from '../utils/normalize';
import SearchView from '../components/SearchView';
import CloseIcon from '../components/CloseIcon';
import * as _ from "underscore";


export default function Home(props: any) {
    Orientation.lockToPortrait();

    const [loading, setLoading] = useState(true);

    const [historyList, setHistoryList] = useState<ICarouselViewItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadData();
      }, []);


    useEffect(()=>{
        if(historyList.length > 0){
            setLoading(false);
            setRefreshing(false);
        }
    }, [historyList]);

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
    }

    useEffect(() => {
        loadData();
    }, []);


    function OpenPlayer(id: string){
        RootNavitaion.navigate("Player", { isLive: false, id })
    }

    function handleSearchQuery(e: string){
        setSearchQuery(e);
        console.log("Settings stae:",e);
    }

    const handleSearchQueryThrottled = useRef(_.throttle(handleSearchQuery, 1000, { leading: false })).current;

    function handleSearchInput(e: string){
        setSearchInput(e);
        handleSearchQueryThrottled(e);
    }

    function handleClearSearchQuery(){
        setSearchQuery("");
        setSearchInput("");
    }

    function getIsSearching(){
        return searchInput.length >= 3;
    }

    function renderSearchBox(){
        return (
            <View style={{marginBottom: 8}}>
                <SafeAreaView style={{ marginTop: Platform.OS == 'android' ? 16 : 0 }}/>
                <View style={styles.searchBoxContainer}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#666"
                        style={styles.searchBox}
                        numberOfLines={1}
                        value={searchInput}
                        onChangeText={handleSearchInput}
                    />
                    { searchInput.length > 0 &&
                    <CloseIcon 
                        tintColor="black" 
                        size={20}
                        style={{ position: "absolute", right: 16, top: 16 }}
                        onPress={handleClearSearchQuery}
                    />}
                </View>
            </View>
        )
    }

    function renderMainView(){
        return (
                <View>
                    {loading ? <LoadingIndicator /> : 
                    <CarouselView
                        name="Последно гледани"
                        items={historyList}
                        onSelect={OpenPlayer}
                        header={renderSearchBox()}
                        hidden={getIsSearching()}
                    />}
                    {!getIsSearching() && <LiveChannelList refresh={refreshing}/>}
                </View>
        )
    }

    function renderSearchView(){
        return (
            <SearchView searchQuery={searchQuery}/>
        )
    }

    return (
        <View>
        <ScrollView 
            style={{ backgroundColor: "black" }}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }
        >
            <StatusBar barStyle="light-content"/>
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
        {getIsSearching() && renderSearchView()}
        </View>
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
        width: "95%",
        flexDirection: "row",
        alignSelf: "center",
    },
    searchBox: {
        padding: normalize(14),
        paddingLeft: 20,
        fontSize: 16,
        width: "100%"
    },
});
