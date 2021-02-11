import * as React from "react";
import {
  StyleSheet, View, Text, ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Extrapolate, useAnimatedScrollHandler, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import Track from "./Track";

export default ({ album: { artist, tracks }, scrollY }) => {

	const height = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[-MAX_HEADER_HEIGHT, 0],
				[0, MAX_HEADER_HEIGHT],
				Extrapolate.CLAMP
			)
		};
	});

	const opacity = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
				[0, 1, 0],
				Extrapolate.CLAMP
			)
		};
	});

	const onScrollHandler = useAnimatedScrollHandler(event => {
		scrollY.value = event.contentOffset.y;
	});

	return (
		<Animated.ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={1}
			onScroll={onScrollHandler}
		>
			<View style={styles.header}>
				<Animated.View
					style={[styles.gradient, height]}
				>
					<LinearGradient
						style={StyleSheet.absoluteFill}
						start={[0, 0.3]}
						end={[0, 1]}
						colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
					/>
				</Animated.View>
				<View style={styles.artistContainer}>
					<Animated.Text style={[styles.artist, opacity]}>{artist}</Animated.Text>
				</View>
			</View>
			<View style={styles.tracks}>
				{
					tracks.map((track, key) => (
						<Track
							index={key + 1}
							{...{ track, key, artist }}
						/>
					))
				}
			</View>
		</Animated.ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: MAX_HEADER_HEIGHT,
	},
	gradient: {
		position: "absolute",
		left: 0,
		bottom: 0,
		right: 0,
		alignItems: "center",
	},
	artistContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
	},
	artist: {
		textAlign: "center",
		color: "white",
		fontSize: 48,
		fontWeight: "bold",
	},
	tracks: {
		paddingTop: 32,
		backgroundColor: "black",
	},
});
