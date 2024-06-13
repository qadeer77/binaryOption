import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ImagesPath } from '../../Constant/ImagePath';
import { AppColors } from '../../Constant/AppColor';
import BinaryPanel from '../BottomScreen/BinaryPanel';
import FxSignals from '../BottomScreen/FxSignals';
import BinaryAlert from '../BottomScreen/BinaryAlert';
import FxAlert from '../BottomScreen/FxAlert';
import Users from '../BottomScreen/Users';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    const [refreshBinaryPanel, setRefreshBinaryPanel] = useState(false);
    const [refreshFxSignals, setRefreshFxSignals] = useState(false);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60, backgroundColor: AppColors.blue },
                tabBarItemStyle: { backgroundColor: AppColors.blue },
            }}
        >
            <Tab.Screen
                name="BinaryPanel"
                component={() => <BinaryPanel refresh={refreshBinaryPanel} />}
                listeners={{
                    tabPress: e => {
                        setRefreshBinaryPanel(prevState => !prevState);
                    }
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.homeWhite : ImagesPath.binarySignals}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? AppColors.PrimaryWhite : AppColors.bottomTabColor, marginBottom: 2 }}>Binary Panel</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="FxPanel"
                component={() => <FxSignals refresh={refreshFxSignals} />}
                listeners={{
                    tabPress: e => {
                        setRefreshFxSignals(prevState => !prevState);
                    }
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.homeWhite : ImagesPath.binarySignals}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? AppColors.PrimaryWhite : AppColors.bottomTabColor, marginBottom: 2 }}>Fx Panel</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="BinaryAlert"
                component={BinaryAlert}
                listeners={{
                    tabPress: e => {
                    }
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.notificationWhiteImage : ImagesPath.fxSignals}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? AppColors.PrimaryWhite : AppColors.bottomTabColor, marginBottom: 2 }}>Binary Alert</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="FxAlerts"
                component={FxAlert}
                listeners={{
                    tabPress: e => {
                    }
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.notificationWhiteImage : ImagesPath.fxSignals}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? AppColors.PrimaryWhite : AppColors.bottomTabColor, marginBottom: 2 }}>Fx Alerts</Text>
                    ),
                }}
            />
             <Tab.Screen
                name="Users"
                component={Users}
                listeners={{
                    tabPress: e => {
                    }
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.userWhiteImage : ImagesPath.users}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? AppColors.PrimaryWhite : AppColors.bottomTabColor, marginBottom: 2 }}>Users</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

});

export default BottomTab