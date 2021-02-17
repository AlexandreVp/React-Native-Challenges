import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	Animated,
	FlatList
} from 'react-native';
import data from './data';

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;

const Item = ({ imageUri, heading, description, index, scrollX }) => {

	const inputRange = [
		(index - 1) * width,
		index * width,
		(index + 1) * width
	];

	const imageStyle = {
		transform: [
			{
				scale: scrollX.interpolate({
					inputRange,
					outputRange: [0, 1, 0]
				})
			}
		]
	}
	
	return (
		<View style={styles.itemStyle}>
			<Animated.Image
				source={imageUri}
				style={[styles.imageStyle, imageStyle]}
			/>
			<View style={styles.textContainer}>
				<Text style={[styles.heading]}>{heading}</Text>
				<Text style={[styles.description]}>{description}</Text>
			</View>
		</View>
	);
};

const Pagination = () => {

	return (
		<View style={[styles.pagination]}>
			{data.map((item) => {
				return (
					<View key={item.key} style={styles.paginationDotContainer}>
						<View
							style={[styles.paginationDot, { backgroundColor: item.color }]}
						/>
					</View>
				);
			})}
		</View>
	);
};

export default function App() {

	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<View style={styles.container}>
			<StatusBar style='auto' hidden />
			<Animated.FlatList
				data={data}
				keyExtractor={(item) => item.key}
				renderItem={({ item, index }) => {
					return (
						<Item {...item} index={index} scrollX={scrollX}/>
					)
				}}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				horizontal
				bounces={false}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: {x: scrollX}}}],
					{ useNativeDriver: true }
				)}
			/>
			<Image
				style={styles.logo}
				source={require('./assets/ue_black_logo.png')}
			/>
			<Pagination />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	itemStyle: {
		width,
		height,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageStyle: {
		width: width * 0.75,
		height: width * 0.75,
		resizeMode: 'contain',
		flex: 1,
	},
	textContainer: {
		alignItems: 'flex-start',
		alignSelf: 'flex-end',
		flex: 0.5,
	},
	heading: {
		color: '#444',
		textTransform: 'uppercase',
		fontSize: 24,
		fontWeight: '800',
		letterSpacing: 2,
		marginBottom: 5,
	},
	description: {
		color: '#ccc',
		fontWeight: '600',
		textAlign: 'left',
		width: width * 0.75,
		marginRight: 10,
		fontSize: 16,
		lineHeight: 16 * 1.5,
	},
	logo: {
		opacity: 0.9,
		height: LOGO_HEIGHT,
		width: LOGO_WIDTH,
		resizeMode: 'contain',
		position: 'absolute',
		left: 10,
		bottom: 10,
		transform: [
		{ translateX: -LOGO_WIDTH / 2 },
		{ translateY: -LOGO_HEIGHT / 2 },
		{ rotateZ: '-90deg' },
		{ translateX: LOGO_WIDTH / 2 },
		{ translateY: LOGO_HEIGHT / 2 },
		],
	},
	pagination: {
		position: 'absolute',
		right: 20,
		bottom: 40,
		flexDirection: 'row',
		height: DOT_SIZE,
	},
	paginationDot: {
		width: DOT_SIZE * 0.3,
		height: DOT_SIZE * 0.3,
		borderRadius: DOT_SIZE * 0.15,
	},
	paginationDotContainer: {
		width: DOT_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
