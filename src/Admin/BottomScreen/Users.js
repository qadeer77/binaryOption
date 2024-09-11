import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomAlert from '../../Components/CustomAlert';
import { AppColors } from '../../Constant/AppColor';

const Users = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = await firestore().collection('users').get();
                const usersList = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllUsers(usersList);
                setFilteredUsers(usersList); 
            } catch (error) {
                console.error('Error fetching users: ', error);
            } finally {
                setLoading(false)
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (text) => {
        setSearchTerm(text);
        const filtered = allUsers.filter(user => user.email.toLowerCase().includes(text.toLowerCase()));
        setFilteredUsers(filtered);
    };

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setIsShow(!isShow);
    };

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>Users</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by email"
                    value={searchTerm}
                    onChangeText={handleSearch}
                />
            </View>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={AppColors.blue} />
                </View>
            ) : (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleUserPress(item)}>
                            <View style={styles.userItem}>
                                <Text style={styles.userName}>{item.name}</Text>
                                <Text style={styles.userEmail}>{item.email}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
                />
            )}
            {isShow && selectedUser && (
                <CustomAlert data={selectedUser} onClose={handleUserPress} datas={'users'} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.blue,
        height: 70,
        paddingHorizontal: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
    },
    searchContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: '#555',
    },
    noResultsText: {
        padding: 10,
        textAlign: 'center',
        color: '#555',
    },
});

export default Users;
