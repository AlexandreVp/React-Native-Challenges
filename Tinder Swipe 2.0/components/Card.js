import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const Card = (props) => {

    const { prof: profile, likeStyle, nopeStyle } = props;

    return (
        <View style={StyleSheet.absoluteFill}>
            <Image style={styles.image} source={profile.profile} />
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Animated.View style={[styles.like, likeStyle == undefined ? {opacity: 0} : likeStyle]}>
                        <Text style={styles.likeLabel}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.nope, nopeStyle == undefined ? {opacity: 0} : nopeStyle]}>
                        <Text style={styles.nopeLabel}>NOPE</Text>
                    </Animated.View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.name}>{profile.name}</Text>
                </View>
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
    overlay: {
        flex: 1,
        justifyContent: "space-between",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footer: {
        flexDirection: "row",
    },
    name: {
        color: "white",
        fontSize: 32,
    },
    like: {
        borderWidth: 4,
        borderRadius: 5,
        padding: 8,
        borderColor: "#6ee3b4",
    },
    likeLabel: {
        fontSize: 32,
        color: "#6ee3b4",
        fontWeight: "bold",
    },
    nope: {
        borderWidth: 4,
        borderRadius: 5,
        padding: 8,
        borderColor: "#ec5288",
    },
    nopeLabel: {
        fontSize: 32,
        color: "#ec5288",
        fontWeight: "bold",
    },
})

export default Card;