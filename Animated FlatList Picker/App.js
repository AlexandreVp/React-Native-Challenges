import React, { forwardRef, useRef, useState } from 'react';
import {
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {} from 'react-native-reanimated';

import data from './data';
import colors from './colors';

const { width, height } = Dimensions.get('window');
const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

const Icon = React.memo(({ icon, color }) => {
  	return (
		<SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />
	);
});

const Item = React.memo(({ icon, color, name, showText }) => {
	return (
		<View style={styles.itemWrapper}>
			{showText ? (
				<Text style={[styles.itemText, { color }]}>{name}</Text>
			) : (
				// for spacing purposes
				<View />
			)}
			<Icon icon={icon} color={color} />
		</View>
	);
});

const ConnectWithText = React.memo(() => {
	return (
		<View style={styles.connectWithTextContainer}>
			<Text style={styles.connectWithText}>Connect with...</Text>
		</View>
	);
});

const ConnectButton = React.memo(({ onPress }) => {
	return (
		<View style={styles.doneContainer}>
			<View style={styles.doneVerticalLine} />
			<TouchableOpacity
				onPress={onPress}
				style={styles.doneButton}
				activeOpacity={0.8}
			>
				<Text style={styles.doneText}>Done!</Text>
			</TouchableOpacity>
		</View>
	);
});

const List = forwardRef(({ color, showText, style }, ref) => {
	return (
		<FlatList
			ref={ref}
			data={data}
			style={style}
			keyExtractor={item => `${item.name}`}
			contentContainerStyle={{
				paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2 - StatusBar.currentHeight,
				paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
				paddingHorizontal: 20, 
			}}
			bounces={false}
			renderItem={({ item }) => {
				return (
					<Item {...item} color={color} showText={showText} />
				)
			}}
		/>
	);
});


export default function App() {
	const [index, setIndex] = useState(0);

	const yellowRef = useRef();
	const darkRef = useRef();

	const onConnectPress = () => {
		Alert.alert('Connect with:', data[index].name.toUpperCase());
	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			{/* <ConnectWithText /> */}
			<List ref={yellowRef} color={colors.yellow} style={StyleSheet.absoluteFillObject} />
			<List ref={yellowRef} color={colors.dark} showText style={styles.darkFlatList} />
			{/* <ConnectButton onPress={onConnectPress} /> */}
			<Item />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: StatusBar.currentHeight,
		backgroundColor: colors.dark,
	},
	darkFlatList: {
		position: 'absolute',
		backgroundColor: colors.yellow,
		width: width,
		height: ITEM_HEIGHT,
		top: height / 2 - ITEM_HEIGHT / 2 - StatusBar.currentHeight,
	},
	itemWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: ITEM_HEIGHT,
	},
	itemText: {
		fontSize: 26,
		fontWeight: '800',
		textTransform: 'capitalize',
	},
	connectWithTextContainer: {
		position: 'absolute',
		top: height / 2 - ITEM_HEIGHT * 2,
		width: width * 0.7,
		paddingHorizontal: 14,
	},
	connectWithText: {
		color: colors.yellow,
		fontSize: 52,
		fontWeight: 'bold',
		lineHeight: 52,
	},
	doneContainer: {
		position: 'absolute',
		top: height / 2 + ITEM_HEIGHT / 2,
		paddingHorizontal: 14,
	},
	doneVerticalLine: {
		height: ITEM_HEIGHT * 2,
		width: 4,
		backgroundColor: colors.yellow,
		borderWidth: 0
	},
	doneButton: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		backgroundColor: colors.yellow,
		alignItems: 'center',
		justifyContent: 'center',
	},
	doneText: {
		fontSize: 32,
		fontWeight: '800', 
		color: colors.dark
	}
});