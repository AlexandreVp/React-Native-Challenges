import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import { MIN_HEADER_HEIGHT, HEADER_DELTA, MAX_HEADER_HEIGHT } from "./Model";
import Header from "./Header";
import Content from "./Content";
import Cover from "./Cover";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";

export default ({ album }) => {

	const { artist } = album;

	const scrollY = useSharedValue(0);

	const translateY = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: scrollY.value < HEADER_DELTA ? scrollY.value * -1 : HEADER_DELTA * -1
				}
			]
		};
	});

	return (
		<View style={styles.container}>
			<Cover {...{ scrollY, album }} />
			<Content {...{ scrollY, album }} />
			<Header {...{ scrollY, artist }} />
			<Animated.View
				style={[styles.shufflePlayWrapper, translateY]}
			>
				<ShufflePlay />
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	shufflePlayWrapper: {
		position: "absolute",
		top: MAX_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
		left: 0,
		right: 0,
	},
});
