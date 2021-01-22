import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { SLIDER_DATA } from '../config/travel';
import { ITEM_WIDTH, width, SPACING } from '../config/theme';

const MarketingSlider = () => {

    return (
        <FlatList 
            data={SLIDER_DATA}
            keyExtractor={(item) => item.color}
            horizontal
            snapToInterval={ITEM_WIDTH + SPACING * 2}
            contentContainerStyle={styles.contentContainerStyle}
            decelerationRate='fast'
            renderItem={({item}) => {
                return (
                    <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
                        <Text style={styles.itemText} >{item.title}</Text>
                    </View>
                )
            }}
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingRight: ITEM_WIDTH - SPACING * 2,
        marginTop: 20
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 0.6,
        borderRadius: 16,
        padding: SPACING,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: SPACING
    },
    itemText: {
        fontSize: 22,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white'
    }
})

export default MarketingSlider;