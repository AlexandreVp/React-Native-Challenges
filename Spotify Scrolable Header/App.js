import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import { StatusBar } from "react-native";
import AppLoading from 'expo-app-loading';

import Album from "./components/Album";

const album = {
	name: "Taylor Swift",
	artist: "Taylor Swift",
	release: 2019,
	cover: require("./assets/taylor_swift.jpg"),
	tracks: [
		{ name: "Lover" },
		{ name: "exile (feat. Bon Iver)", artist: "Taylor Swift, Bon Iver" },
		{ name: "You Need To Calm Down" },
		{ name: "The Man" },
		{ name: "I Forgot That You Existed" },
		{ name: "Delicate" },
		{ name: "Style" },
		{ name: "I Don't Wanna Live Forever (Fifty Shades Darker)", artist: "ZAYN, Taylor Swift" },
		{ name: "False God" },
		{ name: "cardigan" },
		{ name: "New Romantics" },
		{ name: "Shake It Off" },
	],
};

export default () => {

	const [ready, setReady] = useState(false);

	useEffect(() => {
		(async () => {
			await Asset.loadAsync(album.cover);
			setReady(true);
		})();
	});

	if (!ready) {
		return <AppLoading />;
	}

	return (
		<>
			<StatusBar barStyle="light-content" />
			<Album {...{ album }} />
		</>
	);
};
