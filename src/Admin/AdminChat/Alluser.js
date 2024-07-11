import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { AppColors } from '../../Constant/AppColor';
import firestore from '@react-native-firebase/firestore';
import AdminChat from './AdminChat';
import database from '@react-native-firebase/database';

const Alluser = ({ navigation }) => {
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true)
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await database().ref('chates').once('value');
                const emails = usersSnapshot.val() ? Object.keys(usersSnapshot.val()) : [];
                console.log("emails====>>>>> ", emails);
                setFilteredUsers(emails);
                setAllUsers(emails)
            } catch (error) {
                console.error('Error fetching users: ', error);
            } finally {
                setLoading(false)
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(allUsers);
        } else {
            const filtered = allUsers.filter((email) =>
                email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, allUsers]);

    const handleItem = (item, email) => {
        setIsShow(!isShow);
        setData({ item, email });
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItem(item)}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };


    // request.auth != null

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
                                    const email = item.split('@')[0]
                                    return (
                                        <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => handleItem(item, email)}>
                                            <View style={styles.textContainer}>
                                                <Text style={styles.name}>{email}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            ) : (
                                <></>
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
    role: {
        fontSize: 14,
        color: '#555',
    },
    location: {
        fontSize: 12,
        color: '#888',
    },
});

export default Alluser;
