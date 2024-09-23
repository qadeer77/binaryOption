import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, LogBox, PermissionsAndroid, Linking, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screen/Home';
import SplashScreen from './src/Screen/SpalshScreen';
import LoginScreen from './src/Screen/LoginScreen';
import SignupScreen from './src/Screen/SignUpScreen';
import BottomTab from './src/Admin/Bootom/BottomScreen';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Tab = createNativeStackNavigator();

function App() {

  useEffect(() => {

    const requestNotificationPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the notifications");
      } else {
        console.log("Notification permission denied");
      }
    };

    requestNotificationPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!abdul qadeerr', JSON.stringify(remoteMessage));
    });
    requestUserPermission()

    return unsubscribe;
  }, [])


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await messaging().getToken();
        
        const message = {
          title: 'Notification Title',
          body: 'Notification Body Content',
        };
        sendTokenToBackend(token, message);
      } catch (error) {
        console.error("Error fetching token: ", error);
      }
    };

    const authListener = auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Current user:', user);
      } else {
        console.log('No user is currently logged in');
      }
    });

    fetchToken()

    return () => authListener();
  }, [])

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const sendTokenToBackend = async (token, message) => {
    try {
      const response = await axios.post('https://binary-option-backahnd1.vercel.app/send-notification', {
        token: token,
        message: {
          title: message.title,
          body: message.body,
        },
      });

      console.log('Notification sent:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

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
