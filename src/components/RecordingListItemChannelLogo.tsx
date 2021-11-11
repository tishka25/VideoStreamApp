import React from "react";
import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    imageSrc: string;
    onPress?: () => void;
}

export default function RecordingListItemChannelLogo(props: Props) {
    return (
        <Pressable
            onPress={props.onPress}
        >
            <TouchableOpacity>
                <View style={styles.container}>
                    <Image
                        source={{ uri: props.imageSrc }}
                        resizeMode="contain"
                        style={styles.channelListItemLogo}
                    />
                </View>
            </TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: { borderColor: "white", borderWidth: 0 },
    channelListItemLogo: { width: undefined, height: 80, aspectRatio: 1,margin: 16, alignSelf: "center"},
})