import {React, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AppColors } from '../Constant/AppColor';
import { ImagesPath } from '../Constant/ImagePath';
import RNIap from 'react-native-iap';


const itemSkus = [
    'subscription_1_month',
    'subscription_3_months',
    'subscription_lifetime',
];

const subscriptionOptions = [
    {
        id: '1',
        duration: '1 Month Subscription',
        price: 'Rs 35$',
        benefits: '• Unlimited Premium Binary Signals (Minimum 10 signals per day)'
    },
    {
        id: '2',
        duration: '3 Months Subscription',
        price: 'Rs 70$',
        benefits: '• Unlimited Premium Binary Signals (Minimum 10 signals per day)\n• Additional Exclusive Signals'
    },
    {
        id: '3',
        duration: 'Lifetime Subscription',
        price: 'Rs 120$',
        benefits: '• Unlimited Premium Binary Signals (Minimum 10 signals per day)\n• VIP Support\n• Exclusive Market Insights'
    },
];

const QuotexSignalPremium = ({ onClose, data }) => {


    useEffect(() => {
        const initIap = async () => {
            try {
                await RNIap.initConnection();
                await RNIap.getSubscriptions(itemSkus); 
            } catch (err) {
                console.warn('Error initializing IAP connection', err);
            }
        };
        initIap();

        return () => {
        };
    }, []);


    const purchaseSubscription = async(itemId) => {
        try {
            const purchase = await RNIap.requestSubscription(itemId);
            console.log('Purchase successful', purchase);
        } catch (err) {
            console.warn('Purchase failed', err);
        }
    }

    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuIcon} onPress={onClose} accessibilityLabel="Close">
                    <Image source={ImagesPath.BackIcon} style={styles.iconImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Quotex Specialist</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Choose subscription duration for premium Quotex Signals
                </Text>
                <Text style={styles.description}>
                    • All subscriptions include a free 3-day trial period for new members.
                </Text>
                <Text style={styles.description}>
                    • After the free trial ends, Google Play billing will automatically debit your account and start a paid subscription unless you cancel.
                </Text>
                <Text style={styles.description}>
                    • You can cancel the subscription anytime before the next billing cycle through the Play Store app.
                </Text>
            </View>
            <ScrollView style={styles.subscriptionList}>
                {subscriptionOptions.map((option) => (
                    <View key={option.id} style={styles.subscriptionContainer}>
                        <TouchableOpacity style={styles.subscriptionButton} onPress={() => purchaseSubscription(option.id)}>
                            <Text style={styles.subscriptionText}>
                                {option.duration} For Premium Forex Signals {option.price}
                            </Text>
                            <Text style={styles.benefitsTitle}>
                                Benefit:
                            </Text>
                            <Text style={styles.benefitsText}>
                                {option.benefits}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
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
    iconImage: {
        width: 24,
        height: 24,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: 'gray',
    },
    subscriptionList: {
        marginHorizontal: 20,
        position: 'absolute',
        bottom: 0
    },
    subscriptionContainer: {
        marginBottom: 10,
    },
    subscriptionButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    subscriptionText: {
        color: AppColors.blue,
        fontSize: 16,
        fontWeight: 'bold',
    },
    benefitsTitle: {
        color: AppColors.blue,
        fontSize: 16,
        marginTop: 10,
    },
    benefitsText: {
        color: AppColors.blue,
        fontSize: 16,
    },
});

export default QuotexSignalPremium;
