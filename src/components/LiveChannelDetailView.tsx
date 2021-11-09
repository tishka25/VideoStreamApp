import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import CloseIcon from "./CloseIcon";
import { ILiveChannelListItem } from "./LiveChannelListItem";
import PlayIcon from "./PlayIcon";

export default function LiveChannelDetailView(props: ILiveChannelListItem & { onPress?: ()=>void, visible?:boolean }){
    const [closeModal, setCloseModal] = useState(props.visible);
    const modalVisible = !closeModal ?  props.visible : false
    return (
        <Modal 
            visible={modalVisible}
            animationType="fade"
            transparent 
            onRequestClose={()=> setCloseModal(true) }
        >
            <View style={styles.modalView}>
                <View style={styles.channelListItemDetailContainer}>
                    <CloseIcon style={styles.closeIcon} onPress={() => setCloseModal(true) }/>
                    <Image source={{ uri: props.imageSrc}} resizeMode="contain" />
                    <Text style={{ color: "white", marginBottom: 8 }}>{props.currentShowName}</Text>
                    <PlayIcon/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    channelListItemDetailContainer: {
        width: "90%",
        height: "95%",
        backgroundColor: "black",
        elevation: 5,
        borderRadius: 20,
        alignItems: "center",
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
        flex:1,
        flexDirection: "row"
    },
    modalView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    closeIcon: {
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex:999
    },
    imageBackground: {
        width: "100%",
        height: undefined,
        aspectRatio: 1,
    }
});