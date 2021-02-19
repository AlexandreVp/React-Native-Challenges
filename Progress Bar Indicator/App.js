import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const STEPS_LENGTH = 10;

const Progress = ({ step, steps, height }) => {

	const [width, setWidth] = useState(0);

	const animatedValue = useRef(new Animated.Value(-1000)).current;
	const reactive = useRef(new Animated.Value(-1000)).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: reactive,
			duration: 300,
			useNativeDriver: true
		}).start()
	}, []);

	useEffect(() => {
		reactive.setValue(-width + (width * step) / steps);
	}, [width, step]);

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
			onLayout={ev => {
				const newWidth = ev.nativeEvent.layout.width;

				setWidth(newWidth);
			}}
			style={{
				height,
				backgroundColor: 'rgba(0,0,0,0.1)',
				borderRadius: height,
				overflow: 'hidden'
			}}
		>
			<Animated.View 
				style={{
					height,
					width: '100%',
					backgroundColor: 'rgba(0,0,0,0.5)',
					borderRadius: height,
					position: 'absolute',
					left: 0,
					top: 0,
					transform: [
						{ translateX: animatedValue }
					]
				}}
			/>
		</View>
		</>
	);
};

export default function App() {

	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((index + 1) % (STEPS_LENGTH + 1));
		}, 500);

		return () => {
			clearInterval(interval);
		}
	}, [index]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<Progress step={index} steps={STEPS_LENGTH} height={20}/>
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