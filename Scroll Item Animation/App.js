import React, { useRef } from 'react';
import { 
    StatusBar, 
    FlatList, 
    Image, 
    Text, 
    View, 
    Dimensions, 
    StyleSheet, 
    SafeAreaView,
    Animated
} from 'react-native';
import faker from 'faker';

const { width, height } = Dimensions.get('screen');
const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMAGE = 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auth';
const ITEM_SIZE = AVATAR_SIZE + SPACING*3.18;

faker.seed(12);
const DATA = [...Array(20).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

export default () => {

    const scrollY = useRef(new Animated.Value(0)).current;

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );
	
    return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
			<StatusBar hidden/>
            <Image 
                source={{ uri: BG_IMAGE }}
                style={[StyleSheet.absoluteFillObject]}
                blurRadius={50}
            />
            <Animated.FlatList
                data={DATA}
                onScroll={onScroll}
                keyExtractor={item => item.key}
                scrollEventThrottle={24}
                contentContainerStyle={{ paddingHorizontal: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
                renderItem={({item, index}) => {

                    const scale = scrollY.interpolate({
                        inputRange: [-1, 0, ITEM_SIZE*index, ITEM_SIZE*(index+2)],
                        outputRange: [1, 1, 1, 0],
                        extrapolate: 'clamp'
                    });

                    const opacity = scrollY.interpolate({
                        inputRange: [-1, 0, ITEM_SIZE*index, ITEM_SIZE*(index+1)],
                        outputRange: [1, 1, 1, 0],
                        extrapolate: 'clamp'
                    })

                    const transform = [
                        { scale: scale }
                    ];

                    return (
                        <Animated.View style={[styles.profileWrapper, { transform, opacity }]}>
                            <Image 
                                source={{ uri: item.image }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </View>
                        </Animated.View>
                    )
                }}
            />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
    profileWrapper: {
        flexDirection: 'row',
        padding: SPACING,
        marginBottom: SPACING,
        alignItems: 'center',
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE/2,
        marginRight: SPACING/2
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
    },
    jobTitle: {
        fontSize: 18,
        opacity: .7,
        flexWrap: 'wrap'
    },
    email: {
        fontSize: 14,
        opacity: .8,
        color: '#0099cc'
    }
});