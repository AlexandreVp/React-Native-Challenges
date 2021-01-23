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

export default () => {
	
    return (
		<View style={{flex: 1, backgroundColor: '#fff'}}>
			<StatusBar hidden/>
		</View>
	)
}

const styles = StyleSheet.create({

});