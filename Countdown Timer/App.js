// Inspiration: https://dribbble.com/shots/2343572-Countdown-timer

import React from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Animated, {} from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');
const colors = {
	black: '#323F4E',
	red: '#F76A6A',
	text: '#ffffff',
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.View
				style={[StyleSheet.absoluteFillObject, styles.background]} 
			>
				<TouchableOpacity
					onPress={() => {}}
				>
					<View style={styles.roundButton} />
				</TouchableOpacity>
			</Animated.View>
			<View style={styles.textWrapper}>
				<Text style={styles.text}>1</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
	},
	background: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 100,
	},
	roundButton: {
		width: 80,
		height: 80,
		borderRadius: 80,
		backgroundColor: colors.red,
	},
	textWrapper: {
		position: 'absolute',
		top: height / 3,
		left: 0,
		right: 0,
		flex: 1,
	},
	text: {
		fontSize: ITEM_SIZE * 0.8,
		color: colors.text,
		fontWeight: '900',
	}
});