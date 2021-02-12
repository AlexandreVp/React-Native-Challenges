import React, { useCallback, useEffect, useState } from 'react';
import {
    StatusBar,
    FlatList,
    Image,
    Animated,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Easing,
    SafeAreaViewBase,
    SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

// const API_KEY = "563492ad6f917000010000011d001c06309c45cb97482fd1e998d5d5"
const API_KEY = '563492ad6f91700001000001b42e951419074cd0aec0976621706bd2'
const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20"

const fetchImagesFromPexels = async () => {
    const data = await fetch(API_URL, {
        headers: {
            'Authorization': API_KEY
        }
    });

    const { photos } = await data.json();

    return photos;
};

const Loading = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>Loading...</Text>
        </View>
    )
};

export default () => {

    const [images, setImages] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchImagesFromPexels();

            setImages(images);
        };
        fetchImages();
    }, [])


    if (!images) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <FlatList 
                data={images}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.imageWrapper}>
                            <Image 
                                source={{ uri: item.src.portrait }}
                                style={[StyleSheet.absoluteFillObject]}
                            />
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: '#000000'
	},
    imageWrapper: {
        width,
        height
    }
});