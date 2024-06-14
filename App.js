import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, LogBox, PermissionsAndroid, Linking } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screen/Home';
import SplashScreen from './src/Screen/SpalshScreen';
import LoginScreen from './src/Screen/LoginScreen';
import SignupScreen from './src/Screen/SignUpScreen';
import BottomTab from './src/Admin/Bootom/BottomScreen';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Tab = createNativeStackNavigator();

function App() {

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    requestUserPermission()
    return unsubscribe;
  }, [])

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="SplashScreen" component={SplashScreen} />
          <Tab.Screen name="home" component={Home} />
          <Tab.Screen name="login" component={LoginScreen} />
          <Tab.Screen name="signUpScreen" component={SignupScreen} />
          <Tab.Screen name="BottomTab" component={BottomTab} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
