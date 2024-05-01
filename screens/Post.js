import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Post = () => {
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

  return (
    <View>
      {postInfo.map((data, index) => {
        const [like, setLike] = useState(data.isLiked);
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
                  source={data.postPersonImage}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {data.postTitle}
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
                source={data.postImage}
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
                    
                    style={{ fontSize: 20, paddingRight: 10}}
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
                {like ? data.likes + 1 : data.likes} luợt thích
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  paddingVertical: 2,
                }}>
                {data.postTitle + " "}
                <Text style={{fontWeight: 400}}>
                  {data.info}
                </Text>


              </Text>
              <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                Xem tất cả bình luận
              </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={data.postPersonImage}
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
