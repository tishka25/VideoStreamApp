import React, { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as RootNavitaion from "../rootNavigation";


export interface ILiveChannelListItem {
    imageSrc: string;
    logoSrc: string;
    channelName: string;
    currentShowName: string;
    nextShowName: string;
    elapsed: number;
    start: string;
    startNext: string;
    cid: string;
    rec: string | number;
}

export function LiveChannelListItem(props: ILiveChannelListItem & { onPress?: ()=>void }) {
    const [selected, setSelected] = useState<'undefined' | 'show' | 'hide'>('undefined');

    useEffect(()=>{
        if(selected === 'hide')
            setSelected('show');
    },[selected]);

    function handlePress(){
        RootNavitaion.navigate("LiveChannelDetailView", props);
        if(props.onPress)
            props.onPress()
    }

    return (
        <TouchableOpacity style={styles.channelListItemTouchableContainer} 
            onPress={handlePress}
        >
            <Image source={{ uri: props.imageSrc }} style={styles.channelListItemBackground} resizeMode="contain"/>
            {/* <View style={styles.channelListItemSeparator} ></View> */}
            <View style={styles.channelListItemContainer}>
                <Image source={{ uri: props.logoSrc }} style={styles.channelListItemLogo} resizeMode="contain"/>
                <Text style={{ color: "white", marginBottom: 8 }}>{props.channelName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    channelListItemBackground: { width: 180, height: 80},
    channelListItemLogo: {width: undefined, height: 60, aspectRatio: 1},
    channelListItemSeparator: { position: "absolute", height: 2, width: "100%", backgroundColor: "#7A00EE", opacity: 0.8 },
    channelListItemTouchableContainer: {
        width: "100%",
        flex:1,
        flexDirection: "row",
        marginVertical: 2,
    },
    channelListItemContainer: { flex:1, justifyContent: "space-between", alignItems: "center" , width: "100%"}
});
