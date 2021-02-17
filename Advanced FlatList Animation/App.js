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
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Ticker = ({ scrollX }) => {

	const inputRange = [
		-width,
		0,
		width
	];

	const style = {
		transform: [
			{
				translateY: scrollX.interpolate({
					inputRange,
					outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT]
				})
			}
		]
	}

	return (
		<View style={styles.tickerContainer}>
			<Animated.View style={style}>
				{data.map(({ type }, index) => {
					return (
						<Text key={index.toString()} style={styles.tickerText}>{type}</Text>
					)
				})}
			</Animated.View>
		</View>
	)
};

const Circle = ({ scrollX }) => {
	
	return (
		<View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
			{data.map(({color}, index) => {

				const inputRange = [
					(index - 0.55) * width,
					index * width,
					(index + 0.55) * width
				];

				const style = {
					transform: [
						{
							scale: scrollX.interpolate({
								inputRange,
								outputRange: [0, 1, 0],
								extrapolate: 'clamp'
							})
						}
					],
					opacity: scrollX.interpolate({
						inputRange,
						outputRange: [0, 0.2, 0],
						extrapolate: 'clamp'
					})
				}

				return (
					<Animated.View 
						key={index.toString()}
						style={[styles.circle, style, {backgroundColor: color}]}
					/>
				)
			})}
		</View>
	)
};

const Item = ({ imageUri, heading, description, index, scrollX }) => {

	const inputRange = [
		(index - 1) * width,
		index * width,
		(index + 1) * width
	];

	const inputRangeOpacity = [
		(index - 0.3) * width,
		index * width,
		(index + 0.3) * width
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

	const headingTextStyle = {
		transform: [
			{
				translateX: scrollX.interpolate({
					inputRange,
					outputRange: [width * 0.2, 0, -width * 0.2]
				})
			}
		],
		opacity: scrollX.interpolate({
			inputRange: inputRangeOpacity,
			outputRange: [0, 1, 0]
		})
	}

	const descriptionTextStyle = {
		transform: [
			{
				translateX: scrollX.interpolate({
					inputRange,
					outputRange: [width * 0.6, 0, -width * 0.6]
				})
			}
		],
		opacity: scrollX.interpolate({
			inputRange: inputRangeOpacity,
			outputRange: [0, 1, 0]
		})
	}
	
	return (
		<View style={styles.itemStyle}>
			<Animated.Image
				source={imageUri}
				style={[styles.imageStyle, imageStyle]}
			/>
			<View style={styles.textContainer}>
				<Animated.Text style={[styles.heading, headingTextStyle]}>{heading}</Animated.Text>
				<Animated.Text style={[styles.description, descriptionTextStyle]}>{description}</Animated.Text>
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
			<Circle scrollX={scrollX}/>
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
			<Ticker scrollX={scrollX}/>
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
	tickerContainer: {
		position: 'absolute',
		top: 40,
		left: 20,
		height: TICKER_HEIGHT,
		overflow: 'hidden'
	},
	tickerText: {
		fontSize: TICKER_HEIGHT,
		lineHeight: TICKER_HEIGHT,
		textTransform: 'uppercase',
		letterSpacing: -1,
		fontWeight: 'bold'
	},
	circleContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE,
		position: 'absolute',
		top: '15%'
	}
});
