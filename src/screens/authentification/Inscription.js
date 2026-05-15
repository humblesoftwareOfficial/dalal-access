import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import DefaultInput from "../../components/inputs/DefaultInput";
import { AUTHENTICATION_STYLE } from "../../styling/screen";
import CustomButton from "../../components/buttons/CustomButton";
import { APP_COLORS } from "../../styling/colors";
import { AntDesign, Entypo, Feather, Octicons } from "@expo/vector-icons";
import { isFieldWithValue, isValidEmail, isValidPassword } from "../../utils";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { SignIn, VerifyAccount } from "../../config/api";
import { Alert } from "react-native";
import { AddItemToStorage } from "../../config/local/local.database";

export default function Inscription({ onClose, onSigned }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [isAccountVerification, setIsAccountVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (tempUser) {
      setIsAccountVerification(true);
      setIsLoading(false);
    }
  }, [tempUser]);

  const onSignIn = async () => {
    try {
      if (
        isValidEmail(email) &&
        isValidPassword(password) &&
        isValidPassword(passwordConfirmation) &&
        password === passwordConfirmation
      ) {
        setIsLoading(true);
        const payload = {
          firstName: email,
          lastName: email,
          email,
          password,
        };
        const response = await SignIn(payload);
        const { data, success, message } = response.data;
        if (success) {
          if (data.alreadyExists) {
            Alert.alert(
              "",
              "Un compte avec cet email existe déjà. Connectez-vous."
            );
            onClose();
          } else {
            await AddItemToStorage('access_token', data.access_token);
            await AddItemToStorage('email', email);
            await AddItemToStorage('firstName', email);
            await AddItemToStorage('lastName', email);
            await AddItemToStorage('code', data.code);
            setTempUser(data);
          }
        } else {
          Alert.alert("", "Une erreur s'est produite. Veuillez réssayer SVP.");
          setIsLoading(false);
        }
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("", "Une erreur s'est produite. Veuillez réssayer SVP.");
      setIsLoading(false);
    }
  };

  const onVerificationAccount = async() => {
    try {
      setIsLoading(true);
      const payload = {
        email: tempUser.email,
        code: verificationCode,
      }
      const response = await VerifyAccount(payload, tempUser.access_token);
      const { success, message, data, error} = response.data;
      if (success) {
        if(error) {
          Alert.alert('', `${message}`);
          setIsLoading(false);
        }else {
          await AddItemToStorage('access_token', tempUser.access_token);
          await AddItemToStorage('email', data.email);
          await AddItemToStorage('firstName', data.firstName);
          await AddItemToStorage('lastName', data.lastName);
          await AddItemToStorage('code', data.code);
          onSigned(data);
        }
      } else {
        console.log({ message })
        setErrorMessage(message);
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);
    }
  }

  const renderSignInForm = () => (
    <>
      <DefaultInput
        placeholder="Email"
        onValueChange={(value) => setEmail(value)}
        value={email}
        hasError={
          hasError && (!isFieldWithValue(email) || !isValidEmail(email))
        }
        keyboardType="email-address"
      />
      <DefaultInput
        placeholder="Mot de passe"
        onValueChange={(value) => setPassword(value)}
        value={password}
        hasError={
          hasError &&
          (!isFieldWithValue(password) ||
            !isValidPassword(password) ||
            password !== passwordConfirmation)
        }
        isPassword
      />
      <DefaultInput
        placeholder="Confirmer votre mot de passe"
        onValueChange={(value) => setPasswordConfirmation(value)}
        value={passwordConfirmation}
        hasError={
          hasError &&
          (!isFieldWithValue(password) ||
            !isValidPassword(password) ||
            password !== passwordConfirmation)
        }
        isPassword
      />
      <CustomButton
        label={<Feather name="user-plus" size={16} color="white" />}
        bgColor={APP_COLORS.PRIMARY_COLOR_DARK.color}
        onClick={onSignIn}
      />
      <CustomButton
        label={<AntDesign name="close" size={16} color="white" />}
        bgColor={APP_COLORS.RED_COLOR.color}
        onClick={onClose}
      />
    </>
  );

  const renderVerificationAccount = () => (
    <View>
      <DefaultInput
        placeholder="Code de vérification"
        onValueChange={(value) => setVerificationCode(`${value}`)}
        value={verificationCode}
        keyboardType="numeric"
        maxLength={6}
      />
      {isFieldWithValue(errorMessage) && (
        <Text style={{ color: APP_COLORS.RED_COLOR.color, fontSize: 10, textAlign: "center"}}>{errorMessage}</Text>
      )}
      <CustomButton
        label={<Octicons name="verified" size={16} color="white" />}
        bgColor={APP_COLORS.GREEN_COLOR.color}
        disable={verificationCode?.length < 6}
        onClick={onVerificationAccount}
      />
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={AUTHENTICATION_STYLE.title}>
        <Text style={AUTHENTICATION_STYLE.title_text}>Inscription</Text>
      </View>
      {isLoading ? (
        <FullLoadingContainer
          backgroundColor="#F5F5F5"
          loaderColor={APP_COLORS.PRIMARY_COLOR.color}
        />
      ) : (
        <View>
          {isAccountVerification ? renderVerificationAccount() : (
            renderSignInForm()
          )}
        </View>
      )}
    </View>
  );
}
