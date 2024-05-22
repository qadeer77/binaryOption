import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { ImagesPath } from '../Constant/ImagePath';
import { AppColors } from '../Constant/AppColor';
import Toast from 'react-native-simple-toast';

const LoginScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const handleRegister = () => {
        navigation.replace('signUpScreen');
    }


    useEffect(() => {
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
            if (username == "Admin123@gmail.com" && password == "Admin123") {
                navigation.replace('BottomTab')
            } else {
                navigation.replace('home')
            }
        }
    }


    const showToast = (text) => {
        Toast.show(text, Toast.LONG);
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

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

    return (
        <>
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
                            <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]}>
                                <Image source={ImagesPath.GoogleImages} style={styles.loginImages} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]}>
                                <Image source={ImagesPath.facebookImages} style={styles.loginImages} />
                            </TouchableOpacity>
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
