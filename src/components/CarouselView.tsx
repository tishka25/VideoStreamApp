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
    onSelect?:(id: string) => void;
    header?: React.ReactElement;
}

export default function CarouselView(props: Props) {

    const [gallery, setgallery] = useState([
        {
            image: `${SERVER_URL}/thumbnail/0`,
            title: "Посоки",
            released: "2018",
            desc:
                "„Посоки“ е игрален филм от 2017 г. на режисьора Стефан Командарев. Той е копродукция между България, Германия и Република Македония. Филмът е подкрепен от Националния филмов център – България, Регионалния филмов фонд МДМ – Германия, Македонската филмова агенция, „КИА моторс“ – България, Дарик радио, Yellow Taxi.",
            key: "0",
        },
        {
            image: `${SERVER_URL}/thumbnail/1`,
            title: "Слава",
            released: "2016",
            desc:
                "Слава е български игрален филм от 2016 година на режисьорите – Кристина Грозева и Петър Вълчанов. Това е вторият филм от планираната трилогия на двамата режисьори. Филмът взима участие в множество филмови фестивали по света, като прави дебюта си на кинофестивала в Локарно на 4 август 2016 година.",
            key: "1",
        },
        {
            image: `${SERVER_URL}/thumbnail/2`,
            title: "Tilt",
            released: "2011",
            desc:
                "Тилт“ е български игрален филм от 2011 година на режисьора Виктор Чучков, по сценарий на Борислав Чучков и Виктор Чучков. Оператор е Рали Ралчев.",
            key: "2",
        },
        {
            image: `${SERVER_URL}/thumbnail/3`,
            title: "Бензин",
            released: "2017",
            desc:
                "„Бензин“ е български игрален филм от 2017 година на режисьорите Асен Блатечки и Катерина Горанова. Сценарият е на Алексей Кожухаров. Оператор е Мартин Чичов.",
            key: "3",
        },
    ]);
    const [selectedMovie, setSelectedMovie] = useState(props.items[0]);

    const carouselRef = useRef(null);
    const { width, height } = Dimensions.get("window");

    const onViewRef = React.useRef((response: any)=> {
        // Use viewable items in state or as intended
        const viewableItems = response.viewableItems;
        const len = viewableItems.length;
        // Select middle one
        const middleItem = viewableItems[len - 2] || viewableItems[0];
        if(middleItem)
            setSelectedMovie(middleItem.item);
    })

    //@ts-ignore
    const renderItem = ({ item, index }) => {
        return (
            <CarouselItem
                onPress={()=>{
                    if(carouselRef != null){
                        //@ts-ignore
                        carouselRef.current.scrollToIndex(index);
                    }
                }}
                title={item.title}
                imageSrc={item.imageSrc}
            />
        );
    };

    return (
        <View style={styles.carouselContentContainer}>
            <View
                style={{ backgroundColor: "#000", width: "100%"}}
            >
                <ImageBackground
                    source={{ uri: selectedMovie.imageSrc }}
                    style={styles.imageBackground}
                    blurRadius={10}
                >
                    {props.header}
                    <Title name={props.name}/>

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
        minHeight: 500,
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
