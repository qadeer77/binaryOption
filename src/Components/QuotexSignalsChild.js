import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AppColors } from '../Constant/AppColor';
import { ImagesPath } from '../Constant/ImagePath';
import QuotexSignalPremium from '../SubComponent/QuotexSignalPremium';

const QuotexSignalsChild = ({ onClose }) => {
    const [show, setShow] = useState(false);
    const [signals, setSignals] = useState([]);

    useEffect(() => {
        const fetchSignals = async () => {
            try {
                const snapshot = await firestore().collection('signals').get();
                const signalsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSignals(signalsList);
            } catch (error) {
                console.error("Error fetching signals: ", error);
            }
        };

        fetchSignals();
    }, []);

    const handleContent = () => {
        setShow(true);
    };

    return (
        <>
            {show ? (
                <QuotexSignalPremium />
            ) : (
                <View style={styles.Container}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.menuIcon} onPress={onClose}>
                            <Image source={ImagesPath.BackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Free Quotex Signal</Text>
                    </View>
                    <TouchableOpacity style={styles.content} onPress={handleContent}>
                        <Image source={ImagesPath.eyeiconImge} style={styles.image} />
                        <Text style={styles.infoText}>
                            You are seeing free limited signals. Click here or any premium signal to buy premium quotex signals subscription.
                        </Text>
                    </TouchableOpacity>
                    {signals.length > 0 ? (
                        signals.map(signal => {
                            console.log("signals======>>>>>> ", signal.premium);
                            return (
                                <View style={styles.footerContainer}>
                                    <View key={signal.id} style={styles.signalItem}>
                                        <Text style={signal.premium ? styles.signalTitle1 : styles.signalTitle}>{signal.text}</Text>
                                        <Text style={styles.signalDate}>{signal.dateTime}</Text>
                                    </View>
                                </View>
                            )
                        })
                    ) : (
                        <Text>No signals available.</Text>
                    )}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.blue,
        height: 70,
        paddingHorizontal: 10,
    },
    menuIcon: {
        marginRight: 15,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    infoText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    footerContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginHorizontal: 10
    },
    footerHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    footerDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    signalItem: {
        marginBottom: 10,
    },
    signalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    signalTitle1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'transparent', textShadowColor: '#000', textShadowRadius: 60
    },
    signalDate: {
        fontSize: 14,
        color: '#666',
        top: 20
    },
});

export default QuotexSignalsChild;
