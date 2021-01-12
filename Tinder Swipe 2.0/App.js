import React, { useState, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather as Icon } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
	useAnimatedGestureHandler, 
	useSharedValue, 
	useAnimatedStyle, 
	withSpring,
	interpolate,
	Extrapolate,
	runOnJS
} from 'react-native-reanimated';

import { profiles as profilesArray } from './utils/Helpers';
import Card from './components/Card';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {

	//PROFILES
	const [lastProfile, setLastProfile] = useState(profilesArray[0]);
	const [nextProfile, setNextProfile] = useState(profilesArray[1]);
	const [profiles, setProfiles] = useState(profilesArray.slice(2, profilesArray.length));

	//ANIMATED
	const translationX = useSharedValue(0);
	const translationY = useSharedValue(0);
	const velocityX = useSharedValue(0);

	const onSwiped = useCallback(swipe => {
		"Worklet"
		if (swipe > 0 || swipe < 0) {
			setLastProfile(nextProfile);
			setNextProfile(profiles.shift());
			
			translationX.value = 0;
			translationY.value = 0;
			velocityX.value = 0;
		}
	});

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (event, context) => {

			context.posX = translationX.value;
			context.posY = translationY.value;
		},
		onActive: (event, context) => {
			translationX.value = event.translationX + context.posX;
			translationY.value = event.translationY + context.posY;
			velocityX.value = event.velocityX;
		},
		onEnd: (event, context) => {
			let snapPoint;

			if (event.translationX < 0 && event.velocityX < -200) {
				snapPoint = -SCREEN_WIDTH*3;
			} else if (event.translationX > 0 && event.velocityX > 200) {
				snapPoint = SCREEN_WIDTH*3;
			} else {
				snapPoint = 0;
			}

			if (snapPoint === 0) {
				translationX.value = withSpring(snapPoint, {
					damping: 14,
					stiffness: 121.6,
				});
				translationY.value = withSpring(0, {
					damping: 14,
					stiffness: 121.6,
				});
			} else {
				translationX.value = withSpring(snapPoint, {
					damping: 14,
					stiffness: 110,
					mass: 3
				});
				translationY.value = withSpring(0, {
					damping: 14,
					stiffness: 110,
					mass: 3
				});
			}

			context.snap = snapPoint;
		},
		onFinish: (event, context) => {
			runOnJS(onSwiped)(context.snap);
		}
	});

	const cardStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translationX.value },
				{ translateY: translationY.value },
				{ rotateZ: `${interpolate(
						translationX.value,
						[-SCREEN_WIDTH/2, SCREEN_WIDTH/2],
						[-15, 15],
						Extrapolate.CLAMP
					)}deg`
				},
			],
			opacity: interpolate(
				translationX.value,
				[-SCREEN_WIDTH*10, 0, SCREEN_WIDTH*10],
				[0, 1, 0],
				Extrapolate.CLAMP
			)
		};
	});

	const likeOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				translationX.value,
				[0, SCREEN_WIDTH/4],
				[0, 1],
				Extrapolate.CLAMP
			)
		};
	});

	const nopeOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				translationX.value,
				[-SCREEN_WIDTH/4, 0],
				[1, 0],
				Extrapolate.CLAMP
			)
		};
	});

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<View style={styles.header}>
				<Icon name="user" size={32} color="gray" />
				<Icon name="message-circle" size={32} color="gray" />
			</View>

			<View style={styles.cards}>
				{
					nextProfile &&
					<Card key={nextProfile.id} prof={nextProfile}/>
				}
				{
					lastProfile &&
					<PanGestureHandler onGestureEvent={onGestureEvent}>
						<Animated.View style={[cardStyle, StyleSheet.absoluteFillObject]}>
							<Card prof={lastProfile} nopeStyle={nopeOpacityStyle} likeStyle={likeOpacityStyle}/>
						</Animated.View>
					</PanGestureHandler>
				}
				{
					!lastProfile &&
					<Text style={styles.noOneAround}>Não há ninguém por perto</Text>
				}
			</View>

			<View style={styles.footer}>
				<View style={styles.circle}>
					<Icon name="x" size={32} color="#ec5288" />
				</View>
				<View style={styles.circle}>
					<Icon name="heart" size={32} color="#6ee3b4" />
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	backgroundColor: "#fbfaff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		marginTop: 16,
	},
	cards: {
		flex: 1,
		margin: 8,
		zIndex: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		padding: 16,
	},
	circle: {
		width: 64,
		height: 64,
		borderRadius: 32,
		padding: 12,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		shadowColor: "gray",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.18,
		shadowRadius: 2,
	},
	noOneAround: {
		color: 'gray'
	}
});
