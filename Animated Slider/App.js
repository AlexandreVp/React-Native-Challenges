import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
	View, 
	StyleSheet, 
	TouchableOpacity, 
	Dimensions, 
	Text, 
	LayoutAnimation, 
	UIManager, 
	Platform,
	SafeAreaView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolate, runOnJS, interpolateColor } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 100;
const DURATION = 1400;
const DOT_PADDING_BOTTOM = 75;
const SCREENS = 3;	// >= 2 (number of screens to animate)

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

// [0, 0.5, 0.501, 1]															done
	// ['gold', 'gold', 'black', 'black']										done
	// ['black', 'black', 'gold', 'gold']	usar o reverse()					done

// icon colors
	// ['gold', 'black', 'gold']												done

// [0, 0.5, 1]																	done
	// [0, -90, -180]															done
	// [1, 8, 1]				mantém											done
	// [0, width/48, 0]			mantém											done
	// [0, 180, 180]															done

// [0, 0.2, 0.8, 1]																done
	// [1, 0, 0, 1]																done


const Circle = ({ onPress, animatedValue, index, icon }) => {

	const iconColors = ['gold', 'black', 'gold'];

	const containerBackgroundColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animatedValue.value,
				[0, 0.5, 0.501, 1, 1, 1.5, 1.501, 2],
				['gold', 'gold', 'black', 'black', 'black', 'black', 'gold', 'gold'],
			)
		};
	});

	const circleStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					perspective: 200
				},
				{
					rotateY: `${interpolate(
						animatedValue.value,
						[0, 0.5, 1, 1, 1.5, 2],
						[0, -90, -180, -180, -270, -360]
					)}deg`
				},
				{
					scale: interpolate(
						animatedValue.value,
						[0, 0.5, 1, 1, 1.5, 2],
						[1, 8, 1, 1, 8, 1]
					)
				},
				{
					translateX: interpolate(
						animatedValue.value,
						[0, 0.5, 1, 1, 1.5, 2],
						[0, width/48, 0, 0, width/48, 0] //perspective 400 = 16 ; perscpective 300 = 32 ; perscpective 200 = 48
					)
				}
			],
			backgroundColor: interpolateColor(
				animatedValue.value,
				[0, 0.5, 0.501, 1, 1, 1.5, 1.501, 2],
				['black', 'black', 'gold', 'gold', 'gold', 'gold', 'black', 'black']
			)
		};
	});

	const circleButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotateY: `${interpolate(
						animatedValue.value,
						[0, 0.5, 1, 1, 1.5, 2],
						[0, 180, 180, 180, 360, 360]
					)}deg`
				},
			],
			opacity: interpolate(
				animatedValue.value,
				[0, 0.2, 0.8, 1, 1, 1.2, 1.8, 2],
				[1, 0, 0, 1, 1, 0, 0, 1]
			)
		};
	});

	return (
		<Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, containerBackgroundColorStyle]}>
			<Animated.View style={[styles.circle, circleStyle]}>
				<TouchableOpacity disabled={index == (SCREENS-1) ? true : false} onPress={onPress}>
					<Animated.View style={[styles.circleButton, circleButtonStyle]}>
						<AntDesign name={icon} size={28} color={iconColors[index]} />
					</Animated.View>
				</TouchableOpacity>
			</Animated.View>
		</Animated.View>
	)
}

export default () => {

	const animatedValue = useSharedValue(0);
	const [index, setIndex] = useState(0);
	const [icon, setIcon] = useState('arrowright');
	const [disabled, setDisabled] = useState(false);

	const animate = (i) => {
		animatedValue.value =  withTiming(i, {
			duration: DURATION,
		});
		LayoutAnimation.configureNext({
			duration: 300,
			create: {
				property: LayoutAnimation.Properties.opacity,
				type: LayoutAnimation.Types.easeInEaseOut,
				delay: DURATION - 200,
			},
			update: {
				type: LayoutAnimation.Types.easeInEaseOut,
			},
			delete: {
				property: LayoutAnimation.Properties.opacity,
				type: LayoutAnimation.Types.easeInEaseOut,
			},
		});
		setIndex(i);

		if (i == (SCREENS-1)) {
			setTimeout(() => {
				setIcon('check');
			}, DURATION/2);
		} else {
			setTimeout(() => {
				setIcon('arrowright');
			}, DURATION/2);
		}
	};

	const onPress = () => {
		animate(index + 1);
	};

	const onPressGoBack = () => {
		animate(index - 1);
	};

	const textStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				animatedValue.value,
				[0, 0.5, 0.501, 1, 1, 1.5, 1.501, 2],
				['black', 'black', 'gold', 'gold', 'gold', 'gold', 'black', 'black']
			),
			opacity: interpolate(
				animatedValue.value,
				[0, 0.5, 0.8, 1, 1, 1.5, 1.8, 2],
				[1, 0, 0, 1, 1, 0, 0, 1]
			)
		};
	});

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<Circle onPress={onPress} animatedValue={animatedValue} index={index} icon={icon} />
			{
				index > 0 &&
				<TouchableOpacity 
					onPress={onPressGoBack} 
					style={[styles.backButtonWrapper]}
				>
					<Animated.Text style={[styles.goBackText, textStyle]}>Go back</Animated.Text>
				</TouchableOpacity>
			}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	circleContainer: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: DOT_PADDING_BOTTOM,
	},
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE/2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	circleButton: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE/2,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
	goBackText: {
		marginTop: 10,
		fontWeight: 'bold'
	},
	backButtonWrapper: {
		position: 'absolute',
		alignSelf: 'center',
		justifyContent: 'center',
		bottom: DOT_PADDING_BOTTOM/2,
	}
});