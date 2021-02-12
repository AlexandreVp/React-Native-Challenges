import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
 
const Logo = () => {
	return (
		<View style={styles.logoWrapper}>
			<Text style={styles.dvdText}>DVD</Text>
			<Text style={styles.videoText}>VIDEO</Text>
		</View>
	)
};

const App = () => {

	return (
		<View style={styles.container}>
			<StatusBar hidden/>
			<Logo />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#000000',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logoWrapper: {
		width: 122,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dvdText: {
		fontSize: 56,
		fontWeight: 'bold',
		fontStyle: 'italic',
		lineHeight: 52
	},
	videoText: {
		fontSize: 25,
		fontWeight: 'bold',
		fontStyle: 'italic',
		letterSpacing: 10,
		lineHeight: 25
	}
})

export default App;