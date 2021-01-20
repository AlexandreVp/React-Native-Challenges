import React from 'react';
import { Image, FlatList, View, StatusBar, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { 
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .75;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const images = [
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const product = {
    title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
    description: [
        'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
        'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"'
    ],
    price: '29.99£'
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default () => {

    const scrollY = useSharedValue(0);

    const onScrollEvent = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const dotIndicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value/ITEM_HEIGHT,
                        [0, 1],
                        [0, DOT_INDICATOR_SIZE]
                    )
                }
            ]
        };
    });
	
    return (
		<SafeAreaView>
			<StatusBar hidden/>
            <AnimatedFlatList
                data={images}
                style={styles.flatlistWrapper}
                keyExtractor={(_, index) => index.toString()}
                renderItem={(item) => {
                    return (
                        <View>
                            <Image source={{ uri: item.item }} style={styles.image} resizeMode='cover' />
                        </View>
                    )
                }}
                onScroll={onScrollEvent}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate='fast'
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
            <View style={styles.pagination}>
                {images.map((_, index) => {
                    return (
                        <View 
                            key={index.toString()}
                            style={styles.dot}
                        />
                    )
                })}
                <Animated.View
                    style={[styles.dotIndicator, dotIndicatorStyle]}
                />
            </View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    flatlistWrapper: {
        height: ITEM_HEIGHT,
        overflow: 'hidden'
    },
    pagination: {
        position: 'absolute',
        alignItems: 'center',
        top: ITEM_HEIGHT/2 - 30,
        left: 20,
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE/2,
        backgroundColor: '#333',
        marginBottom: DOT_SPACING
    },
    dotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE/2,
        borderWidth: 1,
        borderColor: '#333',
        position: 'absolute',
        top: -DOT_SIZE/2,
    }
})