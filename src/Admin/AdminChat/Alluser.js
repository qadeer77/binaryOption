import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { AppColors } from '../../Constant/AppColor';
import database from '@react-native-firebase/database';
import AdminChat from './AdminChat';

const Alluser = ({ navigation }) => {
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [usersWithNewMessages, setUsersWithNewMessages] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const usersSnapshot = await database().ref('chates').once('value');
                const usersData = usersSnapshot.val() || {};
                const emails = Object.keys(usersData);

                const sortedEmails = emails.sort((a, b) => {
                    const aTimestamp = usersData[a].lastMessageTimestamp || 0;
                    const bTimestamp = usersData[b].lastMessageTimestamp || 0;
                    return bTimestamp - aTimestamp;
                });

                const usersWithNewMessages = sortedEmails.filter(email => usersData[email].hasNewMessage);

                setFilteredUsers(sortedEmails);
                setAllUsers(sortedEmails);
                setUsersWithNewMessages(usersWithNewMessages);
            } catch (error) {
                console.error('Error fetching users: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        const onValueChange = database().ref('chates').on('value', (snapshot) => {
            const usersData = snapshot.val() || {};
            const emails = Object.keys(usersData);

            const sortedEmails = emails.sort((a, b) => {
                const aTimestamp = usersData[a].lastMessageTimestamp || 0;
                const bTimestamp = usersData[b].lastMessageTimestamp || 0;
                return bTimestamp - aTimestamp;
            });

            const usersWithNewMessages = sortedEmails.filter(email => usersData[email].hasNewMessage);

            setFilteredUsers(sortedEmails);
            setAllUsers(sortedEmails);
            setUsersWithNewMessages(usersWithNewMessages);
        });

        return () => database().ref('chates').off('value', onValueChange);
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredUsers(allUsers);
        } else {
            const filtered = allUsers.filter((email) =>
                email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, allUsers]);

    const handleItem = async (item, email) => {
        setIsShow(!isShow);
        setData({ item, email });

        await database().ref('/chates/' + email).update({ hasNewMessage: false });
    };

    const renderItem = ({ item }) => {
        const email = item;
        const hasNewMessage = usersWithNewMessages.includes(email);
        

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItem(item, email)}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{email.split('@')[0]}</Text>
                    {hasNewMessage && (
                        <View style={styles.notificationBadge} />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            {isShow ? (
                <AdminChat data={data} onClose={handleItem} />
            ) : (
                <View style={styles.container}>
                    <Text style={styles.headerText}>All Users</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search users..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color={AppColors.PrimaryBlack} />
                    ) : (
                        <ScrollView>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((item) => {
                                    return renderItem({ item });
                                })
                            ) : (
                                <Text>No users found</Text>
                            )}
                        </ScrollView>
                    )}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: AppColors.PrimaryBlack,
        marginBottom: 16,
        textAlign: 'center',
        marginTop: 10
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    notificationBadge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        marginLeft: 10
    }
});

export default Alluser;
