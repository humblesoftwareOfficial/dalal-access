import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SAFE_AREA_VIEW } from "../../styling/system";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLORS } from "../../styling/colors";
import { SCREENS_NAME, truncateText } from "../../utils";

import UserContext from "../../config/contexts/user/User";
import { LinearGradient } from "expo-linear-gradient";
import { EVENT_STYLE } from "../../styling/event";
import { GUESTS_STYLE } from "../../styling/guests";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { GetEventInfos } from "../../config/api";
import { AntDesign } from "@expo/vector-icons";
import CustomTabBar from "../../components/customtabbar";

export default function Guests({ navigation, route }) {
  const [event, setEvent] = useState(null);
  const [guestsCount, setGuestsCount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { account } = useContext(UserContext);

  useEffect(() => {
    if (!route.params?.event) {
      navigation.goBack();
    } else {
      getEvent();
    }
  }, []);

  useEffect(() => {
    if (event) {
      setIsLoading(false);
    }
  }, [event]);

  const goToNewGuest = () => {
    try {
      navigation.navigate(SCREENS_NAME.NewGuest, {
        event,
      });
    } catch (error) {}
  };

  const goBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.log({ error });
    }
  };

  const getEvent = async () => {
    try {
      const code = route.params.event.code;
      const response = await GetEventInfos(code, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        setEvent(data);
      } else {
        Alert.alert("", `${message}`);
        navigation.goBack();
      }
    } catch (error) {
      console.log({ error });
      Alert.alert("", "Une erreur est survenue. Veuillez réssayer");
      navigation.goBack();
    }
  };

  const formatTabs = (guestCategories = []) => {
    const tabs = guestCategories.flatMap((i) => ({
      label: i,
      value: i
    }));
    tabs.push({
      label: 'Autres',
      value: ''
    });
    return tabs;
  }

  return (
    <SafeAreaView
      style={[
        SAFE_AREA_VIEW.container,
        {
          backgroundColor: "#FFF",
        },
      ]}
      edges={["right", "left", "top"]}
    >
      <LinearGradient
        start={[0.7, 0.5]}
        end={[1, 3]}
        colors={[
          "#FFF",
          APP_COLORS.YELLOW_COLOR.color,
          APP_COLORS.YELLOW_COLOR.color,
        ]}
        style={{ flex: 1 }}
      >
        {isLoading ? (
          <FullLoadingContainer
            backgroundColor="#FFF"
            colorIcon={APP_COLORS.PRIMARY_COLOR.color}
            backgroundLoaderContainer="#FFF"
            loaderColor={APP_COLORS.PRIMARY_COLOR.color}
          />
        ) : (
          <>
            <View style={EVENT_STYLE.header}>
              <View style={EVENT_STYLE.left_header}>
                <Text style={EVENT_STYLE.title}>
                  {truncateText(event.name)}
                </Text>
              </View>
              <View style={EVENT_STYLE.right_header}>
                <TouchableOpacity
                  style={[
                    GUESTS_STYLE.button,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  ]}
                  onPress={goToNewGuest}
                >
                  <AntDesign
                    name="adduser"
                    size={18}
                    color={APP_COLORS.PRIMARY_COLOR.color}
                  />
                  <Text style={{ color: APP_COLORS.PRIMARY_COLOR.color }}>
                    Nouvel invité
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              {/* <GuestsList
          navigation={navigation}
          onGotGuestLength={(value) => setGuestsCount(`${value}`)}
          account={account}
        /> */}
              <CustomTabBar
                onGotLength={(value) => setGuestsCount(`${value}`)}
                navigation={navigation}
                account={account}
                tabs={formatTabs(event.guestCategories || [])}
                eventCode={event.code}
              />
            </View>
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}
