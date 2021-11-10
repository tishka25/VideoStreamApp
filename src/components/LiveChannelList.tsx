import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import CloseIcon from "./CloseIcon";
import { ILiveChannelListItem, LiveChannelListItem } from "./LiveChannelListItem";
import PlayIcon from "./PlayIcon";
import Title from "./Title";


interface Props {
    items: ILiveChannelListItem[];
}

export default function LiveChannelList(props: Props) {
    function renderItems(){
        return props.items.map((item, index) => {
            return (
                <LiveChannelListItem
                    {...item}
                    key={index}
                />
            );
        })
    }
    return (
        <View>
            <Title name="Канали на живо"/>
            <View style={{ marginBottom: 30 }}>
                {renderItems()}
            </View>
        </View>
    );
}