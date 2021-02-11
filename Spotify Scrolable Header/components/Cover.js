import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MAX_HEADER_HEIGHT } from "./Model";

export default ({ album: { cover } }) => {

	const scale = 1;
	const opacity = 0.2;

	return (
		<View style={[styles.container, { transform: [{ scale }] }]}>
			<Image style={styles.image} source={cover} />
			<View
				style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: MAX_HEADER_HEIGHT,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		width: undefined,
		height: undefined,
	},
});