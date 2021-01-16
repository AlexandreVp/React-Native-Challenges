import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export const IMAGE_SIZE = 50;

const Knob = props => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/down.png')} />
            <Animated.Image style={[styles.image, props.opacity]} source={require('../assets/up.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined
    }
})

export default Knob;