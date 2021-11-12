import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, RefreshControl, Platform } from "react-native";
import ListItemDetail from "../components/ListItemDetail";
import Title from "../components/Title";
import * as RootNavitaion from "../rootNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import channels, { RecordingItem } from "../utils/channels";
import LoadingIndicator from "../components/LoadingIndicator";
import { getPrettyDateString, getScreenshotUrl } from "../utils/utils";
import { normalize } from "../utils/normalize";
import { BASE_URL, tvizioLogo } from "../utils/constants";
import { CardStyleInterpolators } from "@react-navigation/stack";
import RecordingList from "../components/RecordingsList";

export const defaultScreenOptions = {
    gestureEnabled: true,
    headerShown: true,
    headerShadowVisible: false,
    title: "",
    headerTitleStyle: {
      color: "white"
    },
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: "black",
    },
    headerBackTitleVisible: false,
    cardStyleInterpolator: Platform.OS === 'ios' ? 
    CardStyleInterpolators.forHorizontalIOS  : CardStyleInterpolators.forFadeFromCenter,
  }

type Props = NativeStackScreenProps<RootStackParamList, 'RecordingsForChannel'>;
export default function RecordingsForChannel(props: Props) {

    const [recordings, setRecordings] = useState<RecordingItem[]>([]);
    const [channelInfo, setChannelInfo] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadData();
      }, []);

    useEffect(()=>{
        if(channelInfo && recordings.length > 0){
            setLoading(false);
            setRefreshing(false);
        }
    }, [channelInfo, recordings])

    async function loadData(){
        const cid = props.route.params.cid
        const _recordings = await channels.getRecordings(cid);
        setRecordings(_recordings);
        const _channelInfo = await channels.getChannelInfo(cid);
        setChannelInfo(_channelInfo);
    }

    useEffect(()=>{
        loadData();
    }, []);

    function OpenPlayer(id: string) {
        console.log("Opening player");
        RootNavitaion.navigate("Player", { isLive: false, id })
    }

    function renderRecordings(){
        return (
            <RecordingList
                onRefresh={onRefresh}
                refreshing={refreshing}
                recordings={recordings}
                onPress={(bid)=> OpenPlayer(bid as string)}
            />
        )
    }

    function renderHeader(){
        //Update title
        const title = channelInfo.chName ? `Записи за ${channelInfo.chName}` : "";
        props.navigation.setOptions({ title })
        //
        const channelLogo = channelInfo.logo ? { uri: `${BASE_URL}${channelInfo.logo}`} : tvizioLogo;
        return (
            <View>
                <Image source={channelLogo} resizeMode="contain" style={styles.channelListItemLogo} />
                {/* <Title name={title}/> */}
                <View style={styles.channelListItemSeparator} ></View>
            </View>
        );
    }

    function renderPage(){
        return (
            <View style={{ flex: 1 }}>
                {renderHeader()}
                {renderRecordings()}
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: "black" ,flex: 1, justifyContent: "center"}}>
            {loading ? <LoadingIndicator/> : renderPage()}
        </View>
    );
}

const styles = StyleSheet.create({
    channelListItemSeparator: { height: 2, width: "100%", backgroundColor: "#7A00EE", opacity: 0.8 },
    channelListItemLogo: { width: undefined, height: 80, aspectRatio: 1, marginHorizontal: 8, marginVertical: 16},
});