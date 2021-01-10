import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

const AnimatedCard = (props) => {

    return (
        <Animated.View style={props.style} pointerEvents={props.pointerEvents}>
            <View style={styles.imageOut}>
                <ImageBackground style={styles.image} source={props.images[props.index].src} resizeMode='contain'>
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
        height: '100%',
        overflow: 'hidden',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 8,
        height: '100%',
    },
})

export default AnimatedCard;