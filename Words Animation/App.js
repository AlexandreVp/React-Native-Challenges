import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';

import TextAnimator from './components/TextAnimator';

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<TextAnimator
				content='For the things we have to learn before we can do them, we learn by doing them. REACT NATIVE ❤'
				style={styles.containerStyle}
				textStyle={styles.textStyle}
				duration={350}
				onFinish={() => {}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
		padding: 20,
	},
	containerStyle: {

	},
	textStyle: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 14
	}
});
