import React, { useState } from "react";
import { ImageBackground, Modal, StyleSheet, ScrollView, View, Platform } from "react-native";
import BackIcon from "../components/BackIcon";
import PlayIcon from "../components/PlayIcon";
import ListItemDetail from "../components/ListItemDetail";
import Title from "../components/Title";
import RecordingsListViewSlow from "../components/RecordingsListViewSlow";
import TvizioButton from "../components/TvizioButton";
import * as RootNavitaion from "../rootNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";


type Props = NativeStackScreenProps<RootStackParamList, 'LiveChannelDetailView'>;
export default function LiveChannelDetailView({ navigation, route,  }: Props) {

    const [recordingsLoaded, setRecordingsLoaded] = useState(false);

    function OpenPlayer(id: string) {
        console.log("Opening player");
        RootNavitaion.navigate("Player", { isLive: true, id })
    }
    function ShowAllRecordings() {
        RootNavitaion.navigate("RecordingsForChannel", { cid: route.params.cid })
    }

    return (
        <View style={styles.modalView}>
            <View style={styles.channelListItemDetailContainer}>
                <BackIcon style={styles.BackIcon} onPress={() => RootNavitaion.goBack()} />
                <ScrollView style={{ width: "100%" }} bounces={false}>
                    <ImageBackground source={{ uri: route.params.imageSrc }} resizeMode="cover" style={styles.imageBackground}>
                        <PlayIcon style={{ zIndex: 999 }} onPress={() => OpenPlayer(route.params.cid)} />
                    </ImageBackground>
                    <ListItemDetail
                        title={route.params.currentShowName}
                        subtitle={`${route.params.start} - ${route.params.startNext}`}
                        imageSrc={route.params.logoSrc}
                    />
                    <View style={{ alignSelf: "flex-start" }}>
                        <Title name={(route.params.rec ? "Предишни предавания за деня" : "Този канал няма записи")} />
                    </View>
                    {route.params.rec && <RecordingsListViewSlow cid={route.params.cid} reverse onLoad={() => setRecordingsLoaded(true)} />}
                    {recordingsLoaded &&
                        <View>
                            <TvizioButton
                                customStyle={{ alignSelf: "center", marginBottom: 32 }}
                                title="Покажи всички"
                                onPress={ShowAllRecordings}
                            />
                            <SafeAreaView />
                        </View>
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    channelListItemDetailContainer: {
        width: "100%",
        height: "100%",
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
        marginTop: Platform.OS === 'ios' ? 80 : 0
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
        backgroundColor: "black"
    },
    BackIcon: {
        position: 'absolute',
        left: 8,
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