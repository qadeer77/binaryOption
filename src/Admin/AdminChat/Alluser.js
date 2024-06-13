import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { AppColors } from '../../Constant/AppColor';
import firestore from '@react-native-firebase/firestore';
import AdminChat from './AdminChat';

const Alluser = ({ navigation }) => {
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchUsers = async () => {
            try {
                const usersCollection = await firestore().collection('users').get();
                // const usersList = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const usersList = usersCollection.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(user => user.name === 'tahaahmed123');
                setAllUsers(usersList);
                setAllUsers(usersList);
            } catch (error) {
                console.error('Error fetching users: ', error);
            } finally {
                setLoading(false)
            }
        };

        fetchUsers();
    }, []);

    const handleItem = (item) => {
        setIsShow(!isShow);
        setData(item);
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
                    {loading ? (
                        <ActivityIndicator size="large" color={AppColors.PrimaryBlack} />
                    ) : (
                        <ScrollView>
                            <FlatList
                                data={allUsers}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
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
