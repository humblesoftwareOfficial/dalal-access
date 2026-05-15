import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SCREENS_NAME } from "../utils";
import Home from "../screens/Home";
import Guests from "../screens/guests";
import { default as EventAccess } from "../screens/access";
import NewGuest from "../screens/guests/NewGuest";
import Authentication from "../screens/authentification";
import UserContext from "../config/contexts/user/User";
import FullLoadingContainer from "../components/loaders/FullLoadingContainer";
import { GetItemToStorage } from "../config/local/local.database";
import { GetUserInfos } from "../config/api";
import GuestInfos from "../screens/guests/GuestInfos";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F5F5F5",
  },
};
const Stack = createStackNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const { account, setAccount, isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated) setIsLoading(false);
  }, [isAuthenticated]);

  const getAccessToken = async () => {
    const access_token = await GetItemToStorage("access_token");
    const code = await GetItemToStorage("code");
    const email = await GetItemToStorage("email");
    const firstName = await GetItemToStorage("firstName");
    const lastName = await GetItemToStorage("lastName");
    try {
      if (access_token) {
        const response = await GetUserInfos(code, access_token);
        const { success, data } = response.data;
        if (success) {
          setAccount({
            ...data,
            access_token,
          });
          setIsAuthenticated(true);
        } else {
          // setAccount({
          //   firstName,
          //   lastName,
          //   email,
          //   code,
          //   access_token,
          // });
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      // if (access_token) {
      //   console.log('Error after got access token');
      //   setAccount({
      //     firstName,
      //     lastName,
      //     email,
      //     code,
      //     access_token,
      //   });
      //   setIsAuthenticated(true);
      // }
      setIsLoading(false);
      console.log({error});
    }
  }

  return (
    <NavigationContainer theme={navTheme}>
      {isLoading ? (
        <FullLoadingContainer text="Hortense & Didier" />
      ) : (
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name={SCREENS_NAME.Home}
                component={Home}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
                name={SCREENS_NAME.Guests}
                component={Guests}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name={SCREENS_NAME.EventAccess}
                component={EventAccess}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.NewGuest}
                component={NewGuest}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.GuestInfos}
                component={GuestInfos}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name={SCREENS_NAME.Authentication}
              component={Authentication}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      )}

    </NavigationContainer>
  );
}
