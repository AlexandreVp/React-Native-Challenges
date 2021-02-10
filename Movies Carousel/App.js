/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 */

import React from 'react';
import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	FlatList,
	Dimensions,
	Image,
	SafeAreaView
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {} from 'react-native-reanimated';

import { getMovies } from './api';
import Genres from './components/Genres';
import Rating from './components/Rating';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

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

export default function App() {
	const [movies, setMovies] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			const movies = await getMovies();
			setMovies(movies);
		};

		if (movies.length === 0) {
			fetchData(movies);
		}
	}, [movies]);

	if (movies.length === 0) {
		return <Loading />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<FlatList
				showsHorizontalScrollIndicator={false}
				data={movies}
				keyExtractor={(item) => item.key}
				horizontal
				contentContainerStyle={{
					alignItems: 'center',
				}}
				snapToInterval={ITEM_SIZE}
				decelerationRate={0}
				bounces={false}
				renderItem={({ item }) => {

					return (
						<View style={{ width: ITEM_SIZE }}>
							<View
								style={{
									marginHorizontal: SPACING,
									padding: SPACING * 2,
									alignItems: 'center',
									backgroundColor: 'white',
									borderRadius: 34,
								}}
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
							</View>
						</View>
					);
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
});