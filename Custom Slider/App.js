import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TextInput } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
	useSharedValue, 
	useAnimatedGestureHandler, 
	useAnimatedStyle, 
	interpolate, 
	Extrapolate,
	runOnJS
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import Knob, { IMAGE_SIZE } from './components/Knob';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 100;

const App = () => {

	const textInputRef = useRef();

	const opacity = useSharedValue(0);
	const translationX = useSharedValue(-IMAGE_SIZE/2);
	const label = useSharedValue(Math.round(((translationX.value+IMAGE_SIZE/2)/SLIDER_WIDTH)*80));

	const setInputText = (value) => {
		"Worklet"
		textInputRef.current.setNativeProps({
			text: `${value}`
		});
	}

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (event, context) => {
			opacity.value = 1;
			context.posX = translationX.value;
		},
		onActive: (event, context) => {
			let activePosX = event.translationX + context.posX;

			if (activePosX >= -IMAGE_SIZE/2 && activePosX <= SLIDER_WIDTH - IMAGE_SIZE/2) {
				translationX.value = activePosX;
				label.value = Math.round(((translationX.value+IMAGE_SIZE/2)/SLIDER_WIDTH)*80);

				runOnJS(setInputText)(label.value);
			}
		},
		onEnd: () => {
			opacity.value = 0;

			//callback function here
		}
	});

	const style = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translationX.value },
				{ 
					rotateZ: `${interpolate(
						translationX.value,
						[-IMAGE_SIZE/2, SLIDER_WIDTH-IMAGE_SIZE/2],
						[0, 4*Math.PI],
						Extrapolate.CLAMP
					)}rad`
				}
			]
		};
	});

	const opacityStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        };
	});
	
	const backgroundColorStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: -SLIDER_WIDTH/2 },
				{
					scaleX: interpolate(
						translationX.value,
						[-IMAGE_SIZE/2, SLIDER_WIDTH-IMAGE_SIZE/2],
						[0, 1],
						Extrapolate.CLAMP
					)
				},
				{ translateX: SLIDER_WIDTH/2 }
			]
		};
	});

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden/>
			<View style={styles.slider}>
				<View>
					<View style={styles.backgroundSlider} />
					<Animated.View style={[backgroundColorStyle, styles.backgroundFillSlider]} />
					<View style={{...StyleSheet.absoluteFillObject, backgroundColor: '#6699cc', borderRadius: 10, width: 20}}/>
				</View>
				<PanGestureHandler onGestureEvent={onGestureEvent}>
					<Animated.View style={[styles.knobContainer, style]}>
						<Knob opacity={opacityStyle} />
					</Animated.View>
				</PanGestureHandler>
			</View>
			<View style={styles.labelContainer}>
				<TextInput editable={false} ref={textInputRef} style={styles.label} defaultValue={'1'} />
				<Text style={styles.label}> km</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#a9cbec',
		justifyContent: 'center',
		alignItems: 'center'
	},
	slider: {
		width: SLIDER_WIDTH,
		height: IMAGE_SIZE,
		justifyContent: 'center'
	},
	backgroundSlider: {
		height: 20,
		backgroundColor: 'white',
		borderRadius: 10
	},
	backgroundFillSlider: {
		...StyleSheet.absoluteFillObject,
		height: 20,
		backgroundColor: '#6699cc',
		left: 12
	},
	knobContainer: {
		...StyleSheet.absoluteFillObject,
		width: IMAGE_SIZE,
		height: IMAGE_SIZE
	},
	labelContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: 40,
		marginTop: 10,
		borderRadius: 20,
		backgroundColor: '#f7f7f7'
	},
	label: {
		color: '#000000',
		fontSize: 20,
		fontWeight: 'bold'
	}
})

export default App;