import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';


const DATA = [
	{
		title: 'Afro vibes',
		location: 'Mumbai, India',
		date: 'Nov 17th, 2020',
		poster:
		'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
	},
	{
		title: 'Jungle Party',
		location: 'Unknown',
		date: 'Sept 3rd, 2020',
		poster:
		'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
	},
	{
		title: '4th Of July',
		location: 'New York, USA',
		date: 'Oct 11th, 2020',
		poster:
		'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
	},
	{
		title: 'Summer festival',
		location: 'Bucharest, Romania',
		date: 'Aug 17th, 2020',
		poster:
		'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
	},
	{
		title: 'BBQ with friends',
		location: 'Prague, Czech Republic',
		date: 'Sept 11th, 2020',
		poster:
		'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
	},
	{
		title: 'Festival music',
		location: 'Berlin, Germany',
		date: 'Apr 21th, 2021',
		poster:
		'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
	},
	{
		title: 'Beach House',
		location: 'Liboa, Portugal',
		date: 'Aug 12th, 2020',
		poster:
		'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
	},
];

const { width } = Dimensions.get('screen');
const OVERFLOW_HEIGHT = 90;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data }) => {

	return (
		<View style={styles.overflowContainer}>
			<View>
				{data.map((item, index) => {
					return (
						<View key={index} style={styles.itemContainer}>
							<Text style={[styles.title]} numberOfLines={1}>
								{item.title}
							</Text>
							<View style={styles.itemContainerRow}>
								<Text style={[styles.location]}>
									<EvilIcons
										name='location'
										size={16}
										color='black'
										style={{ marginRight: 5 }}
									/>
									{item.location}
								</Text>
								<Text style={[styles.date]}>{item.date}</Text>
							</View>
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default function App() {
	
	const [data, setData] = useState(DATA);
	const [index, setIndex] = useState(0);

	const scrollXIndex = useRef(new Animated.Value(0)).current;
	const scrollXAnimated = useRef(new Animated.Value(0)).current;

	const setActiveIndex = useCallback((activeIndex) => {
		setIndex(activeIndex);
		scrollXIndex.setValue(activeIndex);
	}, [])

	useEffect(() => {
		Animated.spring(scrollXAnimated, {
			toValue: scrollXIndex,
			useNativeDriver: true
		}).start();
	}, [scrollXIndex]);

	return (
		<FlingGestureHandler
			key='left'
			direction={Directions.LEFT}
			onHandlerStateChange={ev => {
				if (ev.nativeEvent.state === State.END && index !== data.length - 1) {
					setActiveIndex(index + 1);
				}
			}}
		>
			<FlingGestureHandler>
				<SafeAreaView style={styles.container}>
					<StatusBar hidden/>
					<OverflowItems data={data}/>
					<FlatList 
						data={data}
						keyExtractor={(_, index) => index.toString()}
						horizontal
						inverted
						contentContainerStyle={styles.contentContainerStyle}
						scrollEnabled={false}
						removeClippedSubviews={false}
						CellRendererComponent={({item, index, children, style, ...props}) => {

							//changing the zIndex
							const newStyle = [
								style,
								{ zIndex: data.length - index, elevation: data.length - index },
							];

							return (
								<View style={newStyle} index={index} {...props}>
									{children}
								</View>
							)
						}}
						renderItem={({item, index}) => {

							const inputRange = [index - 1, index, index + 1];

							const style = {
								transform: [
									{
										translateX: scrollXAnimated.interpolate({
											inputRange,
											outputRange: [50, 0, -100]
										})
									},
									{
										scale: scrollXAnimated.interpolate({
											inputRange,
											outputRange: [0.8, 1, 1.3]
										})
									}
								],
								opacity: scrollXAnimated.interpolate({
									inputRange,
									outputRange: [1 - 1/VISIBLE_ITEMS, 1, 0]
								})
							}

							return (
								<Animated.View style={[styles.itemWrapper, style]}>
									<Image source={{uri: item.poster}} style={styles.image}/>
								</Animated.View>
							)
						}}
					/>
				</SafeAreaView>
			</FlingGestureHandler>
		</FlingGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: -1,
	},
	location: {
		fontSize: 16,
	},
	date: {
		fontSize: 12,
	},
	itemContainer: {
		height: OVERFLOW_HEIGHT,
		padding: SPACING * 2,
	},
	itemContainerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	overflowContainer: {
		height: OVERFLOW_HEIGHT,
		overflow: 'hidden',
	},
	contentContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		padding: SPACING * 2,
	},
	itemWrapper: {
		position: 'absolute',
		left: -ITEM_WIDTH / 2
	},
	image: {
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT
	}
});