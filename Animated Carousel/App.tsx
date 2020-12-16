import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { RectButton } from 'react-native-gesture-handler';


const { width: screenWidth } = Dimensions.get('window');
const { 
	View, 
	ScrollView,
	interpolateNode,
	add,
	sub,
	multiply,
	useValue,
	useCode,
	cond,		//condicional ; cond(condicao, callbackTrue, callbackFalse)
	eq,			//comparador de valores ; eq(esqueda, direita)
	set,
} = Animated;

const CARD_PADDING = 50;
const CARD_WIDTH = screenWidth - (CARD_PADDING * 2);

const teste = 1;

<<<<<<< HEAD
const teste2 = 2;

const teste3 = 3;

=======
>>>>>>> parent of 1b2c7d0... Test 2
export default function App() {

	const offsetX = useValue(0);

	const carouselOpacity = useValue(1);
	const animationState = useValue(1);

	const toggle = () => {
		return animationState.setValue(cond(eq(animationState, 0), 1));
	};

	useCode(() => set(carouselOpacity, timing({
		from: carouselOpacity,
		to: animationState,
		duration: 400
	})), [animationState]);

	return (
		<Fragment>
			<ScrollView
				horizontal
				snapToAlignment='end'
				decelerationRate='fast'
				snapToInterval={CARD_WIDTH}
				style={{ paddingVertical: 50, opacity: carouselOpacity }}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: CARD_PADDING }}
				scrollEventThrottle={1}
				onScroll={Animated.event([{
					nativeEvent: {
						contentOffset: {
							x: offsetX
						}
					}
				}])}
			>
				<StatusBar style="auto" hidden/>
				{Array.from({ length: 10 }).map((card, index) => (
					<View 
						key={index}
						style={{
							flex: 1,
							width: CARD_WIDTH,
							borderRadius: 10,
							// borderWidth: 1,
							// borderColor: 'red',
							backgroundColor: 'lightgreen',
							transform: [{
								scale: interpolateNode(offsetX, {
									inputRange: [
										multiply(sub(index, 1), CARD_WIDTH),
										multiply(index, CARD_WIDTH),
										multiply(add(index, 1), CARD_WIDTH)
									],
									outputRange: [0.9, 1, 0.9]
								})
							}],
							opacity: interpolateNode(offsetX, {
								inputRange: [
									multiply(sub(index, 1), CARD_WIDTH),
									multiply(index, CARD_WIDTH),
									multiply(add(index, 1), CARD_WIDTH),
								],
								outputRange: [0.5, 1, 0.5]
							})
						}}
					/>
				))}
			</ScrollView>

			<TouchableOpacity
				onPress={toggle}
				style={{
					paddingVertical: 20,
					paddingHorizontal: 30,
					position: 'absolute',
					bottom: 40,
					alignSelf: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'orangered',
					borderRadius: 10,
					overflow: 'hidden',
				}}
				activeOpacity={0.6}
			>
				<Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
					Toggle
				</Text>
			</TouchableOpacity>

		</Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
