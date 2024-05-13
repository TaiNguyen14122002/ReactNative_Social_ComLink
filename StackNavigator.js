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
import VoiceCallScreen from "./screens/VoiceCallScreen";


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const bottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 50,
          },

          tabBarIcon: ({ focused, size, colour }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
              size = focused ? size + 8 : size + 2;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search-sharp' : 'search';
            } else if (route.name === 'Activity') {
              iconName = focused
                ? 'heart'
                : 'heart-outline';
            } else if (route.name === 'Reels') {
              iconName = focused ? 'caret-forward-circle' : 'caret-forward-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'NewPost') {
              iconName = focused ? 'duplicate' : 'duplicate-outline';
            }

            return <Ionic name={iconName} size={size} color={colour} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="NewPost" component={NewPost} />
        <Tab.Screen name="Reels" component={Reels} />
        <Tab.Screen name="Profile" component={Profile} />
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
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen
          name="ActivityScreen"
          component={ActivityScreen}
          options={{
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons name="md-arrow-undo" size={24} color="black" />{/* Thay 'plus' bằng tên icon bạn muốn sử dụng */}
              </View>
            ),
          }}
        />
        
        <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} />

        <Stack.Screen name="Lời mời kết bạn" component={FriendsScreen} />

        <Stack.Screen name="Nhắn tin" component={ChatsScreen} />

        <Stack.Screen name="Messages" component={ChatMessagesScreen} options={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Ionicons name="md-arrow-undo" size={24} color="black" />{/* Thay 'plus' bằng tên icon bạn muốn sử dụng */}
            </View>
          ),
        }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
