import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolate, runOnJS, interpolateColor } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 100;

const Circle = ({ onPress, animatedValue }) => {

	const containerBackgroundColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animatedValue.value,
				[0, 0.001, 0.5, 0.501, 1],
				['gold', 'gold', 'gold', '#444', '#444']
			)
		};
	});

	const circleBackgroundColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animatedValue.value,
				[0, 0.001, 0.5, 0.501, 1],
				['#444', '#444', '#444', 'gold', 'gold']
			)
		};
	});

	const cicleStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					perspective: 400
				},
				{
					rotateY: `${interpolate(
						animatedValue.value,
						[0, 0.5, 1],
						[0, -90, -180]
					)}deg`
				},
				{
					scale: interpolate(
						animatedValue.value,
						[0, 0.5, 1],
						[1, 8, 1]
					)
				},
				{
					translateX: interpolate(
						animatedValue.value,
						[0, 0.5, 1],
						[0, width/16, 0]
					)
				}
			],

		};
	});

	return (
		<Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, containerBackgroundColorStyle]}>
			<Animated.View style={[styles.circle, cicleStyle, circleBackgroundColorStyle]}>
				<TouchableOpacity onPress={onPress}>
					<View style={[styles.circle, styles.circleButton]}>
						<AntDesign name='arrowright' size={28} color='white' />
					</View>
				</TouchableOpacity>
			</Animated.View>
		</Animated.View>
	)
}

export default () => {

	const animatedValue = useSharedValue(0);
	const [index, setIndex] = useState(0);

	const animate = (toValue) => {
		return withTiming(toValue, {
			duration: 3000,
		}, () => {
			runOnJS(setIndex)(toValue);
		});
	};

	const onPress = () => {
		animatedValue.value = animate(index === 0 ? 1 : 0);
	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Circle onPress={onPress} animatedValue={animatedValue} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	circleContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 8,
		paddingBottom: 100
	},
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE/2
	},
	circleButton: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	}
})