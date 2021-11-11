import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
} from "react-native";
import { BASE_URL } from "../utils/constants";
import network from "../utils/network";
import { ILiveChannelListItem, LiveChannelListItem } from "./LiveChannelListItem";
import LoadingIndicator from "./LoadingIndicator";
import PlayIcon from "./PlayIcon";
import Title from "./Title";


interface Props {
    onLoaded?: ()=>void;
    refresh?:boolean;
}

export default function LiveChannelList(props: Props) {

    const [liveList, setLiveList] = useState<ILiveChannelListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(liveList.length > 0){
            setLoading(false);
        }
    }, [liveList]);

    useEffect(()=>{
        if(!loading && props.onLoaded){
            props.onLoaded();
        }
    }, [loading]);

    useEffect(()=>{
        if(props.refresh){
            setLoading(true);
            loadData();
        }
    },[props.refresh]);
    

    async function loadData(){
        const _liveList = await network.getChannels();
        setLiveList(_liveList.map((item: any) => {
            return {
                imageSrc: `${BASE_URL}${item.background}?hash=${Date.now()}`, //Disable cache
                logoSrc: `${BASE_URL}${item.logo}`,
                channelName: item.chName,
                currentShowName: item.name,
                nextShowName: item.next_name,
                elapsed: item.elapsed,
                start: item.start,
                startNext: item.start_next,
                cid: item.cid,
                rec: item.rec === "1"
            }
        }));
    }

    useEffect(()=>{
        loadData();
    },[]);

    function renderItems(){
        return liveList.map((item, index) => {
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
                {loading ? <LoadingIndicator/> : renderItems()}
            </View>
        </View>
    );
}