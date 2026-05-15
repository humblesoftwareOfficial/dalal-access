import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/system";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { APP_COLORS } from "../../styling/colors";
import CustomButton from "../../components/buttons/CustomButton";
import BottomModal from "../../components/modals/BottomModal";
import CheckAccess from "./CheckAccess";
import UserContext from "../../config/contexts/user/User";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.3);
const MIDDLE = Math.ceil(Dimensions.get("window").width / 3.5);

export default function Scanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const cameraRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const { eventAccess } = useContext(UserContext);
  const [event, setEvent] = useState(route.params?.event || null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission?.status === "granted") {
      setHasPermission(true);
    }
  }, [permission]);

  const requestCameraAccess = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onScan = () => {
    setScanned(false);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsLoading(false);
    setValue(data);
    setOpenModal(true);
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        SAFE_AREA_VIEW.container,
        {
          backgroundColor: "#F5F5F5",
        },
      ]}
    >
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              ...(scanned ? { alignItems: "center" } : {}),
            }}
          >
            {Boolean(!scanned) && (
              <CameraView
                  style={{ flex: 1 }}
                  facing="back"
                  onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                  barCodeScannerSettings={{
                    barCodeTypes: ["qr"],
                  }}
                />
            )}
            {Boolean(scanned) && (
              <TouchableOpacity style={styles.button_scan} onPress={onScan}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={68}
                  color={APP_COLORS.PRIMARY_COLOR.color}
                />
              </TouchableOpacity>
            )}
          </View>
          {Boolean(scanned) && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                ©️ 2022 Humble soft, Inc.
              </Text>
            </View>
          )}
        </>
      )}
      <BottomModal
        onClose={() => setOpenModal(false)}
        content={
          <CheckAccess onClose={() => setOpenModal(false)} value={value} eventCode={event.code}/>
        }
        showModal={openModal}
        backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        sliderBackgroundColor={APP_COLORS.WHITE_COLOR.color}
        borderWidth={2}
        minHeight={MODAL_HEIGHT}
        overlay="rgba(0, 0, 0, 0.2)"
      />
    </SafeAreaView>
  );
}
const BUTTON_SIZE = Dimensions.get("window").width / 2;
const styles = StyleSheet.create({
  button_scan: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BUTTON_SIZE,
    padding: 10,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    backgroundColor: APP_COLORS.YELLOW_COLOR.color,
  },
});
