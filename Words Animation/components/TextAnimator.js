// import React, { useEffect, useCallback } from 'react';
// import { View, StyleSheet, Text, Animated } from 'react-native';

// const TextAnimator = props => {

//     let animatedValues = [];
//     const textArray = props.content.trim().split(' ');

//     textArray.forEach((_, index) => {
//         animatedValues[index] = new Animated.Value(0);
//     })

//     const animated = useCallback((toValue = 1) => {
//         const animations = textArray.map((_, index) => {
//             return Animated.timing(animatedValues[index], {
//                 toValue,
//                 duration: props.duration,
//                 useNativeDriver: true
//             })
//         });
        
//         Animated.stagger(props.duration/5, toValue === 0 ? animations.reverse() : animations).start((result) => {

//             setTimeout(() => {
//                 animated(toValue === 0 ? 1 : 0)
//             }, 1000);

//             if (result.finished.valueOf()) {
//                 props.onFinish();
//             }
            
//         });
//     });

//     useEffect(() => {
//         animated();
//     }, [animated])

//     return (
//         <View style={[props.style, styles.textWrapper]}>
//             {
//                 textArray.map((word, index) => {
//                     return (
//                         <Animated.Text key={`${word}-${index}`} style={[props.textStyle, {
//                             opacity: animatedValues[index],
//                             transform: [
//                                 { translateY: Animated.multiply(animatedValues[index], new Animated.Value(-10)) }
//                             ]
//                         }]}>
//                             {word}{`${index < textArray.length-1 ? ' ' : ''}`}
//                         </Animated.Text>
//                     )
//                 })
//             }
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     textWrapper: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })

// export default TextAnimator;




//USING REANIMATED
import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withDelay, useAnimatedStyle, withTiming, interpolate, Extrapolate } from 'react-native-reanimated';

const TextAnimator = props => {

    let animatedValues = [];
    const textArray = props.content.trim().split(' ');

    textArray.forEach((_, index) => {
        animatedValues[index] = useSharedValue(0);
    });
    const arrayLength = textArray.length;

    const animated = useCallback((toValue = 1) => {

        textArray.forEach((_, index) => {
            animatedValues[toValue === 1 ? index : arrayLength-1-index].value = withDelay(props.duration/5*index, withTiming(toValue, {
                duration: props.duration
            }));
        });

        setTimeout(() => {
            animated(toValue === 0 ? 1 : 0)
        }, toValue === 0 ? props.duration/5*arrayLength+2000 : props.duration/5*arrayLength+4000);
    });

    useEffect(() => {
        animated();
    }, [animated])

    return (
        <View style={[props.style, styles.textWrapper]}>
            {
                textArray.map((word, index) => {

                    const style = useAnimatedStyle(() => {
                        return {
                            opacity: animatedValues[index].value,
                            transform: [
                                { 
                                    translateY: interpolate(
                                        animatedValues[index].value,
                                        [0, 1],
                                        [10, -10],
                                        Extrapolate.CLAMP
                                    )
                                }
                            ]
                        };
                    });

                    return (
                        <Animated.Text key={`${word}-${index}`} style={[props.textStyle, style ]}>
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