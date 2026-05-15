import { View, Text, ImageBackground, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { APP_STYLE, SAFE_AREA_VIEW } from "../../styling/system";
import { AUTHENTICATION_STYLE } from "../../styling/screen";
import access_ease from "../../assets/images/custom_icon.png";
import CustomButton from "../../components/buttons/CustomButton";
import { APP_COLORS } from "../../styling/colors";
import BottomModal from "../../components/modals/BottomModal";
import Connection from "./Connection";
import Inscription from "./Inscription";
import UserContext from "../../config/contexts/user/User";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.1);
const SIZE_ICON = Math.ceil(Dimensions.get("window").width / 2.5);

export default function Authentication({ navigation, route }) {
  const [openConnection, setOpenConnection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openInscription, setOpenInscription] = useState(false);
  const { setIsAuthenticated, setAccount, account } = useContext(UserContext);

  useEffect(() => {
    if (account) {
      setIsAuthenticated(true);
    }
  }, [account]);

  const onConnection = (data) => {
    try {
      setIsLoading(true);
      setOpenConnection(false);
      setAccount(data);
    } catch (error) {}
  };
  return (
    <SafeAreaView
      style={[
        SAFE_AREA_VIEW.container,
        {
          // backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
        },
      ]}
      // edges={['right', 'left', 'top']}
    >
      <LinearGradient
        start={[0.1, 0.1]}
        end={[0.5, 0.9]}
        colors={[APP_COLORS.PRIMARY_COLOR.color, APP_COLORS.DARK_COLOR.color]}
        style={{ flex: 1 }}
      >
        {isLoading ? (
          <FullLoadingContainer text="Hortense & Didier" />
        ) : (
          <>
            <View style={AUTHENTICATION_STYLE.container}>
              <View
                style={[
                  AUTHENTICATION_STYLE.header,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <View
                  style={{
                    width: SIZE_ICON,
                    height: SIZE_ICON,
                  }}
                >
                  <ImageBackground
                    ImageBackground
                    source={access_ease}
                    style={[APP_STYLE.local_image_background]}
                    imageStyle={{ resizeMode: "cover" }}
                  />
                </View>
                
              </View>
              <View style={AUTHENTICATION_STYLE.bottom}>
                <Text style={{ textAlign: "center", fontSize: 9, color: "#F5F5F5" }}>
                  ©️ Humble Software Group{" "}
                </Text>
                <CustomButton
                  label="Sign in"
                  bgColor={APP_COLORS.PRIMARY_COLOR.color}
                  onClick={() => setOpenInscription(true)}
                  textColor={APP_COLORS.WHITE_COLOR.color}
                />
                <CustomButton
                  label="Login"
                  bgColor={APP_COLORS.WHITE_COLOR.color}
                  onClick={() => setOpenConnection(true)}
                  textColor={APP_COLORS.PRIMARY_COLOR.color}
                />
              </View>
            </View>
            <BottomModal
              showModal={openConnection}
              onClose={() => {
                setOpenConnection(false);
              }}
              content={
                <Connection
                  onClose={() => {
                    setOpenConnection(false);
                  }}
                  onConnected={onConnection}
                />
              }
              minHeight={MODAL_HEIGHT}
              backgroundColor="#F5F5F5"
              sliderBackgroundColor={APP_COLORS.PRIMARY_COLOR_DARK.color}
              overlay="rgba(129, 143, 180, 0.3)"
            />
            <BottomModal
              showModal={openInscription}
              onClose={() => {
                setOpenInscription(false);
              }}
              content={
                <Inscription
                  onClose={() => {
                    setOpenInscription(false);
                  }}
                  onSigned={onConnection}
                />
              }
              minHeight={MODAL_HEIGHT}
              backgroundColor="#F5F5F5"
              sliderBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
              overlay="rgba(129, 143, 180, 0.3)"
            />
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}
