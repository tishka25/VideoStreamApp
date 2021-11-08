import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Orientation from 'react-native-orientation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/screens/home';
import Profile from './src/screens/profile';
import Player from './src/screens/player';
import { RootStackParamList, RootTabParamList } from './src/types';
import { navigationRef } from './src/rootNavigation';
import Login from './src/screens/login';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();



function Screens(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={(props: any)=> <Home {...props} />}
      />
      <Stack.Screen 
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Player"
        component={(props: any)=> <Player {...props} />}
      />
    </Stack.Navigator>
  )
}

function Tabs() {

  const [tabBarVisible, setTabBarVisible] = useState(true);
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
          tabBarActiveTintColor: '#987bf3',
          tabBarInactiveTintColor: '#dedede',
          tabBarStyle: { backgroundColor: "#151415", padding: 4 },
          headerShown: false
        }}
    >
      <Tab.Screen
        name="Main"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        component={(props)=> <Screens {...props} setTabBarVisible={setTabBarVisible}/>}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default function App() {

  Orientation.lockToPortrait()

  return (
    <NavigationContainer ref={navigationRef}>
      <Tabs></Tabs>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
