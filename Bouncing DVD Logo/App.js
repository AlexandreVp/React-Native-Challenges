import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, Easing, runOnJS } from 'react-native-reanimated';
 
const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 122;
const LOGO_HEIGHT = 80;
const DURATION = Math.PI / 2 * 1000;
const COLORS = [
	'#ff0000',
	'#00ff00',
	'#0000ff',
	'#ffff00',
	'#00ffff',
	'#ff00ff'
];

const Logo = ({ color }) => {

	const styleVIDEO = useAnimatedStyle(() => {
		return {
			color: color.value
		}
	})

	const styleDVD = useAnimatedStyle(() => {
		return {
			color: color.value
		}
	})

	return (
		<View style={styles.logoWrapper}>
			<Animated.Text style={[styles.dvdText, styleDVD]}>DVD</Animated.Text>
			<Animated.Text style={[styles.videoText, styleVIDEO]}>VIDEO</Animated.Text>
		</View>
	)
};

const App = () => {

	const color = useSharedValue(COLORS[0]);
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const onBounce = useCallback(() => {
		"worklet"
		const colorsLeft = COLORS.concat();

		colorsLeft.splice(colorsLeft.indexOf(color.value), 1);

		color.value = colorsLeft[Math.round(Math.random() * (colorsLeft.length - 1))];

	}, []);

	useEffect(() => {
		translateX.value = withRepeat(
			withTiming(width - LOGO_WIDTH, {
				duration: DURATION,
				easing: Easing.linear
			}, onBounce),
			-1,
			true
		);
		translateY.value = withRepeat(
			withTiming(height - LOGO_HEIGHT, {
				duration: DURATION * Math.PI,
				easing: Easing.linear
			}, onBounce),
			-1,
			true
		)
	})

	const style = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value
				},
				{
					translateY: translateY.value
				}
			]
		};
	});

	return (
		<View style={styles.container}>
			<StatusBar hidden/>
			<Animated.View style={[style]}>
				<Logo color={color} />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
	},
	logoWrapper: {
		width: LOGO_WIDTH,
		height: LOGO_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dvdText: {
		fontSize: 56,
		fontWeight: 'bold',
		fontStyle: 'italic',
		lineHeight: 52
	},
	videoText: {
		fontSize: 25,
		fontWeight: 'bold',
		fontStyle: 'italic',
		letterSpacing: 10,
		lineHeight: 25,
	}
})

export default App;