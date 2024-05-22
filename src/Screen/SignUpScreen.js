import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import { ImagesPath } from '../Constant/ImagePath';
import { AppColors } from '../Constant/AppColor';
import Toast from 'react-native-simple-toast';

const SignupScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const showToast = (text) => {
        Toast.show(text, Toast.LONG);
    };

    const handleLogin = () => {
        navigation.replace('login');
        // setWebViewVisible(true)
    }

    const handleRegister = async () => {
        if (validateInputs()) {
            navigation.replace('home')
        }
    }

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

    return (
        <>
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
                            <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]}>
                                <Image source={ImagesPath.GoogleImages} style={styles.loginImages} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]}>
                                <Image source={ImagesPath.facebookImages} style={styles.loginImages} />
                            </TouchableOpacity>
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
