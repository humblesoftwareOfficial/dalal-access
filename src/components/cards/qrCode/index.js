import React, { useRef } from "react";
import { View, Text, Dimensions, ImageBackground } from "react-native";
import SvgQRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import { APP_COLORS } from "../../../styling/colors";
import CustomButton from "../../buttons/CustomButton";
import { GUEST_CARD_STYLE } from "../../../styling/guests";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { generateKey } from "../../../utils";
import { FONTS } from "../../../styling/polices";
import { APP_STYLE } from "../../../styling/system";
import flower from "../../../assets/images/flower__.png";

const QRCODE_SIZE = Math.ceil(Dimensions.get("window").width / 4);
const SIZE_ICON = Math.ceil(Dimensions.get("window").width / 5);

export default function QrCodeCard({ guest, eventColor = APP_COLORS.PRIMARY_COLOR.color }) {
  const qrRef = useRef();

  const captureQRCode = async () => {
    try {
      const uri = await captureRef(qrRef, {
        format: "jpg",
        quality: 1,
        result: "tmpfile",
        fileName: `Invitation: ${guest.firstName} ${guest.lastName
          }-${generateKey()}`,
      });
      return uri;
    } catch (error) {
      // console.error(error);
      console.log("reroo");
    }
  };

  const shareQRCode = async () => {
    try {
      const uri = await captureQRCode();
      if (uri) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: `Invitation: ${guest.firstName} ${guest.lastName}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderGuestInfos = () => (
    <>
      <Text
        style={[
          GUEST_CARD_STYLE.guest_name,
          {
            color: APP_COLORS.WHITE_COLOR.color,
          },
        ]}
      >{`Cher(e) ${guest?.firstName} ${guest?.lastName}`}</Text>
      {/* <Text
        style={[
          GUEST_CARD_STYLE.guest_phone,
          {
            color: APP_COLORS.WHITE_COLOR.color,
          },
        ]}
      >{`${guest?.phone}`}</Text> */}
    </>
  );

  const renderAppInfos = () => (
    <>
      <Text style={GUEST_CARD_STYLE.made_by}>
        {`Made with `}
        <AntDesign
          name="heart"
          size={11}
          color={APP_COLORS.YELLOW_COLOR.color}
        />
        {" by"}
      </Text>
      <Text
        style={GUEST_CARD_STYLE.developer_infos}
      >{` Humble Software Group`}</Text>
    </>
  );

  const renderFamilies = () => (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <Text style={GUEST_CARD_STYLE.families}>Familles</Text>
      <Text style={GUEST_CARD_STYLE.families}>Diop & Diallo</Text>
      <Text style={GUEST_CARD_STYLE.families}>Coly & Nunez</Text>
    </View>
  )

  const renderEventProprioInfos = () => (
    <Text
      style={[
        GUEST_CARD_STYLE.event_proprio_name,
        {
          color: APP_COLORS.SECONDARY_COLOR.color,
          fontFamily: FONTS.arizoniaRegular,
          fontSize: 36,
        },
      ]}
    >
      {"Hortense "}
      <Fontisto name="heart" size={24} color="#FF2AC2" />
      {" Didier "}
    </Text>
  );

  const renderInvitationText = (value = "", bold = false, color = APP_COLORS.WHITE_COLOR.color) => (
    <Text
      style={[
        GUEST_CARD_STYLE.event_invitation_text,
        {
          color,

          textAlign: "center",
          ...(bold ? {
            fontFamily: FONTS.belleAurore,
            // fontWeight: "bold"
          } : {
            fontFamily: FONTS.regular,
          })
        },
      ]}
    >
      {value}
    </Text>
  );

  const renderLeftImage = () => (
    <View style={{ position: "absolute", top: 5, left: 7 }}>
      <View
        style={{
          width: SIZE_ICON,
          height: SIZE_ICON,
        }}
      >
        <ImageBackground
          ImageBackground
          source={flower}
          style={[APP_STYLE.local_image_background]}
          imageStyle={{ resizeMode: "cover" }}
        />
      </View>
    </View>
  )

  const renderRightImage = () => (
    <View style={{ position: "absolute", top: 5, right: 7 }}>
      <View
        style={{
          width: SIZE_ICON,
          height: SIZE_ICON,
        }}
      >
        <ImageBackground
          ImageBackground
          source={flower}
          style={[APP_STYLE.local_image_background]}
          imageStyle={{ resizeMode: "cover" }}
        />
      </View>
    </View>
  )

  const renderBottomRightImage = () => (
    <View style={{ position: "absolute", bottom: 5, right: 7 }}>
      <View
        style={{
          width: SIZE_ICON,
          height: SIZE_ICON,
        }}
      >
        <ImageBackground
          ImageBackground
          source={flower}
          style={[APP_STYLE.local_image_background]}
          imageStyle={{ resizeMode: "cover" }}
        />
      </View>
    </View>
  )

  const renderBottomLeftImage = () => (
    <View style={{ position: "absolute", bottom: 5, left: 7 }}>
      <View
        style={{
          width: SIZE_ICON,
          height: SIZE_ICON,
        }}
      >
        <ImageBackground
          ImageBackground
          source={flower}
          style={[APP_STYLE.local_image_background]}
          imageStyle={{ resizeMode: "cover" }}
        />
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <View
        style={{ flex: 1, backgroundColor: eventColor, borderWidth: 2, borderColor: "#F5F5F5" }}
        ref={qrRef}
        collapsable={false}
      >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={{ marginTop: 10, alignItems: "center", marginBottom: 15 }}>
            {renderFamilies()}
            <View style={{ padding: 5, backgroundColor: "white", borderRadius: 50 }}>
              {renderEventProprioInfos()}
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              alignItems: "center",
              borderRadius: 5,
              zIndex: 99
            }}
          >
            {renderInvitationText("Deux cœurs à l'unisson pour chanter l'amour", true)}
            {renderInvitationText("Se diront le Oui qui les unis pour la vie")}
            {renderInvitationText("Le samedi 06 Janvier 2024")}
            {renderInvitationText("à l'Eglise Notre Dame des Anges de Ouakam à 11h.")}
            {renderInvitationText("À l'issue de la cérémonie religieuse,", false)}
            {renderInvitationText("ils seront heureux de vous compter parmi leurs invités pour un déjeuner qui sera partagé", false)}
            {renderInvitationText("À la maison de la culture Douta Seck", true)}
            {renderInvitationText("à partir de 13H.", true)}
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <SvgQRCode
                value="TEST-QRCODE"
                size={QRCODE_SIZE}
                color="#F5F5F5"
                backgroundColor={APP_COLORS.SECONDARY_COLOR.color}
                ecl="H"
              />
            </View>
          </View>
          {/* <View style={GUEST_CARD_STYLE.app_infos}>{renderAppInfos()}</View> */}
          <View style={{ position: "absolute", top: 95 }}>
            <Fontisto name="heart" size={150} color="rgba(255,255,255, 0.2)" />
          </View>
          <View style={{ position: "absolute", top: 110 }}>
            <Fontisto name="heart" size={75} color="rgba(255, 42, 194, 0.2)" />
          </View>

          {renderLeftImage()}
          {renderRightImage()}
          {renderBottomLeftImage()}
          {renderBottomRightImage()}

          {/* <View style={{ position: "absolute", bottom: 5, left: 5 }}>
            <MaterialCommunityIcons name="flower-poppy" size={75} color="#FF2AC2" />
          </View>

          <View style={{ position: "absolute", bottom: 5, right: 5 }}>
            <MaterialCommunityIcons name="flower-poppy" size={75} color="#F5F5F5" />
          </View> */}
        </View>
      </View>
      <CustomButton
        label="Partager"
        bgColor={APP_COLORS.SECONDARY_COLOR.color}
        onClick={() => shareQRCode()}
      />
    </View>
  );
}
