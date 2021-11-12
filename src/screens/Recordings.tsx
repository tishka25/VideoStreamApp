
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../components/Title';
import { RootTabParamList } from '../types';
import * as RootNavigation from "../rootNavigation";
import channels, { LiveChannelItem } from '../utils/channels';
import LoadingIndicator from '../components/LoadingIndicator';
import { BASE_URL } from '../utils/constants';
import RecordingListItemChannelLogo from '../components/RecordingListItemChannelLogo';

type Props = NativeStackNavigationProp<RootTabParamList, 'Recordings'>;

export default function Recordings(props: Props) {

    const [recordedChannels, setChannels] = useState<LiveChannelItem[]>([]);

    async function loadData(){
        setChannels(await channels.getRecordedChannels());
    }

    useEffect(()=>{
        loadData();
    }, []);

    function OpenRecordingPage(cid: string | number){
        RootNavigation.navigate("RecordingsForChannel", { cid })
    }


    function renderChannels(){
        return(
            recordedChannels.map(channel=>{
                return (
                    <View style={styles.listItem} key={channel.cid}>
                        <RecordingListItemChannelLogo 
                            imageSrc={`${BASE_URL}${channel.logo}`}
                            onPress={()=> OpenRecordingPage(channel.cid)}
                        />
                    </View>
                );
            })
        );
    }

    function renderLoadingIndicator(){
        return(
            <View style={{ flex:1,justifyContent: "center"}}>
                <LoadingIndicator />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Title name="Записи за канали" />
            <ScrollView 
                style={styles.scrollContainer}
            >
                <View style={styles.innerContainer}>
                    {recordedChannels.length > 0 ? renderChannels() : renderLoadingIndicator()}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "black"
    },
    scrollContainer: {
        display: "flex",
        backgroundColor: "black",
        width: "100%",
    },
    innerContainer: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: "space-between",
        alignItems: "center"
    },
    listItem: {
        width:"33%",
    }

});