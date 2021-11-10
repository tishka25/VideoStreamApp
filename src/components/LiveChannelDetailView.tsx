import React, { useState } from "react";
import { Dimensions, ImageBackground, Modal, StyleSheet, Text, View } from "react-native";
import CloseIcon from "./CloseIcon";
import { ILiveChannelListItem } from "./LiveChannelListItem";
import PlayIcon from "./PlayIcon";
import Image from 'react-native-scalable-image';
import ListItemDetail from "./ListItemDetail";

export default function LiveChannelDetailView(props: ILiveChannelListItem & { onClose?: () => void, visible?: boolean }) {
    return (
        <Modal
            visible={props.visible}
            animationType="fade"
            transparent
            onRequestClose={props.onClose}
        >
            <View style={styles.modalView}>
                <View style={styles.channelListItemDetailContainer}>
                    <ImageBackground source={{ uri: props.imageSrc }} resizeMode="cover" style={styles.imageBackground}>
                        <CloseIcon style={styles.closeIcon} onPress={props.onClose} />
                        <PlayIcon />
                    </ImageBackground>
                    <ListItemDetail 
                        title={props.currentShowName} 
                        subtitle={`${props.start} - ${props.startNext}`} 
                        imageSrc={props.logoSrc}
                    />
                    
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    channelListItemDetailContainer: {
        width: "95%",
        height: "95%",
        backgroundColor: "black",
        elevation: 5,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    channelListItemTouchableContainer: {
        width: "100%",
        flex: 1,
        flexDirection: "row"
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        zIndex: 100,
    },
    closeIcon: {
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 999,
        backgroundColor: "#00000080",
        borderRadius: 64
    },
    imageBackground: {
        width: "100%",
        height: 200,
        justifyContent: "center"
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    col: {
        flex: 1,
        flexDirection: "column"
    },
    text: {
        color: "white"
    }
});