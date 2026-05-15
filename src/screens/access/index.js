import { Feather, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import React from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { Platform } from "react-native";

import { APP_COLORS } from "../../styling/colors";
import { SCREENS_NAME, VIEWS_NAME } from "../../utils";
import ListAccess from "./ListAccess";
import Scanner from "./Scanner";
import Guests from "../guests";
import { he } from "react-native-paper-dates";

const Tabs = AnimatedTabBarNavigator();

export default ({ navigation, route }) => {
  return (
    <Tabs.Navigator
      initialRouteName={VIEWS_NAME.EventInfos}
      tabBarOptions={{
        activeBackgroundColor: APP_COLORS.PRIMARY_COLOR.color,
        activeTintColor: APP_COLORS.YELLOW_COLOR.color,
        inactiveTintColor: APP_COLORS.WHITE_COLOR.color,
        showLabel: true,
        tabStyle: {
          backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
          borderColor: APP_COLORS.TERTIARY_COLOR.color,
          elevation: 1,
          paddingTop: 7
        },
        style: {
          position: "absolute",
        },
        tabBarHideOnKeyboard: true,
      }}
      screenOptions={{
        
      }}
      appearance={{
        topPadding: 7,
        horizontalPadding: 10,
        whenInactiveShow: "icon-only",
        // bottomPadding:
        //   Platform.OS === "ios" && Number(Platform.Version) >= 17 ? 5 : 0,
      }}
    >
      <Tabs.Screen
        name={VIEWS_NAME.EventInfos}
        component={ListAccess}
        options={{
          tabBarLabel: "Infos.",
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons
              name="home"
              size={size}
              color={focused ? color : APP_COLORS.WHITE_COLOR.color}
            />
          ),
        }}
        initialParams={route.params}
      />
      <Tabs.Screen
        name={SCREENS_NAME.Guests}
        component={Guests}
        options={{
          tabBarLabel: "Invités",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="users"
              size={size}
              color={focused ? color : APP_COLORS.WHITE_COLOR.color}
            />
          ),
        }}
        initialParams={route.params}
      />
      <Tabs.Screen
        name={VIEWS_NAME.Scanner}
        component={Scanner}
        options={{
          tabBarLabel: "Accés",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="qr-code-scanner"
              size={size - 3}
              color={focused ? color : APP_COLORS.WHITE_COLOR.color}
            />
          ),
        }}
        initialParams={route.params}
      />
    </Tabs.Navigator>
  );
};
