import React, { useEffect, useState } from "react";
import { StyleSheet, View, } from "react-native"
import channels, { RecordingItem } from "../utils/channels";
import RecordingsList from "./RecordingsList";
import * as RootNavitaion from "../rootNavigation";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
    searchQuery: string;
}

export default function SearchView(props: Props) {

    const [recordings, setRecordings] = useState<RecordingItem[] | undefined>(undefined);
    const [loading , setLoading] = useState(true);

    async function loadData(){
        const _recordings = await channels.searchArchive(props.searchQuery);
        setRecordings(_recordings);
    }

    useEffect(()=>{
        loadData();
    }, [props.searchQuery]);

    useEffect(()=>{
        if(recordings){
            setLoading(false);
        }
    }, [recordings]);



    function OpenPlayer(id: string | number) {
        RootNavitaion.navigate("Player", { isLive: false, id })
    }

    function renderRecordings(){
        return (
            <RecordingsList
                recordings={recordings as any}
                onPress={OpenPlayer}
            />
        );
    }

    return (
            loading ? <LoadingIndicator/> : renderRecordings()
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        width: "100%",
        height:"100%"
    }
})