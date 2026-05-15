import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { SAFE_AREA_VIEW } from "../../styling/system";
import { GUESTS_STYLE } from "../../styling/guests";
import CustomSearchInput from "../../components/inputs/CustomSearchInput";
import ContactsList from "../../components/lists/ContactsList";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { APP_COLORS } from "../../styling/colors";
import BottomModal from "../../components/modals/BottomModal";
import NewContact from "./NewContact";
import UserContext from "../../config/contexts/user/User";
import { EEventAccessType, generateKey, isFieldWithValue } from "../../utils";
import { NewGuestsForEvent } from "../../config/api";
import CustomButton from "../../components/buttons/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../../components/buttons/BackButton";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.08);

export default function NewGuest({ navigation, route }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfos, setOpenModalInfos] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [event, setEvent] = useState(null);

  const { account } = useContext(UserContext);

  useEffect(() => {
    if (route.params?.event) {
      setEvent(route.params?.event);
    } else {
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    if (event) {
      setIsLoading(false);
    }
  }, [event]);

  useEffect(() => {
    if (selectedContacts.length) {
      if (event?.guestCategories?.length) {
        setOpenModalInfos(true);
      } else {
        onAddNewGuest("");
      }
    } else {
      setOpenModalInfos(false);
    }
  }, [selectedContacts]);

  const onAddNewGuest = async (info) => {
    try {
      setIsLoading(true);
      setOpenModal(false);
      setOpenModalInfos(false);
      const formattedContacts = selectedContacts.flatMap((c) => ({
        firstName: c.firstName || c.name,
        ...(isFieldWithValue(c.lastName) && {
          lastName: c.lastName,
        }),
        type: selectedType || EEventAccessType.UNIQUE,
        phone: isFieldWithValue(c.phone)
          ? c.phone
          : c.phoneNumbers?.length
          ? c.phoneNumbers[0].number
          : undefined,
        info: info,
      }));
      const payload = {
        user: account.code,
        event: event.code,
        guests: formattedContacts,
      };
      const response = await NewGuestsForEvent(payload, account.access_token);
      const { success, data } = response.data;
      if (success) {
        navigation.goBack();
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const onGuestsAdded = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  const onConfirmSelection = (contacts, type = null) => {
    try {
      setOpenModal(false);
      setSelectedType(type);
      setSelectedContacts([...contacts]);
    } catch (error) {
      console.log({ error });
    }
  };

  const renderGuestCategories = () =>
    event?.guestCategories?.map((category, _) => (
      <CustomButton
        label={category}
        bgColor="white"
        textColor={APP_COLORS.PRIMARY_COLOR.color}
        onClick={() => onAddNewGuest(category)}
        key={generateKey()}
        borderColor="#F0F0F0"
        borderWidth={1}
      />
    ));

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
            <View style={GUESTS_STYLE.header}>
              <CustomSearchInput
                extraButtonLeft={
                  <BackButton
                    onClick={() => navigation.goBack()}
                    backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
                    iconColor={APP_COLORS.WHITE_COLOR.color}
                  />
                }
                extraButtonRight={
                  <TouchableOpacity
                    style={[
                      GUESTS_STYLE.button,
                      {
                        marginLeft: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                    onPress={() => setOpenModal(true)}
                  >
                    <Feather
                      name="user-plus"
                      size={20}
                      color={APP_COLORS.PRIMARY_COLOR.color}
                    />
                  </TouchableOpacity>
                }
                onFocusChange={(value) => null}
                editable
                onValidSearch={(value) => setSearchTerm(value)}
                defaultValue={searchTerm}
                backgroundColor="white"
              />
            </View>
            <ContactsList
              searchTerm={searchTerm}
              onAddNewGuest={onConfirmSelection}
            />
          </>
        )}
        <BottomModal
          onClose={() => setOpenModal(false)}
          content={<NewContact onAddGuest={onConfirmSelection} />}
          showModal={openModal}
          backgroundColor="#F5F5F5"
          sliderBackgroundColor="transparent"
          borderWidth={2}
          minHeight={MODAL_HEIGHT}
          overlay="rgba(0, 0, 0, 0.7)"
        />
        <BottomModal
          onClose={() => setOpenModalInfos(false)}
          content={
            <View style={{ flex: 1, backgroundColor: APP_COLORS.WHITE_COLOR.color }}>
              {renderGuestCategories()}
            </View>
          }
          showModal={openModalInfos}
          backgroundColor={APP_COLORS.WHITE_COLOR.color}
          sliderBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
          borderWidth={2}
          minHeight={MODAL_HEIGHT}
          overlay="rgba(0, 0, 0, 0.7)"
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
