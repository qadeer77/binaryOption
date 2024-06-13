import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { AppColors } from '../../Constant/AppColor';
import { ImagesPath } from '../../Constant/ImagePath';
import CustomAlert from '../../Components/CustomAlert';
import firestore from '@react-native-firebase/firestore';

const Users = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [IsShow, setIsShow] = useState(false);
    const [IsUsers, setUsers] = useState({});
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = await firestore().collection('users').get();
                const usersList = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("usersList====>>>>>>> ", usersList);
                setAllUsers(usersList);
            } catch (error) {
                console.error('Error fetching users: ', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (text) => {
        setSearchTerm(text);
        if (text.length >= 4) {
            const filtered = allUsers.filter(user => user.email.toLowerCase().includes(text.toLowerCase()));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    };

    const handleUserPress = (user) => {
        setUsers(user)
        setIsShow(!IsShow)
    };

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>Users</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by email (min 4 characters)"
                    value={searchTerm}
                    onChangeText={handleSearch}
                />
            </View>
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
            {IsShow && <CustomAlert data={IsUsers} onClose={handleUserPress} datas={'users'}/>}
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
    menuIcon: {
        marginRight: 25,
    },
    menuIconImage: {
        width: 30,
        height: 30,
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
