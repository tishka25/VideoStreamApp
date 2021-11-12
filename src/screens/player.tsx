import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar } from 'react-native';
//@ts-ignore
// import VideoPlayer from 'react-native-video-player';
import Video from "react-native-video";
import Orientation from 'react-native-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import network from '../utils/network';
import * as RootNavitaion from "../rootNavigation";
import BackIcon from '../components/BackIcon';
import LoadingIndicator from '../components/LoadingIndicator';
//@ts-ignore
import { HomeIndicator } from 'react-native-home-indicator';


type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;


export default function Player({ navigation, route }: Props) {

  
  function exit(){
    // Stop source loading
    setVideoURL(undefined);
    Orientation.lockToPortrait();
    RootNavitaion.goBack();

  }

  useEffect(() => {
    Orientation.lockToLandscape()
    return () => {
      
    }
  }, []);

  const [video, setVideo] = useState({
    width: undefined, height: undefined, duration: undefined
  });

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  })

  const player = useRef(null);

  const [thumbnail, setThumbnail] = useState(undefined);

  const [videoURL, setVideoURL] = useState(undefined);

  const [fullscreen, setFullScreen] = useState(true);

  const [videoControlShown, setVideoControlShown] = useState(false);

  var controlsTimeout = useRef<any>(null);
  useEffect(()=>{
    return ()=>clearTimeout(controlsTimeout.current);
  },[]);

  useEffect(() => {
    (async () => {
      const { isLive, id } = route.params;
      let streamURLs = [];
      if (isLive) {
        streamURLs = await network.getStreamUrls(id);
        //Check if there are stream URLs
        if (!streamURLs) {
          return;
        }
        // this.currentShow = await channels.getChannelInfo(id);
      } else {
        const currentShow = await network.getRecordingURLs(id);
        // Check if URLs exists
        if (!currentShow) {
          return;
        }
        //Check if url is array
        if (Array.isArray(currentShow.url)) {
          streamURLs = currentShow.url;
        } else {
          streamURLs.push(currentShow.url);
        }
      }
      setVideoURL(streamURLs[0]);
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // setFullScreen(true);
      StatusBar.setHidden(true);
      // setTabBarVisible(false);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // setFullScreen(false);
      StatusBar.setHidden(false);
        // setTabBarVisible(true);
      };
    }, [])
  );

  return (
    <View 
      style={styles.container} 
      onLayout={() => setDimensions({ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height })}
      onTouchEnd={()=> setFullScreen(!fullscreen)}
    >
      <HomeIndicator autoHidden/>
      {videoURL != undefined ? <Video
        source={{ uri: videoURL }}
        ref={player}
        autoplay
        style={styles.video}
        fullscreen={true}
        controls={false}
        muted={false}
        ignoreSilentSwitch={"ignore"}
        resizeMode={fullscreen ? "cover" : "contain"}
        /> :
        <LoadingIndicator />
      }
      {<BackIcon style={styles.BackIcon} onPress={exit} />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    color: "white",
    width: "100%",
    height: "100%",
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  BackIcon: {
    position: 'absolute',
    left: 32,
    top: 8,
    zIndex: 999,
    backgroundColor: "#00000080",
    borderRadius: 64
},
});
