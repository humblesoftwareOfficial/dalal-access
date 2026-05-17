import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import UserContext from "../../config/contexts/user/User";
import { RemoveItemToStorage } from "../../config/local/local.database";
import {
  ACCOUNT_INFOS_CARD_STYLE,
  USER_PROFILE_CIRCLE_SIZE,
} from "../../styling/system";
import { APP_COLORS } from "../../styling/colors";
import CustomButton from "../../components/buttons/CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserProfile({ onLogout, onClose }) {
  const { account, setAccount, setIsAuthenticated } = useContext(UserContext);
  const insets = useSafeAreaInsets();

  const fullName = [account?.firstName, account?.lastName]
    .filter(Boolean)
    .join(" ");
  const company = account?.company?.name || "";
  const house = account?.house?.name || "";

  return (
    <View style={{ flex: 1 }}>
      <View style={[ACCOUNT_INFOS_CARD_STYLE.container, { flex: 1 }]}>
        <View style={ACCOUNT_INFOS_CARD_STYLE.userCircle}>
          <FontAwesome5
            name="user-alt"
            size={Math.ceil(USER_PROFILE_CIRCLE_SIZE / 2.5)}
            color={APP_COLORS.WHITE_COLOR.color}
          />
        </View>
        {!!fullName && (
          <Text style={ACCOUNT_INFOS_CARD_STYLE.userName}>{fullName}</Text>
        )}

        <View style={{ marginTop: 10}}>
          {!!company && (
          <Text style={ACCOUNT_INFOS_CARD_STYLE.companyName}>{company}</Text>
        )}
        {!!house && (
          <Text style={ACCOUNT_INFOS_CARD_STYLE.companyName}>#{house}</Text>
        )}
        </View>
      </View>
      <View style={{ marginBottom: insets.bottom }}>
        <CustomButton
          label="Se déconnecter"
          bgColor={APP_COLORS.RED_COLOR.color}
          onClick={() => onLogout && onLogout()}
        />
        <CustomButton
          label="Annuler"
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          onClick={() => onClose && onClose()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   logoutButton: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     backgroundColor: APP_COLORS.RED_COLOR.color,
  //     paddingVertical: 10,
  //     paddingHorizontal: 24,
  //     borderRadius: 50,
  //     marginTop: 20,
  //     gap: 8,
  //   },
  logoutLabel: {
    color: APP_COLORS.WHITE_COLOR.color,
    fontWeight: "600",
    fontSize: 14,
  },
});
