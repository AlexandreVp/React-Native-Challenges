import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";

export default ({ artist, scrollY }) => {

	const opacity = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[HEADER_DELTA - 16, HEADER_DELTA],
				[0, 1],
				Extrapolate.CLAMP
			)
		};
	});

	const textOpacity = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[HEADER_DELTA - 8, HEADER_DELTA - 4],
				[0, 1],
				Extrapolate.CLAMP
			)
		};
	});

	return (
		<Animated.View style={[styles.container, opacity]}>
			<Animated.Text style={[styles.title, textOpacity]}>{artist}</Animated.Text>
		</Animated.View>
	)
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: MIN_HEADER_HEIGHT,
		backgroundColor: "black",
		paddingTop: Constants.statusBarHeight,
	},
	title: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
		fontWeight: "400",
	},
});
