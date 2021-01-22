import React, { useRef } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView, Text } from 'react-native';
import { SPACING, ICON_SIZE, width } from '../config/theme';
import { DATA } from '../config/travel';

import BackIcon from '../components/BackIcon';
import Icon from '../components/Icon';

const Detail = () => {

    const item = DATA[0];
    const ref = useRef();
    const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);

    return (
        <SafeAreaView style={styles.container}>
            <BackIcon onPress={() => navigation.goBack()} />
            <View style={styles.iconsRow}>
                {DATA.map((item) => {
                    return (
                        <TouchableOpacity style={styles.iconContainer} key={item.id}>
                            <Icon uri={item.imageUri}/>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <FlatList 
                ref={ref}
                data={DATA}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                initialScrollIndex={selectedItemIndex}
                nestedScrollEnabled
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index
                })}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <ScrollView
                            style={styles.scrollView}
                        >
                            <View style={styles.textContainer}>
                                <Text style={styles.innerText}>
                                    {Array(50).fill(`${item.title} inner text \n`)}
                                </Text>
                            </View>
                        </ScrollView>
                    )
                }}
            />
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    iconsRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginVertical: 15
    },
    iconContainer: {
        padding: SPACING
    },
    scrollView: {
        width: width - SPACING * 2,
        margin: SPACING,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 16
    },
    textContainer: {
        padding: SPACING
    },
    innerText: {
        fontSize: 16
    },
    imageContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: ICON_SIZE/2,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Detail;