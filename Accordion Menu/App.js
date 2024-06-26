// 


import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, UIManager, Platform } from 'react-native';

import data from './Utils/data';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {

	const [currentIndex, setCurrentIndex] = useState(null);

	return (
		<View
			style={styles.container}
		>
			<StatusBar hidden />
			{data.map(({bg, color, category, subCategories}, index) => {
				return (
					<TouchableOpacity 
						key={category} 
						onPress={() => {
							LayoutAnimation.configureNext({
								duration: 400,
								create: {
									property: LayoutAnimation.Properties.opacity,
									type: LayoutAnimation.Types.easeInEaseOut,
								},
								update: {
									type: LayoutAnimation.Types.easeInEaseOut,
								},
								delete: {
									property: LayoutAnimation.Properties.opacity,
									type: LayoutAnimation.Types.easeInEaseOut,
								}
							})
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
		</View>
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