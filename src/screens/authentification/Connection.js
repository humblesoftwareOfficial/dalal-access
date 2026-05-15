import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import DefaultInput from "../../components/inputs/DefaultInput";
import { AUTHENTICATION_STYLE } from "../../styling/screen";
import CustomButton from "../../components/buttons/CustomButton";
import { APP_COLORS } from "../../styling/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { isFieldWithValue, isValidEmail } from "../../utils";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { Authentication } from "../../config/api";
import { AddItemToStorage } from "../../config/local/local.database";

const error_400_message = "Mot de passe incorrect";
const error_404_message = "Aucun compte associé à cet email"

export default function Connection({ onClose, onConnected }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onConnection = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      if (isValidEmail(email) && isFieldWithValue(password)) {
        const payload = {
          email,
          password,
        }
        const response = await Authentication(payload);
        const { data, success, code } = response.data;
        if (!success) {
          setErrorMessage(code === 404 ? error_404_message : (code === 400 ? error_400_message : "Une erreur est survenue. Veuillez ressayer"))
        } else {
          await AddItemToStorage('access_token', data.access_token);
          await AddItemToStorage('email', data.email);
          await AddItemToStorage('firstName', data.firstName);
          await AddItemToStorage('lastName', data.lastName);
          await AddItemToStorage('code', data.code)
          onConnected(data);
        }
        setIsLoading(false);
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={AUTHENTICATION_STYLE.title}>
        <Text style={AUTHENTICATION_STYLE.title_text}>Connexion</Text>
      </View>
      {isLoading ? (
        <FullLoadingContainer backgroundColor="transparent" loaderColor={APP_COLORS.PRIMARY_COLOR.color}/>
      ) : (
        <>
          <DefaultInput
            placeholder="Email"
            onValueChange={(value) => setEmail(value)}
            value={email}
            hasError={hasError && !isValidEmail(email)}
            autoFocus
          />
          <DefaultInput
            placeholder="Mot de passe"
            onValueChange={(value) => setPassword(value)}
            value={password}
            isPassword
            hasError={hasError && !isFieldWithValue(password)}
          />
          <Text style={{ textAlign: "center", color: APP_COLORS.RED_COLOR.color, fontSize: 10 }}>{errorMessage}</Text>
          <CustomButton
            label={<Entypo name="lock-open" size={16} color="white" />}
            bgColor={APP_COLORS.PRIMARY_COLOR.color}
            onClick={() => {
              onConnection();
            }}
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
