import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, LogBox, PermissionsAndroid, Linking } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screen/Home';
import SplashScreen from './src/Screen/SpalshScreen';
import LoginScreen from './src/Screen/LoginScreen';
import SignupScreen from './src/Screen/SignUpScreen';
import BottomTab from './src/Admin/Bootom/BottomScreen';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Tab = createNativeStackNavigator();

function App() {
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
