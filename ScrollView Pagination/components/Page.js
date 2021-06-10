import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SQUARE_SIZE = width*0.7;

const Page = ({ title, index, children, translateX }) => {

    const inputRange = [(index-1)*width, index*width, (index+1)*width];

    const rSquareStyle = useAnimatedStyle(() => {

        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        const radius = interpolate(
            translateX.value,
            inputRange,
            [0, SQUARE_SIZE/2, 0],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { scale: scale }
            ],
            borderRadius: radius
        }
    });

    const rTextStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            translateX.value,
            inputRange,
            [-1, 1, -1],
            Extrapolate.CLAMP
        );

        const yTranslation = interpolate(
            translateX.value,
            inputRange,
            [250, 0, -250],
            Extrapolate.CLAMP
        )

        return {
            opacity,
            transform: [
                { translateY: yTranslation }
            ]
        }
    })

    return (
        <View 
            style={[styles.container, { backgroundColor: `rgba(0,0,256,0.${index+1})` }]}
        >
            <Animated.View
                style={[styles.square, rSquareStyle, { backgroundColor: `rgba(0,0,256,0.${index+15})` }]}
            >
                <Animated.Text style={[styles.text, rTextStyle]}>{title}</Animated.Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 45,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})

export default Page;