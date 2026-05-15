import { Alert, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

import { SAFE_AREA_VIEW } from "../../styling/system";
import { APP_COLORS } from "../../styling/colors";
import BackButton from "../../components/buttons/BackButton";
import { GetAccess, GetEventInfos } from "../../config/api";
import UserContext from "../../config/contexts/user/User";
import {
  EEventTypeTraduction,
  SCREENS_NAME,
  getDayOfEvent,
  timing,
  truncateText,
} from "../../utils";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { EVENT_STYLE } from "../../styling/event";
import FronProfiles from "../../components/profiles/FronProfiles";
import { LinearGradient } from "expo-linear-gradient";
import BottomModal from "../../components/modals/BottomModal";
import Categories from "./Categories";
import CustomButton from "../../components/buttons/CustomButton";

const MIDDLE = Math.ceil(Dimensions.get("window").width / 3.5);
const MIDDLE_HEIGHT = Math.ceil(Dimensions.get("window").height / 2.5);
const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.1);

const EVENT_INFOS_TAGS = {
  DATE: "DATE",
  GUESTS: "GUESTS",
  CATEGORIES: "CATEGORIES",
};

export default function ListAccess({ navigation, route }) {
  const [event, setEvent] = useState(null);
  const [access, setAccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModalCategories, setOpenModalCategories] = useState(false);
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

  const getEvent = async () => {
    try {
      const code = route.params.event.code;
      const [response_event, response_access] = await Promise.all([
        GetEventInfos(code, account.access_token),
        GetAccess(
          {
            page: 1,
            limit: 10,
            events: [code],
          },
          account.access_token
        ),
      ]);
      const { success, data, message } = response_event.data;
      const { success: success_access, data: data_access } =
        response_access.data;
      if (success) {
        setAccess(data_access || { access: [], total: 0 });
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

  const goBack = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  const renderEventInfos = (
    title,
    description,
    value,
    isGuest = false,
    tag = ""
  ) => (
    <TouchableOpacity
      style={[
        EVENT_STYLE.card_infos,
        {
          // flex: 1,
        },
      ]}
      activeOpacity={0.5}
      onPress={() => onClickInfos(tag)}
    >
      <Text style={EVENT_STYLE.title_card_recap}>{title}</Text>
      <Text style={EVENT_STYLE.description_card_recap}>{description}</Text>
      <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
        <Text style={EVENT_STYLE.value_card_recap}>{value}</Text>
        {isGuest && <FronProfiles />}
      </View>
    </TouchableOpacity>
  );

  const onClickInfos = (tag) => {
    try {
      switch (tag) {
        case EVENT_INFOS_TAGS.CATEGORIES:
          setOpenModalCategories(true);
          break;
        case EVENT_INFOS_TAGS.DATE:
          break;
        case EVENT_INFOS_TAGS.GUESTS:
          navigation.navigate(SCREENS_NAME.Guests)
          break;
        default:
          break;
      }
    } catch (error) {
      console.log({ error })
    }
  };

  return (
    <SafeAreaView
      style={[
        SAFE_AREA_VIEW.container,
        {
          backgroundColor: APP_COLORS.WHITE_COLOR.color,
        },
      ]}
      edges={["right", "left", "top"]}
    >
      <LinearGradient
        start={[0.7, 0.5]}
        end={[1, 3]}
        colors={[
          APP_COLORS.WHITE_COLOR.color,
          APP_COLORS.YELLOW_COLOR.color,
          APP_COLORS.YELLOW_COLOR.color,
        ]}
        style={{ flex: 1 }}
      >
        {isLoading ? (
          <FullLoadingContainer
            backgroundColor={APP_COLORS.WHITE_COLOR.color}
            colorIcon={APP_COLORS.PRIMARY_COLOR.color}
            backgroundLoaderContainer={APP_COLORS.WHITE_COLOR.color}
            loaderColor={APP_COLORS.PRIMARY_COLOR.color}
          />
        ) : (
          <>
            <View style={EVENT_STYLE.header}>
              <View style={EVENT_STYLE.left_header}>
                <BackButton
                  onClick={goBack}
                  backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
                  iconColor={APP_COLORS.WHITE_COLOR.color}
                />
                <Text style={EVENT_STYLE.title}>
                  {truncateText(event.name)}
                </Text>
              </View>
              <View style={EVENT_STYLE.right_header}>
                <View style={EVENT_STYLE.type_container}>
                  <Text style={{ color: "black" }}>
                    {EEventTypeTraduction[event.type]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              {renderEventInfos(
                "Description",
                event.description || "Aucune description",
                ``,
                false,
                EVENT_INFOS_TAGS.CATEGORIES
              )}
              {renderEventInfos(
                "Date",
                "Il s'agit de la date prévue pour cet évènement.",
                getDayOfEvent(event.startDate),
                false,
                EVENT_INFOS_TAGS.DATE
              )}
              {renderEventInfos(
                "Invités",
                "Ajouter des invités à votre évènement et envoyer leur une invitation pour y accéder.",
                `${access?.total?.toString() || "N/A"}`,
                true,
                EVENT_INFOS_TAGS.GUESTS
              )}
              {renderEventInfos(
                "Groupes",
                "Définissez des groupes pour vos invités, pour faciliter l'organisation et la gestion des accés.",
                `${event?.guestCategories?.length?.toString() || "N/A"}`,
                false,
                EVENT_INFOS_TAGS.CATEGORIES
              )}
            </View>
            <View style={{ flex: 1, flexDirection: "column-reverse" }}>
              <CustomButton
                label="Annuler l'événement"
                bgColor={APP_COLORS.WHITE_COLOR.color}
                textColor={APP_COLORS.RED_COLOR.color}
                borderColor={APP_COLORS.RED_COLOR.color}
              />
            </View>
          </>
        )}
      </LinearGradient>
      <BottomModal
        showModal={openModalCategories}
        onClose={() => {
          setOpenModalCategories(false);
        }}
        content={
          <Categories
          data={event?.guestCategories}
            event={event}
            account={account}
            onClose={() => setOpenModalCategories(false)}
            onEventCreated={() => {
              getEvent();
              setOpenModalCategories(false);
            }}
            onCategoriesUpdated={(data) => {
              setIsLoading(true);
              setEvent(data);
              setOpenModalCategories(false)
              setIsLoading(false);
            }}
          />
        }
        minHeight={MODAL_HEIGHT}
        backgroundColor={APP_COLORS.WHITE_COLOR.color}
        sliderBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(129, 143, 180, 0.3)"
        paddingHorizontal={0}
      />
    </SafeAreaView>
  );
}