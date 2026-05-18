import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { APP_COLORS } from "../../styling/colors";
import { ACCOUNT_INFOS_CARD_STYLE } from "../../styling/system";
import { EReservationStatus, isFieldWithValue } from "../../utils";
import { FONTS } from "../../styling/polices";
import CustomButton from "../../components/buttons/CustomButton";

const STATUS_CONFIG = {
  ON_REQUEST: {
    label: "Demande en cours",
    color: APP_COLORS.YELLOW_COLOR.color,
  },
  ACCEPTED: { label: "En attente de validation", color: "#2196F3" },
  VALIDATED: {
    label: "En attente de démarrage",
    color: APP_COLORS.GREEN_COLOR.color,
  },
  IN_PROGRESS: { label: "En cours", color: APP_COLORS.PRIMARY_COLOR.color },
  ENDED: { label: "Terminée", color: "#888" },
  CANCELLED: { label: "Annulée", color: APP_COLORS.RED_COLOR.color },
};

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const stars = (count) =>
  Array.from({ length: count ?? 0 }, (_, i) => (
    <Ionicons
      key={i}
      name="star"
      size={13}
      color={APP_COLORS.YELLOW_COLOR.color}
    />
  ));

const Row = ({ icon, label, value }) => (
  <View style={styles.row}>
    <Ionicons
      name={icon}
      size={16}
      color={APP_COLORS.PRIMARY_COLOR.color}
      style={styles.rowIcon}
    />
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value ?? "—"}</Text>
  </View>
);

export default function DetailsReservation({ data, onClose, onReport }) {
  if (!data) return null;

  const { code, status, startDate, endDate, user, place, company, isExtended } =
    data;
  const statusCfg = STATUS_CONFIG[status] ?? { label: status, color: "#888" };

  const getReservationStatusColor = (status) => {
    try {
      switch (status) {
        case "ON_REQUEST":
          return APP_COLORS.YELLOW_COLOR_TRANSPARENT.color;
        case "ACCEPTED":
          return APP_COLORS.PRIMARY_COLOR.color;
        case "VALIDATED":
          return APP_COLORS.PRIMARY_COLOR.color;
        case "CANCELLED":
          return APP_COLORS.RED_COLOR.color;
        case "ENDED":
          return APP_COLORS.RED_COLOR.color;
        case "IN_PROGRESS":
          return APP_COLORS.GREEN_COLOR.color;
        default:
          return APP_COLORS.WHITE_COLOR.color;
      }
    } catch (error) {
      return APP_COLORS.WHITE_COLOR.color;
    }
  };

  const renderStatusAccessInfo = useCallback(() => {
    try {
      switch (status) {
        case EReservationStatus.ON_REQUEST:
          return (
            <AntDesign
              name="info"
              size={48}
              color={APP_COLORS.YELLOW_COLOR.color}
            />
          );
        case EReservationStatus.ACCEPTED:
        case EReservationStatus.VALIDATED:
          return (
            <AntDesign
              name="info"
              size={48}
              color={APP_COLORS.PRIMARY_COLOR.color}
            />
          );
        case EReservationStatus.IN_PROGRESS:
          return (
            <FontAwesome
              name="check"
              size={96}
              color={APP_COLORS.GREEN_COLOR.color}
            />
          );
        case EReservationStatus.CANCELLED:
        case EReservationStatus.ENDED:
          return (
            <AntDesign
              name="close"
              size={48}
              color={APP_COLORS.RED_COLOR.color}
            />
          );
        default:
          break;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  }, [status]);

  const getCredentials = useCallback(() => {
    try {
      let credentials = "";
      const userRservation = data?.user;
      if (isFieldWithValue(userRservation?.firstName))
        credentials = credentials.concat(userRservation?.firstName[0]);
      if (isFieldWithValue(userRservation?.lastName))
        credentials = credentials.concat(userRservation?.lastName[0]);
      if (isFieldWithValue(userRservation?.fullName))
        credentials = credentials.concat(userRservation?.fullName[0]);
      return credentials;
    } catch (error) {
      console.log({ error });
      return "";
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 15, marginRight: 5 }}
            onPress={() => onClose && onClose()}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          {status === EReservationStatus.IN_PROGRESS && (
            <CustomButton
              label="Signaler le client"
              bgColor={APP_COLORS.RED_COLOR.color}
              onClick={() => onReport && onReport()}
            />
          )}
        </View>
        <View></View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <View style={ACCOUNT_INFOS_CARD_STYLE.container}>
        <View style={ACCOUNT_INFOS_CARD_STYLE.userCircleReservation}>
          <Text
            style={[
              ACCOUNT_INFOS_CARD_STYLE.userCredential,
              { color: APP_COLORS.WHITE_COLOR.color },
            ]}
          >
            {getCredentials()}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={ACCOUNT_INFOS_CARD_STYLE.userName}>
            {isFieldWithValue(user?.firstName) ? user?.firstName : ""}
          </Text>
          <Text style={ACCOUNT_INFOS_CARD_STYLE.userCredential}>{` `}</Text>
          <Text style={ACCOUNT_INFOS_CARD_STYLE.userName}>
            {isFieldWithValue(user?.firstName) ? user?.lastName : ""}
          </Text>
          <Text style={ACCOUNT_INFOS_CARD_STYLE.userCredential}>{` `}</Text>
          <Text style={ACCOUNT_INFOS_CARD_STYLE.userName}>
            {isFieldWithValue(user?.fullName) ? user?.fullName : ""}
          </Text>
        </View>
      </View> */}

        {user && (
          <>
            <View style={styles.card}>
              <Row
                icon="person"
                label="Nom"
                value={
                  user.fullName ||
                  `${user.firstName} ${user.lastName}`.trim() ||
                  "—"
                }
              />
              <Row icon="call-outline" label="Téléphone" value={user.phone} />
              {!!user.identification && (
                <Row
                  icon="card-outline"
                  label="Identification"
                  value={user.identification}
                />
              )}
            </View>
          </>
        )}
        <View
          style={[
            styles.dateRow,
            {
              backgroundColor: getReservationStatusColor(data?.status),
            },
          ]}
        >
          <DateBox label="Début" date={formatDate(startDate)} />
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
          <DateBox label="Fin" date={formatDate(endDate)} />
        </View>
        {place && (
          <>
            <View style={styles.card}>
              <Text style={styles.placeType}>Pièce</Text>
              <View style={styles.placeHeader}>
                <Text style={styles.placeLabel}>{place.label}</Text>
              </View>

              {!!place.description && (
                <Text style={styles.placeDesc}>{place.description}</Text>
              )}
            </View>
          </>
        )}
        {isFieldWithValue(status) && (
          <View style={styles.card}>
            <Text
              style={{
                color: "black",
                fontSize: 24,
                fontFamily: FONTS.bold,
                textAlign: "center",
              }}
            >
              {statusCfg?.label}
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              {renderStatusAccessInfo()}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <View style={styles.sectionTitle}>
      <Ionicons name={icon} size={16} color={APP_COLORS.PRIMARY_COLOR.color} />
      <Text style={styles.sectionTitleText}>{title}</Text>
    </View>
  );
}

function DateBox({ label, date }) {
  return (
    <View style={styles.dateBox}>
      <Text style={styles.dateLabel}>{label}</Text>
      <Text style={styles.dateValue}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    gap: 10,
  },
  headerTitle: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  headerCode: {
    fontSize: 15,
    fontWeight: "700",
    color: APP_COLORS.PRIMARY_COLOR.color,
    marginTop: 2,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 16,
    paddingBottom: 40,
    gap: 8,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    marginBottom: 6,
  },
  sectionTitleText: {
    fontSize: 13,
    fontWeight: "700",
    color: APP_COLORS.PRIMARY_COLOR.color,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  dateRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
  },
  dateBox: {
    flex: 1,
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 11,
    color: "#FFF",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 13,
    fontWeight: "600",
    color: APP_COLORS.WHITE_COLOR.color,
    textAlign: "center",
  },
  extended: {
    fontSize: 11,
    color: APP_COLORS.YELLOW_COLOR.color,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: -4,
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: APP_COLORS.PRIMARY_COLOR.color,
  },
  placeType: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  placeDesc: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 2,
  },
  rowIcon: {
    width: 20,
  },
  rowLabel: {
    fontSize: 12,
    color: "#888",
    flex: 1,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: "500",
    color: APP_COLORS.PRIMARY_COLOR.color,
    flex: 2,
    textAlign: "right",
  },
  companyName: {
    fontSize: 15,
    fontWeight: "700",
    color: APP_COLORS.PRIMARY_COLOR.color,
  },
});
