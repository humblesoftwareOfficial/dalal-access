import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import * as Cellular from "expo-cellular";
import { isPossiblePhoneNumber, isValidPhoneNumber, parse } from "libphonenumber-js";
import DefaultInput from "../../components/inputs/DefaultInput";
import { AUTHENTICATION_STYLE } from "../../styling/screen";
import CustomButton from "../../components/buttons/CustomButton";
import { APP_COLORS } from "../../styling/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { COUNTRIES, isFieldWithValue } from "../../utils";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { Authentication } from "../../config/api";
import { AddItemToStorage } from "../../config/local/local.database";

const error_400_message = "Mot de passe incorrect";
const error_404_message = "Aucun compte associé à cet email";
const defaultSNCountry = { country: "Senegal", code: "221", iso: "SN" };

export default function Connection({ onClose, onConnected }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [showCountries, setShowCountries] = useState(false);

  useEffect(() => {
    getCountryCode();
  }, []);

  useEffect(() => {
    if (defaultCountry) {
      setIsLoading(false);
    }
  }, [defaultCountry]);

  const onConnection = async () => {
    try {
      if (isFieldWithValue(phoneNumber) && isFieldWithValue(password)) {
        // setErrorMessage("Authentication en cours. Merci de patienter!");
        setIsLoading(true);
        const parsedNumber = parse(phoneNumber, defaultCountry.iso);
        const payload = {
          phone: `+${defaultCountry.code}${parsedNumber.phone}`,
          password,
        };
        const response = await Authentication(payload);
        const { data, success, message } = response.data;
        if (success) {
         if (data.company) {
            await AddItemToStorage("_company_code", data.company.code);
            await AddItemToStorage("_company_name", data.company.name);
            await AddItemToStorage(
              "_company_description",
              data.company?.description
            );
            await AddItemToStorage("_house_code", data.house?.code);
            await AddItemToStorage("_house_name", data.house?.name);
            await AddItemToStorage("_house_description", data.house?.description);
            await AddItemToStorage("_house_medias", JSON.stringify(data.house?.medias ?? []));
            await AddItemToStorage("_code", data.code);
            await AddItemToStorage("_phone", data.phone);
            await AddItemToStorage("_access_token", data.access_token);
            await AddItemToStorage("_firstName", data.firstName);
            await AddItemToStorage("_lastName", data.lastName);
            await AddItemToStorage("_pp", data.profile_picture);
            await AddItemToStorage("_ppkey", data.profile_picture_key);
            await AddItemToStorage("_address", data.address);
            await AddItemToStorage("_account_type", data.accountType);
            onConnected(data);
          } else {
            Alert.alert("INFO", "Vous n'êtes affiliés à aucune compagnie.");
          }
        } else {
          Alert.alert(
            "",
            "Informations d'identification incorrectes. Réessayer!"
          );
        }
        setIsLoading(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.log({ error });
      setErrorMessage("Une erreur est survenue, veuillez réessayer!");
      setIsLoading(false);
      Alert.alert("Error", error);
    }
  };

  const getCountryCode = async () => {
    const isoCode = await Cellular.getIsoCountryCodeAsync();
    if (isoCode) {
      const country = COUNTRIES.find(
        (c) => c.iso === isoCode.toLocaleUpperCase()
      );
      if (country) {
        setDefaultCountry(country);
      } else {
        setDefaultCountry(defaultSNCountry);
      }
    } else {
      setDefaultCountry(defaultSNCountry);
    }
  };

  const renderPhoneInput = () => (
    <DefaultInput
      value={phoneNumber}
      placeholder="Numéro de téléphone"
      maxLength={100}
      onValueChange={(phone) => {
        setPhoneNumber(phone);
      }}
      textAlignCenter
      keyboardType="phone-pad"
      hasError={
        (isFieldWithValue(phoneNumber) && !isValidUserPhone) ||
        (hasError && !isFieldWithValue(phoneNumber))
      }
      withPrefix
      topPrefix={22}
      prefix={
        <TouchableOpacity
          onPress={() => setShowCountries(true)}
          style={{ backgroundColor: "transparent" }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {/* {`${getFlagEmoji(defaultCountry?.iso || "")}`} */}
            {` (+ ${defaultCountry?.code})`}
          </Text>
        </TouchableOpacity>
      }
    />
  );

  const isValidUserPhone = useMemo(
    () =>
      isValidPhoneNumber(phoneNumber, defaultCountry?.iso) &&
      isPossiblePhoneNumber(phoneNumber, defaultCountry?.iso),
    [phoneNumber, defaultCountry],
  );

  const onChangeCountry = (value) => {
    setDefaultCountry(value);
    // setUser({ ...user, countryInfos: value });
    setShowCountries(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={AUTHENTICATION_STYLE.title}>
        <Text style={AUTHENTICATION_STYLE.title_text}>Connexion</Text>
      </View>
      {isLoading ? (
        <FullLoadingContainer
          backgroundColor="transparent"
          loaderColor={APP_COLORS.PRIMARY_COLOR.color}
        />
      ) : (
        <>
           {renderPhoneInput()}
          <DefaultInput
            placeholder="Mot de passe"
            onValueChange={(value) => setPassword(value)}
            value={password}
            isPassword
            hasError={hasError && !isFieldWithValue(password)}
          />
          <Text
            style={{
              textAlign: "center",
              color: APP_COLORS.RED_COLOR.color,
              fontSize: 10,
            }}
          >
            {errorMessage}
          </Text>
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
