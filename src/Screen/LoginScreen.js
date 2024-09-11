import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { ImagesPath } from '../Constant/ImagePath';
import { AppColors } from '../Constant/AppColor';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [token, setToken] = useState(null);

    const handleRegister = () => {
        navigation.replace('signUpScreen');
    }


    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '633515924228-j3vruppuscvnhc6pvjrem49hkkunanr1.apps.googleusercontent.com',
        });
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await messaging().getToken();
                setToken(token);
            } catch (error) {
                console.error("Error fetching token: ", error);
            }
        };
        fetchToken()
    }, [])


    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const adminCollection = await firestore().collection('admins').get();
                const adminList = adminCollection.docs.map(doc => doc.data());
                const emails = adminList.flatMap(admin => admin.emails);
                const selectedEmails = [emails[0], emails[2]];
                setAdmins(selectedEmails);
            } catch (error) {
                console.error("Error fetching admins: ", error);
            }
        };

        fetchAdmins();

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])

    const handleLogin = async () => {
        if (validateInputs()) {
            setLoading(true);
            try {
                const isAdmin = admins.includes(username);
                console.log("isAdmin=====>>>>>>> ", isAdmin);
                if (isAdmin) {
                    navigation.replace('BottomTab');
                    await AsyncStorage.setItem("isAdminLoggedIn", "true");
                    const adminTokenRef = firestore().collection('admin_tokens').doc('admin');
                    await adminTokenRef.set({ sender : token }, { merge: true });
                } else {
                    let userCredential = await auth().signInWithEmailAndPassword(username, password);
                    const userId = userCredential.user.uid;

                    await firestore().collection('users').doc(userId).set({    
                        receiver: token,
                        login: true,
                    }, { merge: true });
                    
                    showToast("Sign-in successful!");
                    navigation.replace('home');
                    await AsyncStorage.setItem("isLoggedIn", "true");
                }
            } catch (error) {
                if (error.code === 'auth/invalid-credential') {
                    console.log('The email address you entered does not exist in our records.');
                    showToast('The email address you entered does not exist in our records.');
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                } else if (error.code === 'auth/user-not-found') {
                    showToast('The email address you entered does not exist in our records.');
                    console.log('That email address is invalid!');
                } else if (error.code === 'auth/wrong-password') {
                    showToast('Your Password Is Wrong.');
                    console.log('That email address is invalid!');
                } else {
                    console.error("errror=====>>>>> ", error);
                }
            } finally {
                setLoading(false);
            }
        }
    };



    const showToast = (text) => {
        Toast.show(text, Toast.LONG);
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[a-z])(?=.*\d).{8,}$/;

        if (!username && !password) {
            showToast('Please fill in all fields');
            return false;
        } else if (!emailRegex.test(username)) {
            showToast('Please enter a valid email address');
            return false;
        } else if (!passwordRegex.test(password)) {
            showToast('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit');
            return false;
        } else {
            return true;
        }
    };

    const handleGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);

            const userDocRef = firestore().collection('users').doc(user.id);
            console.log("user=====>>>id=====>>>> ", user);
            

            const userDoc = await userDocRef.get();

            if (!userDoc.exists) {
                console.log('Document does not exist. Creating...');
                await userDocRef.set({
                    name: `${user.givenName} ${user.familyName}`,
                    email: user.email,
                    forexPremiumSignals: false,
                    overridePremiumSignals: false,
                    premiumSignals: false,
                    purchasedActionBook: false,
                    purchasedPaidCourse: false,
                    receiver: token,
                    login: true,
                });
            } else {
                
                const existingData = userDoc.data();
                if (existingData.receiver !== token) {
                    await userDocRef.update({
                        receiver: token,
                        login: true,
                    });
                }
            }

            showToast('Google Sign-In successful');
            navigation.replace('home');
            await AsyncStorage.setItem("isLoggedIn", "true");
        } catch (error) {
            console.log("error=====>>>> ", error);
        }
    }

    return (
        <>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled' behavior="padding" style={{ marginTop: keyboardOpen ? '-50%' : 0 }}>
                    <View style={styles.container}>
                        <View style={styles.overlay}>
                            <Image source={ImagesPath.images} style={styles.image} />
                            <View style={styles.overlaySub}>
                                <Text style={styles.text}>Quotex Signals</Text>
                                <Image source={ImagesPath.HRP} style={styles.centeredImage} />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input, { color: AppColors.PrimaryBlack }]}
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    placeholderTextColor={AppColors.PrimaryBlack}
                                    value={username}
                                    onChangeText={(text) => setUsername(text.trim())}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={[styles.input, { color: AppColors.PrimaryBlack }]}
                                    placeholder="Enter your password"
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor={AppColors.PrimaryBlack}
                                    value={password}
                                    onChangeText={(text) => setPassword(text.trim())}
                                />
                                <TouchableOpacity
                                    style={styles.passwordToggle}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Image source={showPassword ? ImagesPath.eyeImage : ImagesPath.eyeSlashImage} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>Login</Text>
                            </TouchableOpacity>
                            <Text style={{ color: AppColors.PrimaryBlack, textAlign: 'center', top: 20 }}>Or Login in with</Text>
                            <View style={styles.googleContainer}>
                                <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]} onPress={handleGoogle}>
                                    <Image source={ImagesPath.GoogleImages} style={styles.loginImages} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]}>
                                    <Image source={ImagesPath.facebookImages} style={styles.loginImages} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.registerTextContainer}>
                                <Text style={styles.registerText}>Don't have an account?</Text>
                                <TouchableOpacity onPress={handleRegister}>
                                    <Text style={styles.registerLink}> Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        position: 'absolute',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
    },
    overlaySub: {
        marginTop: 100
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1,
    },
    text: {
        fontSize: 50,
        // fontWeight: 'bold',
        // color: AppColors.PrimaryWhite,
        color: AppColors.PrimaryWhite,
        marginBottom: 30,
        fontFamily: 'MADE Mirage Regular PERSONAL USE'
    },
    centeredImage: {
        resizeMode: 'cover'
    },
    inputContainer: {
        paddingHorizontal: 30,
        marginTop: 430
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: AppColors.PrimaryBlack,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: AppColors.PrimaryBlack,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: AppColors.blue,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '40%',
    },
    loginButtonText: {
        color: AppColors.PrimaryWhite,
        fontSize: 18,
        // fontWeight: 'bold',
    },
    registerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    registerText: {
        color: AppColors.black,
        fontSize: 16,
    },
    registerLink: {
        color: AppColors.PrimaryBlack,
        fontSize: 16,
        // textDecorationLine: 'underline',
    },
    passwordToggle: {
        position: 'absolute',
        top: 43,
        right: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    fgaSubContainer: {
        backgroundColor: AppColors.blue,
        height: 80,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    loginImages: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
});

export default LoginScreen;
