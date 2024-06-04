import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ImagesPath } from '../Constant/ImagePath';
import { AppColors } from '../Constant/AppColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timeout = setTimeout(async () => {
            const storage = await AsyncStorage.getItem('isLoggedIn');
            if (storage == "true") {
                navigation.replace('home')
            }
            else {
                navigation.replace('login');
            }
        }, 2000);

        const data = async () => {
            const storage = await AsyncStorage.getItem('isLoggedIn');
            console.log("storage======>>>>>>> ", storage);
        }

        data()

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={ImagesPath.spalshScreen} style={styles.image} />
            <View style={styles.overlay}>
                <Text style={{ color: AppColors.PrimaryWhite, fontSize: 20 }}>Binary Option And Forest Signals</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 100
    },
    centeredImage: {
        resizeMode: 'cover'
    },
});

export default SplashScreen;
