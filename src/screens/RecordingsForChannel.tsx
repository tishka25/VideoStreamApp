import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
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


type Props = NativeStackScreenProps<RootStackParamList, 'RecordingsForChannel'>;
export default function RecordingsForChannel(props: Props) {

    const [recordings, setRecordings] = useState<RecordingItem[]>([]);
    const [channelInfo, setChannelInfo] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(channelInfo && recordings.length > 0)
            setLoading(false);
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
            <FlatList
                data={recordings}
                renderItem={({item ,index})=>{
                    return (
                        <ListItemDetail
                            title={item.name}
                            subtitle={getPrettyDateString(item.date, true, false, item.time)}
                            imageSrc={getScreenshotUrl(props.route.params.cid, item.bid)}
                            height={80}
                            titleFontSize={normalize(14)}
                            subtitleFontSize={normalize(12)}
                            onPress={()=> OpenPlayer(item.bid) }
                            key={`${item.bid}-all-${index}`}
                        />
                    );
                }}
            />
        )
    }

    function renderHeader(){
        const title = channelInfo.chName ? `Записи за ${channelInfo.chName}` : "";
        const channelLogo = channelInfo.logo ? { uri: `${BASE_URL}${channelInfo.logo}`} : tvizioLogo;
        return (
            <View>
                <SafeAreaView/>
                <Image source={channelLogo} resizeMode="contain" style={styles.channelListItemLogo} />
                <Title name={title}/>
                <View style={styles.channelListItemSeparator} ></View>
            </View>
        );
    }

    function renderPage(){
        return (
            <View>
                {renderHeader()}
                {renderRecordings()}
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: "black" ,flex: 1, justifyContent: "center"}}>
            <SafeAreaView/>
            {loading ? <LoadingIndicator/> : renderPage()}
        </View>
    );
}

const styles = StyleSheet.create({
    channelListItemSeparator: { height: 2, width: "100%", backgroundColor: "#7A00EE", opacity: 0.8 },
    channelListItemLogo: { width: undefined, height: 80, aspectRatio: 1, marginTop: 48, marginHorizontal: 8},
});