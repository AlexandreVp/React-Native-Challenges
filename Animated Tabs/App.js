import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {} from 'react-native-reanimated';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get('screen');
const images = {
	man:
		'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	women:
		'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	kids:
		'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	skullcandy:
		'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	help:
		'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
	key: i,
	title: i,
	image: images[i],
}));

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<AnimatedFlatList 
				data={data}
				horizontal
				showHorizontalScrollIndicator={false}
				pagingEnabled
				bounces={false}
				keyExtractor={item => item.key}
				renderItem={({item}) => {
					return (
						<View style={styles.imageWrapper}>
							<Image source={{ uri: item.image }} style={styles.image} resizeMode='cover' />
						</View>
					)
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageWrapper: {
		width: width,
		height: height
	},
	image: {
		flex: 1
	},
});