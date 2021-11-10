import React, { useState } from "react";
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CloseIcon from "./CloseIcon";
import LiveChannelDetailView from "./LiveChannelDetailView";
import PlayIcon from "./PlayIcon";

export interface ILiveChannelListItem {
    imageSrc: string;
    logoSrc: string;
    channelName: string;
    currentShowName: string;
    nextShowName: string;
    elapsed: number;
    start: string;
    startNext: string;
}

export function LiveChannelListItem(props: ILiveChannelListItem & { onPress?: ()=>void }) {
    const [selected, setSelected] = useState(false);

    function handlePress(){
        setSelected(true);
        if(props.onPress)
            props.onPress()
    }

    return (
        <TouchableOpacity style={styles.channelListItemTouchableContainer} 
            onPress={handlePress}
        >
            <Image source={{ uri: props.imageSrc }} style={styles.channelListItemBackground} resizeMode="contain"/>
            <View style={styles.channelListItemSeparator} ></View>
            <View style={styles.channelListItemContainer}>
                <Image source={{ uri: props.logoSrc }} style={styles.channelListItemLogo} resizeMode="contain"/>
                <Text style={{ color: "white", marginBottom: 8 }}>{props.channelName}</Text>
            </View>
            <LiveChannelDetailView {...props} visible={selected} onClose={()=>setSelected(false)}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    channelListItemBackground: { width: 214, height: 120},
    channelListItemLogo: {width: undefined, height: 64, aspectRatio: 1, marginTop: 8},
    channelListItemSeparator: { position: "absolute", height: 5, width: "100%", backgroundColor: "#7A00EE", opacity: 0.8 },
    channelListItemTouchableContainer: {
        width: "100%",
        flex:1,
        flexDirection: "row"
    },
    channelListItemContainer: { flex:1, justifyContent: "space-between", alignItems: "center" , width: "100%"}
});
