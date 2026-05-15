import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import DefaultInput from "../../components/inputs/DefaultInput";
import { APP_COLORS } from "../../styling/colors";
import CustomButton from "../../components/buttons/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { isFieldWithValue } from "../../utils";
import { UpdateUserInfos } from "../../config/api";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";

export default function EditProfile({ user, onClose, onUserUpdated }) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const payload = {
        firstName,
        lastName,
      };
      const response = await UpdateUserInfos(
        payload,
        user.code,
        user.access_token
      );
      const { success, data } = response.data;
      if (success) {
        onUserUpdated(data);
      }
      console.log({ data });
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
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
        <>
          <DefaultInput
            placeholder="First name"
            onValueChange={(value) => setFirstName(value)}
            value={firstName}
            backgroundColor="#DDD0FF"
            borderColor="#DDD0FF"
          />
          <DefaultInput
            placeholder="Last name"
            onValueChange={(value) => setLastName(value)}
            value={lastName}
            backgroundColor="#DDD0FF"
            borderColor="#DDD0FF"
          />
          <CustomButton
            label={<AntDesign name="Safety" size={16} color="white" />}
            bgColor={APP_COLORS.GREEN_COLOR.color}
            disable={
              !isFieldWithValue(firstName) || !isFieldWithValue(lastName)
            }
            onClick={onUpdateProfile}
          />
          <CustomButton
            label={<AntDesign name="close" size={16} color="white" />}
            bgColor={APP_COLORS.RED_COLOR.color}
            onClick={onClose}
          />
        </>
      )}
    </View>
  );
}
