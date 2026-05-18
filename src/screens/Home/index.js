import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, Text, Platform, Dimensions, Modal } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import HouseImageBackground from "../../components/medias/HouseImageBackground";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SAFE_AREA_VIEW } from "../../styling/system";
import { APP_COLORS } from "../../styling/colors";
import UserContext from "../../config/contexts/user/User";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";

import CustomButton from "../../components/buttons/CustomButton";
import HomeHeader from "../../components/headers/HomeHeader";
import Scanner from "./Scanner";
import DetailsReservation from "./DetailsReservation";
import ReservationReport from "./ReservationReport";
import { GetReservationInfos } from "../../config/api";
import BottomModal from "../../components/modals/BottomModal";
import ReservationsRequestsList from "../../components/lists/ReservationsList";
import UserProfile from "./UserProfile";
import { EAccountType, SCREENS_NAME, USER_STORAGE_KEYS } from "../../utils";
import { RemoveItemToStorage } from "../../config/local/local.database";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.2);
const EMPTY_OBJECT = {};
const NOOP = () => null;
const MODAL_HEIGHT_ERROR = Math.ceil(Dimensions.get("window").height / 1.5);

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/faceshop/image/upload/v1776870394/Gemini_Generated_Image_8ioct48ioct48ioc_ricigq.png";

const Home = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);
  const [showError, setShowError] = useState(false);
  const [textError, setTextError] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { account, setAccount, setIsAuthenticated } = useContext(UserContext);
  const insets = useSafeAreaInsets();

  const onScanned = (value = "") => {
    try {
      setOpenScanner(false);
      if (value.startsWith("RES-")) getReservation(value);
      else {
        setTextError("Mauvais QrCode");
        setShowError(true);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const getReservation = useCallback(async (code) => {
    try {
      setIsLoadingData(true);
      const response = await GetReservationInfos(code);
      const { success, data, message, error  } = response.data;
      if (success) {
        let canView = false;
        const { house, company } = data;
        if (
          account?.accountType === "ADMIN" &&
          account.company.code === company?.code
        ) {
          canView = true;
          setData(data);
        }
        if (
          [EAccountType.ACCESS_CONTROLLER, EAccountType.SUPERVISOR].includes(
            account?.accountType,
          ) &&
          account.house.code === data?.place?.house?.code
        ) {
          canView = true;
          setData(data);
        }
        if (!canView) {
          setShowError(true);
          setTextError("Vous n'êtes pas autorisés à voir cette information.");
        }
      } else {
        setShowError(true);
        setTextError(message);
      }
       setIsLoadingData(false);
    } catch (error) {
      console.log({ error });
      setShowError(true);
      setTextError("Une erreur est survenue. Veuillez Réessayer SVP.");
      setIsLoadingData(false);
    }
  }, [account]);

  const onLogout = async () => {
    try {
      setShowUserProfile(false);
      setIsLoading(true);
      await Promise.all(
        USER_STORAGE_KEYS.map((key) => RemoveItemToStorage(key)),
      );
      setAccount(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const listHeader = useMemo(
    () => (
      <HomeHeader
        user={account}
        onScan={() => setOpenScanner(true)}
        onShowUser={() => setShowUserProfile(true)}
        isLoadingQrCode={isLoadingData}
      />
    ),
    [account, isLoadingData],
  );

  const onReport = (reservation) => {
    try {
      setData(null)
      navigation.navigate(SCREENS_NAME.ReservationReport, { data: reservation })
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <HouseImageBackground
      medias={account?.house?.medias}
      defaultImage={DEFAULT_IMAGE}
    >
      <SafeAreaView
        style={[
          SAFE_AREA_VIEW.container,
          {
            backgroundColor: "transparent",
          },
        ]}
      >
        {isLoading ? (
          <FullLoadingContainer
            backgroundColor="transparent"
            colorIcon={APP_COLORS.YELLOW_COLOR.color}
            backgroundLoaderContainer="transparent"
            loaderColor={APP_COLORS.YELLOW_COLOR.color}
          />
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <ReservationsRequestsList
                navigation={navigation}
                selectedStatus={EMPTY_OBJECT}
                // searchTerm={validatedSearchTerm}
                // filterDate={appliedFilterDate}
                onShowReservation={getReservation}
                listHeader={listHeader}
                onScroll={NOOP}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <CustomButton
                label={
                  <Ionicons
                    name="qr-code"
                    size={24}
                    color={APP_COLORS.PRIMARY_COLOR.color}
                  />
                }
                bgColor={APP_COLORS.YELLOW_COLOR.color}
                textColor={APP_COLORS.WHITE_COLOR.color}
                onClick={() => setOpenScanner(true)}
                disable={isLoadingData}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 8,
                  color: APP_COLORS.WHITE_COLOR.color,
                }}
              >
                Humble Software Group
              </Text>
            </View>
          </>
        )}
        <Modal
          visible={openScanner}
          animationType="slide"
          statusBarTranslucent
          onRequestClose={() => setOpenScanner(false)}
        >
          <Scanner
            onClose={() => setOpenScanner(false)}
            onScanned={onScanned}
          />
        </Modal>
        <BottomModal
          showModal={!!data}
          onClose={() => setData(null)}
          content={
            <DetailsReservation
              data={data}
              onClose={() => setData(null)}
              onReport={() => onReport(data)}
            />
          }
          minHeight={MODAL_HEIGHT}
          backgroundColor="#F5F5F5"
          sliderBackgroundColor={APP_COLORS.WHITE_COLOR.color}
          overlay="rgba(129, 143, 180, 0.3)"
        />
        <BottomModal
          showModal={showError}
          onClose={() => {
            setShowError(null);
            setTextError("");
          }}
          content={
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginBottom: 15,
                    fontSize: 24,
                    textAlign: "center",
                  }}
                >
                  {textError}
                </Text>
                <AntDesign
                  name="close"
                  size={48}
                  color={APP_COLORS.RED_COLOR.color}
                />
              </View>

              <View
                style={{
                  flexDirection: "column-reverse",
                  marginBottom: insets.bottom,
                }}
              >
                <CustomButton
                  label="Fermer"
                  textColor={APP_COLORS.WHITE_COLOR.color}
                  bgColor={APP_COLORS.RED_COLOR.color}
                  onClick={() => {
                    setShowError(null);
                    setTextError("");
                  }}
                />
              </View>
            </View>
          }
          minHeight={MODAL_HEIGHT_ERROR}
          backgroundColor="#F5F5F5"
          sliderBackgroundColor={APP_COLORS.WHITE_COLOR.color}
          overlay="rgba(129, 143, 180, 0.3)"
        />
        <BottomModal
          showModal={showUserProfile}
          onClose={() => {
            setShowUserProfile(false);
          }}
          content={
            <UserProfile
              onLogout={() => onLogout()}
              onClose={() => {
                setShowUserProfile(false);
              }}
            />
          }
          minHeight={MODAL_HEIGHT_ERROR}
          backgroundColor="#F5F5F5"
          sliderBackgroundColor={APP_COLORS.WHITE_COLOR.color}
          overlay="rgba(129, 143, 180, 0.3)"
        />
        
      </SafeAreaView>
    </HouseImageBackground>
  );
};

export default Home;
