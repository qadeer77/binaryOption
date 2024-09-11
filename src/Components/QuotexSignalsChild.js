import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AppColors } from '../Constant/AppColor';
import { ImagesPath } from '../Constant/ImagePath';
import QuotexSignalPremium from '../SubComponent/QuotexSignalPremium';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const QuotexSignalsChild = ({ onClose }) => {
    const [show, setShow] = useState(false);
    const [forexPremiumSignals, setForexPremiumSignals] = useState(false);
    const [signals, setSignals] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserEmail = async () => {
            const user = auth().currentUser;
            if (user) {
                try {
                    const userSnapshot = await firestore().collection('users').where('email', '==', user.email).get();
                    if (!userSnapshot.empty) {
                        const userData = userSnapshot.docs[0].data();
                        setForexPremiumSignals(userData.overridePremiumSignals);
                    }
                } catch (error) {
                    console.error("Error fetching user details: ", error);
                }
            }
        };

        const fetchSignals = async () => {
            try {
                const snapshot = await firestore().collection('signals').get();
                const signalsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                signalsList.reverse();
                setSignals(signalsList);
            } catch (error) {
                console.error("Error fetching signals: ", error);
            }
        };
        

        fetchSignals();
        fetchUserEmail();
    }, []);

    const handleContent = () => {
        setShow(!show);
    };

    const handleClose = () => {
        navigation.replace('home');
    };

    return (
        <>
            {show ? (
                <QuotexSignalPremium onClose={handleContent} text={'Quotex'} />
            ) : (
                <View style={styles.Container}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.menuIcon} onPress={handleClose}>
                            <Image source={ImagesPath.BackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{!forexPremiumSignals ? 'Free Quotex Signal' : 'Quotex Signal'}</Text>
                    </View>
                    {!forexPremiumSignals ? (
                    <TouchableOpacity style={styles.content} onPress={handleContent}>
                    <Image source={ImagesPath.eyeiconImge} style={styles.image} />
                    <Text style={styles.infoText}>
                        You are seeing free limited signals. Click here or any premium signal to buy premium quotex signals subscription.
                    </Text>
                </TouchableOpacity>
                    ) : (
                        null
                    )}
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {signals.length > 0 ? (
                            signals.map(signal => (
                                <View key={signal.id} style={styles.footerContainer}>
                                    <View style={styles.signalItem}>
                                        <Text style={signal.premium && !forexPremiumSignals ? styles.signalTitle1 : styles.signalTitle}>
                                            {signal.text} {signal.premium && forexPremiumSignals ? '👑' : ''}
                                        </Text>
                                        <Text style={styles.signalDate}>{signal.dateTime}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text>No signals available.</Text>
                        )}
                    </ScrollView>
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
    scrollContainer: {
        padding: 20,
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
        color: 'transparent',
        textShadowColor: '#000',
        textShadowRadius: 60
    },
    signalDate: {
        fontSize: 14,
        color: '#666',
        top: 20
    },
});

export default QuotexSignalsChild;
