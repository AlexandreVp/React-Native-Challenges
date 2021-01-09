import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Platform } from 'react-native';


const likeNopeDeg = '22deg';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const rangeThreshold = SCREEN_WIDTH * 0.65;

export default function App() {

	const [key, setKey] = useState(0);
	const [locked, setLocked] = useState(0);

	return (
		<SafeAreaView 
			style={styles.safeContainer}
			pointerEvents={locked ? 'none' : 'auto'}
		>
			<View style={styles.container}>
				
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
	}
});
