import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CountdownTimer from './ReservationTimer';
import { calculateTimeDifference, EReservationStatus, EReservationStatusTraduction, formatPrice, formatReservationIntervalDate, generateKey, isFieldWithValue, timing, truncateText } from "../../../utils";
import { APP_COLORS } from "../../../styling/colors";

const STATUS_CONFIG = {
  [EReservationStatus.ON_REQUEST]: {
    color: "#E08A2E",
    bg: "#FFFAF4",
    border: "#FFD9A8",
    accent: "#FFB465",
  },
  [EReservationStatus.ACCEPTED]: {
    color: "#42575B",
    bg: "#F5F8F9",
    border: "#C5D5D8",
    accent: "#63797D",
  },
  [EReservationStatus.IN_PROGRESS]: {
    color: APP_COLORS.PRIMARY_COLOR.color,
    bg: "#F0F4F5",
    border: "#A0B5B9",
    accent: APP_COLORS.PRIMARY_COLOR.color,
  },
  [EReservationStatus.ENDED]: {
    color: APP_COLORS.GREEN_COLOR.color,
    bg: "#F2FAF7",
    border: "#A3D4C7",
    accent: APP_COLORS.GREEN_COLOR.color,
  },
  [EReservationStatus.CANCELLED]: {
    color: APP_COLORS.RED_COLOR.color,
    bg: "#FFF4F2",
    border: "#F5B8B0",
    accent: APP_COLORS.RED_COLOR.color,
  },
};

const DEFAULT_CONFIG = {
  color: "#63797D",
  bg: "#F5F8F9",
  border: "#C5D5D8",
  accent: "#63797D",
};

export default function RequestCardSimpleView({ data, onClick }) {
  const config = STATUS_CONFIG[data?.status] || DEFAULT_CONFIG;

  const clientName = isFieldWithValue(data?.user?.fullName)
    ? truncateText(data?.user?.fullName, 26)
    : truncateText(
        `${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`,
        26,
      );

  const roomImage = data?.place?.medias?.[0]?.url;
  const houseName = data?.place?.house?.name || data?.place?.house?.description || "";
  const roomDesc = isFieldWithValue(data?.place?.label)
    ? data?.place?.label
    : data?.place?.deescription || "";
  const roomLabel = truncateText(
    [houseName, roomDesc].filter(Boolean).join(" · "),
    34,
  );
  const price = data?.price?.value || data?.place?.prices?.[0]?.value;

  const creatorInitials =
    data?.createdBy?.firstName && data?.createdBy?.lastName
      ? `${data.createdBy.firstName[0]}${data.createdBy.lastName[0]}`
      : null;

  const isInProgress = data?.status === EReservationStatus.IN_PROGRESS;
  const isOverdue =
    isInProgress && calculateTimeDifference(data?.endDate)?.isPast;

  return (
    <TouchableOpacity
      onPress={() => onClick(data)}
      activeOpacity={0.75}
      style={{
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 15,
        backgroundColor: APP_COLORS.WHITE_COLOR.color, //config.bg,
        // borderWidth: 1,
        // borderColor: config.border,
        overflow: "hidden",
      }}
    >
      <View style={{ flexDirection: "row", padding: 5 }}>
        {/* Accent strip + thumbnail */}
        {/* <View style={{ width: 4, backgroundColor: config.accent }} /> */}

        {/* Room thumbnail */}
        <View
          style={{
            width: 72,
            alignSelf: "stretch",
            // backgroundColor: "#DDE4E6",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 72,
          }}
        >
          {roomImage ? (
            <ImageBackground
              source={{ uri: roomImage }}
              style={{ width: 72, height: 72 }}
              imageStyle={{ resizeMode: "cover", borderRadius: 15 }}
            />
          ) : (
            <MaterialIcons name="hotel" size={26} color={config.color} />
          )}
        </View>

        {/* Main content */}
        <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 8 }}>
          {/* Row 1: client name + timing */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 13,
                flex: 1,
                color: "#152A2D",
              }}
              numberOfLines={1}
            >
              {clientName}
            </Text>
            <Text style={{ fontSize: 10, color: "#8FA3A7", marginLeft: 4 }}>
              {isFieldWithValue(data?.createdAt) ? timing(data?.createdAt) : ""}
            </Text>
          </View>

          {/* Row 2: room label */}
          <Text
            style={{
              fontSize: 11,
              color: "#42575B",
              marginBottom: 3,
              fontWeight: "bold",
            }}
            numberOfLines={1}
          >
            {roomLabel}
          </Text>

          {/* Row 3: date interval */}
          <Text
            style={{ fontSize: 10, color: "#7A9297", marginBottom: 5 }}
            numberOfLines={1}
          >
            {formatReservationIntervalDate(data?.startDate, data?.endDate)}
          </Text>

          {/* Row 4: price + status badge + creator */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {price ? (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: config.color,
                  flex: 1,
                }}
              >
                {/* {formatPrice(`${price}`)} XOF */}
              </Text>
            ) : (
              <View style={{ flex: 1 }} />
            )}

            {creatorInitials && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#8FA3A7",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 8, fontWeight: "700" }}>
                  {creatorInitials}
                </Text>
              </View>
            )}

            <View
              style={{
                backgroundColor: config.accent,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 9, fontWeight: "600" }}>
                {EReservationStatusTraduction[data?.status]}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Countdown strip — only for IN_PROGRESS */}
      {isInProgress && (
        <View
          style={{
            backgroundColor: isOverdue
              ? "rgba(153, 50, 68, 0.12)"
              : "rgba(255, 201, 60, 0.18)",
            borderTopWidth: 1,
            borderTopColor: isOverdue
              ? "rgba(153, 50, 68, 0.2)"
              : "rgba(255, 201, 60, 0.3)",
          }}
        >
          <CountdownTimer endDate={data?.endDate} key={generateKey()} />
        </View>
      )}
    </TouchableOpacity>
  );
}
