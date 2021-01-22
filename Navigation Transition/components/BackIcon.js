import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const BackIcon = ({ onPress }) => {

    return (
        <AntDesign 
            name='arrowleft'
            size={24}
            style={styles.icon}
            color='#333'
            onPress={onPress}
        />
    );
}

const styles = StyleSheet.create({
    icon: {
        padding: 12
    }
})

export default BackIcon;