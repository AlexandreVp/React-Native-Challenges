import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, StatusBar } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, withTiming, useDerivedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

import Page from './components/Page';

const { width, height } = Dimensions.get('window');
const WORDS = ["What's", "up", "mobile", "devs?"];

export default function App() {

	const translateX = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler((event, context) => {
		translateX.value = event.contentOffset.x;
	});

	return (
		<Animated.ScrollView
			onScroll={scrollHandler}
			style={styles.container}
			horizontal
			pagingEnabled
			decelerationRate='fast'
			showsHorizontalScrollIndicator={false}
			bounces={false}
			scrollEventThrottle={16}
		>
			{WORDS.map((value, index) => {
				return (
					<Page 
						key={index.toString()}
						title={value}
						index={index}
						translateX={translateX}
					>
					</Page>
				)
			})}
		</Animated.ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
})