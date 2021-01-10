import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Card = (props) => {

    const { prof: profile } = props;

    console.log(profile);

    return (
        <View style={StyleSheet.absoluteFill}>
            <Image style={styles.image} source={profile.profile} />
            <View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 8,
    },
})

export default Card;