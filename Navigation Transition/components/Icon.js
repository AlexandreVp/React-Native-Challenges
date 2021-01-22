import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ICON_SIZE } from '../config/theme';


const Icon = ({ uri }) => {

    return (
        <View style={styles.imageContainer}>
            <Image source={{ uri }} style={[styles.image]} resizeMode='contain' />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: ICON_SIZE/2,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: ICON_SIZE * 0.6,
        height: ICON_SIZE * 0.6,
    }
})

export default Icon;