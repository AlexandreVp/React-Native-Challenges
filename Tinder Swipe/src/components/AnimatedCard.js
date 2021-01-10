import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

const AnimatedCard = (props) => {

    return (
        <Animated.View style={props.style} pointerEvents={props.pointerEvents}>
            <View style={styles.imageOut}>
                <ImageBackground style={styles.image} source={props.images[props.index].src}>
                    {props.children}
                </ImageBackground>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    imageOut: {
        borderRadius: 8,
        width: '95%',
        height: '75%',
        overflow: 'hidden',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
        // elevation: 3
    },
    image: {
        width: '100%',
        borderRadius: 8,
        height: '100%',
    },
})

export default AnimatedCard;