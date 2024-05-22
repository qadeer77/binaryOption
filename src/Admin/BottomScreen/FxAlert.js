import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppColors } from '../../Constant/AppColor';
import { ImagesPath } from '../../Constant/ImagePath';

const FxAlert = ({ navigation }) => {

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>Fx Alert</Text>
                <TouchableOpacity style={styles.menuIcon}>
                    <Image source={ImagesPath.threeDot} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
});

export default FxAlert;
