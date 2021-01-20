import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue } from 'react-native-reanimated';

const CIRCLE_SIZE = 100;

const Circle = ({ onPress }) => {
	return (
		<View style={[...StyleSheet.absoluteFillObject, styles.circleContainer]}>
			<View style={styles.circle}>
				<TouchableOpacity onPress={onPress}>
					<View style={[styles.circle, styles.circleButton]}>
						<AntDesign name='arrowright' size={28} color='white' />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default () => {

	const animatedValue = useSharedValue(0);

	const onPress = () => {

	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Circle onPress={onPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	circleContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 8,
		paddingBottom: 100,
		backgroundColor: 'gold'
	},
	circle: {
		backgroundColor: '#444',
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE/2,
	},
	circleButton: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	}
})