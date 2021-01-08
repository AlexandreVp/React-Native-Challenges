import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Graph from "./Graph";
import Footer from "./components/Footer";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "space-between",
	},
});

const Rainbow = () => {
	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<Graph />
				{/* <Footer /> */}
			</View>
		</SafeAreaProvider>
	);
};

export default Rainbow;
