import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ActivityScreen from "./screens/ActivityScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ChatsScreen from "./screens/ChatsScreen";
import ChatMessagesScreen from "./screens/ChatMessagesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen"
import EditProfile from "./screens/EditProfile"
import { Ionicons, Ionic, Feather, SimpleLineIcons } from "@expo/vector-icons";


import CallScreen from "./screens/CallScreen";
import VideoChat from "./screens/VideoChat"
import RoomScreen from "./screens/RoomScreen";
import JoinScreen from "./screens/JoinScreen";

import NewPostScreen from "./screens/NewPostScreen"
import { focusProps } from "react-native-web/dist/cjs/modules/forwardedProps";







const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const bottomTabScreen = () => {
    return (
      <Tab.Navigator
        // screenOptions={({ route }) => ({
        //   tabBarHideOnKeyboard: true,
        //   tabBarShowLabel: false,
        //   headerShown: false,
        //   tabBarStyle: {
        //     height: 50,
        //   },
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          headerShown: true,
          tabBarStyle: {
            height: 50,
          },

        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Home', // Label cho tab
        })} />
        {/* <Tab.Screen name="Search" component={Search} /> */}
        <Tab.Screen name="Bài viết mới" component={NewPostScreen} options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'duplicate' : 'duplicate-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'NewPost', // Label cho tab
        })}/>
        {/* <Tab.Screen name="Reels" component={Reels} /> */}
        <Tab.Screen name="Trang cá nhân" component={ProfileScreen} options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Profile', // Label cho tab
        })}/>
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

        <Stack.Screen
          name="Gợi ý kết bạn"
          component={ActivityScreen}
          // options={{ headerShown: true }}
        />
        <Stack.Screen name="bottomTabScreen" component={bottomTabScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Lời mời kết bạn" component={FriendsScreen} />

        <Stack.Screen name="Nhắn tin" component={ChatsScreen} />

        <Stack.Screen name="Messages" component={ChatMessagesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="VideoChat" component={VideoChat} />

        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen name="RoomScreen" component={RoomScreen} />
        <Stack.Screen name="JoinScreen" component={JoinScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
