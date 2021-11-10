import React, { useState } from "react";
import { ImageBackground, Modal, StyleSheet, ScrollView, View } from "react-native";
import CloseIcon from "./CloseIcon";
import { ILiveChannelListItem } from "./LiveChannelListItem";
import PlayIcon from "./PlayIcon";
import ListItemDetail from "./ListItemDetail";
import Title from "./Title";
import RecordingsListViewSlow from "./RecordingsListViewSlow";
import TvizioButton from "./TvizioButton";
import * as RootNavitaion from "../rootNavigation";

export default function LiveChannelDetailView(props: ILiveChannelListItem & { onClose?: () => void, visible?: boolean }) {

    const [recordingsLoaded, setRecordingsLoaded] = useState(false);

    function OpenPlayer(id: string){
        console.log("Opening player");
        RootNavitaion.navigate("Player", { isLive: true, id })
    }

    return (
        <Modal
            visible={props.visible}
            animationType="fade"
            transparent
            onRequestClose={props.onClose}
        >
            <View style={styles.modalView}>
                <View style={styles.channelListItemDetailContainer}>
                    <CloseIcon style={styles.closeIcon} onPress={props.onClose} />
                    <ScrollView style={{ width: "100%" }}>
                        <ImageBackground source={{ uri: props.imageSrc }} resizeMode="cover" style={styles.imageBackground}>
                            <PlayIcon style={{ zIndex:999 }} onPress={()=> OpenPlayer(props.cid) }/>
                        </ImageBackground>
                        <ListItemDetail
                            title={props.currentShowName}
                            subtitle={`${props.start} - ${props.startNext}`}
                            imageSrc={props.logoSrc}
                        />
                        <View style={{ alignSelf: "flex-start" }}>
                            <Title name="Предишни предавания за деня" />
                        </View>
                        <RecordingsListViewSlow cid={props.cid} onLoad={() => setRecordingsLoaded(true)} />
                        {recordingsLoaded && 
                            <TvizioButton 
                                customStyle={{ alignSelf: "center", marginBottom: 32, marginTop: -32}} 
                                title="Покажи всички" 
                            />}

                    </ScrollView>

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