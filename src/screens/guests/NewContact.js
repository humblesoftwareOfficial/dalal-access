import React, { useContext, useEffect, useMemo, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import * as Cellular from "expo-cellular";
import {
  parse,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";

import DefaultInput from "../../components/inputs/DefaultInput";
import { GUESTS_STYLE } from "../../styling/guests";
import CustomButton from "../../components/buttons/CustomButton";
import { APP_COLORS } from "../../styling/colors";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import {
  COUNTRIES,
  EEventAccessType,
  getFlagEmoji,
  isFieldWithValue,
} from "../../utils";
import BottomModal from "../../components/modals/BottomModal";
import CountriesList from "../../components/inputs/CountriesList";
import UserContext from "../../config/contexts/user/User";
import { NewGuestsForEvent } from "../../config/api";

const MODAL_COUNTRIES_HEIGHT = Math.ceil(Dimensions.get("window").height - 25);
const defaultSNCountry = { country: "Senegal", code: "221", iso: "SN" };

export default function NewContact({ onAddGuest }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const { account } = useContext(UserContext);

  useEffect(() => {
    // getCountryCode();
  }, []);

  useEffect(() => {
    if (defaultCountry) {
      setIsLoading(false);
    }
  }, [defaultCountry]);

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
      onFocus={() => setShowPreview(false)}
      onBlur={() => setShowPreview(true)}
      hasError={
        (isFieldWithValue(phoneNumber) && !isValidUserPhone) ||
        (hasError && !isFieldWithValue(phoneNumber))
      }
      withPrefix
      topPrefix={17}
      prefix={
        <TouchableOpacity
          onPress={() => setShowCountries(true)}
          style={{ backgroundColor: "transparent" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {`${getFlagEmoji(defaultCountry?.iso || "")}`}
          </Text>
        </TouchableOpacity>
      }
    />
  );

  const onChangeCountry = (value) => {
    setDefaultCountry(value);
    setShowCountries(false);
  };

  const getCountryCode = async () => {
    try {
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
    } catch (error) {
      console.log({ error });
      setDefaultCountry(defaultSNCountry);
    }
  };

  const isValidUserPhone = useMemo(
    () =>
      isValidPhoneNumber(phoneNumber, defaultCountry?.iso) &&
      isPossiblePhoneNumber(phoneNumber, defaultCountry?.iso),
    [phoneNumber, defaultCountry]
  );

  const addGuest = async (type) => {
    try {
      onAddGuest([{
        firstName,
        lastName,
        phone: phone,
      }], type);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <FullLoadingContainer
          colorIcon={APP_COLORS.PRIMARY_COLOR.color}
          backgroundLoaderContainer={APP_COLORS.PRIMARY_COLOR.color}
          loaderColor="#F5F5F5"
        />
      ) : (
        <>
          <View style={{ alignItems: "center" }}>
            <Text style={GUESTS_STYLE.title}> Nouvel invité </Text>
          </View>
          <DefaultInput
            placeholder="Prénom"
            numberOfLines={4}
            onValueChange={(value) => setFirstName(value)}
            value={firstName}
          />
          <DefaultInput
            placeholder="Nom"
            numberOfLines={4}
            onValueChange={(value) => setLastName(value)}
            value={lastName}
          />
          <DefaultInput
            placeholder="Téléphone"
            numberOfLines={4}
            onValueChange={(value) => setPhone(value)}
            value={phone}
          />
          {/* {renderPhoneInput()} */}
          <CustomButton
            label="Accés unique"
            bgColor={APP_COLORS.SECONDARY_COLOR.color}
            onClick={() => addGuest(EEventAccessType.UNIQUE)}
          />
          <CustomButton
            label="Accés groupé"
            bgColor={APP_COLORS.YELLOW_COLOR.color}
            textColor="#000"
            onClick={() => addGuest(EEventAccessType.GROUP)}
          />
        </>
      )}
      <BottomModal
        showModal={showCountries}
        onClose={() => {
          setShowCountries(false);
        }}
        content={<CountriesList onSelectCountry={onChangeCountry} />}
        minHeight={MODAL_COUNTRIES_HEIGHT}
        backgroundColor="#F5F5F5"
        sliderBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
      />
    </View>
  );
}
