import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
//@ts-ignore
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation';
import { useFocusEffect } from '@react-navigation/native';
//@ts-ignore
import { SERVER_URL } from "@env"



export default function Player({ navigation, setTabBarVisible , route}) {

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

  const [thumbnail, setThumbnail] = useState("");

  const [videoURL, setVideoURL] = useState("");

  const [fullscreen, setFullScreen] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // setFullScreen(true);
      // setTabBarVisible(false);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // setFullScreen(false);
        // setTabBarVisible(true);
      };
    }, [])
  );

  console.log("Playing: ", route.params.id)

  return (
    <View style={styles.container} onLayout={() => setDimensions({ width: Dimensions.get("window").width, height: Dimensions.get("window").height })}>
      <Button onPress={() => {
        setFullScreen(false);
        navigation.navigate("Home");
      }}
        title="Go Back"
      />
      <VideoPlayer
        endWithThumbnail
        thumbnail={{ uri: `${SERVER_URL}/thumbnail/` + route.params.id }}
        // video={{ uri: `${SERVER_URL}/video/` + route.params.id }}
        ref={player}
        // videoWidth={dimensions.width}
        // videoHeight={dimensions.height - 200}

        fullscreen
        fullscreenOrientation="landscape"
      >
        asdasd
      </VideoPlayer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15152d',
    color: "white",
    width: "100%",
    height: "100%",
  },
});
