import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

const TextAnimator = props => {

    let animatedValues = [];
    const textArray = props.content.trim().split(' ');

    textArray.forEach((_, index) => {
        animatedValues[index] = new Animated.Value(0);
    })

    const animated = useCallback((toValue = 1) => {
        const animations = textArray.map((_, index) => {
            return Animated.timing(animatedValues[index], {
                toValue,
                duration: props.duration,
                useNativeDriver: true
            })
        });
        
        Animated.stagger(props.duration/5, toValue === 0 ? animations.reverse() : animations).start((result) => {

            setTimeout(() => {
                animated(toValue === 0 ? 1 : 0)
            }, 1000);

            if (result.finished.valueOf()) {
                props.onFinish();
            }
            
        });
    });

    useEffect(() => {
        animated();
    }, [animated])

    return (
        <View style={[props.style, styles.textWrapper]}>
            {
                textArray.map((word, index) => {
                    return (
                        <Animated.Text key={`${word}-${index}`} style={[props.textStyle, {
                            opacity: animatedValues[index],
                            transform: [
                                { translateY: Animated.multiply(animatedValues[index], new Animated.Value(-10)) }
                            ]
                        }]}>
                            {word}{`${index < textArray.length-1 ? ' ' : ''}`}
                        </Animated.Text>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    textWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TextAnimator;