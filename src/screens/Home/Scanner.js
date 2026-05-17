import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { APP_COLORS } from "../../styling/colors";
import CustomButton from "../../components/buttons/CustomButton";

/**
 * Props:
 *   onScanned(data: string) — appelé une fois avec la valeur du QR code
 *   onClose()              — appelé quand l'utilisateur ferme le scanner
 */
export default function Scanner({ onScanned, onClose }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cooldown = useRef(false);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }) => {
    if (cooldown.current) return;
    cooldown.current = true;
    setScanned(true);
    onScanned?.(data);
  };

  const handleReset = () => {
    cooldown.current = false;
    setScanned(false);
  };

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera-off-outline" size={48} color={APP_COLORS.WHITE_COLOR.color} />
        <Text style={styles.permissionText}>Accès caméra requis</Text>
        {permission.canAskAgain && (
          <TouchableOpacity style={styles.btn} onPress={requestPermission}>
            <Text style={styles.btnText}>Autoriser</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {/* Viseur */}
      <View style={styles.overlay}>
        <View style={styles.finder}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        <Text style={styles.hint}>
          {scanned ? "QR code détecté ✓" : "Placez le QR code dans le cadre"}
        </Text>
      </View>

      {/* Boutons */}
      <View style={styles.actions}>
        <View style={{ flex: 1 }}>
          <CustomButton
            label="Fermer"
            bgColor={APP_COLORS.RED_COLOR.color}
            onClick={onClose}
        />
        </View>
      </View>
    </View>
  );
}

const CORNER = 24;
const BORDER = 3;
const FINDER_SIZE = 220;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  finder: {
    width: FINDER_SIZE,
    height: FINDER_SIZE,
  },
  corner: {
    position: "absolute",
    width: CORNER,
    height: CORNER,
    borderColor: APP_COLORS.YELLOW_COLOR.color,
    borderWidth: BORDER,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  hint: {
    marginTop: 20,
    color: "#FFF",
    fontSize: 13,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    paddingBottom: 45,
    paddingHorizontal: 20,
    justifyContent: "center",
    // backgroundColor: "red"
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnSecondary: {
    backgroundColor: APP_COLORS.GREEN_COLOR.color,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  permissionText: {
    color: APP_COLORS.WHITE_COLOR.color,
    marginTop: 12,
    marginBottom: 20,
    fontSize: 15,
  },
});
