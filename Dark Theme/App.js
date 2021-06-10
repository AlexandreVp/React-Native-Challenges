import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, StatusBar } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, withTiming, useDerivedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = width*0.7;

const Colors = {
	dark: {
		background: '#1e1e1e',
		circle: '#252525',
		text: '#f8f8f8',
	},
	light: {
		background: '#f8f8f8',
		circle: '#FFFFFF',
		text: '#1e1e1e',
	},
};

const SWITCH_TRACK_COLOR = {
	true: '#ffb3d9',
	false: 'rgba(0,0,0,0.1)',
};

export default function App() {

	const [darkTheme, setDarkTheme] = useState(false);

	// const theme = useSharedValue(0);
	const theme = useDerivedValue(() => {
		return darkTheme == false ? withTiming(0) : withTiming(1);
	}, [darkTheme]);

	const rBackStyle = useAnimatedStyle(() => {

		const backgroundColors = interpolateColor(
			theme.value,
			[0, 1],
			[Colors.light.background, Colors.dark.background]
		);

		const textColors = interpolateColor(
			theme.value,
			[0, 1],
			[Colors.light.text, Colors.dark.text]
		);

		return {
			backgroundColor: backgroundColors,
		}
	});

	const rCircleStyle = useAnimatedStyle(() => {

		const circleColors = interpolateColor(
			theme.value,
			[0, 1],
			[Colors.light.circle, Colors.dark.circle]
		);

		return {
			backgroundColor: circleColors,
		}
	});

	const rTextStyle = useAnimatedStyle(() => {

		const textColors = interpolateColor(
			theme.value,
			[0, 1],
			[Colors.light.text, Colors.dark.text]
		);

		return {
			color: textColors,
		}
	});

	return (
		<Animated.View style={[styles.container, rBackStyle]}>
			<StatusBar hidden/>
			<Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
			<Animated.View style={[styles.circle, rCircleStyle]}>
				<Switch 
					value={darkTheme}
					onValueChange={(value) => {
						setDarkTheme(value);
						// theme.value = theme.value === 0 ? withTiming(1) : withTiming(0);
					}}
					trackColor={SWITCH_TRACK_COLOR}
					thumbColor='#ffb3d9'
				/>
			</Animated.View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		elevation: 10,
	},
	text: {
		fontSize: 60,
		marginBottom: 20,
		letterSpacing: 16,
		textTransform: 'uppercase',
	}
})