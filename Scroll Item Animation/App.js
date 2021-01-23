import React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
import faker from 'faker'

const { width, height } = Dimensions.get('screen');
const SPACING = 20;
const AVATAR_SIZE = 70;

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});
const BG_IMAGE = 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auth';

export default () => {
	
    return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
			<StatusBar hidden/>
            <Image 
                source={{ uri: BG_IMAGE }}
                style={[StyleSheet.absoluteFillObject]}
                blurRadius={50}
            />
            <FlatList 
                data={DATA}
                keyExtractor={item => item.key}
                contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.profileWrapper}>
                            <Image 
                                source={{ uri: item.image }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </View>
                        </View>
                    )
                }}
            />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
    profileWrapper: {
        flexDirection: 'row',
        padding: SPACING,
        marginBottom: SPACING,
        alignItems: 'center',
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE/2,
        marginRight: SPACING/2
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
    },
    jobTitle: {
        fontSize: 18,
        opacity: .7,
    },
    email: {
        fontSize: 14,
        opacity: .8,
        color: '#0099cc'
    }
});