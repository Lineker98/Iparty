import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import {
  MapScreen,
  ProfileScreen,
  CreatePartyScreen,
  SearchScreen,
  MoreInfoScreen,
} from "./index";

import { background, darkBlue, pink } from "../styles/color";
import defaultStyle from "../styles/defaultStyle";

import userData from '../components/dados/userData';

const Tab = createBottomTabNavigator();

export default function tabNavigation() {
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {

    userData.get().then((snapshot) => {
      if (snapshot && snapshot.type == 'produtor') {
        setIsUser(false)
      }

    })
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="create"
      sceneContainerStyle={{ backgroundColor: background }}
      tabBarOptions={{
        style: { backgroundColor: '#121222' },
      }}
    >
      <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
      {(isUser ?
        <Tab.Screen
          name="search"
          component={SearchScreen}
          options={{
            title: () => null,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="ios-search"
                size={size}
                color={color}
                style={[defaultStyle.tabIcon, defaultStyle.shadow]}
              />
            ),
          }}
        />
        :
        <Tab.Screen
          name="create"
          component={CreatePartyScreen}
          options={{
            title: () => null,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="ios-add"
                size={size}
                color={color}
                style={[defaultStyle.tabIcon, defaultStyle.shadow]}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        initialParams={{
          user:null
        }}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="moreinfo"
        component={MoreInfoScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          title: () => null,
        }}
      />

      {/* <Tab.Screen
        name="edit"
        component={EditScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          title: () => null,
        }}
      /> */}
    </Tab.Navigator>
  );
}