import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SPACING } from '../config/theme';
import { DATA } from '../config/travel';

import MarketingSlider from '../components/MarketingSlider';
import Icon from '../components/Icon'

const List = () => {

    return (
        <SafeAreaView style={styles.container}>
            <MarketingSlider />
            <View style={styles.iconsWrapper}>
                {DATA.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.iconContainer}
                            onPress={() => {}}
                        >
                            <Icon uri={item.imageUri}/>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    iconsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    iconContainer: {
        padding: SPACING
    }
})

export default List;