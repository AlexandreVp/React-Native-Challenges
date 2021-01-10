import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, interpolate } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AnimatedCard from './src/components/AnimatedCard';
import CrossSVG from './src/components/CrossSVG';
import HeartSVG from './src/components/HeartSVG';
import { images } from './src/utils/Helpers';


const likeNopeDeg = '22deg';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const rangeThreshold = SCREEN_WIDTH * 0.65;

export default function App() {

	const [key, setKey] = useState(0);
	const [locked, setLocked] = useState(0);

	const [index, setIndex] = useState(0);
	const [secondIndex, setSecondIndex] = useState(index + 1);

	const scale = useSharedValue(1);
	const overrideNopeOpacity = useSharedValue(0);
	const overrideLikeOpacity = useSharedValue(0);

	const x = useSharedValue(0);
	const y = useSharedValue(0);
	const originY = useSharedValue(0);

	const upperImageStyle = useAnimatedStyle(() => {
		let factor = -1;

		// half of the screen's height changes the rotation direction
		if (originY.value < SCREEN_HEIGHT / 2) {
			factor = 1;
		}

		// the further we are to the left (-) or right (+), we rotate by up to 10deg
		const rotateZ = interpolate(
			x.value, 
			[0, factor * rangeThreshold], 
			[0, 10]
		);

		// the image rotation with border radius is not working well on android, thus disabled
		return {
			elevation: 2,
			zIndex: 2,
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			position: 'absolute',
			alignItems: 'center',
			justifyContent: 'center',
			transform: [
				{ scale: scale.value },
				{ translateX: x.value },
				{ translateY: y.value },
				{ rotateZ: Platform.OS === 'android' ? '0deg' : `${rotateZ}deg` },
			],
		};
	});

	const lowerImageStyle = useAnimatedStyle(() => {
		return {
			zIndex: -1,
			elevation: -1,
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
					index={secondIndex}
					style={lowerImageStyle}
					pointerEvents='none'
				/>

				<AnimatedCard 
					style={upperImageStyle}
					images={images}
					index={index}
					pointerEvents='auto'
				>

				</AnimatedCard>

				<View style={styles.headFoot}>
					<TouchableOpacity onPress={() => {}} style={styles.icon}>
						<CrossSVG />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => {}} style={styles.icon}>
						<HeartSVG />
					</TouchableOpacity>
				</View>
				
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
		justifyContent: 'space-around',
	},
	headFoot: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		minHeight: 40,
		marginVertical: 16,
		borderWidth: 1
	},
	icon: {
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		width: 55,
		height: 55,
		padding: 14,
		borderRadius: 100,
		backgroundColor: 'rgba(251,251,251,1)',
	},
});
