import { Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve authentication token from AsyncStorage
                const token = await AsyncStorage.getItem('authToken');

                // Decode the token to extract user ID
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.userId;

                // Make a GET request to fetch user data
                const response = await axios.get(`http://192.168.1.28:8000/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include authentication token in the request headers
                    },
                });

                // Set the fetched user data in state
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); // Call fetchUserData when the component mounts
    }, []); 

    // console.log("ID USER", userData);

    // Function to calculate the total number of friends
    const getTotalFriends = () => {
        if (userData && userData.friends) {
            return userData.friends.length;
        }
        return 0;
    };

    const getTotalSentFriendRequest = () => {
        if(userData && userData.sentFriendRequests){
            return userData.sentFriendRequests.length;
        }
        return 0;
    }

    if (!userData) {
        return <View><Text>Loading...</Text></View>;
    }
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
        <View 
            style ={{
                flexDirection:'row',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 10,
            }}>
            <Image
                style={{
                    height: 60,
                    width: 60,
                    borderRadius:50,
                    resizeMode:'contain'
                }}
                source={{ uri: `data:image/jpeg;base64,${userData.image}` }}
            />
            <View 
                style={{
                    
                }}>
                <Text 
                    style={{
                        fontSize: 20,
                        fontWeight: '400',
                        color: 'blue',
                        paddingHorizontal: 10,
                        marginLeft: 10,
                    }}>        
                    9
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        color: 'grey',
                        paddingHorizontal: 10,
                    }}>
                    Bài viết
                </Text>
            </View>
            <View 
                style={{
                    
                }}>
                <Text 
                    style={{
                        fontSize: 20,
                        fontWeight: '400',
                        color: 'blue',
                        paddingHorizontal: 10,
                        marginLeft: 10,
                    }}>        
                    {getTotalFriends()}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        color: 'grey',
                        paddingHorizontal: 10,
                    }}>
                    Bạn vè
                </Text>
            </View>
            <View 
                style={{
                    
                }}>
                <Text 
                    style={{
                        fontSize: 20,
                        fontWeight: '400',
                        color: 'blue',
                        paddingHorizontal: 10,
                        marginLeft: 10,
                    }}>        
                    {/* {userData.sentFriendRequests ? userData.sentFriendRequests.length : 0} */}
                    {getTotalSentFriendRequest()}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        color: 'grey',
                        paddingHorizontal: 10,
                    }}>
                    Đang theo dõi
                </Text>
            </View>
        </View>
        <Text 
            style={{
                fontSize:18,
                color: 'black',
                fontWeight:'bold',
                paddingHorizontal: 10,
                marginTop: 10,
                marginBottom: 20,
            }}>
            {userData.name}
        </Text>
        <Pressable
            style={{
                backgroundColor:'#0E46A3',
                width: '90%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                marginLeft:18,
            }}
            onPress={() => navigation.navigate("EditProfile")}
        >
            <Text
                style={{
                    fontWeight:'bold',
                    fontSize:18,
                    color: 'white'
                }}
            >EDIT PROFILE</Text>
        </Pressable>
        <Text 
            style={{
                fontSize:18,
                color: 'black',
                fontWeight:'bold',
                paddingHorizontal: 10,
                marginTop: 15,
                marginBottom: 20,
            }}>
                Galery
        </Text>
        <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor:'black'}}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})