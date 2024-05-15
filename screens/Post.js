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

    fetchProducts();
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
  //Chưa load được ảnh chuyển từ  base64 to image để hiển thị - dòng 172
  //Chưa hiển thị được ảnh người dùng - dòng 154
  //Chưa thực hiện được chức năng like bài viết



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
                source={{uri: 'data:image/png;base64,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gPobwL09DoB7u8fABwQAAkAAAIAAEAAAIAAEAAAIAAEAAAJAAACAABAAACAABAAACAABAAACQAAAgAAQAAAgAAQAAAgAAQAAAkAAAIAAEAAAIAAEAAAIAAEAgAAQAAIAAAEgAABAAAgAABAAAgAABIAAAAABIAAAQAAIAAAQAAIAAASAAAAAASAAAEAACAAAEAACAAAEgAAAAAEgAABAAAgAABAAAgAABIAAAEAACAABAIAAEAAAIAAEAAAIAAEAAAJAAACAABAAACAABAAACAABAAACQAAAgAAQAAAgAAQAAAgAAQAAAkAAAIAAEAAAIAAEAAAIAAEAAAJAAAAgAASAAABAAAgAABAAAgAABIAAAAABIAAAQAAIAAAQAAIAAASAAAAAASAAAEAACAAAEAACAAAEgAAAAAEgAABAAAgAABAAAgAABIAAAAABIAAAEAACQAAAIAAEAAAIAAEAAAJAAACAABAAACAABAAACAABAAACQAAAgAAQAAAgAAQAAAgAAQAAAkAAAIAAEAAAIAAEAAAIAAEAAAJAAACAABAAACAABAAAAkAA+IAAQAAIAAAQAAIAAASAAAAAASAAAEAACAAAEAACAAAEgAAAAAEgAABAAAgAABAAAgAABIAAAAABIAAAQAAIAAAQAAIAAASAAAAAASAAABAAAkAAACAABAAACAABAAACQAAAgAAQAAAgAAQAAAgAAQAAAkAAAIAAEAAAIAAEAAAIAAEAAAJAAACAABAAACAABAAACAABAAACQAAAgAAQAAAIAAEgAAAQAAIAAASAAAAAASAAAEAACAAAEAACAAAEgAAAAAEgAABAAAgAABAAAgAABIAAAAABIAAAQAAIAAAQAAIAAASAAAAAASAAAEAACAAABIAAEAAACAABAAACQAAAgAAQAAAgAAQAAAgAAQAAAkAAAIAAEAAAIAAEAAAIAAEAAAJAAACAABAAACAABAAACAABAAACQAAAgAAQAAAgAAQAAAJAAAgAAASAAAAAASAAAEAACAAAEAACAAAEgAAAAAEgAABAAAgAABAAAgAABIAAAAABIAAAQAAIAAAQAAIAAASAAAAAASAAAEAACAAAEAACAAAEgAAAQAAIAB8QAAgAAQAAAkAAAIAAEAAAIAAEAAAIAAEAAAJAAACAABAAACAABAAACAABAAACQAAAgAAQAAAgAAQAAAgAAQAAAkAAAIAAEAAAIAAEAAACQAAIAAD6FgCX5u7rcQDc1z0GPiAA6FUAXJy7u8cBcHf3GPiAAKAfpoOoTafDuC0Pw4M9DICD7b3XYzAQAAD0xHgxmliI+fzb7y19DYC693oM6rEAgF6IPPRG83FmHoI39DgAbqjHIAQAAL0JgIVoBmfFR/IQvDoPwwM9DIADde/1GNRjAQC9CYDJqN1luWfyQDzco8P/cN7znu7eGwEAQK9Mh1H7bG5HHor7exQAL+Y9/yL36amvAACgdwGw9JUAwzwEb81DcW+PAuD5vOfv5b0PfAUAAL0MgMkg1uVheGUeint6FAB76p7bexcAAPTNaBzNJxfb5wFEHoq7exQAu+ue697rMQCAXomIJg/D2vrcnbnnenD4P9fda91z+xgAQO+MB1E7NXdFHoi7ehAAu+peu3v2AQBAP40WohnOx1wsxml5OG7N/WGGD/+6t611r3XPI1/+B0Cfdd8YaC73zTwgH5nhAHik7rG7V3/wAPRbvRRuLf9WfFYejLfnQfnqDB7+r9a91T0u3y8ACIDFo08I3NI9F2CWvkXwoe6etrRP/BMAAPD/xgvRjOdjff5N+brJ0gsDHZmBw/9I3UvdU93b2L/7A8AbDc+I5vy/aF8c6NzpMH6Uh+e+GQiAfXUvdU91b3WPAMCb1CvjbV6IU/LHC/LwvH+Vv0Tw3vYe8l66e/IHDABvpfuqgFNzX8wDdPsq/XbBdc3b6x66e/EHCwDvFADnLEXA2ukwrs2D9LFV9pUBr7bXnNde99Ddiz9YAHjHCBi13yOgGY9iQx6k1+R2rpKvDDiU1/poXXNd+/J9AADHYGFztPv7Jpo8TCsCrsrD9YHcSyv48H8hd19e69fqmuval+8DAHi3nw1Y+hT6x3NfyoP1rjxkn1mBh///5rX9LK/x87mP+ZQ/ALwP6hn0uQ/lPpOH608no3giD939K+Dg31/XUtdU19Zdoz8wAHi/AuBTk/Y1AuZiIRbzwL0+D9+Hc8/mXs4dPomH/uHufdb7friupb2mvLa6RgEAAO+jmI92o03tVwfUp9nPGw/imu5LBfed1Bf3yfdZ77uuoa6lrmn5+gCAE6T7NsJrYzE25GF8YR7CN+WP/3aCXzhob/s+lt7XhfW+6xp8W18AOMm65wY008X2nwW+PBnl4TyMO/KA3pb79+P8zMC+7m1sq7dZb7veR72v5fcLAHzQnxU4M5rB6bE2zo6NeVBfPl16nsDW3K9zO7sXFHp8uvQEwidzT3V7svu5x7tfs7P7PVvrbdTbqrdZb7veBwCwguQh3Yw2tt9RcC4P7TX5N/Q144iPxjAmsRhfyNXL8t6Y+37uh3m4/7xW/3f3czfWr2l/bf6e+r31Nupt1dust13vA5gN/wcBImtj0MPlMAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0xOVQwNjo0MjowNyswMDowMEflBRsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMTlUMDY6NDI6MDcrMDA6MDA2uL2nAAAAAElFTkSuQmCC'}}

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
