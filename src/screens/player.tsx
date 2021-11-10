import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
//@ts-ignore
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import network from '../utils/network';
import * as RootNavitaion from "../rootNavigation";
import CloseIcon from '../components/CloseIcon';
import LoadingIndicator from '../components/LoadingIndicator';


type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;


export default function Player({ navigation, route }: Props) {

  useEffect(() => {
    Orientation.lockToLandscape()
    return () => {
      Orientation.lockToPortrait()
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

  var controlsTimeout: any = null;
  useEffect(()=>{
    clearTimeout(controlsTimeout);
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
      setFullScreen(true);
      // setTabBarVisible(false);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setFullScreen(false);
        // setTabBarVisible(true);
      };
    }, [])
  );


  return (
    <View style={styles.container} onLayout={() => setDimensions({ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height })}>
      {videoControlShown && <CloseIcon style={styles.closeIcon} onPress={()=> RootNavitaion.goBack()} />}
      {videoURL ? <VideoPlayer
        endWithThumbnail
        // thumbnail={{ uri: thumbnail }}
        video={{ uri: videoURL }}
        ref={player}
        // Invert width & height for landscape playing
        videoWidth={Dimensions.get("screen").height}
        videoHeight={Dimensions.get("screen").width}
        showDuration
        autoplay
        fullscreen={fullscreen}
        fullscreenOrientation="landscape"
        controlsTimeout={1000}
        onShowControls={()=>{
          setVideoControlShown(true);
          clearTimeout(controlsTimeout);
          controlsTimeout = setTimeout(_=>{
            setVideoControlShown(false);
          }, 1000)
        }}
        /> :
        <LoadingIndicator />
      }
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
  closeIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 999,
    backgroundColor: "#00000080",
    borderRadius: 64
},
});
