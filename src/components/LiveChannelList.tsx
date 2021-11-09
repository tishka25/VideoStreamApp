import React, { useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export interface ILiveChannelListItem {
    imageSrc: string;
    logoSrc: string;
    channelName: string;
    currentShowName: string;
}

interface Props {
    items: ILiveChannelListItem[];
}

export default function LiveChannelList(props: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    return (
        <FlatList
                    style={{ marginBottom: 30 }}
                    data={props.items}
                    renderItem={({ item,index }) => {
                        return (
                            <LiveChannelListItem 
                                {...item} 
                                selected={index === selectedIndex} 
                                onPress={()=> setSelectedIndex(index)}
                            />
                        );
                    }}
                />
    );
}

export function LiveChannelListItem(props: ILiveChannelListItem & { onPress?: ()=>void, selected?:boolean }) {

    function renderDetailView(){
        return (
            <View style={styles.channelListItemDetailContainer}>
                <Text style={{ color: "white", marginBottom: 8 }}>{props.currentShowName}</Text>
                <TouchableOpacity
                    style={styles.playIconContainer}
                >
                    <FontAwesome5Icon
                        name="play"
                        size={22}
                        color="#987bf3"
                        style={{ marginLeft: 4 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <TouchableOpacity style={styles.channelListItemTouchableContainer} 
            onPress={props.onPress}
        >
            <Image source={{ uri: props.imageSrc }} style={styles.channelListItemBackground} resizeMode="contain"/>
            <View style={styles.channelListItemSeparator} ></View>
            <View style={{ flex:1, justifyContent: "space-between", alignItems: "center" , width: "100%"}}>
                <Image source={{ uri: props.logoSrc }} style={styles.channelListItemLogo} resizeMode="contain"/>
                <Text style={{ color: "white", marginBottom: 8 }}>{props.channelName}</Text>
            </View>
            {props.selected && renderDetailView()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    channelListItemBackground: { width: 214, height: 120},
    channelListItemLogo: {width: undefined, height: 64, aspectRatio: 1, marginTop: 8},
    channelListItemSeparator: { position: "absolute", height: 5, width: "100%", backgroundColor: "#02ad94", opacity: 0.8 },
    channelListItemDetailContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.7,
        flex: 1,
        justifyContent: "space-between"
    },
    channelListItemTouchableContainer: {
        width: "100%",
        flex:1,
        flexDirection: "row"
    },
    playIconContainer: {
        backgroundColor: "#212121",
        padding: 18,
        borderRadius: 40,
        justifyContent: "center",
        alignSelf: "center",
        elevation: 10,
        borderWidth: 4,
        borderColor: "rgba(2,173,148,0.2)",
        marginBottom: 14,
    },
});
