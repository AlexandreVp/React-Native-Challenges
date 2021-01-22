import React, { useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, SafeAreaView, TextInput } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue, runOnJS, useAnimatedRef, scrollTo, useDerivedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const minAge = 18;
const maxAge = 110;
const segmentsLength = maxAge+1 - minAge;
const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth)/2;
const rulerWidth = spacerWidth*2 + (segmentsLength - 1) * snapSegment;
const data = [...Array(segmentsLength).keys()].map(i => i + minAge);
const indicatorWidth = 100;
const indicatorHeight = 80;
const initialAge = 25;


const Ruler = () => {
	return (
		<View style={styles.ruler}>
			<View style={styles.spacer}/>
			{data.map((_, i) => {
				const tenth = i % 10 === 0;
				return (
					<View 
						key={i} 
						style={[styles.segment, {
							backgroundColor: tenth ? '#333' : '#999',
							height: tenth ? 40 : 20,
							marginRight: i === (data.length - 1) ? 0 : segmentSpacing,
						}]}
					/>
				)
			})}
			<View style={styles.spacer}/>
		</View>
	)
};

const SliderPicker = () => {

	const scrollX = useSharedValue(0);
	const initialScroll = useSharedValue(0);
	const scrollViewRef = useAnimatedRef();
	const textInputRef = useRef();

	const setInputText = (ageValue) => {
		"Worklet"
		textInputRef.current.setNativeProps({
			text: `${ageValue}`
		});
	}

	const onScrollEvent = useAnimatedScrollHandler((event) => {
		scrollX.value = event.contentOffset.x;
		
		const ageValue = Math.round(scrollX.value / snapSegment) + minAge;

		runOnJS(setInputText)(ageValue);
	});
	
	//INITIAL SCROLL OF THE SCROLLVIEW - START -
	useDerivedValue(() => {
		scrollTo(scrollViewRef, initialScroll.value, 0, true);
	});

	const scrollOnRender = useCallback(() => {
        setTimeout(() => {
			initialScroll.value = (initialAge-minAge)*snapSegment;
		}, 1500);
    });
 
    useEffect(() => {
        scrollOnRender();
	}, [initialScroll]);
	//INITIAL SCROLL OF THE SCROLLVIEW - END -

	return (
		<SafeAreaView style={styles.container}>
			<Image source={{ uri: 'https://cdn.dribbble.com/users/1007500/screenshots/3623450/cake_01.gif' }} style={styles.cake} resizeMode='cover' />
			<Animated.ScrollView
				ref={scrollViewRef}
				horizontal
				contentContainerStyle={styles.scrollViewContainerStyle}
				bounces={false}
				onScroll={onScrollEvent}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				snapToInterval={snapSegment + 0.25}
			>
				<Ruler />
			</Animated.ScrollView>
			<View style={styles.indicatorWrapper}>
				<TextInput editable={false} ref={textInputRef} style={styles.ageTextStyle} defaultValue={minAge.toString()}/>
				<View style={[styles.segment, styles.segmentIndicator]}/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		position: 'relative'
	},
	cake: {
		width: width,
		height: width*1.2,
	},
	ruler: {
		width: rulerWidth,
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		paddingBottom: 50
	},
	segment: {
		width: segmentWidth
	},
	scrollViewContainerStyle: {
		justifyContent: 'flex-end',
	},
	ageTextStyle: {
		fontSize: 42,
		color: 'black'
	},
	indicatorWrapper: {
		position: 'absolute',
		left: (width-indicatorWidth)/2,
		bottom: 50,
		alignItems: 'center',
		justifyContent: 'center',
		width: indicatorWidth,
	},
	segmentIndicator: {
		height: indicatorHeight,
		backgroundColor: 'turquoise'
	},
	spacer: {
		width: spacerWidth,
	}
})

export default SliderPicker;