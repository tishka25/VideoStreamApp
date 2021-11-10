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
    return (
        <View>
            <Title name="Канали на живо"/>
            <FlatList
                style={{ marginBottom: 30 }}
                data={props.items}
                renderItem={({ item, index }) => {
                    return (
                        <LiveChannelListItem
                            {...item}
                        />
                    );
                }}
            />
        </View>
    );
}