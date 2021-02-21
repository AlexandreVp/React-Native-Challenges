import React, { useRef, useState } from 'react';
import { FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import faker from 'faker';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('screen');
const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const images = [
    'https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1698394/pexels-photo-1698394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

faker.seed(10);

const DATA = [...Array(images.length).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: images[i],
        title: faker.commerce.productName(),
        subtitle: faker.company.bs(),
        price: faker.finance.amount(80, 200, 0),
    };
});
const SPACING = 20;

const Content = ({ item }) => {
    return (
        <>
            <Text
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {item.title}
            </Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <View style={styles.priceWrapper}>
                <Text
                    style={styles.price}
                >
                    {item.price}
                </Text>
                <Text
                    style={styles.currency}
                >
                    USD
                </Text>
            </View>
        </>
    );
};

export default () => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const progress = Animated.modulo(
        Animated.divide(scrollX, width),
        width
    );

    const [index, setIndex] = useState(0);

    const backdropStyle = {
        transform: [
            {
                perspective: IMAGE_WIDTH * 4,
            },
            {
                rotateY: progress.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['0deg', '90deg', '180deg']
                })
            }
        ]
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <View style={styles.card}>
                <Animated.FlatList
                    data={DATA}
                    keyExtractor={(item) => item.key}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    style={{ flexGrow: 0, zIndex: 100 }}
                    contentContainerStyle={styles.contentContainerStyle}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: true} 
                    )}
                    onMomentumScrollEnd={ev => {
                        let activeIndex = Math.round(ev.nativeEvent.contentOffset.x / width);

                        setIndex(activeIndex);
                    }}
                    renderItem={({ item, index }) => {

                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width
                        ];

                        const style = {
                            opacity: scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0]
                            }),
                            transform: [
                                {
                                    translateY: scrollX.interpolate({
                                        inputRange,
                                        outputRange: [50, 0, 20]
                                    }),
                                }
                            ]
                        }

                        return (
                            <Animated.View
                                style={[styles.imageWrapper, style]}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.image}
                                />
                            </Animated.View>
                        );
                    }}
                />
                <View
                    style={styles.contentWrapper}
                >
                    {DATA.map((item, index) => {

                        const inputRange = [
                            (index - 0.3) * width,
                            index * width,
                            (index + 0.3) * width
                        ];

                        const style = {
                            opacity: scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0]
                            }),
                            transform: [
                                {
                                    rotateY: scrollX.interpolate({
                                        inputRange,
                                        outputRange: ['-45deg', '0deg', '45deg']
                                    })
                                },
                                {
                                    perspective: IMAGE_WIDTH * 4
                                }
                            ]
                        }

                        return (
                            <Animated.View key={item.key} style={[styles.content, style]}>
                                <Content item={item}/>
                            </Animated.View>
                        )
                    })}
                </View>
                <Animated.View
                    style={[styles.backdrop, backdropStyle]}
                />
            </View>
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.button}>
                        <AntDesign name='swapleft' size={42} color='black' />
                        <Text style={styles.buttonText}>PREV</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>NEXT</Text>
                        <AntDesign name='swapright' size={42} color='black' />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        paddingTop: SPACING * 4, 
        backgroundColor: '#A5F1FA'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 12, 
        opacity: 0.4
    },
    priceWrapper: {
        flexDirection: 'row', 
        marginTop: SPACING
    },
    price: {
        fontSize: 42,
        letterSpacing: 3,
        fontWeight: 'bold',
        marginRight: 8,
    },
    currency: {
        fontSize: 16,
        lineHeight: 36,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    card: {
        height: IMAGE_HEIGHT * 2.1
    },
    contentContainerStyle: {
        height: IMAGE_HEIGHT + SPACING * 2, 
        paddingHorizontal: SPACING * 2
    },
    imageWrapper: {
        width,
        paddingVertical: SPACING,
    },
    image: {
        width: IMAGE_WIDTH, 
        height: IMAGE_HEIGHT, 
        resizeMode: 'cover'
    },
    contentWrapper: {
        width: IMAGE_WIDTH,
        alignItems: 'center',
        paddingHorizontal: SPACING * 2,
        marginLeft: SPACING * 2,
        zIndex: 100
    },
    content: {
        position: 'absolute',
    },
    backdrop: {
        width: IMAGE_WIDTH + SPACING * 2,
        position: 'absolute',
        backgroundColor: 'white',
        backfaceVisibility: 'visible',
        zIndex: -1,
        elevation: -1,
        top: SPACING * 2,
        left: SPACING,
        bottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 24,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: IMAGE_WIDTH + SPACING * 4,
        paddingHorizontal: SPACING,
        paddingVertical: SPACING,
    },
    button: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 12, 
        fontWeight: 'bold'
    }
})