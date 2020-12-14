import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Duolingo from './Duolingo';

const fetchFonts = () => {
	return Font.loadAsync({
		"Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
		"Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
	});
};

export default function App() {

	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading 
				startAsync={fetchFonts} 
				onFinish={() => setFontLoaded(true)} 
				onError={err => console.log(err)}
			/>
		)
	  } else {
			return (
				<SafeAreaProvider>
					<Duolingo />
				</SafeAreaProvider>
			);
	  }
}
