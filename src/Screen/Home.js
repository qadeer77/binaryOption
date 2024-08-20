import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';
import { AppColors } from '../Constant/AppColor';
import { ImagesPath } from '../Constant/ImagePath';
import DrawerScreen from '../Components/Drawer';
import HomeChild from '../Components/HomeChild';
import CustomAlert from '../Components/CustomAlert';
import Chat from '../Components/Chat';
import QuotexSignalsChild from '../Components/QuotexSignalsChild';
import Svg from 'react-native-svg'; 
import ForexSignalsChild from '../Components/ForexSignalsChild';

const Home = ({ navigation }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isShowQuotexSignal, setIsShowQuotexSignal] = useState(false);
    const [isShowForexSignal, setIsShowForexSignal] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false); 
    const [selectedItem, setSelectedItem] = useState(null);
    const drawerAnimatedValue = useRef(new Animated.Value(0)).current;


    const handleChat = () => {
        setIsChatActive(true)
    }


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
        { id: 1, image: ImagesPath.QuotexTradingBot, text: 'Quotex Signals' },
        { id: 2, image: ImagesPath.eyeiconImge, text: 'Quotex Trading Bot' },
        { id: 3, image: ImagesPath.PdfImages, text: 'Quotex Trading Course' },
        { id: 4, image: ImagesPath.VideoCourse, text: 'Forex Signals' },
        { id: 5, image: ImagesPath.liveCourse, text: 'Forex Course' },
        { id: 6, image: ImagesPath.contactUs, text: 'Contact Us' },
    ];


    const handleClose = () => {
        setIsAlert(false)
    }


    const handleBox = (item) => {
        if (item.text === 'Contact Us') {
            setIsAlert(true)
        } else if (item.text === 'Quotex Signals') {
            setIsShowQuotexSignal(!isShowQuotexSignal)
        }
        else if (item.text === 'Forex Signals') {
            setIsShowForexSignal(!isShowForexSignal)
        }  
        else {
            setSelectedItem(item);
            setIsShow(!isShow);
        }
    };

    // Saki10837882

    return (
        <>
            {isDrawerOpen ? (
                <DrawerScreen onClose={handleHemberger} drawerTranslate={drawerTranslateX} />
            ) : isShow ? (
                <HomeChild onClose={handleBox} data={selectedItem} />
            ) : isChatActive ? (
                <Chat/>
            ) : isShowQuotexSignal ? (
                <QuotexSignalsChild/>
            ) : isShowForexSignal ? (
                <ForexSignalsChild/>
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
                    {isAlert && <CustomAlert datas={'contactUs'} onClose={handleClose} parentChat={handleChat}/>}
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
        alignItems: 'center'
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
    },
    box: {
        width: '90%',
        marginVertical: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    boxText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});

export default Home;
