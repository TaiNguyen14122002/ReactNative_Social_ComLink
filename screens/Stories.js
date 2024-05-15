import React, { useContext } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import { UserType } from '../UserContext';

const Stories = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType)

  const storyInfo = [
    {
      id: 1,
      name: 'Tin của bạn',
      image: require('../src/storage/images/userProfile.png'),
    },
    {
      id: 0,
      name: 'awitht_',
      image: require('../src/storage/images/profile1.jpg'),
      
    },
    {
      id: 0,
      name: 'hieugiaycu.real',
      image: require('../src/storage/images/profile2.jpg'),
    },
    {
      id: 0,
      name: 'mersu.studio',
      image: require('../src/storage/images/profile3.jpg'),
    },
    ,
    {
      id: 0,
      name: 'roses_are_rosie',
      image: require('../src/storage/images/profile4.jpg'),
    },
    ,
    {
      id: 0,
      name: 'southvietnamscooterteam',
      image: require('../src/storage/images/profile5.jpg'),
    },
  ];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingVertical: 20}}>
      {storyInfo.map((data, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.push('Status', {
                name: data.name,
                image: data.image,
              })
            }>
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 5,
                position: 'relative',
              }}>
              {data.id == 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 10,
                    zIndex: 1,
                  }}>
                  <Entypo
                    name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: '#405de6',
                      backgroundColor: 'white',
                      borderRadius: 100,
                    }}
                  />
                </View>
              ) : null}
              <View
                style={{
                  width: 75,
                  height: 75,
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderRadius: 100,
                  borderColor: '#c13584',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={data.image}
                  style={{
                    resizeMode: 'cover',
                    width: '92%',
                    height: '92%',
                    borderRadius: 100,
                    backgroundColor: 'orange',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: 'black',
                  opacity: data.id == 0 ? 1 : 0.5,
                }}>
                {data.name.length > 10 ? `${data.name.substring(0, 13)}...` : data.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Stories;
