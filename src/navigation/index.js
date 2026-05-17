import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SCREENS_NAME } from "../utils";
import Home from "../screens/Home";
import Authentication from "../screens/authentification";
import UserContext from "../config/contexts/user/User";
import FullLoadingContainer from "../components/loaders/FullLoadingContainer";
import { GetItemToStorage } from "../config/local/local.database";

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

  useEffect(() => {
    if (account) {
      setIsLoading(false);
    }
  }, [account]);

  const getAccessToken = async () => {
    try {
      const access_token = await GetItemToStorage("_access_token");
      if (access_token) {
        const code = await GetItemToStorage("_code");
        const phone = await GetItemToStorage("_phone");
        const profile_picture = await GetItemToStorage("_pp");
        const profile_picture_key = await GetItemToStorage("_ppkey");
        const firstName = await GetItemToStorage("_firstName");
        const lastName = await GetItemToStorage("_lastName");
        const accountType = await GetItemToStorage("_account_type");
        const address = await GetItemToStorage("_address");
        const company_code = await GetItemToStorage(
          "_company_code"
        );
        const company_name = await GetItemToStorage(
          "_company_name"
        );

        const company_description = await GetItemToStorage(
          "_company_description"
        );

        const house_code = await GetItemToStorage(
          "_house_code"
        );
        const house_name = await GetItemToStorage(
          "_house_name"
        );
        const house_description = await GetItemToStorage(
          "_house_description"
        );
        const house_medias_raw = await GetItemToStorage("_house_medias");
        const house_medias = house_medias_raw ? JSON.parse(house_medias_raw) : [];
        setAccount({
          firstName,
          lastName,
          profile_picture,
          profile_picture_key,
          access_token,
          phone,
          code,
          accountType,
          address,
          company: {
            code: company_code,
            name: company_name,
            description: company_description,
          },
          house: {
            code: house_code,
            name: house_name,
            description: house_description,
            medias: house_medias,
          },
          isAuthenticated: true,
        });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  return (
    <NavigationContainer theme={navTheme}>
      {isLoading ? (
        <FullLoadingContainer text="Dalal access" />
      ) : (
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name={SCREENS_NAME.Home}
                component={Home}
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
