import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Progress = ({ step, steps, height }) => {

	const animatedValue = useRef(new Animated.Value(-1000)).current;
	const reactive = useRef(new Animated.Value(-1000)).current;

	return (
		<>
		<Text 
			style={{
				fontSize: 12,
				fontWeight: 'bold',
				marginBottom: 4
			}}
		>
			{step}/{steps}
		</Text>
		<View 
			style={{
				height,
				backgroundColor: 'rgba(0,0,0,0.1)',
				borderRadius: height,
				overflow: 'hidden'
			}}
		>
			<View 
				style={{
					height,
					width: '100%',
					backgroundColor: 'rgba(0,0,0,0.5)',
					borderRadius: height,
					position: 'absolute',
					left: 0,
					top: 0
				}}
			/>
		</View>
		</>
	);
};

export default function App() {

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<Progress step={1} steps={10} height={20}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		padding: 20
	}
});