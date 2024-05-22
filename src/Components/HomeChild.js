import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { AppColors } from '../Constant/AppColor';
import { ImagesPath } from '../Constant/ImagePath';

const HomeChild = ({ onClose, data }) => {

    return (
        <>
                <>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.menuIcon} onPress={onClose}>
                            <Image source={ImagesPath.BackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{data.text}</Text>
                    </View>
                </>
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
});

export default HomeChild;
