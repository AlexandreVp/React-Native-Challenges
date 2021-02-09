// Inspiration: https://dribbble.com/shots/2343572-Countdown-timer

import React from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');
const colors = {
	black: '#323F4E',
	red: '#F76A6A',
	text: '#ffffff',
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const TimeNumber = ({number, index, scrollX}) => {

	const inputRange = [
		(index - 1) * ITEM_SIZE,
		index * ITEM_SIZE,
		(index + 1) * ITEM_SIZE,
	];

	const style = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollX.value,
				inputRange,
				[0.4, 1, 0.4]
			),
			transform: [
				{
					scale: interpolate(
						scrollX.value,
						inputRange,
						[0.7, 1, 0.7]
					),
				}
			]
		};
	});

	return (
		<View style={styles.itemWrapper}>
			<Animated.Text style={[styles.text, style]}>{number}</Animated.Text>
		</View>
	)
};

export default function App() {

	const scrollX = useSharedValue(0);

	const onScrollEvent = useAnimatedScrollHandler(event => {
		scrollX.value = event.contentOffset.x;
	});

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.View
				style={[StyleSheet.absoluteFillObject, styles.background]} 
			>
				<TouchableOpacity
					onPress={() => {}}
				>
					<View style={styles.roundButton} />
				</TouchableOpacity>
			</Animated.View>
			<View style={styles.textWrapper}>
				<AnimatedFlatlist 
					data={timers}
					keyExtractor={item => item.toString()}
					horizontal
					bounces={false}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.contentContainerStyle}
					snapToInterval={ITEM_SIZE}
					decelerationRate='fast'
					onScroll={onScrollEvent}
					renderItem={({item, index}) => {
						return (
							<TimeNumber number={item} index={index} scrollX={scrollX}/>
						)
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
	},
	background: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 100,
	},
	roundButton: {
		width: 80,
		height: 80,
		borderRadius: 80,
		backgroundColor: colors.red,
	},
	contentContainerStyle: {
		paddingHorizontal: ITEM_SPACING
	},
	textWrapper: {
		position: 'absolute',
		top: height / 3,
		left: 0,
		right: 0,
		flex: 1,
	},
	itemWrapper: {
		width: ITEM_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: ITEM_SIZE * 0.8,
		color: colors.text,
		fontWeight: 'bold',
	}
});