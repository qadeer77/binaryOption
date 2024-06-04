import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Animated, ScrollView, Linking } from 'react-native';
import { ImagesPath } from '../Constant/ImagePath';
import { AppColors } from '../Constant/AppColor';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerScreen = ({ onClose, drawerTranslate }) => {
    const navigation = useNavigation();

    const handleLogOut = () => {
        auth()
            .signOut()
            .then(async () => {
                Toast.show("Logout successful!", Toast.LONG);
                navigation.replace('login')
                await AsyncStorage.setItem("isLoggedIn", "false");
            }).catch((error) => {
                console.log("Error logging out:", error);
            });
    }

    return (
        <>
            <ScrollView>
                <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: drawerTranslate }], }]}>
                    <View style={styles.container}>
                        <Image source={ImagesPath.Red} style={styles.image} />
                        <TouchableOpacity style={styles.absoluteContainer} onPress={onClose}>
                            <Image source={ImagesPath.BackIcon} />
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', top: 100, left: 20, }}>
                            <TouchableOpacity style={styles.contentContainer}>
                                <Image source={ImagesPath.homeIcon} style={styles.image1} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.text}>Home</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.grayLine}></View>
                            <Text style={{ color: "gray", fontSize: 15 }}>Communication</Text>
                            <TouchableOpacity style={[styles.contentContainer, { marginTop: 20 }]}>
                                <Image source={ImagesPath.CheckUpdate} style={styles.image1} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.text}>Check Update</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.contentContainer]}>
                                <Image source={ImagesPath.Share} style={styles.image1} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.text}>Share</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.contentContainer]}>
                                <Image source={ImagesPath.RateUs} style={styles.image1} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.text}>Rate Us</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.grayLine}></View>
                            <Text style={{ color: "gray", fontSize: 15 }}>Account</Text>
                            <TouchableOpacity style={[styles.contentContainer, { marginTop: 20 }]} onPress={handleLogOut}>
                                <Image source={ImagesPath.Logout} style={styles.image1} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.text}>LogOut</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.grayLine}></View>
                            <Text style={{ color: "gray", fontSize: 15 }}>Others</Text>
                            <TouchableOpacity style={[styles.contentContainer, { marginTop: 20 }]}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.text}>Attributions</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        resizeMode: 'cover',
    },
    image1: {
        resizeMode: 'cover',
        width: 20,
        height: 20
    },
    absoluteContainer: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    text: {
        fontSize: 20,
        color: AppColors.PrimaryWhite
    },
    socialMediaContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10
    },
    grayLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 20
    },
});

export default DrawerScreen;
