import {
  View,
  Text,
  ImageBackground,
  Linking,
  Dimensions,
  Alert,
  Share,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import * as Sharing from "expo-sharing";

import { APP_STYLE, SAFE_AREA_VIEW } from "../../styling/system";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import webflower from "../../assets/images/webflower_.png";
import { GetAccessInfos, UpdateAccess } from "../../config/api";
import DefaultInput from "../../components/inputs/DefaultInput";
import { TouchableOpacity } from "react-native";
import { GUESTS_STYLE } from "../../styling/guests";
import { FONTS } from "../../styling/polices";
import { APP_COLORS } from "../../styling/colors";
import CustomButton from "../../components/buttons/CustomButton";
import UserContext from "../../config/contexts/user/User";
import BottomModal from "../../components/modals/BottomModal";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../../components/buttons/BackButton";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 3);

export default function GuestInfos({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [guest, setGuest] = useState(null);
  const [hidePicture, setHidePicture] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { account } = useContext(UserContext);

  useEffect(() => {
    if (!route.params.guest) {
      onGoBack();
    } else {
      // setGuest(route.params.guest);
      getAccessDetails();
    }
  }, []);

  useEffect(() => {
    if (guest) {
      setFirstName(`${guest.user.firstName || ""}`);
      setLastName(`${guest.user.lastName || ""}`);
      setPhone(guest.user.phone);
      setIsLoading(false);
    }
  }, [guest]);

  const onGoBack = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  const getAccessDetails = async () => {
    try {
      const response = await GetAccessInfos(route.params.guest.code);
      const { success, data } = response.data;
      console.log({ data });
      if (!success) {
        onGoBack();
      } else {
        setGuest(data);
      }
    } catch (error) {
      console.log({ error });
      setGuest(route.params.guest);
    }
  };

  const onFocus = () => setHidePicture(true);
  const onBlur = () => setHidePicture(false);

  const onUpdate = async () => {
    try {
      setIsLoading(true);
      // if (guest.user.phone === phone && guest.user.firstName === firstName) {
      //   setIsLoading(false);
      //   onBlur();
      // } else {
      // }
      const payload = {
        user: account.code,
        firstName,
        lastName,
        phone: phone || guest.user.phone,
      };
      const response = await UpdateAccess(
        guest.code,
        account.access_token,
        payload
      );
      const { success, data } = response.data;
      if (success) {
        setGuest(data);
        onBlur();
      }
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const onRemoveGuest = async (value) => {
    try {
      setIsLoading(true);
      const payload = {
        user: account.code,
        isDeleted: value,
      };
      const response = await UpdateAccess(
        guest.code,
        account.access_token,
        payload
      );
      const { success, data } = response.data;
      if (success) {
        setGuest(data);
      }
      console.log({ data });

      // onGoBack();
      onBlur();
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const onSendToWhatsapp = () => {
    if (guest.user.phone) {
      sendToWhatsapp();
    } else {
      Alert.alert(
        "",
        "Ajouter un numéro de téléphone pour envoyer wers whatsapp"
      );
    }
  };

  const sendToWhatsapp = () => {
    try {
      Linking.openURL(
        "whatsapp://send?text=" +
          getInvitationMessage() +
          "&phone=" +
          guest.user.phone
      );
    } catch (error) {
      console.log({ error });
      try {
        Linking.openURL(
          "http://api.whatsapp.com/send?phone=" + guest.user.phone
        );
      } catch (error) {}
      console.log({ error });
    }
  };

  const shareInvitation = async () => {
    try {
      const result = await Share.share({
        message: getInvitationMessage(),
        title: `Invitation ${guest.event.name}`,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getInvitationMessage = () =>
    `Bonjour ${guest.user.firstName} ${
      guest.user.lastName || ""
    }.\n\nVous êtes invités à: \n *${
      guest.event.description
    }*.\n\nCliquez sur ce lien pour avoir votre carte et le QR code pour l'accès à la salle.\n\nhttps://hortense-didier.onrender.com/${
      guest.code
    }`;

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
          APP_COLORS.PRIMARY_COLOR.color,
          APP_COLORS.PRIMARY_COLOR.color,
        ]}
        style={{ flex: 1 }}
      >
        <View style={GUESTS_STYLE.header}>
          <View style={{}}>
            <BackButton
              onClick={onGoBack}
              backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
              iconColor={APP_COLORS.WHITE_COLOR.color}
            />
          </View>
          <View
            style={[
              GUESTS_STYLE.header_section,
              {
                flexDirection: "row-reverse",
              },
            ]}
          >
            <TouchableOpacity
              style={[
                GUESTS_STYLE.button,
                {
                  marginRight: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  // backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
                  padding: 7,
                  borderRadius: 50,
                },
              ]}
              onPress={shareInvitation}
            >
              <AntDesign
                name="sharealt"
                size={22}
                color={APP_COLORS.PRIMARY_COLOR.color}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                GUESTS_STYLE.button,
                {
                  marginRight: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  // backgroundColor: "#08AB45",
                  padding: 7,
                  borderRadius: 50,
                },
              ]}
              onPress={() => onSendToWhatsapp()}
            >
              <Ionicons name="logo-whatsapp" size={24} color="#08AB45" />
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <FullLoadingContainer
            backgroundColor={APP_COLORS.WHITE_COLOR.color}
            colorIcon={APP_COLORS.PRIMARY_COLOR.color}
            backgroundLoaderContainer={APP_COLORS.WHITE_COLOR.color}
            loaderColor={APP_COLORS.PRIMARY_COLOR.color}
          />
        ) : (
          <>
            {/* {!hidePicture && (
              <View style={{ flex: 1 }}>
                <ImageBackground
                  ImageBackground
                  source={webflower}
                  style={[APP_STYLE.local_image_background]}
                  imageStyle={{ resizeMode: "contain" }}
                />
              </View>
            )} */}
            <View style={{ flex: 2, marginTop: 15 }}>
              <DefaultInput
                placeholder="Prénom"
                numberOfLines={4}
                onValueChange={(value) => setFirstName(value)}
                value={firstName}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <DefaultInput
                placeholder="Nom"
                numberOfLines={4}
                onValueChange={(value) => setLastName(value)}
                value={lastName}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <DefaultInput
                placeholder="Téléphone"
                numberOfLines={4}
                onValueChange={(value) => setPhone(value)}
                value={phone}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {hidePicture ? (
                <CustomButton
                  label="Enregistrer"
                  bgColor={APP_COLORS.SECONDARY_COLOR.color}
                  onClick={onUpdate}
                />
              ) : (
                <>
                  {guest?.isDeleted ? (
                    <CustomButton
                      label="Réintégrer à la liste des invités"
                      bgColor={APP_COLORS.PRIMARY_COLOR.color}
                      onClick={() => onRemoveGuest(false)}
                    />
                  ) : (
                    <CustomButton
                      label="Retirer de la liste des invités"
                      bgColor={APP_COLORS.RED_COLOR.color}
                      onClick={() => onRemoveGuest(true)}
                    />
                  )}
                </>
              )}
            </View>
          </>
        )}
        <BottomModal
          onClose={() => setOpenModal(false)}
          content={
            <View
              style={{
                flex: 1,
                flexDirection: "column-reverse",
                marginBottom: 15,
              }}
            ></View>
          }
          showModal={openModal}
          backgroundColor="white"
          sliderBackgroundColor="transparent"
          borderWidth={2}
          minHeight={MODAL_HEIGHT}
          overlay="rgba(0, 0, 0, 0.7)"
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
