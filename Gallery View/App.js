import React, { useCallback, useEffect, useRef, useState } from 'react';
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
const IMAGE_SIZE = 80;
const SPACING = 10;

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
    const [index, setIndex] = useState(0);

    const topListRef = useRef();
    const bottomListRef = useRef();

    const setActiveIndex = (index) => {
        setIndex(index);
        
    };

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
                ref={topListRef}
                data={images}
                keyExtractor={item => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                onMomentumScrollEnd={ev => {
                    setActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width));
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.imageWrapper}>
                            <Image 
                                source={{ uri: item.src.portrait }}
                                style={[StyleSheet.absoluteFillObject]}
                                resizeMode='cover'
                            />
                        </View>
                    )
                }}
            />
            <FlatList
                ref={bottomListRef}
                data={images}
                keyExtractor={item => item.id.toString()}
                style={styles.flatList}
                contentContainerStyle={styles.contentContainerStyle}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <Image 
                            source={{ uri: item.src.tiny }}
                            style={styles.image}
                            resizeMode='cover'
                        />
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
    },
    flatList: {
        position: 'absolute',
        bottom: 50
    },
    contentContainerStyle: {
        paddingHorizontal: SPACING,
        paddingRight: 0
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 12,
        marginRight: SPACING
    }
});