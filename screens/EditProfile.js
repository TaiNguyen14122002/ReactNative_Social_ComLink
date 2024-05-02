import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from "@react-navigation/native";
import defaultImage from '../assets/profile.png';



const EditProfile = () => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    const handleSelectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library required!');
            return;
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                setSelectedImage(result.uri);
                convertImageToBase64(result.uri);
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };



    const convertImageToBase64 = async (uri) => {
        try {
            // Read the image file from the local file system
            const fileContent = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setBase64Image(fileContent);
            // Set the base64 image in state
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve authentication token from AsyncStorage
                const token = await AsyncStorage.getItem('authToken');

                // Decode the token to extract user ID
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.userId;

                // Make a GET request to fetch user data
                const response = await axios.get(`http://192.168.1.4:8000/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include authentication token in the request headers
                    },
                });

                // Set the fetched user data in state
                setUserData(response.data);
                setName(response.data.name || '');
                setEmail(response.data.email || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); // Call fetchUserData when the component mounts
    }, []);

    const updateProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            const response = await axios.put(`http://192.168.1.4:8000/${userId}`, {
                name,
                email,
                Phone,
                image: base64Image, // Assuming you want to update the image as well
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Profile updated successfully:', response.data);
            navigation.navigate("Profile");
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "YYYY/MM/DD"
    );

    const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
    const [startedDate, setStartedDate] = useState("12/12/2023");

    const handleChangeStartDate = (propDate) => {
        setStartedDate(propDate);
    };

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    function renderDatePicker() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            margin: 20,
                            backgroundColor: '#10439F',
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 20,
                            padding: 35,
                            width: "90%",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <DatePicker
                            mode="calendar"
                            minimumDate={startDate}
                            selected={startedDate}
                            onDateChanged={handleChangeStartDate}
                            onSelectedChange={(date) => setSelectedStartDate(date)}
                            options={{
                                backgroundColor: '#10439F',
                                textHeaderColor: "#469ab6",
                                textDefaultColor: 'white',
                                selectedTextColor: 'white',
                                mainColor: "#469ab6",
                                textSecondaryColor: 'white',
                                borderColor: "rgba(122,146,165,0.1)",
                            }}
                        />

                        <TouchableOpacity onPress={handleOnPressStartDate}>
                            <Text
                                style={{

                                    fontSize: 18,
                                    lineHeight: 22,
                                    color: 'white'
                                }}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 22,
            }}>
            <ScrollView>
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 22,
                    }}>
                    <TouchableOpacity onPress={handleSelectImage}>
                        <Image
                            source={selectedImage ?
                                { uri: `data:image/jpeg;base64,${base64Image}` } :
                                (userData && userData.image ? { uri: `data:image/jpeg;base64,${userData.image}` } : defaultImage)
                            }
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                                borderColor: 'black',
                                resizeMode: 'contain'
                            }}

                        />
                        <View
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 10,
                                zIndex: 9999,
                            }}
                        >
                            <MaterialIcons
                                name="photo-camera"
                                size={32}
                                color='#10439F'
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 20 }}>Name</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                placeholder='Name'
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                        </View>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 20 }}>Email</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                placeholder='Email'
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                editable={true}
                            />

                        </View>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 20 }}>Phone</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                placeholder='Phone'
                                value={Phone}
                                onChangeText={(value) => setPhone(value)}
                                editable={true}
                            />
                        </View>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 20 }}>DoB</Text>
                        <TouchableOpacity
                            onPress={handleOnPressStartDate}
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}>
                            <Text>{selectedStartDate}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#10439F',
                            height: 44,
                            borderRadius: 6,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text
                            style={{

                                fontSize: 18,
                                lineHeight: 22,
                                color: 'white',
                            }}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={updateProfile}
                        style={{
                            backgroundColor: '#10439F',
                            height: 44,
                            borderRadius: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 15
                        }}>
                        <Text
                            style={{

                                fontSize: 18,
                                lineHeight: 22,
                                color: 'white',
                            }}>
                            Save Change
                        </Text>
                    </TouchableOpacity>

                    {renderDatePicker()}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({})