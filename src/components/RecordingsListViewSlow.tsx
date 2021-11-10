import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import channels, { RecordingItem } from "../utils/channels";
import { normalize } from "../utils/normalize";
import { getPrettyDateString, getScreenshotUrl } from "../utils/utils";
import ListItemDetail from "./ListItemDetail";
import LoadingIndicator from "./LoadingIndicator";


interface Props {
    cid: string;
    days?: number;
    reverse?: boolean
    onLoad?: ()=>void;
}

/**
 * Slow if used with many list items
 * @param props 
 * @returns 
 */
export default function RecordingsListViewSlow(props: Props) {
    const [items, setItems] = useState<RecordingItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Load items
    useEffect(()=>{
        (async()=>{
            const recordings = await channels.getRecordings(props.cid, props.days || 1);
            if(props.reverse)
                setItems(recordings.reverse());
            else{
                setItems(recordings);
            }
            setLoading(false);
            if(props.onLoad)
                props.onLoad();
        })();

    }, []);

    function renderList() {
        return (
            items.map((item)=>{
                return (
                <ListItemDetail
                    title={item.name}
                    subtitle={getPrettyDateString(item.date, true, false, item.time)}
                    imageSrc={getScreenshotUrl(props.cid, item.bid)}
                    height={80}
                    titleFontSize={normalize(14)}
                    subtitleFontSize={normalize(12)}
                />
                );
            })
        )
    }
    return (
        <SafeAreaView style={{ paddingBottom: 0,marginBottom:0 }}>
            {loading ?  <LoadingIndicator/> : renderList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
})