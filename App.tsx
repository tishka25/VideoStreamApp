import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { LogBox, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import Orientation from 'react-native-orientation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/screens/home';
import Profile from './src/screens/profile';
import Player from './src/screens/player';
import { RootStackParamList, RootTabParamList } from './src/types';
import { navigationRef } from './src/rootNavigation';
import Login from './src/screens/login';
import Launcher from './src/screens/launcher';
import LiveChannelDetailView from './src/screens/LiveChannelDetailView';
import RecordingsForChannel, { defaultScreenOptions } from './src/screens/RecordingsForChannel';
import Recordings from './src/screens/Recordings';
import CloseIcon from './src/components/CloseIcon';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();



function Screens(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="Launcher"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      <Stack.Screen 
        name="Launcher"
        component={Launcher}
      />
      <Stack.Screen 
        name="Login"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        component={Login}
      />
      <Stack.Screen
        name="HomeTabs"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        component={Tabs}
      />
      <Stack.Screen
        name="Player"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        component={Player}
      />
      <Stack.Screen
        name="LiveChannelDetailView"
        options={{
          headerShown: true,
          // headerShadowVisible: false,
          gestureEnabled: true,
          gestureDirection: "vertical",
          presentation: "transparentModal",
          cardStyle: { backgroundColor: 'transparent' },
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerBackTitleVisible: false,
          headerBackImage: CloseIcon,
          headerTintColor: "#7A00EE",
          title: "",
          cardStyleInterpolator: Platform.OS === 'ios' ? 
          CardStyleInterpolators.forVerticalIOS  : CardStyleInterpolators.forBottomSheetAndroid,
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          // headerMode: "screen"
        }}
        component={LiveChannelDetailView}
      />
      <Stack.Screen
        name="RecordingsForChannel"
        options={{...defaultScreenOptions}}
        component={RecordingsForChannel}
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
          tabBarStyle: { backgroundColor: "#151415", padding: 8 },
          headerShown: false,
          tabBarShowLabel: false,
        }}
    >
      <Tab.Screen
        name="Main"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Recordings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="recording-outline" color={color} size={size} />
          ),
        }}
        component={Recordings}
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

  Orientation.lockToPortrait();
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs(true);


  return (
    <NavigationContainer ref={navigationRef}>
      {/* <Tabs></Tabs> */}
      <Screens/>
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
