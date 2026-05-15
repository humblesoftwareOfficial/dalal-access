import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FullLoadingContainer from "../../../components/loaders/FullLoadingContainer";
import { APP_COLORS } from "../../../styling/colors";
import CustomButton from "../../../components/buttons/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import EventContext from "../../../config/contexts/event/Event";
import UserContext from "../../../config/contexts/user/User";
import { CreateNewEvent } from "../../../config/api";
import { convertDateStringFormat } from "../../../utils";

export default function SaveEvent({ onNext, onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { newEvent } = useContext(EventContext);
  const { account } = useContext(UserContext);

  useEffect(() => {
    createEvent();
  }, [])

  const createEvent = async () => {
    try {
      setIsLoading(true);
      const payload = {
        user: account.code,
        name: newEvent.name,
        description: newEvent.description,
        type: newEvent.type,
        startDate: `${convertDateStringFormat(newEvent.startDate)} 00:00:00`,
      };
      const response = await CreateNewEvent(payload, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        onNext();
      } else {
        setIsLoading(false);
        setErrorMessage(message);
      }
    } catch (error) {
      console.log(error.response.data);

      setErrorMessage("Une erreur s'est produite.");
      setIsLoading(false)
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <FullLoadingContainer
          backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
          colorIcon="#F5F5F5"
          backgroundLoaderContainer="#F5F5F5"
          loaderColor={APP_COLORS.WHITE_COLOR.color}
        />
      ) : (
        <View style={{ flex: 1, marginTop: 25 }}>
          <Text style={{ color: "#F5F5F5", textAlign: "center" }}>
            {errorMessage}
          </Text>
          <CustomButton
            label="Réessayer"
            bgColor={APP_COLORS.GREEN_COLOR.color}
            onClick={createEvent}
          />
          <CustomButton
            label="Annuler"
            bgColor={APP_COLORS.RED_COLOR.color}
            onClick={onBack}
          />
        </View>
      )}
    </View>
  );
}
