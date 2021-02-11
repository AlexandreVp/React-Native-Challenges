// import React from 'react';
// import {
// 	Dimensions,
// 	Image,
// 	View,
// 	StyleSheet,
// 	FlatList
// } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('screen');
// const ITEM_WIDTH = width * 0.76;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// const images = [
// 	'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
// 	'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
// 	'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
// 	'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
// 	'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
// 	'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
// 	'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
// 	'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
// 	'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
// 	'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
// ];
// const data = images.map((image, index) => ({
// 	key: String(index),
// 	photo: image,
// 	avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
// 		Math.random() * 40
// 	)}.jpg`,
// }));

// const ImageCard = ({ photo, avatar_url, index, scrollX }) => {

// 	const inputRange = [
// 		(index - 1) * width,
// 		index * width,
// 		(index + 1) * width
// 	];

// 	const imageStyle = useAnimatedStyle(() => {
// 		return {
// 			transform: [
// 				{
// 					translateX: interpolate(
// 						scrollX.value,
// 						inputRange,
// 						[-width * .5, 0, width * .5]
// 					)
// 				}
// 			]
// 		};
// 	});

// 	return (
// 		<View style={styles.imageContainer}>
// 			<View style={styles.imageWrapperBorder}>
// 				<View style={styles.imageWrapper}>
// 					<Animated.Image 
// 						source={{ uri: photo }}
// 						style={[styles.image, imageStyle]}
// 						resizeMode='cover'
// 					/>
// 				</View>
// 				<Image 
// 					source={{ uri: avatar_url }}
// 					style={styles.avatarImage}
// 					resizeMode='cover'
// 				/>
// 			</View>
// 		</View>
// 	)
// };

// export default function App() {

// 	const scrollX = useSharedValue(0);

// 	const onScrollEvent = useAnimatedScrollHandler((event) => {
// 		scrollX.value = event.contentOffset.x;
// 	});

// 	return (
// 		<View style={styles.container}>
// 			<StatusBar hidden />
// 			<AnimatedFlatList 
// 				data={data}
// 				keyExtractor={item => item.key}
// 				horizontal
// 				showsHorizontalScrollIndicator={false}
// 				pagingEnabled
// 				scrollEventThrottle={16}
// 				bounces={false}
// 				onScroll={onScrollEvent}
// 				renderItem={({item, index}) =>
// 					<ImageCard 
// 						photo={item.photo}
// 						avatar_url={item.avatar_url}
// 						index={index}
// 						scrollX={scrollX}
// 					/>
// 				}
// 			/>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
//   	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	imageContainer: {
// 		width: width,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	imageWrapperBorder: {
// 		borderRadius: 14,
// 		padding: 10,
// 		backgroundColor: '#FFFFFF',
// 		shadowColor: '#000000',
// 		shadowOffset: {
// 			width: 0,
// 			height: 0
// 		},
// 		shadowOpacity: 0.5,
// 		shadowRadius: 30,
// 		elevation: 30,
// 	},
// 	imageWrapper: {
// 		width: ITEM_WIDTH,
// 		height: ITEM_HEIGHT,
// 		overflow: 'hidden',
// 		alignItems: 'center',
// 		borderRadius: 14
// 	},
// 	image: {
// 		width: ITEM_WIDTH * 1.1,
// 		height: ITEM_HEIGHT,
// 	},
// 	avatarImage: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		borderWidth: 5,
// 		borderColor: '#FFFFFF',
// 		position: 'absolute',
// 		bottom: -30,
// 		right: 30
// 	}
// });



// USING ANIMATED API
import React, { useRef } from 'react';
import {
	Dimensions,
	Image,
	View,
	StyleSheet,
	FlatList,
	Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = [
	'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
	'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
	'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
	'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
	'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
	'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
	'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
	'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
	'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
	'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];
const data = images.map((image, index) => ({
	key: String(index),
	photo: image,
	avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
		Math.random() * 40
	)}.jpg`,
}));

export default function App() {

	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.FlatList 
				data={data}
				keyExtractor={item => item.key}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				scrollEventThrottle={16}
				bounces={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX }}}],
					{ useNativeDriver: true }
				)}
				renderItem={({item, index}) => {
					const inputRange = [
						(index - 1) * width,
						index * width,
						(index + 1) * width
					];

					const translateX = scrollX.interpolate({
						inputRange,
						outputRange: [-width * .5, 0, width * .5]
					})
				
					const imageStyle = {
						transform: [
							{ translateX }
						]
					};
				
					return (
						<View style={styles.imageContainer}>
							<View style={styles.imageWrapperBorder}>
								<View style={styles.imageWrapper}>
									<Animated.Image 
										source={{ uri: item.photo }}
										style={[styles.image, imageStyle]}
										resizeMode='cover'
									/>
								</View>
								<Image 
									source={{ uri: item.avatar_url }}
									style={styles.avatarImage}
									resizeMode='cover'
								/>
							</View>
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
	imageContainer: {
		width: width,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageWrapperBorder: {
		borderRadius: 14,
		padding: 10,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.5,
		shadowRadius: 30,
		elevation: 30,
	},
	imageWrapper: {
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
		overflow: 'hidden',
		alignItems: 'center',
		borderRadius: 14
	},
	image: {
		width: ITEM_WIDTH * 1.1,
		height: ITEM_HEIGHT,
	},
	avatarImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 5,
		borderColor: '#FFFFFF',
		position: 'absolute',
		bottom: -30,
		right: 30
	}
});