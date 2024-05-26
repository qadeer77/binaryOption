import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Switch } from 'react-native';
import { AppColors } from '../Constant/AppColor';
import { ImagesPath } from '../Constant/ImagePath';

const CustomAlert = ({ visible, onClose, data }) => {
    const [pushNotificationEnabled, setPushNotificationEnabled] = useState(false);
    const [pushNotificationEnabled1, setPushNotificationEnabled1] = useState(false);
    const [pushNotificationEnabled2, setPushNotificationEnabled2] = useState(false);
    const [pushNotificationEnabled3, setPushNotificationEnabled3] = useState(false);
    const [pushNotificationEnabled4, setPushNotificationEnabled4] = useState(false);
    const [pushNotificationEnabled5, setPushNotificationEnabled5] = useState(false);

    useEffect(() => {
        console.log("data======>>>>> ", data);
        if (data) {
            setPushNotificationEnabled(data.isSubscribed);
        }
    }, [data]);

    const handleToggleSwitch = () => {
        setPushNotificationEnabled(previousState => !previousState);
    };

    const handleToggleSwitch1 = () => {
        setPushNotificationEnabled1(previousState => !previousState);
    };

    const handleToggleSwitch2 = () => {
        setPushNotificationEnabled2(previousState => !previousState);
    };

    const handleToggleSwitch3 = () => {
        setPushNotificationEnabled3(previousState => !previousState);
    };

    const handleToggleSwitch4 = () => {
        setPushNotificationEnabled4(previousState => !previousState);
    };

    const handleToggleSwitch5 = () => {
        setPushNotificationEnabled5(previousState => !previousState);
    };

    return (
        <Modal transparent animationType="slide" visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.alertContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Image source={ImagesPath.crossAlertIcon} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.nameText}>{data?.name}</Text>
                        <Text style={styles.emailText}>{data?.email}</Text>
                    </View>
                    <View style={styles.pushNotification}>
                        <Text style={styles.notificationText}>Subscribed to Binary Premium Signals?</Text>
                        <Switch
                            value={pushNotificationEnabled}
                            onValueChange={handleToggleSwitch}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={pushNotificationEnabled ? "#f5dd4b" : "#f4f3f4"}
                        />
                    </View>
                    <View style={styles.pushNotification}>
                        <Text style={styles.notificationText}>Subscribed to Forex Premium Signals?</Text>
                        <Switch
                            value={pushNotificationEnabled1}
                            onValueChange={handleToggleSwitch1}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={pushNotificationEnabled1 ? "#f5dd4b" : "#f4f3f4"}
                        />
                    </View>
                    <View style={styles.pushNotification}>
                        <Text style={styles.notificationText}>Give Binary Premium Signals Forcefully</Text>
                        <Switch
                            value={pushNotificationEnabled2}
                            onValueChange={handleToggleSwitch2}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={pushNotificationEnabled2 ? "#f5dd4b" : "#f4f3f4"}
                        />
                    </View>
                    <View style={styles.pushNotification}>
                        <Text style={styles.notificationText}>Give Forex Premium Signals Forcefully</Text>
                        <Switch
                            value={pushNotificationEnabled3}
                            onValueChange={handleToggleSwitch3}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={pushNotificationEnabled3 ? "#f5dd4b" : "#f4f3f4"}
                        />
                    </View>
                    <View style={styles.pushNotification}>
                        <Text style={styles.notificationText}>Purchased Action Book</Text>
                        <Switch
                            value={pushNotificationEnabled4}
                            onValueChange={handleToggleSwitch4}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={pushNotificationEnabled4 ? "#f5dd4b" : "#f4f3f4"}
                        />
                    </View>
                    <View style={styles.pushNotification}>
                        <Text style={styles.notificationText}>Purchased Paid Course</Text>
                        <Switch
                            value={pushNotificationEnabled5}
                            onValueChange={handleToggleSwitch5}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={pushNotificationEnabled5 ? "#f5dd4b" : "#f4f3f4"}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        padding: 20,
        backgroundColor: AppColors.PrimaryWhite,
        borderRadius: 20,
        width: "90%",
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeIcon: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
    },
    content: {
        alignItems: 'center',
        marginTop: 10,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColors.PrimaryBlack,
        marginBottom: 5,
    },
    emailText: {
        fontSize: 16,
        color: AppColors.SecondaryBlack,
    },
    pushNotification: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    notificationText: {
        color: AppColors.PrimaryBlack
    }
});

export default CustomAlert;
