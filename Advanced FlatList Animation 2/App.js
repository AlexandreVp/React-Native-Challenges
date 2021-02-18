import React, { useRef, useState } from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';


const {width, height} = Dimensions.get('screen');
const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
	{
		"key": "3571572",
		"title": "Multi-lateral intermediate moratorium",
		"description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
	},
	{
		"key": "3571747",
		"title": "Automated radical data-warehouse",
		"description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571747.png"
	},
	{
		"key": "3571680",
		"title": "Inverse attitude-oriented system engine",
		"description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571680.png"
	},
	{
		"key": "3571603",
		"title": "Monitored global data-warehouse",
		"description": "We need to program the open-source IB interface!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571603.png"
	}
];

const Indicator = ({ scrollX }) => {


	return (
		<View style={styles.indicatorWrapper}>
			{DATA.map((_, index) => {

				const inputRange = [
					(index - 1) * width,
					index * width,
					(index + 1) * width
				];

				const style = {
					transform: [
						{
							scale: scrollX.interpolate({
								inputRange,
								outputRange: [0.8, 1.4, 0.8],
								extrapolate: 'clamp'
							})
						}
					],
					opacity: scrollX.interpolate({
						inputRange,
						outputRange: [0.5, 1, 0.5],
						extrapolate: 'clamp'
					})
				}

				return (
					<Animated.View
						key={index.toString()}
						style={[styles.indicator, style]}
					/>
				)
			})}
		</View>
	)
};

const Backdrop = ({ scrollX }) => {

	const style = {
		backgroundColor: scrollX.interpolate({
			inputRange: bgs.map((_, index) => index * width),
			outputRange: bgs.map(bg => bg)
		})
	}

	return (
		<Animated.View 
			style={[StyleSheet.absoluteFillObject, style]}
		/>
	)
};

const Square = ({ scrollX }) => {

	const YOLO = Animated.modulo(
		Animated.divide(
			Animated.modulo(scrollX, width),
			new Animated.Value(width)
		),
		1
	);

	const style = {
		transform: [
			{
				rotate: YOLO.interpolate({
					inputRange: [0, 0.5, 1],
					outputRange: ['35deg', '0deg', '35deg']
				})
			},
			{
				translateX: YOLO.interpolate({
					inputRange: [0, 0.5, 1],
					outputRange: [0, -height, 0]
				})
			}
		]
	}

	return (
		<Animated.View 
			style={[styles.square, style]}
		/>
	)
};

export default function App() {

	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Backdrop scrollX={scrollX}/>
			<Square scrollX={scrollX}/>
			<Animated.FlatList
				data={DATA}
				keyExtractor={item => item.key}
				horizontal
				contentContainerStyle={styles.contentContainerStyle}
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				bounces={false}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{nativeEvent: {contentOffset: {x: scrollX}}}],
					{useNativeDriver: false} //nativeDriver does not support backgroundColor changes
				)}
				renderItem={({item}) => {

					return (
						<View style={styles.itemWrapper}>
							<View style={styles.imageWrapper}>
								<Image source={{uri: item.image}} style={styles.image} resizeMode='contain'/>
							</View>
							<View style={styles.textWrapper}>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.description}>{item.description}</Text>
							</View>
						</View>
					)
				}}
			/>
			<Indicator scrollX={scrollX}/>
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
	contentContainerStyle: {
		paddingBottom: 100
	},
	itemWrapper: {
		width,
		alignItems: 'center',
		padding: 20
	},
	imageWrapper: {
		flex: 0.7,
		justifyContent: 'center',
	},
	textWrapper: {
		flex: 0.3
	},
	image: {
		width: width / 2,
		height: width / 2
	},
	title: {
		fontWeight: 'bold',
		fontSize: 28,
		marginBottom: 10,
		color: '#ffffff'
	},
	description: {
		fontWeight: '300',
		fontSize: 18,
		color: '#ffffff'
	},
	indicator: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#ffffff',
		margin: 10
	},
	indicatorWrapper: {
		position: 'absolute',
		bottom: 50,
		flexDirection: 'row'
	},
	square: {
		width: height,
		height: height,
		backgroundColor: '#ffffff',
		borderRadius: 86,
		position: 'absolute',
		top: -height * 0.58,
		left: -height * 0.3
	}
});