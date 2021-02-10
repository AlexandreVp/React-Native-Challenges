// Inspiration: https://dribbble.com/shots/2343572-Countdown-timer

import React, { useCallback, useRef, useState } from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';


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
				[0.6, 1, 0.6]
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
	const timerAnimation = useSharedValue(height);
	const buttonAnimation = useSharedValue(0);
	const countdownTextWrapperOpacity = useSharedValue(0);

	const [duration, setDuration] = useState(timers[0]);
	const [enabled, setEnabled] = useState(true);
	const textInputRef = useRef();

	const onScrollEvent = useAnimatedScrollHandler(event => {
		scrollX.value = event.contentOffset.x;
	});

	let interval;
	const updateTextHandler = (d) => {
		"Worklet"
		interval = setInterval(() => {
			textInputRef.current.setNativeProps({
				text: `${--d}`
			});
		}, 1000);
	};

	const clearIntervalHandler = () => {
		"Worklet"
		clearInterval(interval);

		textInputRef.current.setNativeProps({
			text: `${duration}`
		});

		Vibration.cancel();
		Vibration.vibrate();
		setEnabled(true);
	};

	const timerAnimationCall = useCallback(() => {
		setEnabled(false);
		countdownTextWrapperOpacity.value = 1;
		textInputRef.current.setNativeProps({
			text: `${duration}`
		});

		buttonAnimation.value = withTiming(1, {
			duration: 300
		});

		setTimeout(() => {
			timerAnimation.value = withSequence(
				withTiming(0, {
					duration: 300
				}, () => {
					runOnJS(updateTextHandler)(duration);
				}),
				withTiming(height, {
					duration: duration * 1000 + 400,
				}, () => {
					buttonAnimation.value = withTiming(0);
					countdownTextWrapperOpacity.value = withTiming(0);
					runOnJS(clearIntervalHandler)();
				})
			);
		}, 300);
	}, [duration]);

	const animatedBackgroundStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: timerAnimation.value,
				}
			]
		};
	});

	const buttonContainerStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				buttonAnimation.value,
				[0, 1],
				[1, 0]
			),
			transform: [
				{
					translateY: interpolate(
						buttonAnimation.value,
						[0, 1],
						[0, 200]
					)
				}
			],
		};
	});

	const countdownTextWrapperStyle = useAnimatedStyle(() => {
		return {
			opacity: countdownTextWrapperOpacity.value
		};
	});

	const flatListStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				buttonAnimation.value,
				[0, 1],
				[1, 0]
			),
		};
	});

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.View 
				style={[StyleSheet.absoluteFillObject, styles.animatedBackground, animatedBackgroundStyle]}
			/>
			<Animated.View
				style={[StyleSheet.absoluteFillObject, styles.background, buttonContainerStyle]} 
			>
				<TouchableOpacity
					onPress={timerAnimationCall}
					activeOpacity={0.9}
				>
					<View style={styles.roundButton} />
				</TouchableOpacity>
			</Animated.View>
			<View style={styles.textWrapper}>
				<Animated.View style={[styles.countdownTextWrapper, countdownTextWrapperStyle]}>
					<TextInput 
						ref={textInputRef}
						style={styles.text}
						editable={false}
						value={duration.toString()}
					/>
				</Animated.View>
				<AnimatedFlatlist 
					data={timers}
					keyExtractor={item => item.toString()}
					horizontal
					bounces={false}
					style={flatListStyle}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.contentContainerStyle}
					snapToInterval={ITEM_SIZE}
					decelerationRate='fast'
					scrollEnabled={enabled}
					onScroll={onScrollEvent}
					onMomentumScrollEnd={event => {
						let index = Math.round(event.nativeEvent.contentOffset.x / ITEM_SIZE);

						setDuration(timers[index]);
					}}
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
	animatedBackground: {
		width: width,
		height: height,
		backgroundColor: colors.red
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
	countdownTextWrapper: {
		position: 'absolute',
		width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: ITEM_SIZE * 0.8,
		color: colors.text,
		fontWeight: 'bold',
	}
});