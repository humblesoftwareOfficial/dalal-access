import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../components/buttons/CustomButton";
import { APP_COLORS } from "../../styling/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { FONTS } from "../../styling/polices";
import { isValidGuestAccessCode } from "../../utils";
import UserContext from "../../config/contexts/user/User";
import { CheckAccessOnEvent } from "../../config/api";

export default function CheckAccess({ eventCode, value = "", onClose }) {
  const [letEnter, setLetEnter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guest, setGuest] = useState(null);
  const { account } = useContext(UserContext);

  useEffect(() => {
    getAccessDetails();
  }, []);

  useEffect(() => {
    if (guest) {
      setLetEnter(true);
      setIsLoading(false);
    }
  }, [guest]);

  const getAccessDetails = async () => {
    try {
      if (!isValidGuestAccessCode(value)) {
        setLetEnter(false);
        setIsLoading(false);
      } else {
        const payload = {
          user: account.code,
          event: eventCode,
          access: value
        }
        const response = await CheckAccessOnEvent(payload, account.access_token);
        const { success, data } = response.data;
        if (success) {
          setGuest(data);
        } else {
          setLetEnter(false);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, marginBottom: 15 }}>
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            {letEnter ? (
              <>
                <View>
                  <Ionicons
                    name="checkmark-done-circle"
                    size={75}
                    color={APP_COLORS.GREEN_COLOR.color}
                  />
                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                  <Text style={{ color: "white" }}>Bienvenu</Text>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: FONTS.bold,
                      fontSize: 36,
                    }}
                  >{`${guest.user.firstName}`}</Text>
                  <Text style={{ color: "white" }}>{`Accès: ${guest.type}`}</Text>
                </View>
              </>
            ) : (
              <MaterialIcons
                name="cancel"
                size={75}
                color={APP_COLORS.RED_COLOR.color}
              />
            )}
          </View>
          <View>
            <CustomButton
              label="Fermer"
              textColor={APP_COLORS.PRIMARY_COLOR.color}
              bgColor={APP_COLORS.WHITE_COLOR.color}
              onClick={onClose}
            />
          </View>
        </>
      )}
    </View>
  );
}
