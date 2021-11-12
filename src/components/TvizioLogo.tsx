import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native';
import TvizioButton from '../components/TvizioButton';
import user from '../utils/user';
import * as RootNavigation from "../rootNavigation";
import { tvizioLogo } from '../utils/constants';


interface Props {
    style?: StyleProp<ImageStyle>;
}

export default function TvizioLogo(props: Props) {

  return (
    <View>
        <Image style={[styles.imageLogo, props.style]} resizeMode="contain" source={tvizioLogo}/>    
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
  },
  imageLogo: {
    width: 256,
    height: undefined,
    aspectRatio: 1
}
});
