// Inspiration: https://dribbble.com/shots/14139308-Simple-Scroll-Animation
// Illustrations by: SAMji https://dribbble.com/SAMji_illustrator

import React from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PanGestureHandler, ScrollView, FlatList } from 'react-native-gesture-handler';
import Animated, { 
	useAnimatedGestureHandler, 
	useSharedValue, 
	useAnimatedStyle, 
	withSpring,
	interpolate,
	Extrapolate,
	runOnJS
} from 'react-native-reanimated';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const data = [
    'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200'

];

const imageWidth = SCREEN_WIDTH * 0.7;
const imageHeight = SCREEN_WIDTH * 1.1;

export default function App() {


	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden/>
			<AnimatedFlatlist 
				data={data}
				keyExtractor={(_, index) => index.toString()}
				horizontal
				pagingEnabled
				renderItem={(item) => {
					return (
						<View style={styles.itemContainer}>
							<Image source={{ uri: item.item }} style={styles.image} resizeMode='cover' />
						</View>
					)
				}}
			/>
			{/* <FlatList 
				data={data}
				keyExtractor={(_, index) => index.toString()}
				horizontal
				pagingEnabled
				renderItem={(item) => {
					return (
						<View>
							<Image source={{ uri: item }} style={styles.image} />
						</View>
					)
				}}
			/>
			<ScrollView 
				
			/> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	itemContainer: {
		width: SCREEN_WIDTH,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: imageWidth,
		height: imageHeight,
		borderRadius: 16
	}
});
