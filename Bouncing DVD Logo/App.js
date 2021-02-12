import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, Easing } from 'react-native-reanimated';
 
const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 122;
const LOGO_HEIGHT = 80;
const DURATION = 3 * 1000;

const Logo = () => {
	return (
		<View style={styles.logoWrapper}>
			<Text style={styles.dvdText}>DVD</Text>
			<Text style={styles.videoText}>VIDEO</Text>
		</View>
	)
};

const App = () => {

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	useEffect(() => {
		translateX.value = withRepeat(
			withTiming(width - LOGO_WIDTH, {
				duration: DURATION,
				easing: Easing.linear
			}),
			-1,
			true
		);
		translateY.value = withRepeat(
			withTiming(height - LOGO_HEIGHT, {
				duration: DURATION * 1.6,
				easing: Easing.linear
			}),
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
				<Logo />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#000000',
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