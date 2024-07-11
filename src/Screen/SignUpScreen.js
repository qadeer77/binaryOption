import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import { ImagesPath } from '../Constant/ImagePath';
import { AppColors } from '../Constant/AppColor';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '633515924228-j3vruppuscvnhc6pvjrem49hkkunanr1.apps.googleusercontent.com',
        });
    }, []);

    const showToast = (text) => {
        Toast.show(text, Toast.LONG);
    };

    const handleLogin = () => {
        navigation.replace('login');
        // setWebViewVisible(true)
    }

    const handleRegister = async () => {
        if (validateInputs()) {
            setLoading(true);
            try {
                const userCredential = await auth().createUserWithEmailAndPassword(username, password);
                console.log('User account created & signed in!');

                const user = userCredential.user;
                await firestore().collection('users').doc(user.uid).set({
                    name: name,
                    email: username
                });
                
                navigation.replace('home');
                showToast('signUp successful');
                await AsyncStorage.setItem("isLoggedIn", "true");
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    showToast('That email address is already in use!')
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                } else {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        }
    };


    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const confirmPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!username && !password) {
            showToast('Please fill in all fields');
            return false;
        }
        else if (!emailRegex.test(username)) {
            showToast('Please enter a valid email address');
            return false;
        }
        else if (!passwordRegex.test(password)) {
            showToast('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit');
            return false;
        }
        else if (!confirmPasswordRegex.test(confirmPassword)) {
            showToast('Confirm Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit');
            return false;
        }
        else {
            return true;
        }
    };

    const handleGoogle = async () => {
        console.log("hlelloooooooooooo");
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            showToast('Google Sign-In successful');
            navigation.replace('home');
            await AsyncStorage.setItem("isLoggedIn", "true");
        } catch (error) {
            console.log("error=====>>>> ", error);
        }
    }

    const handleFacebook = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                showToast('Facebook Sign-In cancelled');
                return;
            }

            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                showToast('Something went wrong obtaining access token');
                return;
            }

            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            await auth().signInWithCredential(facebookCredential);
            showToast('Facebook Sign-In successful');
            navigation.replace('home');
            await AsyncStorage.setItem("isLoggedIn", "true");
        } catch (error) {
            console.log("error=====>>>> ", error);
            showToast('Facebook Sign-In failed');
        }
    };

    return (
        <>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.overlay}>
                            <Image source={ImagesPath.images} style={styles.image} />
                            <View style={styles.overlaySub}>
                                <Text style={styles.text}>REGISTER</Text>
                                <Image source={ImagesPath.HRP} style={styles.centeredImage} />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={[styles.input, { color: AppColors.PrimaryBlack }]}
                                    placeholder="Enter your Name"
                                    placeholderTextColor={AppColors.PrimaryBlack}
                                    value={name}
                                    onChangeText={(text) => setName(text.trim())}
                                />
                            </View>
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
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput
                                    style={[styles.input, { color: AppColors.PrimaryBlack }]}
                                    placeholder="Enter your confirm password"
                                    secureTextEntry={!showConfirmPassword}
                                    placeholderTextColor={AppColors.PrimaryBlack}
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text.trim())}
                                />
                                <TouchableOpacity
                                    style={styles.passwordToggle}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Image source={showConfirmPassword ? ImagesPath.eyeImage : ImagesPath.eyeSlashImage} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleRegister}
                            >
                                <Text style={styles.loginButtonText}>REGISTER</Text>
                            </TouchableOpacity>
                            <Text style={{ color: AppColors.PrimaryBlack, textAlign: 'center', top: 20 }}>Or SignUp in with</Text>
                            <View style={styles.googleContainer}>
                                <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]} onPress={handleGoogle}>
                                    <Image source={ImagesPath.GoogleImages} style={styles.loginImages} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]} onPress={handleFacebook}>
                                    <Image source={ImagesPath.facebookImages} style={styles.loginImages} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.registerTextContainer}>
                                <Text style={styles.registerText}>Already have an account?</Text>
                                <TouchableOpacity onPress={handleLogin}>
                                    <Text style={styles.registerLink}> Login</Text>
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
        color: AppColors.PrimaryWhite,
        marginBottom: 30,
        fontFamily: 'MADE Mirage Regular PERSONAL USE'
    },
    centeredImage: {
        resizeMode: 'cover'
    },
    inputContainer: {
        paddingHorizontal: 20,
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
        borderRadius: 30,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '40%',
    },
    loginButtonText: {
        color: AppColors.PrimaryWhite,
        fontSize: 18,
        // fontWeight: 'bold',
        fontFamily: 'Roboto-Regular'
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
    registerTypeContainer: {
        marginBottom: 20,
    },
    registerTypeTextWrapper: {
        flexDirection: 'column',
        // backgroundColor: AppColors.PrimaryWhite,
        backgroundColor: "#939393",
        // marginTop: 8,
        borderRadius: 20,
        borderColor: AppColors.PrimaryBlack,
        height: 140
    },
    registerTypeText: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 20,
        color: AppColors.PrimaryBlack,
        textAlign: 'center',
        width: '100%'
    },
    blueText: {
        backgroundColor: AppColors.blue,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        color: AppColors.PrimaryWhite,
        fontWeight: 'bold',
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 8,
    },
    centeredText: {
        alignSelf: 'center',
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

export default SignupScreen;
