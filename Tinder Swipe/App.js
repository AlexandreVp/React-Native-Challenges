import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Platform } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import AnimatedCard from './src/components/AnimatedCard';
import { images } from './src/utils/Helpers';


const likeNopeDeg = '22deg';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const rangeThreshold = SCREEN_WIDTH * 0.65;

export default function App() {

	const [key, setKey] = useState(0);
	const [locked, setLocked] = useState(0);

	const [index, setIndex] = useState(0);
	const [nextIndex, setNextIndex] = useState(index + 1);


	const lowerImageStyle = useAnimatedStyle(() => {
		return {
			zIndex: -1,
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			position: 'absolute',
			alignItems: 'center',
			justifyContent: 'center',
			transform: [{ translateX: 0 }, { translateY: 0 }],
		}
	});

	return (
		<SafeAreaView 
			style={styles.safeContainer}
			pointerEvents={locked ? 'none' : 'auto'}
		>
			<View style={styles.container}>
				<View style={styles.headFoot}/>

				<AnimatedCard 
					images={images}
					index={nextIndex}
					style={lowerImageStyle}
					pointerEvents='none'
				/>
				
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		justifyContent: 'center',
		top: 0,
		left: 0,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
	},
	container: {
		flex: 1,
		justifyContent: 'space-around'
	},
	headFoot: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		minHeight: 40,
		marginVertical: 16,
		borderWidth: 1
	},
});
