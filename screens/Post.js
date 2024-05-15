import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Post = () => {
  const { UserId, setUserId } = useContext(UserType)
  const [Post, setPost] = useState([]);
  const navigation = useNavigation();
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.28:8000/Products');
        const products = response.data;
        setPost(products);
        // setImage(response.data.user.image);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    const intervalId = setInterval(fetchProducts, 5000); // Cập nhật dữ liệu mỗi 5 giây

    return () => clearInterval(intervalId);
  }, []);
  // console.log("Tai", image)

  //Cập nhập số lượng lượt like
  const handleUpdate = async () => {
    try {
      const UpdateLike = {
        UseId: UserId,
      }
      const response = await axios.put(`http://192.168.1.28:8000/posts/${postId}`, UpdateLike);

      if (response.status === 200) {
        Alert.alert('Thông báo', 'Bài viết đã được cập nhật thành công');
      } else {
        Alert.alert('Lỗi', 'Lỗi khi cập nhật bài viết');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      Alert.alert('Lỗi', 'Lỗi khi gửi yêu cầu');
    }
  };

  const postInfo = [
    {
      postTitle: 'tai_ngn.02',
      postPersonImage: require('../src/storage/images/userProfile.png'),
      postImage: require('../src/storage/images/post1.jpg'),
      info: "Một đôi giày quốc dân cân mọi loại outfit dân chơi nhất định phải có 1 đôi trong tủ nhé cả nhà",
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'awitht_',
      postPersonImage: require('../src/storage/images/profile1.jpg'),
      postImage: require('../src/storage/images/post2.jpg'),
      info: "Một đôi giày quốc dân cân mọi loại outfit dân chơi nhất định phải có 1 đôi trong tủ nhé cả nhà",

      likes: 345,
      isLiked: false,
    },
    {
      postTitle: 'roses_are_rose',
      postPersonImage: require('../src/storage/images/profile4.jpg'),
      postImage: require('../src/storage/images/post3.jpg'),
      info: "Một đôi giày quốc dân cân mọi loại outfit dân chơi nhất định phải có 1 đôi trong tủ nhé cả nhà",

      likes: 734,
      isLiked: false,
    },
    {
      postTitle: 'roses_are_rose',
      postPersonImage: require('../src/storage/images/profile4.jpg'),
      postImage: require('../src/storage/images/post4.jpg'),
      info: "Một đôi giày quốc dân cân mọi loại outfit dân chơi nhất định phải có 1 đôi trong tủ nhé cả nhà",

      likes: 875,
      isLiked: false,
    },
  ];


  //Đã console.log ra dữ liệu của Post
  //Chưa load được ảnh chuyển từ  base64 to image để hiển thị (Đã xong load ảnh)
  //Chưa hiển thị được ảnh người dùng - dòng 154
  //Chưa thực hiện được chức năng like bài viết
  //Chưa thực hiện được chức năng bình luận



  const [imageUri, setImageUri] = useState(null);
  const [base64Input, setBase64Input] = useState('');

  // const handleConvertBase64ToImage = async () => {
  //   try {
  //     const fileUri = await saveBase64Image(base64Input, 'image.jpg');
  //     setImageUri(fileUri);
  //   } catch (error) {
  //     console.log('Error converting base64 to image:', error);
  //   }
  // };

  // const saveBase64Image = async (base64String, fileName) => {
  //   try {
  //     const fileUri = FileSystem.cacheDirectory + fileName;
  //     await FileSystem.writeAsStringAsync(fileUri, base64String, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     return fileUri;
  //     setImageUri(fileUri);
  //   } catch (error) {
  //     console.log('Error saving base64 image:', error);
  //     throw error;
  //   }
  // };
  

  const [like, setLike] = useState(false);
  return (
    <View>
      {Post.map((data, index) => {
        // const [like, setLike] = useState(false);
        // const [like, setLike] = useState("");
        const totalLikes = Post.reduce((total, post) => total + post.liekpost, 0);
        console.log("NVT", totalLikes);
        console.log("Tai", data.user.image);
        console.log("image", data.image)
        // setBase64Input(data.image);

      //   function getImageUri(imageData) {
      //     let mimeType;
      //     if (imageData.startsWith("data:image/jpeg")) {
      //         mimeType = "image/jpeg";
      //     } else if (imageData.startsWith("data:image/png")) {
      //         mimeType = "image/png";
      //     } else if (imageData.startsWith("data:image/gif")) {
      //         mimeType = "image/gif";
      //     } else if (imageData.startsWith("data:image/bmp")) {
      //         mimeType = "image/bmp";
      //     } else if (imageData.startsWith("data:image/webp")) {
      //         mimeType = "image/webp";
      //     }
      //     return `data:${mimeType};base64,${imageData}`;
      // }
        
        return (
          <View
            key={index}
            style={{
              paddingBottom: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={data.user.image}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {data.user.name}
                  </Text>
                </View>
              </View>
              <Feather name="more-vertical" style={{ fontSize: 20 }} />
            </View>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: `${data.image}`}}

                style={{ width: '100%', height: 400 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setLike(!like)}>
                  {/* <TouchableOpacity onPress={handleUpdate}> */}
                  <AntDesign
                    name={like ? 'heart' : 'hearto'}
                    style={{
                      paddingRight: 10,
                      fontSize: 20,
                      color: like ? 'red' : 'black',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionic
                    name="chatbubbles-outline"

                    style={{ fontSize: 20, paddingRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="navigation" style={{ fontSize: 20 }} />
                </TouchableOpacity>
              </View>
              <Feather name="bookmark" style={{ fontSize: 20 }} />
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{
                fontWeight: '700',
                fontSize: 14,
                paddingVertical: 2,

              }}>
                {totalLikes ? totalLikes + 1 : totalLikes} luợt thích
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  paddingVertical: 2,
                }}>
                {data.user.name + " "}
                <Text style={{ fontWeight: 400 }}>
                  {data.posttitle}
                </Text>


              </Text>
              <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                Xem tất cả bình luận
              </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    // source={data.postPersonImage}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      backgroundColor: 'orange',
                      marginRight: 10,
                    }}
                  />
                  <TextInput
                    placeholder="Thêm bình luận... "
                    style={{ opacity: 0.5 }}
                  />
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Entypo
                    name="emoji-happy"
                    style={{ fontSize: 15, color: 'lightgreen', marginRight: 10 }}
                  />
                  <Entypo
                    name="emoji-neutral"
                    style={{ fontSize: 15, color: 'pink', marginRight: 10 }}
                  />
                  <Entypo
                    name="emoji-sad"
                    style={{ fontSize: 15, color: 'red' }}
                  />
                </View> */}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Post;
