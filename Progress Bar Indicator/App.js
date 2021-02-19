import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<Text style={{ fontSize: 42 }}>❤️</Text>
			<Text
				style={{
					fontFamily: 'Menlo',
					marginTop: 10,
					fontWeight: '800',
					fontSize: 16,
				}}
			>
				Expo
			</Text>
			<Text style={{ fontFamily: 'Menlo', fontStyle: 'italic', fontSize: 12 }}>
				(expo.io)
			</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});