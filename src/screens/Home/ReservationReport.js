import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { APP_COLORS } from "../../styling/colors";
import { FONTS } from "../../styling/polices";
import CustomButton from "../../components/buttons/CustomButton";
import { ReportReservation } from "../../config/api";
import { PostImageToCDN } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/system";
import UserContext from "../../config/contexts/user/User";
import RequestCardSimpleView from "../../components/cards/request";
import DefaultInput from "../../components/inputs/DefaultInput";

const REPORT_TYPES = [
  { key: "BEHAVIOR", label: "Comportement inapproprié", icon: "warning-outline" },
  { key: "DAMAGE", label: "Dommages matériels", icon: "construct-outline" },
  { key: "NOISE", label: "Nuisances sonores", icon: "volume-high-outline" },
  { key: "RULES", label: "Non-respect des règles", icon: "ban-outline" },
  { key: "OTHER", label: "Autre", icon: "ellipsis-horizontal-outline" },
];

export default function ReservationReport({ navigation, route }) {
  const { data } = route.params;
  const { account } = useContext(UserContext);
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { code } = data ?? {};

  const canSubmit = !!selectedType;

  const onGoBack = () => {
    try {
      navigation.goBack();
    } catch {}
  };

  const requestAndLaunchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission requise",
        "L'accès à la caméra est nécessaire pour prendre une photo.",
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  const requestAndLaunchGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission requise",
        "L'accès à la galerie est nécessaire pour choisir une photo.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;
    try {
      setIsLoading(true);
      setError("");

      let imageUrl = null;
      if (photo?.base64) {
        imageUrl = await PostImageToCDN(photo.base64);
        if (!imageUrl) throw new Error("cdn_upload_failed");
      }

      await ReportReservation(
        {
          by: account?.code,
          reservation: code,
          motif: selectedType,
          ...(description.trim() && { description: description.trim() }),
          ...(imageUrl && { imageUrl }),
        },
        account?.access_token,
      );
      Alert.alert("Signalement enregistré");
      onGoBack();
    } catch (err) {
      if (err?.message === "cdn_upload_failed") {
        setError("Impossible d'envoyer la photo. Veuillez réessayer.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    onGoBack();
    return null;
  }

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container, { backgroundColor: APP_COLORS.WHITE_COLOR.color }]}
    >
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Signalement</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
        >
          <RequestCardSimpleView data={data} onClick={() => null} />
          <Text style={styles.sectionLabel}>Description (optionnelle)</Text>
          <DefaultInput
            value={description}
            onValueChange={(value) => setDescription(value)}
            placeholder="Décrivez le problème ... "
          />

          <Text style={styles.sectionLabel}>Motif du signalement</Text>
          <View style={styles.typeGrid}>
            {REPORT_TYPES.map((t) => {
              const selected = selectedType === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.typeChip, selected && styles.typeChipSelected]}
                  onPress={() => setSelectedType(t.key)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={t.icon}
                    size={15}
                    color={selected ? "#FFF" : APP_COLORS.PRIMARY_COLOR.color}
                  />
                  <Text style={[styles.typeLabel, selected && styles.typeLabelSelected]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* <TextInput
            style={styles.textarea}
            placeholder="Décrivez le problème en détail..."
            placeholderTextColor="#AAA"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          /> */}

          <Text style={styles.sectionLabel}>Photo (optionnelle)</Text>
          {photo ? (
            <View style={styles.photoPreviewWrapper}>
              <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
              <TouchableOpacity
                style={styles.removePhotoBtn}
                onPress={() => setPhoto(null)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close-circle" size={26} color={APP_COLORS.RED_COLOR.color} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.photoActions}>
              <TouchableOpacity
                style={styles.photoBtn}
                onPress={requestAndLaunchCamera}
                activeOpacity={0.75}
              >
                <Ionicons name="camera-outline" size={22} color={APP_COLORS.PRIMARY_COLOR.color} />
                <Text style={styles.photoBtnLabel}>Caméra</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoBtn}
                onPress={requestAndLaunchGallery}
                activeOpacity={0.75}
              >
                <Ionicons name="images-outline" size={22} color={APP_COLORS.PRIMARY_COLOR.color} />
                <Text style={styles.photoBtnLabel}>Galerie</Text>
              </TouchableOpacity>
            </View>
          )}

          {!!error && <Text style={styles.errorText}>{error}</Text>}
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            label={isLoading ? "Envoi en cours..." : "Envoyer le signalement"}
            bgColor={APP_COLORS.PRIMARY_COLOR.color}
            textColor={APP_COLORS.WHITE_COLOR.color}
            onClick={handleSubmit}
            disable={!canSubmit || isLoading}
          />
          <CustomButton
            label="Annuler"
            bgColor={APP_COLORS.RED_COLOR.color}
            textColor={APP_COLORS.WHITE_COLOR.color}
            onClick={onGoBack}
            disable={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: APP_COLORS.PRIMARY_COLOR.color,
    textAlign: "center",
  },
  body: {
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: APP_COLORS.PRIMARY_COLOR.color,
    backgroundColor: "#FFF",
  },
  typeChipSelected: {
    backgroundColor: APP_COLORS.RED_COLOR.color,
    borderColor: APP_COLORS.RED_COLOR.color,
  },
  typeLabel: {
    fontSize: 12,
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontWeight: "500",
  },
  typeLabelSelected: {
    color: "#FFF",
  },
  textarea: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: APP_COLORS.PRIMARY_COLOR.color,
    minHeight: 100,
  },
  photoActions: {
    flexDirection: "row",
    gap: 12,
  },
  photoBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#DDD",
    borderStyle: "dashed",
  },
  photoBtnLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: APP_COLORS.PRIMARY_COLOR.color,
  },
  photoPreviewWrapper: {
    position: "relative",
    borderRadius: 12,
    overflow: "visible",
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    resizeMode: "cover",
  },
  removePhotoBtn: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#FFF",
    borderRadius: 13,
  },
  errorText: {
    color: APP_COLORS.RED_COLOR.color,
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
  },
  footer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
});
