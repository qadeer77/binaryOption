import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AppColors } from '../../Constant/AppColor';
import { ImagesPath } from '../../Constant/ImagePath';
import database from '@react-native-firebase/database';
import EmojiSelector, { Categories } from "react-native-emoji-selector";

function sanitizeEmail(email) {
    return email.replace(/[.#$[\]]/g, '_');
}

const AdminChat = ({ onClose, data }) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);


    useEffect(() => {
        console.log("data===>>>>>> ", data);
    }, [])

    let sanitizedEmail = sanitizeEmail(data.item);
    useEffect(() => {
        const messagesRef = database().ref('/chates/' + sanitizedEmail + '/messages');
        messagesRef.on('value', snapshot => {
            const messages = snapshot.val();
            if (messages) {
                const messageArray = Object.values(messages).sort((a, b) => a.timestamp - b.timestamp);
                setChatMessages(messageArray);
            }
        });

        return () => messagesRef.off('value');
    }, [sanitizedEmail]);

    const handleSend = () => {
        setShowEmojiPicker(false);
        if (message.trim() === '') return;

        const newMessage = {
            text: message.trim(),
            timestamp: Date.now(),
            user: data.email,
            isAdmin: true // Admin messages should be marked as isAdmin
        };

        database().ref('/chates/' + sanitizedEmail + '/messages').push(newMessage);

        setMessage('');
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    };

    const handleEmojiSelect = (emoji) => {
        setMessage(message + emoji);
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                    <Image source={ImagesPath.BackIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{data.email}</Text>
                <Text></Text>
            </View>

            <ScrollView style={styles.chatContainer}>
                {chatMessages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageContainer,
                            msg.isAdmin ? styles.adminMessageContainer : styles.userMessageContainer
                        ]}
                    >
                        <Text style={msg.isAdmin ? styles.messageText : styles.messageText1}>{msg.text}</Text>
                        <Text style={msg.isAdmin ? styles.timestamp : styles.timestamp1}>{formatTimestamp(msg.timestamp)}</Text>
                    </View>
                ))}
            </ScrollView>

            {showEmojiPicker && (
                <View style={styles.emojiPicker}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <EmojiSelector
                            category={Categories.symbols}
                            onEmojiSelected={handleEmojiSelect}
                            showSearchBar={false}
                        />
                    </ScrollView>
                </View>
            )}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.emojiButton} onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <Text style={styles.emojiText}>😄</Text>
                </TouchableOpacity>
                <TextInput
                    style={[styles.input, { flex: 1, marginLeft: 10 }]}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message"
                    placeholderTextColor={AppColors.placeholder}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: AppColors.header,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    headerTitle: {
        color: AppColors.PrimaryWhite,
        fontSize: 20
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        position: 'relative',
        maxWidth: '80%',
        minWidth: '20%'
    },
    adminMessageContainer: {
        backgroundColor: AppColors.sendButton,
        alignSelf: 'flex-end',
    },
    userMessageContainer: {
        backgroundColor: AppColors.userMessage,
        alignSelf: 'flex-start',
    },
    messageText: {
        color: AppColors.PrimaryWhite,
        fontSize: 16,
        marginBottom: 10
    },
    messageText1: {
        color: AppColors.PrimaryBlack,
        fontSize: 16,
        marginBottom: 10
    },
    timestamp: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        fontSize: 10,
        color: AppColors.PrimaryWhite,
    },
    timestamp1: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        fontSize: 10,
        color: AppColors.PrimaryBlack,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: AppColors.border,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: AppColors.border,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
        color: AppColors.text,
    },
    sendButton: {
        backgroundColor: AppColors.sendButton,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: AppColors.PrimaryWhite,
        fontSize: 16,
    },
    emojiPicker: {
        height: '30%',
        backgroundColor: '#f2f2f2',
    },
    emojiButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AppColors.sendButton,
    },
    emojiText: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default AdminChat;
