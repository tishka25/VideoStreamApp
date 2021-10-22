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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Screens(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Home"
        component={(props: any)=> <Home {...props} />}
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
      tabBarOptions={{
        activeTintColor: "#987bf3",
        inactiveTintColor: "#dedede",
        style: { backgroundColor: "#151415", padding: 4 }
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
    <NavigationContainer>
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
