import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withSpring } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AnimatedCard from './src/components/AnimatedCard';
import SwipePanGestureHandler from './src/components/SwipePanGestureHandler';
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

	const [l, setL] = useState(true);

	const onSwiped = useCallback(
		async (right) => {
			"Worklet"
			setL(false);

			// disable touches while animating
			setLocked(true);
		
			if (right) {
				// spring 'over the screen' to the right
				x.value = withSpring(SCREEN_WIDTH * 1.5);
				y.value = withSpring(0);
			} else {
				// spring 'over the screen' to the left
				x.value = withSpring(-SCREEN_WIDTH * 1.5);
				y.value = withSpring(0);
			}
		
			// while the spring/swipe animation is running, we do not want to switch
			// to the next image already, but just when the image is out of screen
			setTimeout(() => {
				const incSafe = (i) => (i + 1) % images.length;
		
				// next image 'behind'
				setSecondIndex(incSafe(secondIndex));
		
				// next image 'on top'
				setIndex(incSafe(index));
		
				// reset values/positions
				x.value = 0;
				y.value = 0;
				overrideNopeOpacity.value = 0;
				overrideLikeOpacity.value = 0;
		
				// prevent memory issues
		
				setKey(key + 1);
				setLocked(false);
			}, 300);
			
			setTimeout(() => {
				setL(true);
			}, 300);
		},
		[key, index, secondIndex],
	  );

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

	const likeOpacityStyle = useAnimatedStyle(() => {
		// swipe right - x is getting closer more positive - more opacity
		const opacity = interpolate(
			x.value, 
			[0, rangeThreshold], 
			[0, 1]
		);
	
		return {
		  opacity: overrideLikeOpacity.value || opacity,
		};
	});

	const nopeOpacityStyle = useAnimatedStyle(() => {
		// swipe left - x is getting closer more negative - more opacity
		const opacity = interpolate(
			x.value, 
			[0, -rangeThreshold], 
			[0, 1]
		);
	
		return {
		  opacity: overrideNopeOpacity.value || opacity,
		};
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

				{l &&
				<AnimatedCard 
					style={upperImageStyle}
					images={images}
					index={index}
					pointerEvents='auto'
				>
					<SwipePanGestureHandler onSnap={onSwiped} x={x} y={y} originY={originY}>
						<Animated.View style={styles.overlay}>
							<View style={styles.row}>
								<Animated.View style={[styles.like, likeOpacityStyle]}>
									<Text style={styles.likeLabel}>LIKE</Text>
								</Animated.View>
								<Animated.View style={[styles.nope, nopeOpacityStyle]}>
									<Text style={styles.nopeLabel}>NOPE</Text>
								</Animated.View>
							</View>
						</Animated.View>
					</SwipePanGestureHandler>
				</AnimatedCard>}

				<View style={styles.headFoot}>
					<TouchableOpacity 
						onPress={() => {
							// let "nope" stay a bit, before swiping
							overrideNopeOpacity.value = withSpring(1);
							setTimeout(() => onSwiped(false), 500);
						}} 
						style={styles.icon}
					>
						<CrossSVG />
					</TouchableOpacity>

					<TouchableOpacity 
						onPress={() => {
							// let "like" stay a bit, before swiping
							overrideLikeOpacity.value = withSpring(1);
							setTimeout(() => onSwiped(true), 500);
						}} 
						style={styles.icon}
					>
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
		justifyContent: 'space-between',
	},
	headFoot: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		minHeight: 40,
		marginVertical: 16,
	},
	overlay: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 16,
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	like: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		borderWidth: 5,
		borderRadius: 6,
		padding: 8,
		margin: 8,
		borderColor: '#67d4a8',
		transform: [{ rotateZ: `-${likeNopeDeg}` }],
	},
	nope: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		borderWidth: 5,
		borderRadius: 6,
		padding: 8,
		margin: 8,
		borderColor: '#e04e81',
		transform: [{ rotateZ: `${likeNopeDeg}` }],
	},
	likeLabel: {
		fontSize: 32,
		color: '#67d4a8',
		fontWeight: 'bold',
	},
	nopeLabel: {
		fontSize: 32,
		color: '#e04e81',
		fontWeight: 'bold',
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
