import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather as Icon } from '@expo/vector-icons';

import { profiles as profilesArray } from './utils/Helpers';
import Card from './components/Card';

export default function App() {

	const lastProfile = profilesArray[0];
	const profiles = profilesArray.slice(1, profilesArray.length).reverse();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<View style={styles.header}>
				<Icon name="user" size={32} color="gray" />
				<Icon name="message-circle" size={32} color="gray" />
			</View>

			<View style={styles.cards}>
				<Card prof={lastProfile} />
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
});
