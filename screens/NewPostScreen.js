import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from "../UserContext";
import axios, { Axios } from 'axios';
import * as FileSystem from 'expo-file-system';

const NewPostScreen = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const { userId, setUserId } = useContext(UserType);

  // const [userId, setUserId] = useState(null); // Initialize userId state

  // useEffect(() => {
  //   // Fetch userId from AsyncStorage when the component mounts
  //   AsyncStorage.getItem('userId')
  //     .then((userIdFromStorage) => {
  //       setUserId(userIdFromStorage); // Set the userId state
  //     })
  //     .catch((error) => {
  //       console.error('Error retrieving userId from AsyncStorage:', error);
  //     });
  // }, []);

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
      if (result && result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setImage(result.assets[0].uri);
        console.log('Selected image URI:', result.assets[0].uri);
        // Save the image to the local file system
        await saveImageToFileSystem(result.assets[0].uri);


        const imageData = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64Image(`data:image/jpeg;base64,${imageData}`);
      } else {
        console.log('Image URI not found in result:', result);
      }

    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  console.log("base64", base64Image)
  const saveImageToFileSystem = async (uri) => {
    try {
      console.log('Image URI:', uri);
      const filename = uri.split('/').pop();
      const destinationPath = `file:///ReactNative_Social_ComLink/api/files/${filename}`;

      // Instead of moving the file, upload it directly to the server
      // await uploadImage(uri, filename); // Upload the image to the server

      console.log('Image saved to:', destinationPath);
      setImage(uri); // Set the image URI in state
    } catch (error) {
      console.error('Error saving image to file system:', error);
      // Handle the error here
    }
  };



  console.log("Taiid", userId)

  const handleSubmit = async () => {
    try {
      // Check if the title, image, and userId are not empty
      if (!title.trim()) {
        alert('Please enter a title');
        return;
      }
      if (!image) {
        alert('Please select an image');
        return;
      }
      if (!userId) {
        alert('User ID is missing');
        return;
      }

      const NewPost = {
        userId: userId,
        title: title,
        image: base64Image,
      }
      const response = await axios.post(`http://192.168.137.57:8000/upload/post`, NewPost);
      if (response.status == 200) {
        Alert.alert("Bài viết đã được thêm");
        console.log("new post success", response.data);
        setTitle('');
        setImage('');
      } else {
        console.log("error creating new post", response.data);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle the error here
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        onChangeText={text => setTitle(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6600' }]} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Thêm hình ảnh</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.fullImage} resizeMode="contain" />
        </View>
      )}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 50, }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đăng bài</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  imagePreviewContainer: {
    width: '100%',
    height: 300,
    borderColor: 'gray',
    overflow: 'hidden',
    marginTop: 20,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  submitButtonContainer: {
    marginBottom: 20,
    backgroundColor: '#40A578',
    marginTop: 20,
  },
  button: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default NewPostScreen;
