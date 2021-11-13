import React, { useRef, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    TextInput,
} from "react-native-gesture-handler";
//@ts-ignore
import Carousel from "react-native-anchor-carousel";
// import { MaterialIcons, FontAwesome5 } from "react-native-vector-icons";
//@ts-ignore
import { SERVER_URL } from "@env";
import DescriptionBox from "./DescriptionBox";
import CarouselItem from "./CarouselItem";
import Title from "./Title";


export interface ICarouselViewItem {
    imageSrc: string;
    title: string;
    date: string;
    description: string;
    id: string;
}

interface Props {
    name: string
    items: ICarouselViewItem[]
    onSelect?: (id: string) => void;
    header?: React.ReactElement;
    hidden?: boolean;
}

export default function CarouselView(props: Props) {
    const defaultMinHeight = 500;

    const [selectedMovie, setSelectedMovie] = useState(props.items[0]);

    const carouselRef = useRef(null);
    const { width, height } = Dimensions.get("window");

    const onViewRef = React.useRef((response: any) => {
        // Use viewable items in state or as intended
        const viewableItems = response.viewableItems;
        const len = viewableItems.length;
        // Select middle one
        const middleItem = viewableItems[len - 2] || viewableItems[0];
        if (middleItem)
            setSelectedMovie(middleItem.item);
    })

    //@ts-ignore
    const renderItem = ({ item, index }) => {
        return (
            <CarouselItem
                onPress={() => {
                    if (carouselRef != null) {
                        //@ts-ignore
                        carouselRef.current.scrollToIndex(index);
                    }
                }}
                title={item.title}
                imageSrc={item.imageSrc}
            />
        );
    };

    function renderMainView() {
        return (
            <View>
                <Title name={props.name} />
                <View style={styles.carouselContainerView}>
                    <Carousel
                        style={styles.carousel}
                        data={props.items}
                        renderItem={renderItem}
                        itemWidth={200}
                        containerWidth={width - 20}
                        separatorWidth={16}
                        ref={carouselRef}
                        inActiveOpacity={0.4}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={{
                            itemVisiblePercentThreshold: 50
                        }}
                    />
                </View>
                <DescriptionBox
                    {...selectedMovie}
                    onSelect={props.onSelect}
                />
            </View>
        );
    }


    return (
        <View style={[styles.carouselContentContainer, { minHeight: props.hidden ? undefined : defaultMinHeight }]}>
            <View
                style={{ backgroundColor: "#000", width: "100%" }}
            >
                <ImageBackground
                    source={{ uri: selectedMovie.imageSrc }}
                    style={[styles.imageBackground]}
                    blurRadius={10}
                    imageStyle={{ opacity: props.hidden ? 0 : 1 }}
                >
                    {props.header}
                    {!props.hidden && renderMainView()}

                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContentContainer: {
        // flex: 1,
        backgroundColor: "#000",
        width: "100%",
        // paddingHorizontal: 14,
        flexDirection: "row",
    },
    imageBackground: {
        flex: 1,
        // height: null,
        // width: null,
        opacity: 1,
        justifyContent: "flex-start",
    },
    carouselContainerView: {
        width: "100%",
        height: 140,
        justifyContent: "center",
        alignItems: "center",
    },
    carousel: {
        flex: 1,
        overflow: "visible",
    },
});
