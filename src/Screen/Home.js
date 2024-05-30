import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';
import { AppColors } from '../Constant/AppColor';
import { ImagesPath } from '../Constant/ImagePath';
import DrawerScreen from '../Components/Drawer';
import HomeChild from '../Components/HomeChild';
import CustomAlert from '../Components/CustomAlert';

const Home = ({ navigation }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const drawerAnimatedValue = useRef(new Animated.Value(0)).current;


    const handleHemberger = () => {
        const toValue = isDrawerOpen ? 0 : 1;

        drawerAnimatedValue.setValue(0);
        Animated.timing(drawerAnimatedValue, {
            toValue,
            duration: 600,
            useNativeDriver: false,
        }).start();
        setIsDrawerOpen(!isDrawerOpen)
    }

    const drawerTranslateX = drawerAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 0],
    });


    const data = [
        { id: 1, image: ImagesPath.binarySignalImages, text: 'Binary Signals' },
        { id: 2, image: ImagesPath.binarySignalImages, text: 'Forex Signals' },
        { id: 3, image: ImagesPath.PdfImages, text: 'Book' },
        { id: 4, image: ImagesPath.VideoCourse, text: 'Video Course' },
        { id: 5, image: ImagesPath.liveCourse, text: 'Live Course' },
        { id: 6, image: ImagesPath.FollowUs, text: 'Follow Us' },
        { id: 7, image: ImagesPath.contactUs, text: 'Contact Us' },
    ];


    const handleClose = () => {
        setIsAlert(false)
    }


    const handleBox = (item) => {
        if (item.text === 'Contact Us') {
            setIsAlert(true)
        } else {
            setSelectedItem(item);
            setIsShow(!isShow);
        }
    };

    return (
        <>
            {isDrawerOpen ? (
                <DrawerScreen onClose={handleHemberger} drawerTranslate={drawerTranslateX} />
            ) : isShow ? (
                <HomeChild onClose={handleBox} data={selectedItem} />
            ) : (
                <>
                    <ScrollView>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.menuIcon} onPress={handleHemberger}>
                                <Image source={ImagesPath.hemberger} />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Binary & Fx Signals</Text>
                        </View>
                        <View style={styles.container}>
                            {data.map(item => (
                                <TouchableOpacity key={item.id} style={styles.box} onPress={() => handleBox(item)}>
                                    <Image
                                        source={item.image}
                                        style={styles.image}
                                    />
                                    <Text style={styles.boxText}>{item.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                    {isAlert && <CustomAlert datas={'contactUs'} onClose={handleClose}/>}
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.blue,
        height: 70,
        paddingHorizontal: 10,
    },
    menuIcon: {
        marginRight: 25,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    box: {
        width: '48%',
        marginVertical: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    boxText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});

export default Home;
