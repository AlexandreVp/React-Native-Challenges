/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 */
import React, { useRef } from 'react';
import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	FlatList,
	Dimensions,
	Image,
	SafeAreaView,
	Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { getMovies } from './api';
import Genres from './components/Genres';
import Rating from './components/Rating';


const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;

const Loading = () => (
	<View style={styles.loadingContainer}>
		<Text style={styles.paragraph}>Loading...</Text>
	</View>
);

const BackDrop = ({ movies, scrollX }) => {
	return (
		<View style={styles.backDropContainer}>
			<FlatList 
				data={movies}
				keyExtractor={item => item.key}
				removeClippedSubviews={false}
				contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
				renderItem={({item, index}) => {

					const inputRange = [
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE
					];

					const translateX = scrollX.interpolate({
						inputRange,
						outputRange: [-width, 0]
					})

					return (
						<Animated.View 
							removeClippedSubviews={false} 
							style={[styles.backDropImageWrapper, { transform: [{translateX}] }]}
						>
							<Image source={{ uri: item.backdrop }} style={styles.backDropImage} resizeMode='cover'/>
						</Animated.View>
					)
				}}
			/>
			<LinearGradient 
				colors={['transparent', 'white']}
				style={styles.linearGradient}
			/>
		</View>
	)
};

export default function App() {

	const [movies, setMovies] = React.useState([]);

	const scrollX = useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		const fetchData = async () => {
			let moviesHelper = await getMovies();
			setMovies(moviesHelper);
		};

		if (movies.length === 0) {
			fetchData();
		}
	}, [movies]);

	if (movies.length === 0) {
		return <Loading />;
	}
		
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<BackDrop movies={movies} scrollX={scrollX}/>
			<Animated.FlatList
				showsHorizontalScrollIndicator={false}
				data={movies}
				keyExtractor={(item) => item.key}
				horizontal
				snapToInterval={ITEM_SIZE}
				decelerationRate={0}
				bounces={false}
				scrollEventThrottle={16}
				contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACER_ITEM_SIZE }}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: {x: scrollX} } }],
					{ useNativeDriver: true }
				)}
				renderItem={({ item, index }) => {

					const inputRange = [
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE,
						(index + 1) * ITEM_SIZE
					]

					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100]
					})

					return (
						
						<View style={{ width: ITEM_SIZE }}>
							<Animated.View
								style={[styles.card, {
									transform: [
										{ translateY }
									]
								}]}
							>
								<Image
									source={{ uri: item.poster }}
									style={styles.posterImage}
								/>
								<Text style={{ fontSize: 24 }} numberOfLines={1}>
									{item.title}
								</Text>
								<Rating rating={item.rating} />
								<Genres genres={item.genres} />
								<Text style={{ fontSize: 12 }} numberOfLines={3}>
									{item.description}
								</Text>
							</Animated.View>
						</View>
					)
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	posterImage: {
		width: '100%',
		height: ITEM_SIZE * 1.2,
		resizeMode: 'cover',
		borderRadius: 24,
		margin: 0,
		marginBottom: 10,
	},
	card: {
		marginHorizontal: SPACING,
		padding: SPACING * 2,
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 34,
	},
	backDropContainer: {
		position: 'absolute',
		width,
		height: BACKDROP_HEIGHT
	},
	backDropImageWrapper: {
		position: 'absolute',
		width,
		height: BACKDROP_HEIGHT,
		overflow: 'hidden',
	},
	backDropImage: {
		width,
		height: BACKDROP_HEIGHT,
		position: 'absolute'
	},
	linearGradient: {
		width: width,
		height: BACKDROP_HEIGHT,
		position: 'absolute',
		bottom: 0
	}
});