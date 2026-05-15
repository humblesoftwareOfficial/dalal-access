import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { APP_COLORS } from "../../styling/colors";
import { EVENT_STYLE } from "../../styling/event";
import CustomButton from "../../components/buttons/CustomButton";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { generateKey } from "../../utils";
import DefaultInput from "../../components/inputs/DefaultInput";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { AddNewCategory, RemoveCategory } from "../../config/api";
import { PLATFORM_BOTTOM_MARGIN } from "../../styling/system";

export default function Categories({
  account,
  event,
  data = [],
  onClose,
  onCategoriesUpdated,
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const renderCategories = useCallback(
    () =>
      data?.map((category, _) => (
        <TouchableOpacity
          key={generateKey()}
          style={{
            backgroundColor: "#FFF",

            margin: 5,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 10, marginRight: 5, padding: 12 }}>
            <Text>{category}</Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "rgba(249, 16, 16 , 0.2)",
              justifyContent: "center",
              alignItems: "center",
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
            }}
            onPress={() => onConfirmRemoveCategory(category)}
          >
            <AntDesign
              name="closecircle"
              size={17}
              color={APP_COLORS.RED_COLOR.color}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )),
    [data]
  );

  const onAddNewCategory = async () => {
    try {
      setIsLoading(true);
      const payload = {
        event: event.code,
        user: account.code,
        categories: [name],
      };
      const response = await AddNewCategory(payload, account.access_token);
      const { success, data, message } = response.data;

      if (success) {
        onCategoriesUpdated(data);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const onConfirmRemoveCategory = (category) =>
    Alert.alert(
      category,
      "Etes-vous sûr de vouloir supprimer cette catégorie ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => onRemoveCategory(category),
          style: "destructive",
        },
      ]
    );

  const onRemoveCategory = async (category) => {
    try {
      setIsLoading(true);
      const payload = {
        event: event.code,
        user: account.code,
        categories: [category],
      };
      const response = await RemoveCategory(payload, account.access_token);
      const { success, data, message } = response.data;

      if (success) {
        onCategoriesUpdated(data);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={[0.7, 0.5]}
        end={[1, 3]}
        colors={[
          APP_COLORS.WHITE_COLOR.color,
          APP_COLORS.YELLOW_COLOR.color,
          APP_COLORS.YELLOW_COLOR.color,
        ]}
        style={{ flex: 1 }}
      >
        {isLoading ? (
          <FullLoadingContainer
            backgroundColor="transparent"
            colorIcon={APP_COLORS.PRIMARY_COLOR.color}
            backgroundLoaderContainer={APP_COLORS.WHITE_COLOR.color}
            loaderColor={APP_COLORS.PRIMARY_COLOR.color}
          />
        ) : (
          <>
            <View style={EVENT_STYLE.details_event_header}>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center" }}>
                  Groupe d'invités
                </Text>
              </View>
              {/* <TouchableOpacity
                style={{ flexDirection: "row-reverse" }}
                onPress={onClose}
              >
                <AntDesign
                  name="closecircle"
                  size={30}
                  color={APP_COLORS.RED_COLOR.color}
                />
              </TouchableOpacity> */}
            </View>
            <View style={{ flex: 1, margin: 5 }}>
              {showForm ? (
                <>
                  <DefaultInput
                    placeholder="Nom de la catégorie ..."
                    value={name}
                    onValueChange={(value) => setName(value)}
                    backgroundColor="#FFF"
                    borderColor="transparent"
                  />
                  <CustomButton
                    label={
                      <MaterialIcons
                        name="add-moderator"
                        size={18}
                        color="#FFF"
                      />
                    }
                    bgColor={APP_COLORS.GREEN_COLOR.color}
                    textColor={APP_COLORS.WHITE_COLOR.color}
                    onClick={() => onAddNewCategory()}
                  />
                  <CustomButton
                    label={<AntDesign name="close" size={18} color="#FFF" />}
                    bgColor={APP_COLORS.RED_COLOR.color}
                    textColor={APP_COLORS.WHITE_COLOR.color}
                    onClick={() => setShowForm(false)}
                  />
                </>
              ) : (
                // <ScrollView
                //   showsHorizontalScrollIndicator={false}
                //   showsVerticalScrollIndicator={false}
                // >
                //   {renderCategories()}
                // </ScrollView>
                renderCategories()
              )}
            </View>
            <View
              style={{
                marginBottom: PLATFORM_BOTTOM_MARGIN,
              }}
            >
              {!showForm && (
                <CustomButton
                  label="Nouveau groupe"
                  bgColor={APP_COLORS.YELLOW_COLOR.color}
                  textColor={APP_COLORS.PRIMARY_COLOR.color}
                  onClick={() => setShowForm(true)}
                />
              )}
            </View>
          </>
        )}
      </LinearGradient>
    </View>
  );
}
