import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TextAnimator = props => {

    const textArray = props.content.trim().split(' ');

    console.log(textArray);

    return (
        <View style={[props.style, styles.textWrapper]}>
            {
                textArray.map((word, index) => {
                    return (
                        <Text key={`${word}-${index}`} style={props.textStyle}>{word}{`${index < textArray.length-1 ? ' ' : ''}`}</Text>
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