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

import { bgColorInput, bgColorOutput, transformInput, rotateY_CircleOutput, scale_CircleOutput, translateX_CircleOutput, rotateY_CircleButtonOutput, textOpacityInput, textOpacityOutput, circleButtonOpacityInput, circleButtonOpacityOutput } from './helpers';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 100;
const DURATION = 1400;
const DOT_PADDING_BOTTOM = 75;
const SCREENS = 5;	// >= 2 (number of screens to animate)

//ANIMATED CONFIGS:
const PERSPECTIVE = 200;	// 100, 150, 200, 300, 400
const SCREEN_COLORS = ['#FF7F00','#FFFFFF','#FF7F00','#FFFFFF','#FF7F00'];
const SCREEN_COLORS_REVERSE = ['#FFFFFF','#FF7F00','#FFFFFF','#FF7F00','#FFFFFF'];
const BG_COLOR_INPUT = bgColorInput(SCREENS);
const BG_COLOR_OUTPUT = bgColorOutput(SCREEN_COLORS);
const BG_COLOR_OUTPUT_REVERSE = bgColorOutput(SCREEN_COLORS_REVERSE);
const TRANSFORM_INPUT = transformInput(SCREENS);
const ROTATE_Y_CIRCLE_OUTPUT = rotateY_CircleOutput(SCREENS);
const SCALE_CIRCLE_OUTPUT = scale_CircleOutput(SCREENS);
const TRANSLATE_X_CIRCLE_OUTPUT = translateX_CircleOutput(SCREENS, PERSPECTIVE);
const ROTATE_Y_CIRCLE_BUTTON_OUTPUT = rotateY_CircleButtonOutput(SCREENS);
const CIRCLE_BUTTON_OPACITY_INPUT = circleButtonOpacityInput(SCREENS);
const CIRCLE_BUTTON_OPACITY_OUTPUT = circleButtonOpacityOutput(SCREENS);
const TEXT_OPACITY_INPUT = textOpacityInput(SCREENS);
const TEXT_OPACITY_OUTPUT = textOpacityOutput(SCREENS);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Circle = ({ onPress, animatedValue, index, icon }) => {

	let colors = ['#FF7F00','#FFFFFF','#FF7F00','#FFFFFF','#FF7F00'];

	const containerBackgroundColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animatedValue.value,
				BG_COLOR_INPUT,
				BG_COLOR_OUTPUT
			)
		};
	});

	const circleStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					perspective: PERSPECTIVE
				},
				{
					rotateY: `${interpolate(
						animatedValue.value,
						TRANSFORM_INPUT,
						ROTATE_Y_CIRCLE_OUTPUT
					)}deg`
				},
				{
					scale: interpolate(
						animatedValue.value,
						TRANSFORM_INPUT,
						SCALE_CIRCLE_OUTPUT
					)
				},
				{
					translateX: interpolate(
						animatedValue.value,
						TRANSFORM_INPUT,
						TRANSLATE_X_CIRCLE_OUTPUT //perspective 400 = 16 ; perscpective 300 = 32 ; perscpective 200 = 48
					)
				}
			],
			backgroundColor: interpolateColor(
				animatedValue.value,
				BG_COLOR_INPUT,
				BG_COLOR_OUTPUT_REVERSE
			)
		};
	});

	const circleButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotateY: `${interpolate(
						animatedValue.value,
						TRANSFORM_INPUT,
						ROTATE_Y_CIRCLE_BUTTON_OUTPUT
					)}deg`
				},
			],
			opacity: interpolate(
				animatedValue.value,
				CIRCLE_BUTTON_OPACITY_INPUT,
				CIRCLE_BUTTON_OPACITY_OUTPUT
			)
		};
	});

	return (
		<Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, containerBackgroundColorStyle]}>
			<Animated.View style={[styles.circle, circleStyle]}>
				<TouchableOpacity disabled={index == (SCREENS-1) ? true : false} onPress={onPress}>
					<Animated.View style={[styles.circleButton, circleButtonStyle]}>
						<AntDesign name={icon} size={28} color={colors[index]} />
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
				BG_COLOR_INPUT,
				BG_COLOR_OUTPUT_REVERSE
			),
			opacity: interpolate(
				animatedValue.value,
				TEXT_OPACITY_INPUT,
				TEXT_OPACITY_OUTPUT
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