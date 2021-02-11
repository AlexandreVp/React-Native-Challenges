import * as React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { HEADER_DELTA, MAX_HEADER_HEIGHT } from "./Model";

const { height } = Dimensions.get('window');

export default ({ album: { cover }, scrollY }) => {

	const scale = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(
						scrollY.value,
						[-MAX_HEADER_HEIGHT, 0],
						[4, 1],
						Extrapolate.CLAMP
					)
				}
			]
		};
	});

	const opacity = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[-64, 0, HEADER_DELTA],
				[0, 0.2, 1],
				Extrapolate.CLAMP
			)
		};
	});

	return (
		<Animated.View style={[styles.container, scale]}>
			<Image style={styles.image} source={cover} />
			<Animated.View
				style={[{ ...StyleSheet.absoluteFillObject, backgroundColor: "black" }, opacity]}
			/>
		</Animated.View>
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
