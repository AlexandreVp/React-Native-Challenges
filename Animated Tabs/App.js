import { StatusBar } from 'expo-status-bar';
import React, { createRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, findNodeHandle } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, measure } from 'react-native-reanimated';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get('screen');
const images = {
	man:
		'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	women:
		'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	kids:
		'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	skullcandy:
		'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	help:
		'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
	key: i,
	title: i,
	image: images[i],
	ref: createRef()
}));

const Tab = forwardRef(({ item, onItemPress }, ref) => {
	return (
		<TouchableOpacity onPress={onItemPress} >
			<View ref={ref}>
				<Text style={[styles.tabTitle]}>{item.title}</Text>
			</View>
		</TouchableOpacity>
	)
});

const Indicator = ({ measures, scrollX }) => {

	const inputRange = data.map((_, index) => index*width)

	const indicatorStyle = useAnimatedStyle(() => {
		return {
			width: interpolate(
				scrollX.value,
				inputRange,
				measures.map(measure => measure.width)
			),
			transform: [
				{ 
					translateX: interpolate(
						scrollX.value,
						inputRange,
						measures.map(measure => measure.x)
					) 
				}
			]
		}
	})

	return (
		<Animated.View style={[styles.indicator, indicatorStyle]}/>
	)
};

const Tabs = ({ scrollX, data, onItemPress }) => {

	const [measures, setMeasures] = useState([]);
	const containerRef = useRef();

	const updateMeasures = useCallback(() => {
		let m = [];

		data.forEach(item => {
			item.ref.current.measureLayout(
				containerRef.current,
				(x, y, width, height) => {
					m.push({
						x,
						y,
						width,
						height
					});

					if (m.length === data.length) {
						setMeasures(m);
					}
				}
			);
		})
	});

	useEffect(() => {
		updateMeasures();
	}, [updateMeasures]);

	return (
		<View style={styles.tabsContainer}>
			<View
				ref={containerRef} 
				style={styles.tabsWrapper}
			>
				{data.map((item, index) => {
					return (
						<Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
					)
				})}
			</View>
			{measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
		</View>
	)
};

export default function App() {

	const scrollX = useSharedValue(0);
	const ref = useRef();
	
	const onItemPress = itemIndex => {
		ref?.current?.scrollToOffset({
			animated: true,
			offset: itemIndex * width
		})
	};

	const onScrollEvent = useAnimatedScrollHandler((event) => {
		scrollX.value = event.contentOffset.x;
	});

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<AnimatedFlatList
				ref={ref}
				data={data}
				onScroll={onScrollEvent}
				horizontal
				showHorizontalScrollIndicator={false}
				pagingEnabled
				bounces={false}
				keyExtractor={item => item.key}
				renderItem={({item}) => {
					return (
						<View style={styles.imageWrapper}>
							<Image source={{ uri: item.image }} style={styles.image} resizeMode='cover' />
							<View style={[StyleSheet.absoluteFillObject, styles.backgroundOpacity]} />
						</View>
					)
				}}
			/>
			<Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageWrapper: {
		width: width,
		height: height
	},
	image: {
		flex: 1
	},
	backgroundOpacity: {
		backgroundColor: 'rgba(0,0,0,0.3)'
	},
	tabsContainer: {
		position: 'absolute',
		top: 100,
		width: width,
	},
	tabsWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	tabTitle: {
		color: '#FFFFFF',
		fontSize: 84 / data.length,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	indicator: {
		position: 'absolute',
		height: 4,
		backgroundColor: '#FFFFFF',
		bottom: -10
	}
});