import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';

import data from './Utils/data';

const transition = (
	<Transition.Together>
		<Transition.In type='fade' durationMs={200}/>
		<Transition.Change  />
		<Transition.Out type='fade' durationMs={200}/>
	</Transition.Together>
)

export default function App() {

	const [currentIndex, setCurrentIndex] = useState(null);
	const transitionRef = useRef();

	return (
		<Transitioning.View
			ref={transitionRef}
			transition={transition}
			style={styles.container}
		>
			<StatusBar hidden />
			{data.map(({bg, color, category, subCategories}, index) => {
				return (
					<TouchableOpacity 
						key={category} 
						onPress={() => {
							transitionRef.current.animateNextTransition();
							setCurrentIndex(index === currentIndex ? null : index);
						}} 
						style={styles.cardContainer}
						activeOpacity={0.9}
					>
						<View style={[styles.card, { backgroundColor: bg }]}>
							<Text style={[styles.heading, { color: color }]}>{category}</Text>
							{index === currentIndex && 
								<View style={styles.subCategoriesList}>
									{subCategories.map(subCategory => {
										return (
											<Text key={subCategory} style={[styles.subCategory, { color }]}>{subCategory}</Text>
										)
									})}
								</View>
							}
						</View>
					</TouchableOpacity>
				)
			})}
		</Transitioning.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	cardContainer: {
		flexGrow: 1
	},
	card: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	heading: {
		fontSize: 38,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: -2
	},
	subCategory: {
		fontSize: 20,
		lineHeight: 20 * 1.5,
		textAlign: 'center'
	},
	subCategoriesList: {
		marginTop: 20
	}
});
