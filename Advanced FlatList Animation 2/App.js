import React, { useRef } from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const {width, height} = Dimensions.get('screen');
const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
	{
		"key": "3571572",
		"title": "Multi-lateral intermediate moratorium",
		"description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
	},
	{
		"key": "3571747",
		"title": "Automated radical data-warehouse",
		"description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571747.png"
	},
	{
		"key": "3571680",
		"title": "Inverse attitude-oriented system engine",
		"description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571680.png"
	},
	{
		"key": "3571603",
		"title": "Monitored global data-warehouse",
		"description": "We need to program the open-source IB interface!",
		"image": "https://image.flaticon.com/icons/png/256/3571/3571603.png"
	}
];

const Indicator = ({ scrollX }) => {

	return (
		<View style={styles.indicatorWrapper}>
			{DATA.map((_, index) => {
				return (
					<View
						key={index.toString()}
						style={styles.indicator}
					/>
				)
			})}
		</View>
	)
};

export default function App() {

	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.FlatList 
				data={DATA}
				keyExtractor={item => item.key}
				horizontal
				contentContainerStyle={styles.contentContainerStyle}
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[{nativeEvent: {contentOffset: {x: scrollX}}}],
					{useNativeDriver: false} //nativeDriver does not support backgroundColor changes
				)}
				renderItem={({item}) => {

					return (
						<View style={styles.itemWrapper}>
							<View style={styles.imageWrapper}>
								<Image source={{uri: item.image}} style={styles.image} resizeMode='contain'/>
							</View>
							<View style={styles.textWrapper}>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.description}>{item.description}</Text>
							</View>
						</View>
					)
				}}
			/>
			<Indicator scrollX={scrollX}/>
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
	contentContainerStyle: {
		paddingBottom: 100
	},
	itemWrapper: {
		width,
		alignItems: 'center',
		padding: 20
	},
	imageWrapper: {
		flex: 0.7,
		justifyContent: 'center',
	},
	textWrapper: {
		flex: 0.3
	},
	image: {
		width: width / 2,
		height: width / 2
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		marginBottom: 10
	},
	description: {
		fontWeight: '300',
		fontSize: 16
	},
	indicator: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#333',
		margin: 10
	},
	indicatorWrapper: {
		position: 'absolute',
		bottom: 100,
		flexDirection: 'row'
	}
});