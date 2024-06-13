import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AppColors } from '../../Constant/AppColor';
import { ImagesPath } from '../../Constant/ImagePath';
import CheckBox from '@react-native-community/checkbox';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Alluser from '../AdminChat/Alluser';

const FxSignals = ({ navigation, refresh }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [signals, setSignals] = useState('');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [visibleChat, setVisibleChat] = useState(false);

    useEffect(() => {
    }, [refresh]);


    const UploadImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri)
                console.log("imageUri====>>>> ", imageUri);
            }
        });
    };


    const handleThreeDot = () => {
        setShowTooltip(!showTooltip);
    }


    const handleChat = () => {
        setVisibleChat(true)
    }

    return (
        <>
            {visibleChat ? (
                <Alluser />
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Fx Signals</Text>
                            <TouchableOpacity style={styles.menuIcon} onPress={handleThreeDot}>
                                <Image source={ImagesPath.threeDot} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                            {showTooltip && (
                                <View style={styles.tooltip}>
                                    <TouchableOpacity style={styles.tooltipOption} onPress={handleChat}>
                                        <Text style={styles.tooltipText}>Chat</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={styles.tooltipOption}>
                            <Text style={styles.tooltipText}>Option 2</Text>
                        </TouchableOpacity> */}
                                </View>
                            )}
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.sendNotificationText}>Send Notification</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Notification Title"
                                value={title}
                                onChangeText={setTitle}
                            />
                            <TextInput
                                style={[styles.input, styles.messageInput]}
                                placeholder="Notification Message"
                                value={message}
                                onChangeText={setMessage}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.sendNotificationText}>Send Signal</Text>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={checked1}
                                    onValueChange={setChecked1}
                                />
                                <Text style={styles.signalText}>Send to Telegram</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={checked2}
                                    onValueChange={setChecked2}
                                />
                                <Text style={styles.signalText}>Premium Signal</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={checked3}
                                    onValueChange={setChecked3}
                                />
                                <Text style={styles.signalText}>Send Notification</Text>
                            </View>
                            <View style={styles.signalContainer}>
                                <TextInput
                                    style={[styles.input, styles.messageInput]}
                                    placeholder="Signals"
                                    value={signals}
                                    onChangeText={setSignals}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.sendNotificationText}>Result</Text>
                            <View style={styles.firestoreConatiner}>
                                <Text style={styles.firestoreConatinerText}>Notification</Text>
                                <Text style={styles.firestoreConatinerText}>Firestore</Text>
                                <Text style={styles.firestoreConatinerText}>Vvipbinarysignals</Text>
                                <Text style={styles.firestoreConatinerText}>Signals</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.heading}>Upload Image</Text>
                            <TouchableOpacity onPress={UploadImage}>
                                <View style={styles.imageContainer}>
                                    {selectedImage ? (
                                        <Image source={{ uri: selectedImage }} style={styles.image} />
                                    ) : (
                                        <Image source={ImagesPath.upload} style={styles.image} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>send</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    signalContainer: {
        marginTop: 20
    },
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
    content: {
        padding: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20
    },
    sendNotificationText: {
        fontSize: 20,
        marginBottom: 10,
        color: AppColors.PrimaryBlack,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    messageInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signalText: {
        color: AppColors.PrimaryBlack
    },
    firestoreConatiner: {
        marginLeft: 20,
        marginTop: 10,
    },
    firestoreConatinerText: {
        color: AppColors.PrimaryBlack,
        fontSize: 15,
        marginBottom: 10
    },
    sendButton: {
        backgroundColor: AppColors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        // paddingHorizontal: 100,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20
    },
    sendButtonText: {
        color: AppColors.PrimaryWhite,
        fontSize: 20
    },
    title: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: AppColors.PrimaryBlack
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 20,
        right: 70,
        borderRadius: 10,
        padding: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        zIndex: 2,
    },
    tooltipOption: {
        padding: 10,
    },
    tooltipText: {
        fontSize: 16,
        color: AppColors.PrimaryBlack
    },
});

export default FxSignals;
