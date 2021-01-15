import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import {  } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 100;
const SLIDER_HEIGTH = 50;

const App = () => {

	return (
		<SafeAreaView style={styles.container}>

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#a9cbec'
	}
})

export default App;