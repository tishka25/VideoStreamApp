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


type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;


export default function Player({ navigation, route }: Props) {

  useEffect(() => {
    // Orientation.lockToLandscape()
    return () => {
      // Orientation.lockToPortrait()
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

  const [videoURL, setVideoURL] = useState("");

  const [fullscreen, setFullScreen] = useState(true);

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

  // console.log("Playing: ", route.params.id)

  return (
    <View style={styles.container} onLayout={() => setDimensions({ width: Dimensions.get("window").width, height: Dimensions.get("window").height })}>
      <Button onPress={() => {
        setFullScreen(false);
        RootNavitaion.goBack();
        // navigation.popToTop();
      }}
        title="Go Back"
      />
      <VideoPlayer
        endWithThumbnail
        // thumbnail={{ uri: thumbnail }}
        video={{ uri: videoURL }}
        ref={player}
        // videoWidth={dimensions.width}
        // videoHeight={dimensions.height - 200}
        autoplay
        fullscreen
        fullscreenOrientation="landscape"
      >
      </VideoPlayer>
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
});
