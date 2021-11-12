import React, { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import channels, { RecordingItem } from "../utils/channels";
import { normalize } from "../utils/normalize";
import { getPrettyDateString, getScreenshotUrl } from "../utils/utils";
import ListItemDetail from "./ListItemDetail";

interface Props {
    cid: string | number;
    recordings: RecordingItem[];
    onPress?: (bid: string | number)=>void;
    onRefresh?: ()=>void;
    refreshing?: boolean;
}

export default function RecordingList(props: Props) {

    function handlePress(bid: string | number){
        if(props.onPress)
            props.onPress(bid);
    }

    return (
        <FlatList
        refreshControl={
            <RefreshControl
            refreshing={props.refreshing || false}
            onRefresh={props.onRefresh}
            />
        }
        data={props.recordings}
        renderItem={({item ,index})=>{
            return (
                <ListItemDetail
                    title={item.name}
                    subtitle={getPrettyDateString(item.date, true, false, item.time)}
                    imageSrc={getScreenshotUrl(props.cid, item.bid)}
                    height={80}
                    titleFontSize={normalize(14)}
                    subtitleFontSize={normalize(12)}
                    onPress={() => handlePress(item.bid)}
                    key={`${item.bid}-all-${index}`}
                />
            );
        }}
    />
    )
}

const styles = StyleSheet.create({

})