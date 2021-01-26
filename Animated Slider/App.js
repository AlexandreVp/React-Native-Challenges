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
const DURATION = 1200;
const LENGHT = 5;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}


const Circle = ({ onPress, animatedValue, index, icon }) => {

	const containerBackgroundColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animatedValue.value,
				[0, 0.001, 0.5, 0.501, 1],
				['gold', 'gold', 'gold', '#444', '#444'],
			)
		};
	});

	const cicleStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					perspective: 200
				},
				{
					rotateY: `${interpolate(
						animatedValue.value,
						[0, 0.5, 1],
						[0, -90, -180]
					)}deg`
				},
				{
					scale: interpolate(
						animatedValue.value,
						[0, 0.5, 1],
						[1, 8, 1]
					)
				},
				{
					translateX: interpolate(
						animatedValue.value,
						[0, 0.5, 1],
						[0, width/48, 0] //perspective 400 = 16 ; perscpective 300 = 32 ; perscpective 200 = 48
					)
				}
			],
			backgroundColor: interpolateColor(
				animatedValue.value,
				[0, 0.001, 0.5, 0.501, 1],
				['#444', '#444', '#444', 'gold', 'gold']
			)
		};
	});

	const circleButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotateY: `${interpolate(
						animatedValue.value,
						[0, 0.5, 1],
						[0, 180, 180]
					)}deg`
				},
			],
			opacity: interpolate(
				animatedValue.value,
				[0, 0.3, 0.5, 0.7, 1],
				[1, 0, 0, 0, 1]
			)
		};
	});

	return (
		<Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, containerBackgroundColorStyle]}>
			<Animated.View style={[styles.circle, cicleStyle]}>
				<TouchableOpacity disabled={index === LENGHT ? true : false} onPress={onPress}>
					<Animated.View style={[styles.circleButton, circleButtonStyle]}>
						<AntDesign name={icon} size={28} color='white' />
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

	const animate = (i, toValue = 1) => {
		animatedValue.value =  withTiming(toValue, {
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
		if (i === LENGHT) {
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
		animatedValue.value = 0;
		animate(index + 1);
	};

	const onPressGoBack = () => {
		animatedValue.value = 1;
		animate(index - 1, 0);
	};

	const textStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				animatedValue.value,
				[0, 0.001, 0.5, 0.501, 1],
				['#444', '#444', '#444', 'gold', 'gold']
			),
			opacity: interpolate(
				animatedValue.value,
				[0, 0.2, 0.5, 0.8, 1],
				[1, 0, 0, 0, 1]
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
		paddingBottom: 100,
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
		bottom: 50
	}
});

const quotes = [
	{
		quote: 'For the things we have to learn before we can do them, we learn by doing them.',
		author: 'Aristotle, The Nicomachean Ethics',
	},
	{
		quote: 'The fastest way to build an app.',
		author: 'The Expo Team',
	},
	{
		quote: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
		author: 'Nelson Mandela',
	},
	{
		quote: 'The way to get started is to quit talking and begin doing.',
		author: 'Walt Disney',
	},
	{
		quote: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
		author: 'Steve Jobs',
	},
	{
		quote: 'If life were predictable it would cease to be life, and be without flavor.',
		author: 'Eleanor Roosevelt',
	},
	{
		quote: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
		author: 'Oprah Winfrey',
	},
	{
		quote: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
		author: 'James Cameron',
	},
	{
		quote: "Life is what happens when you're busy making other plans.",
		author: 'John Lennon',
	},
];

const colors = [
	{
		initialBgColor: 'goldenrod',
		bgColor: '#222',
		nextBgColor: '#222',
	},
	{
		initialBgColor: 'goldenrod',
		bgColor: '#222',
		nextBgColor: 'yellowgreen',
	},
	{
		initialBgColor: '#222',
		bgColor: 'yellowgreen',
		nextBgColor: 'midnightblue',
	},
	{
		initialBgColor: 'yellowgreen',
		bgColor: 'midnightblue',
		nextBgColor: 'turquoise',
	},
	{
		initialBgColor: 'midnightblue',
		bgColor: 'turquoise',
		nextBgColor: 'goldenrod',
	},
	{
		initialBgColor: 'turquoise',
		bgColor: 'goldenrod',
		nextBgColor: '#222',
	},
];