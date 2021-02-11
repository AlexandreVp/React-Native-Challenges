import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import Header from "./Header";
import Content from "./Content";
import Cover from "./Cover";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";

export default ({ album }) => {

	const { artist } = album;

	const scrollY = useSharedValue(0);

	return (
		<View style={styles.container}>
			<Cover {...{ scrollY, album }} />
			<Content {...{ scrollY, album }} />
			<Header {...{ scrollY, artist }} />
			<View
				style={{
				position: "absolute",
				top: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
				left: 0,
				right: 0,
				}}
			>
				<ShufflePlay />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
